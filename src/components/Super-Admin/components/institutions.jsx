'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Building2, Search, Filter, Plus, MoreHorizontal, MapPin, Phone, Mail, Globe,
  Users, GraduationCap, Calendar, Edit, Eye, Trash2, Download, TrendingUp, ArrowUpDown, ToggleLeft
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import axios from 'axios';
import * as XLSX from 'xlsx';
import clsx from 'clsx';

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isInstitutionDialogOpen, setIsInstitutionDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [dialogMode, setDialogMode] = useState('add');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: '',
    category: '',
    established: '',
    description: '',
    address: '',
    location: '',
    phone: '',
    email: '',
    website: '',
    timezone: '',
    status: 'Active',
    admin: {
      name: '',
      email: '',
      phone: '',
      role: 'admin'
    },
    sendCredentials: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch institutions on mount
  useEffect(() => {
    const fetchInstitutions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/institutions', {
          params: {
            search: searchTerm,
            type: filterType,
            status: filterStatus
          }
        });

        const result = response.data;

        if (result.success) {
          setInstitutions(result.data);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError(error.response?.data?.error || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, [searchTerm, filterType, filterStatus]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedInstitutions = [...institutions].sort((a, b) => {
    if (sortConfig.key === 'name' || sortConfig.key === 'type' || sortConfig.key === 'location' || sortConfig.key === 'status') {
      const valueA = sortConfig.key === 'admin' ? a.admin.name.toLowerCase() : a[sortConfig.key].toLowerCase();
      const valueB = sortConfig.key === 'admin' ? b.admin.name.toLowerCase() : b[sortConfig.key].toLowerCase();
      return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return sortConfig.direction === 'asc' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key];
    }
  });

  const totalStudents = institutions.reduce((sum, inst) => sum + inst.students, 0);
  const totalTeachers = institutions.reduce((sum, inst) => sum + inst.teachers, 0);
  const totalRevenue = institutions.reduce((sum, inst) => sum + inst.revenue, 0);
  const activeInstitutions = institutions.filter((inst) => inst.status === 'Active').length;

  const handleSelectInstitution = (institutionId) => {
    setSelectedInstitutions((prev) =>
      prev.includes(institutionId) ? prev.filter((id) => id !== institutionId) : [...prev, institutionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInstitutions.length === sortedInstitutions.length) {
      setSelectedInstitutions([]);
    } else {
      setSelectedInstitutions(sortedInstitutions.map((inst) => inst._id));
    }
  };

  const handleOpenAddDialog = () => {
    setDialogMode('add');
    setFormData({
      id: '',
      name: '',
      type: '',
      category: '',
      established: '',
      description: '',
      address: '',
      location: '',
      phone: '',
      email: '',
      website: '',
      timezone: '',
      status: 'Active',
      admin: {
        name: '',
        email: '',
        phone: '',
        role: 'admin'
      },
      sendCredentials: true
    });
    setCurrentStep(1);
    setIsInstitutionDialogOpen(true);
  };

  const handleEditInstitution = (institution) => {
    setDialogMode('edit');
    setFormData({
      id: institution._id,
      name: institution.name,
      type: institution.type,
      category: institution.category,
      established: institution.established,
      description: institution.description,
      address: institution.address,
      location: institution.location || '',
      phone: institution.phone,
      email: institution.email,
      website: institution.website,
      timezone: institution.timezone,
      status: institution.status,
      admin: {
        name: institution.admin.name,
        email: institution.admin.email,
        phone: institution.admin.phone || '',
        role: institution.admin.role || 'admin'
      },
      sendCredentials: false
    });
    setCurrentStep(1);
    setIsInstitutionDialogOpen(true);
  };

  const handleSubmitInstitution = async () => {
    try {
      setIsLoading(true);
      let response;
      if (dialogMode === 'add') {
        response = await axios.post('/api/institutions', formData);
      } else {
        response = await axios.put('/api/institutions', formData);
      }

      const result = response.data;

      if (result.success) {
        if (dialogMode === 'add') {
          setInstitutions([...institutions, result.data]);
          toast.success('Institution added successfully');
        } else {
          setInstitutions(institutions.map(inst => inst._id === formData.id ? result.data : inst));
          toast.success('Institution updated successfully');
        }
        setIsInstitutionDialogOpen(false);
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInstitution = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/institutions?id=${id}`);
      const result = response.data;
      if (result.success) {
        setInstitutions(institutions.filter(inst => inst._id !== id));
        toast.success('Institution deleted successfully');
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (institution) => {
    const newStatus = institution.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await axios.put('/api/institutions', { id: institution._id, status: newStatus });
      const result = response.data;
      if (result.success) {
        setInstitutions(institutions.map(inst => inst._id === institution._id ? result.data : inst));
        toast.success(`Institution status updated to ${newStatus}`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleExportData = () => {
    const flattenedData = institutions.map(inst => ({
      name: inst.name,
      type: inst.type,
      category: inst.category,
      established: inst.established,
      description: inst.description,
      address: inst.address,
      location: inst.location,
      phone: inst.phone,
      email: inst.email,
      website: inst.website,
      timezone: inst.timezone,
      status: inst.status,
      students: inst.students,
      teachers: inst.teachers,
      revenue: inst.revenue,
      growth: inst.growth,
      rating: inst.rating,
      lastActivity: inst.lastActivity,
      admin_name: inst.admin.name,
      admin_email: inst.admin.email,
      admin_phone: inst.admin.phone,
      admin_role: inst.admin.role
    }));

    const ws = XLSX.utils.json_to_sheet(flattenedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Institutions");
    XLSX.writeFile(wb, 'institutions.xlsx');
    toast.success('Data exported successfully');
  };

  const handleMoreFilters = () => {
    toast.info('More filters coming soon');
    // Implement more filters dialog here
  };

  const handleBulkActions = () => {
    toast.info('Bulk actions coming soon');
    // Implement bulk actions here
  };

  const handleSendMessage = () => {
    toast.info('Send message coming soon');
    // Implement send message here
  };

  const handleCall = () => {
    toast.info('Call coming soon');
    // Implement call here
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 3));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const cardVariants = {
    hover: { scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }
  };

  return (
    <div className={clsx("max-w-screen-2xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 min-h-screen")}>
      {error && <div className={clsx("text-red-500 text-sm")}>{error}</div>}
      {isLoading && <div className={clsx("text-blue-500 text-sm")}>Loading...</div>}

      <motion.div
        className={clsx("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4")}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className={clsx("text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight")}>Institutions</h1>
          <p className={clsx("mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300")}>Manage schools, colleges, and universities with ease</p>
        </div>
        <div className={clsx("flex flex-wrap gap-2 sm:gap-3")}>
          <Button variant="outline" onClick={handleExportData} className={clsx("text-xs sm:text-sm px-3 sm:px-4")}>
            <Download className={clsx("mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4")} />
            Export Data
          </Button>
          <Button onClick={handleOpenAddDialog} className={clsx("bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm px-3 sm:px-4")}>
            <Plus className={clsx("mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4")} />
            Add Institution
          </Button>
        </div>
      </motion.div>

      <motion.div
        className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { title: 'Total Institutions', value: institutions.length, icon: Building2, progress: (activeInstitutions / institutions.length) * 100 || 0, subtitle: `${activeInstitutions} active` },
          { title: 'Total Students', value: totalStudents.toLocaleString(), icon: GraduationCap, progress: 75, subtitle: 'Across all institutions' },
          { title: 'Total Teachers', value: totalTeachers, icon: Users, progress: 82, subtitle: 'Teaching staff' },
          { title: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: TrendingUp, progress: 68, subtitle: 'Monthly revenue' }
        ].map((stat, index) => (
          <motion.div key={index} variants={cardVariants} whileHover="hover">
            <Card>
              <CardHeader className={clsx("flex flex-row items-center justify-between space-y-0 pb-2")}>
                <CardTitle className={clsx("text-xs sm:text-sm font-semibold")}>{stat.title}</CardTitle>
                <stat.icon className={clsx("h-3 sm:h-4 w-3 sm:w-4 text-blue-500")} />
              </CardHeader>
              <CardContent>
                <div className={clsx("text-lg sm:text-2xl font-bold")}>{stat.value}</div>
                <p className={clsx("text-xs text-gray-500")}>{stat.subtitle}</p>
                <Progress value={stat.progress} className={clsx("mt-2 sm:mt-3 h-1 sm:h-2")} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <div className={clsx("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4")}>
            <div>
              <CardTitle className={clsx("text-lg sm:text-2xl font-bold")}>Institution Directory</CardTitle>
              <CardDescription className={clsx("text-xs sm:text-sm")}>Search and manage all institutions</CardDescription>
            </div>
            {selectedInstitutions.length > 0 && (
              <motion.div
                className={clsx("flex items-center space-x-2")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="secondary" className={clsx("text-xs sm:text-sm")}>
                  {selectedInstitutions.length} selected
                </Badge>
                <Button variant="outline" size="sm" onClick={handleBulkActions} className={clsx("text-xs sm:text-sm")}>
                  <Settings className={clsx("w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2")} />
                  Bulk Actions
                </Button>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={clsx("flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center mb-4 sm:mb-6")}>
            <div className={clsx("flex-1")}>
              <div className={clsx("relative")}>
                <Search className={clsx("absolute left-2 sm:left-3 top-2.5 h-3 sm:h-4 w-3 sm:w-4 text-gray-400")} />
                <Input
                  placeholder="Search institutions, admins, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={clsx("pl-7 sm:pl-10 text-xs sm:text-sm")}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className={clsx("w-full sm:w-36 text-xs sm:text-sm")}>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="School">Schools</SelectItem>
                <SelectItem value="College">Colleges</SelectItem>
                <SelectItem value="University">Universities</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className={clsx("w-full sm:w-32 text-xs sm:text-sm")}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleMoreFilters} className={clsx("text-xs sm:text-sm px-3 sm:px-4")}>
              <Filter className={clsx("mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4")} />
              More Filters
            </Button>
          </div>

          <div className={clsx("space-y-4")}>
            <motion.div
              className={clsx("flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={clsx("flex items-center space-x-2")}>
                <Checkbox
                  checked={selectedInstitutions.length === sortedInstitutions.length && sortedInstitutions.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className={clsx("text-xs sm:text-sm text-gray-500")}>
                  Select all ({sortedInstitutions.length} institutions)
                </span>
              </div>
              <div className={clsx("flex space-x-2 mt-2 sm:mt-0")}>
                <Button variant="ghost" size="sm" onClick={() => handleSort('name')} className={clsx("text-xs sm:text-sm")}>
                  Name <ArrowUpDown className={clsx("ml-1 h-3 sm:h-4 w-3 sm:w-4")} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleSort('students')} className={clsx("text-xs sm:text-sm")}>
                  Students <ArrowUpDown className={clsx("ml-1 h-3 sm:h-4 w-3 sm:w-4")} />
                </Button>
              </div>
            </motion.div>

            {sortedInstitutions.map((institution) => (
              <motion.div
                key={institution._id}
                variants={cardVariants}
                whileHover="hover"
                className={clsx("p-4 sm:p-5 bg-white dark:bg-gray-800 shadow-md rounded-lg border")}
              >
                <div className={clsx("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4")}>
                  <div className={clsx("flex items-center space-x-3 sm:space-x-4 flex-1")}>
                    <Checkbox
                      checked={selectedInstitutions.includes(institution._id)}
                      onCheckedChange={() => handleSelectInstitution(institution._id)}
                    />
                    <div className={clsx("flex-shrink-0")}>
                      <div className={clsx("w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center")}>
                        <Building2 className={clsx("h-5 sm:h-6 w-5 sm:w-6 text-white")} />
                      </div>
                    </div>
                    <div className={clsx("flex-1 min-w-0")}>
                      <div className={clsx("flex items-center space-x-2 mb-1 sm:mb-2")}>
                        <h3 className={clsx("text-base sm:text-lg font-semibold")}>{institution.name}</h3>
                        <Badge
                          variant={
                            institution.status === 'Active'
                              ? 'default'
                              : institution.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                          className={clsx("text-xs")}
                        >
                          {institution.status}
                        </Badge>
                        {institution.growth > 0 && (
                          <Badge variant="outline" className={clsx("text-green-600 border-green-600 text-xs")}>
                            <TrendingUp className={clsx("w-3 h-3 mr-1")} />+{institution.growth}%
                          </Badge>
                        )}
                      </div>
                      <div className={clsx("flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2")}>
                        <span className={clsx("flex items-center")}>
                          <Building2 className={clsx("mr-1 h-3 sm:h-4 w-3 sm:w-4")} />
                          {institution.type} • {institution.category}
                        </span>
                        <span className={clsx("flex items-center")}>
                          <MapPin className={clsx("mr-1 h-3 sm:h-4 w-3 sm:w-4")} />
                          {institution.location}
                        </span>
                        <span className={clsx("flex items-center")}>
                          <Calendar className={clsx("mr-1 h-3 sm:h-4 w-3 sm:w-4")} />
                          Est. {institution.established}
                        </span>
                      </div>
                      <div className={clsx("flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm")}>
                        <div className={clsx("flex items-center space-x-1")}>
                          <GraduationCap className={clsx("h-3 sm:h-4 w-3 sm:w-4 text-blue-600")} />
                          <span className={clsx("font-medium")}>{institution.students}</span>
                          <span className={clsx("text-gray-500")}>Students</span>
                        </div>
                        <div className={clsx("flex items-center space-x-1")}>
                          <Users className={clsx("h-3 sm:h-4 w-3 sm:w-4 text-green-600")} />
                          <span className={clsx("font-medium")}>{institution.teachers}</span>
                          <span className={clsx("text-gray-500")}>Teachers</span>
                        </div>
                        <div className={clsx("flex items-center space-x-1")}>
                          <span className={clsx("text-gray-500")}>Admin:</span>
                          <span className={clsx("font-medium")}>{institution.admin.name}</span>
                        </div>
                        <div className={clsx("flex items-center space-x-1")}>
                          <span className={clsx("text-gray-500")}>Revenue:</span>
                          <span className={clsx("font-medium")}>${(institution.revenue / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={clsx("flex items-center space-x-1 sm:space-x-2")}>
                    <Button variant="outline" size="sm" onClick={() => setSelectedInstitution(institution)} className={clsx("text-xs sm:text-sm px-2 sm:px-4")}>
                      <Eye className={clsx("w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2")} />
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className={clsx("p-1 sm:p-2")}>
                          <MoreHorizontal className={clsx("h-3 sm:h-4 w-3 sm:w-4")} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditInstitution(institution)}>
                          <Edit className={clsx("mr-2 h-3 sm:h-4 w-3 sm:w-4")} />
                          Edit Institution
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(institution)}>
                          <ToggleLeft className={clsx("mr-2 h-3 sm:h-4 w-3 sm:w-4")} />
                          Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={clsx("text-red-600")} onClick={() => handleDeleteInstitution(institution._id)}>
                          <Trash2 className={clsx("mr-2 h-3 sm:h-4 w-3 sm:w-4")} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isInstitutionDialogOpen} onOpenChange={setIsInstitutionDialogOpen}>
        <DialogContent className={clsx("max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto")}>
          <DialogHeader>
            <DialogTitle className={clsx("text-xl sm:text-2xl")}>{dialogMode === 'add' ? 'Add New Institution' : 'Edit Institution'}</DialogTitle>
            <DialogDescription>{dialogMode === 'add' ? 'Create a new educational institution in the system' : 'Update institution details'}</DialogDescription>
          </DialogHeader>

          <div className={clsx("flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8")}>
            {['Basic Info', 'Contact', 'Admin Setup'].map((step, index) => (
              <div key={index} className={clsx("flex items-center")}>
                <motion.div
                  className={clsx(`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${currentStep > index + 1
                    ? 'bg-blue-600 text-white'
                    : currentStep === index + 1
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                      : 'bg-gray-200 text-gray-600'
                    }`)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {index + 1}
                </motion.div>
                <div className={clsx("ml-2 sm:ml-3 text-xs sm:text-sm font-medium")}>{step}</div>
                {index < 2 && (
                  <div
                    className={clsx(`w-8 sm:w-20 h-1 ml-2 sm:ml-4 ${currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'}`)}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className={clsx("space-y-4 sm:space-y-6")}
              >
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="name" className={clsx("text-xs sm:text-sm")}>Institution Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter institution name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="type" className={clsx("text-xs sm:text-sm")}>Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className={clsx("text-xs sm:text-sm")}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="School">School</SelectItem>
                        <SelectItem value="College">College</SelectItem>
                        <SelectItem value="University">University</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="category" className={clsx("text-xs sm:text-sm")}>Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Primary & Secondary"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="established" className={clsx("text-xs sm:text-sm")}>Established Year</Label>
                    <Input
                      id="established"
                      type="number"
                      placeholder="2024"
                      value={formData.established}
                      onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                </div>
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="status" className={clsx("text-xs sm:text-sm")}>Status *</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger className={clsx("text-xs sm:text-sm")}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className={clsx("space-y-2")}>
                  <Label htmlFor="description" className={clsx("text-xs sm:text-sm")}>Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the institution"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={clsx("text-xs sm:text-sm")}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className={clsx("space-y-4 sm:space-y-6")}
              >
                <div className={clsx("space-y-2")}>
                  <Label htmlFor="address" className={clsx("text-xs sm:text-sm")}>Full Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={clsx("text-xs sm:text-sm")}
                  />
                </div>
                <div className={clsx("space-y-2")}>
                  <Label htmlFor="location" className={clsx("text-xs sm:text-sm")}>Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={clsx("text-xs sm:text-sm")}
                  />
                </div>
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="phone" className={clsx("text-xs sm:text-sm")}>Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="email" className={clsx("text-xs sm:text-sm")}>Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@institution.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                </div>
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="website" className={clsx("text-xs sm:text-sm")}>Website</Label>
                    <Input
                      id="website"
                      placeholder="www.institution.edu"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="timezone" className={clsx("text-xs sm:text-sm")}>Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                      <SelectTrigger className={clsx("text-xs sm:text-sm")}>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className={clsx("space-y-4 sm:space-y-6")}
              >
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="adminName" className={clsx("text-xs sm:text-sm")}>Admin Full Name *</Label>
                    <Input
                      id="adminName"
                      placeholder="John Smith"
                      value={formData.admin.name}
                      onChange={(e) => setFormData({ ...formData, admin: { ...formData.admin, name: e.target.value } })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="adminEmail" className={clsx("text-xs sm:text-sm")}>Admin Email *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="admin@institution.edu"
                      value={formData.admin.email}
                      onChange={(e) => setFormData({ ...formData, admin: { ...formData.admin, email: e.target.value } })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                </div>
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="adminPhone" className={clsx("text-xs sm:text-sm")}>Admin Phone</Label>
                    <Input
                      id="adminPhone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.admin.phone}
                      onChange={(e) => setFormData({ ...formData, admin: { ...formData.admin, phone: e.target.value } })}
                      className={clsx("text-xs sm:text-sm")}
                    />
                  </div>
                  <div className={clsx("space-y-2")}>
                    <Label htmlFor="adminRole" className={clsx("text-xs sm:text-sm")}>Admin Role</Label>
                    <Select value={formData.admin.role} onValueChange={(value) => setFormData({ ...formData, admin: { ...formData.admin, role: value } })}>
                      <SelectTrigger className={clsx("text-xs sm:text-sm")}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Institution Admin</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className={clsx("flex items-center space-x-2")}>
                  <Checkbox
                    id="sendCredentials"
                    checked={formData.sendCredentials}
                    onCheckedChange={(checked) => setFormData({ ...formData, sendCredentials: !!checked })}
                  />
                  <Label htmlFor="sendCredentials" className={clsx("text-xs sm:text-sm")}>
                    {dialogMode === 'add' ? 'Send login credentials via email' : 'Reset and send new credentials'}
                  </Label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <DialogFooter className={clsx("mt-6 sm:mt-8")}>
            <div className={clsx("flex justify-between w-full")}>
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={clsx("text-xs sm:text-sm px-3 sm:px-4")}
              >
                Previous
              </Button>
              <div className={clsx("flex space-x-2")}>
                <Button
                  variant="outline"
                  onClick={() => setIsInstitutionDialogOpen(false)}
                  className={clsx("text-xs sm:text-sm px-3 sm:px-4")}
                >
                  Cancel
                </Button>
                {currentStep < 3 ? (
                  <Button onClick={nextStep} className={clsx("text-xs sm:text-sm px-3 sm:px-4")}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmitInstitution} disabled={isLoading} className={clsx("text-xs sm:text-sm px-3 sm:px-4")}>
                    {dialogMode === 'add' ? 'Create Institution' : 'Update Institution'}
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedInstitution} onOpenChange={() => setSelectedInstitution(null)}>
        <DialogContent className={clsx("max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto")}>
          <DialogHeader>
            <DialogTitle className={clsx("flex items-center space-x-2 text-lg sm:text-2xl")}>
              <Building2 className={clsx("w-5 sm:w-6 h-5 sm:h-6 text-blue-600")} />
              <span>{selectedInstitution?.name}</span>
            </DialogTitle>
            <DialogDescription className={clsx("text-xs sm:text-sm")}>Complete institution details and analytics</DialogDescription>
          </DialogHeader>
          {selectedInstitution && (
            <Tabs defaultValue="overview" className={clsx("w-full")}>
              <TabsList className={clsx("grid w-full grid-cols-3")}>
                <TabsTrigger value="overview" className={clsx("text-xs sm:text-sm")}>Overview</TabsTrigger>
                <TabsTrigger value="contact" className={clsx("text-xs sm:text-sm")}>Contact Info</TabsTrigger>
                <TabsTrigger value="analytics" className={clsx("text-xs sm:text-sm")}>Analytics</TabsTrigger>
              </TabsList>

              <AnimatePresence>
                <TabsContent value="overview">
                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                      <div className={clsx("space-y-4 sm:space-y-6")}>
                        <div className={clsx("flex items-center space-x-3 sm:space-x-4")}>
                          <div className={clsx("w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center")}>
                            <Building2 className={clsx("w-6 sm:w-8 h-6 sm:h-8 text-white")} />
                          </div>
                          <div>
                            <h3 className={clsx("text-base sm:text-xl font-semibold")}>{selectedInstitution.name}</h3>
                            <p className={clsx("text-xs sm:text-sm")}>{selectedInstitution.type} • {selectedInstitution.category}</p>
                            <Badge
                              variant={selectedInstitution.status === 'Active' ? 'default' : 'secondary'}
                              className={clsx("text-xs")}
                            >
                              {selectedInstitution.status}
                            </Badge>
                          </div>
                        </div>
                        <div className={clsx("grid grid-cols-2 gap-3 sm:gap-4")}>
                          <div className={clsx("p-3 sm:p-4 bg-blue-50 rounded-lg")}>
                            <div className={clsx("flex items-center space-x-2")}>
                              <GraduationCap className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-blue-600")} />
                              <span className={clsx("text-xs sm:text-sm font-medium")}>Students</span>
                            </div>
                            <p className={clsx("text-lg sm:text-2xl font-bold text-blue-600")}>{selectedInstitution.students}</p>
                          </div>
                          <div className={clsx("p-3 sm:p-4 bg-green-50 rounded-lg")}>
                            <div className={clsx("flex items-center space-x-2")}>
                              <Users className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-green-600")} />
                              <span className={clsx("text-xs sm:text-sm font-medium")}>Teachers</span>
                            </div>
                            <p className={clsx("text-lg sm:text-2xl font-bold text-green-600")}>{selectedInstitution.teachers}</p>
                          </div>
                        </div>
                        <div className={clsx("space-y-2")}>
                          <h4 className={clsx("font-semibold text-sm sm:text-base")}>Institution Details</h4>
                          <div className={clsx("space-y-2 text-xs sm:text-sm")}>
                            <div className={clsx("flex justify-between")}>
                              <span className={clsx("text-gray-500")}>Established:</span>
                              <span>{selectedInstitution.established}</span>
                            </div>
                            <div className={clsx("flex justify-between")}>
                              <span className={clsx("text-gray-500")}>Last Activity:</span>
                              <span>{new Date(selectedInstitution.lastActivity).toLocaleDateString()}</span>
                            </div>
                            <div className={clsx("flex justify-between")}>
                              <span className={clsx("text-gray-500")}>Monthly Revenue:</span>
                              <span className={clsx("font-medium")}>${selectedInstitution.revenue.toLocaleString()}</span>
                            </div>
                            <div className={clsx("flex justify-between")}>
                              <span className={clsx("text-gray-500")}>Growth Rate:</span>
                              <span className={clsx(selectedInstitution.growth > 0 ? 'text-green-600' : 'text-red-600')}>
                                {selectedInstitution.growth > 0 ? '+' : ''}{selectedInstitution.growth}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={clsx("space-y-4 sm:space-y-6")}>
                        <div className={clsx("space-y-2")}>
                          <h4 className={clsx("font-semibold text-sm sm:text-base")}>Admin Information</h4>
                          <div className={clsx("p-3 sm:p-4 border rounded-lg")}>
                            <div className={clsx("flex items-center space-x-3")}>
                              <div className={clsx("w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center")}>
                                <Users className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-white")} />
                              </div>
                              <div>
                                <p className={clsx("font-medium text-xs sm:text-sm")}>{selectedInstitution.admin.name}</p>
                                <p className={clsx("text-xs text-gray-500")}>{selectedInstitution.admin.email}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={clsx("space-y-2")}>
                          <h4 className={clsx("font-semibold text-sm sm:text-base")}>Performance Rating</h4>
                          <div className={clsx("flex items-center space-x-2")}>
                            <div className={clsx("flex-1")}>
                              <Progress value={selectedInstitution.rating * 20} className={clsx("h-1 sm:h-2")} />
                            </div>
                            <span className={clsx("text-xs sm:text-sm font-medium")}>{selectedInstitution.rating}/5.0</span>
                          </div>
                        </div>
                        <div className={clsx("space-y-2")}>
                          <h4 className={clsx("font-semibold text-sm sm:text-base")}>Quick Stats</h4>
                          <div className={clsx("grid grid-cols-2 gap-2 text-xs sm:text-sm")}>
                            <div className={clsx("flex justify-between")}>
                              <span className={clsx("text-gray-500")}>Student-Teacher Ratio:</span>
                              <span>{Math.round(selectedInstitution.students / (selectedInstitution.teachers || 1))}:1</span>
                            </div>
                            <div className={clsx("flex justify-between")}>
                              <span className={clsx("text-gray-500")}>Revenue per Student:</span>
                              <span>${Math.round(selectedInstitution.revenue / (selectedInstitution.students || 1))}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="contact">
                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                      <div className={clsx("space-y-3 sm:space-y-4")}>
                        <h4 className={clsx("font-semibold text-sm sm:text-base")}>Contact Information</h4>
                        <div className={clsx("space-y-3 sm:space-y-4")}>
                          <div className={clsx("flex items-center space-x-3")}>
                            <MapPin className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-gray-400")} />
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Address</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.address}</p>
                            </div>
                          </div>
                          <div className={clsx("flex items-center space-x-3")}>
                            <Phone className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-gray-400")} />
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Phone</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.phone}</p>
                            </div>
                          </div>
                          <div className={clsx("flex items-center space-x-3")}>
                            <Mail className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-gray-400")} />
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Email</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.email}</p>
                            </div>
                          </div>
                          <div className={clsx("flex items-center space-x-3")}>
                            <Globe className={clsx("w-4 sm:w-5 h-4 sm:h-5 text-gray-400")} />
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Website</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.website}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={clsx("space-y-3 sm:space-y-4")}>
                        <h4 className={clsx("font-semibold text-sm sm:text-base")}>Administrative Contact</h4>
                        <div className={clsx("p-3 sm:p-4 border rounded-lg")}>
                          <div className={clsx("space-y-3 sm:space-y-4")}>
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Administrator</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.admin.name}</p>
                            </div>
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Email</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.admin.email}</p>
                            </div>
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Phone</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.admin.phone || 'N/A'}</p>
                            </div>
                            <div>
                              <p className={clsx("text-xs sm:text-sm font-medium")}>Role</p>
                              <p className={clsx("text-xs sm:text-sm text-gray-600")}>{selectedInstitution.admin.role}</p>
                            </div>
                            <div className={clsx("flex space-x-2 mt-3 sm:mt-4")}>
                              <Button size="sm" variant="outline" onClick={handleSendMessage} className={clsx("text-xs sm:text-sm px-2 sm:px-3")}>
                                <Mail className={clsx("w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2")} />
                                Send Message
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCall} className={clsx("text-xs sm:text-sm px-2 sm:px-3")}>
                                <Phone className={clsx("w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2")} />
                                Call
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="analytics">
                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6")}>
                      <Card>
                        <CardHeader>
                          <CardTitle className={clsx("text-base sm:text-lg")}>Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={clsx("space-y-3 sm:space-y-4")}>
                            <div>
                              <div className={clsx("flex justify-between text-xs sm:text-sm mb-1")}>
                                <span>Student Satisfaction</span>
                                <span>{selectedInstitution.rating}/5.0</span>
                              </div>
                              <Progress value={selectedInstitution.rating * 20} className={clsx("h-1 sm:h-2")} />
                            </div>
                            <div>
                              <div className={clsx("flex justify-between text-xs sm:text-sm mb-1")}>
                                <span>Growth Rate</span>
                                <span>{selectedInstitution.growth}%</span>
                              </div>
                              <Progress value={Math.abs(selectedInstitution.growth) * 5} className={clsx("h-1 sm:h-2")} />
                            </div>
                            <div>
                              <div className={clsx("flex justify-between text-xs sm:text-sm mb-1")}>
                                <span>Capacity Utilization</span>
                                <span>85%</span>
                              </div>
                              <Progress value={85} className={clsx("h-1 sm:h-2")} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className={clsx("text-base sm:text-lg")}>Financial Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={clsx("space-y-3 sm:space-y-4")}>
                            <div className={clsx("flex justify-between text-xs sm:text-sm")}>
                              <span className={clsx("text-gray-500")}>Monthly Revenue</span>
                              <span className={clsx("font-medium")}>${selectedInstitution.revenue.toLocaleString()}</span>
                            </div>
                            <div className={clsx("flex justify-between text-xs sm:text-sm")}>
                              <span className={clsx("text-gray-500")}>Revenue per Student</span>
                              <span className={clsx("font-medium")}>
                                ${Math.round(selectedInstitution.revenue / (selectedInstitution.students || 1))}
                              </span>
                            </div>
                            <div className={clsx("flex justify-between text-xs sm:text-sm")}>
                              <span className={clsx("text-gray-500")}>Growth Rate</span>
                              <span className={clsx(selectedInstitution.growth > 0 ? 'text-green-600' : 'text-red-600')}>
                                {selectedInstitution.growth > 0 ? '+' : ''}{selectedInstitution.growth}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          )}
          <DialogFooter className={clsx("mt-4 sm:mt-6")}>
            <Button variant="outline" onClick={() => setSelectedInstitution(null)} className={clsx("text-xs sm:text-sm px-3 sm:px-4")}>
              Close
            </Button>
            <Button onClick={() => {
              setSelectedInstitution(null);
              handleEditInstitution(selectedInstitution);
            }} className={clsx("text-xs sm:text-sm px-3 sm:px-4")}>
              <Edit className={clsx("w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2")} />
              Edit Institution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}