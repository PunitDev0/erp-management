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
  Users, GraduationCap, Calendar, Edit, Eye, Trash2, Download, Upload, Settings, TrendingUp, ArrowUpDown
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
import axios from 'axios';

const InstitutionsPage = () => {
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    established: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    timezone: '',
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
  // console.log(formData);
  

  const handleAddInstitution = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/institutions', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (result.success) {
        setInstitutions([...institutions, result.data]);
        setIsAddDialogOpen(false);
        setFormData({
          name: '',
          type: '',
          category: '',
          established: '',
          description: '',
          address: '',
          phone: '',
          email: '',
          website: '',
          timezone: '',
          admin: {
            name: '',
            email: '',
            phone: '',
            role: 'admin'
          },
          sendCredentials: true
        });
        setCurrentStep(1);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateInstitution = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/institutions?id=${id}`);
      const result = response.data;
      if (result.success) {
        setInstitutions(institutions.map(inst =>
          inst._id === id ? { ...inst, status: 'Inactive' } : inst
        ));
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
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
    <div className="mx-auto space-y-10 min-h-screen mt-10">
      {error && <div className="text-red-500">{error}</div>}
      {isLoading && <div className="text-blue-500">Loading...</div>}

      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Institutions</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">Manage schools, colleges, and universities with ease</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Institution
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Institution</DialogTitle>
                <DialogDescription>Create a new educational institution in the system</DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-between mb-8">
                {['Basic Info', 'Contact', 'Admin Setup'].map((step, index) => (
                  <div key={index} className="flex items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep > index + 1
                        ? 'bg-blue-600 text-white'
                        : currentStep === index + 1
                          ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                          : 'bg-gray-200 text-gray-600'
                        }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div className="ml-3 text-sm font-medium">{step}</div>
                    {index < 2 && (
                      <div
                        className={`w-20 h-1 ml-4 ${currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'}`}
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
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Institution Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter institution name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type *</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                          <SelectTrigger>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          placeholder="e.g., Primary & Secondary"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="established">Established Year</Label>
                        <Input
                          id="established"
                          type="number"
                          placeholder="2024"
                          value={formData.established}
                          onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the institution"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@institution.edu"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="www.institution.edu"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                          <SelectTrigger>
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
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adminName">Admin Full Name *</Label>
                        <Input
                          id="adminName"
                          placeholder="John Smith"
                          value={formData.admin.name}
                          onChange={(e) => setFormData({ ...formData, admin: { ...formData.admin, name: e.target.value } })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Admin Email *</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          placeholder="admin@institution.edu"
                          value={formData.admin.email}
                          onChange={(e) => setFormData({ ...formData, admin: { ...formData.admin, email: e.target.value } })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adminPhone">Admin Phone</Label>
                        <Input
                          id="adminPhone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.admin.phone}
                          onChange={(e) => setFormData({ ...formData, admin: { ...formData.admin, phone: e.target.value } })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminRole">Admin Role</Label>
                        <Select value={formData.admin.role} onValueChange={(value) => setFormData({ ...formData, admin: { ...formData.admin, role: value } })}>
                          <SelectTrigger>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sendCredentials"
                        checked={formData.sendCredentials}
                        onCheckedChange={(checked) => setFormData({ ...formData, sendCredentials: !!checked })}
                      />
                      <Label htmlFor="sendCredentials">Send login credentials via email</Label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <DialogFooter className="mt-8">
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    {currentStep < 3 ? (
                      <Button onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleAddInstitution} disabled={isLoading}>
                        Create Institution
                      </Button>
                    )}
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
                <Progress value={stat.progress} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Institution Directory</CardTitle>
              <CardDescription>Search and manage all institutions</CardDescription>
            </div>
            {selectedInstitutions.length > 0 && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="secondary">
                  {selectedInstitutions.length} selected
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Bulk Actions
                </Button>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search institutions, admins, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
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
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <div className="space-y-4">
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedInstitutions.length === sortedInstitutions.length && sortedInstitutions.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-500">
                  Select all ({sortedInstitutions.length} institutions)
                </span>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <Button variant="ghost" size="sm" onClick={() => handleSort('name')}>
                  Name <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleSort('students')}>
                  Students <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {sortedInstitutions.map((institution) => (
              <motion.div
                key={institution._id}
                variants={cardVariants}
                whileHover="hover"
                className="p-5 bg-white dark:bg-gray-800 shadow-md rounded-lg border"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <Checkbox
                      checked={selectedInstitutions.includes(institution._id)}
                      onCheckedChange={() => handleSelectInstitution(institution._id)}
                    />
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{institution.name}</h3>
                        <Badge
                          variant={
                            institution.status === 'Active'
                              ? 'default'
                              : institution.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {institution.status}
                        </Badge>
                        {institution.growth > 0 && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <TrendingUp className="w-3 h-3 mr-1" />+{institution.growth}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                          <Building2 className="mr-1 h-3 w-3" />
                          {institution.type} • {institution.category}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {institution.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Est. {institution.established}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{institution.students}</span>
                          <span className="text-gray-500">Students</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{institution.teachers}</span>
                          <span className="text-gray-500">Teachers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Admin:</span>
                          <span className="font-medium">{institution.admin.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Revenue:</span>
                          <span className="font-medium">${(institution.revenue / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedInstitution(institution)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Institution
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeactivateInstitution(institution._id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Deactivate
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

      <Dialog open={!!selectedInstitution} onOpenChange={() => setSelectedInstitution(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-2xl">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span>{selectedInstitution?.name}</span>
            </DialogTitle>
            <DialogDescription>Complete institution details and analytics</DialogDescription>
          </DialogHeader>
          {selectedInstitution && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{selectedInstitution.name}</h3>
                            <p>{selectedInstitution.type} • {selectedInstitution.category}</p>
                            <Badge
                              variant={selectedInstitution.status === 'Active' ? 'default' : 'secondary'}
                            >
                              {selectedInstitution.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium">Students</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{selectedInstitution.students}</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Users className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium">Teachers</span>
                            </div>
                            <p className="text-2xl font-bold text-green-600">{selectedInstitution.teachers}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Institution Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Established:</span>
                              <span>{selectedInstitution.established}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Last Activity:</span>
                              <span>{new Date(selectedInstitution.lastActivity).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Monthly Revenue:</span>
                              <span className="font-medium">${selectedInstitution.revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Growth Rate:</span>
                              <span className={selectedInstitution.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                                {selectedInstitution.growth > 0 ? '+' : ''}{selectedInstitution.growth}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Admin Information</h4>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{selectedInstitution.admin.name}</p>
                                <p className="text-sm text-gray-500">{selectedInstitution.admin.email}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Performance Rating</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1">
                              <Progress value={selectedInstitution.rating * 20} className="h-2" />
                            </div>
                            <span className="text-sm font-medium">{selectedInstitution.rating}/5.0</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Quick Stats</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Student-Teacher Ratio:</span>
                              <span>{Math.round(selectedInstitution.students / (selectedInstitution.teachers || 1))}:1</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Revenue per Student:</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Contact Information</h4>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">Address</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">Website</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.website}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Administrative Contact</h4>
                        <div className="p-4 border rounded-lg">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium">Administrator</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.admin.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.admin.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.admin.phone || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Role</p>
                              <p className="text-sm text-gray-600">{selectedInstitution.admin.role}</p>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button size="sm" variant="outline">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Student Satisfaction</span>
                                <span>{selectedInstitution.rating}/5.0</span>
                              </div>
                              <Progress value={selectedInstitution.rating * 20} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Growth Rate</span>
                                <span>{selectedInstitution.growth}%</span>
                              </div>
                              <Progress value={Math.abs(selectedInstitution.growth) * 5} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Capacity Utilization</span>
                                <span>85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Financial Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Monthly Revenue</span>
                              <span className="font-medium">${selectedInstitution.revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Revenue per Student</span>
                              <span className="font-medium">
                                ${Math.round(selectedInstitution.revenue / (selectedInstitution.students || 1))}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Growth Rate</span>
                              <span className={selectedInstitution.growth > 0 ? 'text-green-600' : 'text-red-600'}>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedInstitution(null)}>
              Close
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Institution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstitutionsPage;