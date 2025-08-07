"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  UserPlus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Download,
  Shield,
  Building2,
  Mail,
  Phone,
  Calendar,
  Key,
  Send,
  Users,
  CheckCircle,
  Clock,
  Copy,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Tooltip as UiTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from 'axios'

const availablePermissions = [
  { id: "students", label: "Student Management", description: "Manage student records and profiles", category: "Core" },
  { id: "teachers", label: "Teacher Management", description: "Manage teacher records and assignments", category: "Core" },
  { id: "attendance", label: "Attendance Tracking", description: "Track and manage attendance records", category: "Core" },
  { id: "grades", label: "Grade Management", description: "Manage grades and academic records", category: "Academic" },
  { id: "fees", label: "Fee Management", description: "Handle fee collection and payments", category: "Financial" },
  { id: "library", label: "Library Management", description: "Manage library resources and books", category: "Resources" },
  { id: "notices", label: "Notice Management", description: "Create and manage notices", category: "Communication" },
  { id: "reports", label: "Reports & Analytics", description: "Access to reports and analytics", category: "Analytics" },
  { id: "settings", label: "System Settings", description: "Configure system settings", category: "Administration" },
]

export default function CreateAdminPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedInstitution, setSelectedInstitution] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [institutions, setInstitutions] = useState([])
  const [admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "admin",
    department: "",
    notes: "",
    sendCredentials: true,
  })

  // Fetch institutions and admins on mount and when search/filter changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [institutionsResponse, adminsResponse] = await Promise.all([
          axios.get('/api/institutions'),
          axios.get('/api/admins', {
            params: { search: searchTerm, status: filterStatus }
          })
        ]);

        if (institutionsResponse.data.success) {
          setInstitutions(institutionsResponse.data.data);
        } else {
          setError(institutionsResponse.data.error);
        }

        if (adminsResponse.data.success) {
          setAdmins(adminsResponse.data.data);
        } else {
          setError(adminsResponse.data.error);
        }
      } catch (error) {
        setError(error.response?.data?.error || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, filterStatus]);

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId])
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    }
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGeneratedPassword(password)
    return password
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const sortedAdmins = [...admins].sort((a, b) => {
    if (sortConfig.key === "name" || sortConfig.key === "email" || sortConfig.key === "institution" || sortConfig.key === "status") {
      const valueA = (a[sortConfig.key] || '').toLowerCase()
      const valueB = (b[sortConfig.key] || '').toLowerCase()
      return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else {
      return sortConfig.direction === "asc" ? (a[sortConfig.key] || 0) - (b[sortConfig.key] || 0) : (b[sortConfig.key] || 0) - (a[sortConfig.key] || 0)
    }
  })

  const filteredAdmins = sortedAdmins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.institution || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || admin.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const permissionsByCategory = availablePermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {},
  )

  const handleCreateAdmin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/admins', {
        ...formData,
        institutionId: selectedInstitution,
        permissions: selectedPermissions,
        password: generatedPassword
      });

      if (response.data.success) {
        setAdmins([...admins, response.data.data]);
        setCurrentStep(1);
        setSelectedInstitution("");
        setSelectedPermissions([]);
        setGeneratedPassword("");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "admin",
          department: "",
          notes: "",
          sendCredentials: true,
        });
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditAdmin = async (adminId, updatedData) => {
    try {
      setIsLoading(true);
      const response = await axios.put('/api/admins', {
        id: adminId,
        ...updatedData,
        institutionId: selectedInstitution || undefined,
        permissions: selectedPermissions,
        password: generatedPassword || undefined
      });

      if (response.data.success) {
        setAdmins(admins.map(admin => admin._id === adminId ? response.data.data : admin));
        setSelectedAdmin(null);
        setSelectedInstitution("");
        setSelectedPermissions([]);
        setGeneratedPassword("");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteAdmin = async (adminId) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/admins?id=${adminId}`);
      if (response.data.success) {
        setAdmins(admins.map(admin => admin._id === adminId ? response.data.data : admin));
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCredentials = async (admin) => {
    try {
      setIsLoading(true);
      const newPassword = generatePassword();
      const response = await axios.put('/api/admins', {
        id: admin._id,
        sendCredentials: true,
        password: newPassword
      });
      if (response.data.success) {
        setAdmins(admins.map(a => a._id === admin._id ? response.data.data : a));
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 3))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1))

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const cardVariants = {
    hover: { scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto space-y-10 dark:bg-gray-900 min-h-screen mt-10 p-4 sm:p-6">
        {error && <div className="text-red-500">{error}</div>}
        {isLoading && <div className="text-blue-500">Loading...</div>}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Management</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Create and manage admin users for institutions</p>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Admins
            </Button>
            <Button 
              variant="outline" 
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Bulk Import
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { title: "Total Admins", value: admins.length, icon: Users, progress: 75 },
            { title: "Active Admins", value: admins.filter((a) => a.status === "Active").length, icon: CheckCircle, progress: 85 },
            { title: "Pending Setup", value: admins.filter((a) => a.status === "Pending").length, icon: Clock, progress: 20 },
            { title: "This Month", value: admins.filter(a => new Date(a.createdAt).getMonth() === new Date().getMonth()).length, icon: UserPlus, progress: 60 },
          ].map((stat, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.title === "This Month" ? "New admins created" : "Across all institutions"}
                  </p>
                  <Progress value={stat.progress} className="mt-3 h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <UserPlus className="w-6 h-6 text-blue-600" />
              <span>Create New Admin</span>
            </CardTitle>
            <CardDescription>Add a new admin user with a streamlined setup process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-8">
              {["Basic Info", "Institution & Role", "Permissions"].map((step, index) => (
                <div key={index} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep > index + 1
                        ? "bg-blue-600 text-white"
                        : currentStep === index + 1
                          ? "bg-blue-500 text-white ring-2 ring-blue-300"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {index + 1}
                  </motion.div>
                  <div className="ml-3 text-sm font-medium">{step}</div>
                  {index < 2 && (
                    <div
                      className={`w-20 h-1 ml-4 ${
                        currentStep > index + 1 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                      }`}
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
                    <div>
                      <Label htmlFor="firstName" className="font-semibold">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="font-semibold">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="font-semibold">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.smith@institution.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="password" className="font-semibold">Password *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          value={generatedPassword}
                          onChange={(e) => setGeneratedPassword(e.target.value)}
                          className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generatePassword}
                          className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                        {generatedPassword && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generatedPassword)}
                            className={`relative bg-white dark:bg-gray-800 ${isCopied ? "bg-green-100 dark:bg-green-900/20" : ""}`}
                          >
                            <Copy className="w-4 h-4" />
                            {isCopied && (
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                Copied!
                              </span>
                            )}
                          </Button>
                        )}
                      </div>
                      {generatedPassword && (
                        <p className="text-xs text-gray-500 mt-1">
                          Password strength: <span className="text-green-600 font-medium">Strong</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="font-semibold">Confirm Password *</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Confirm password" 
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="font-semibold">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes about this admin user"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
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
                  <div>
                    <Label htmlFor="institution" className="font-semibold">Select Institution *</Label>
                    <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                      <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg">
                        <SelectValue placeholder="Choose an institution" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem key={institution._id} value={institution._id}>
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4 text-blue-500" />
                              <div>
                                <span className="font-medium">{institution.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({institution.type})</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedInstitution && (
                      <motion.div 
                        className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {(() => {
                          const institution = institutions.find((i) => i._id === selectedInstitution)
                          return institution ? (
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{institution.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{institution.location}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs">
                                <span>{institution.students} Students</span>
                                <Badge variant="outline" className="border-blue-500 text-blue-500">{institution.type}</Badge>
                                <Badge
                                  variant={institution.status === "Active" ? "default" : "secondary"}
                                  className={
                                    institution.status === "Active"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }
                                >
                                  {institution.status}
                                </Badge>
                              </div>
                            </div>
                          ) : null
                        })()}
                      </motion.div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="role" className="font-semibold">Admin Role *</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Institution Admin</SelectItem>
                          <SelectItem value="sub-admin">Sub Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="coordinator">Coordinator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department" className="font-semibold">Department (Optional)</Label>
                      <Input
                        id="department"
                        placeholder="e.g., Academic Affairs, Student Services"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <motion.div 
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Role Permissions Preview</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {formData.role === "admin" && "Full access to all institution features and settings"}
                      {formData.role === "sub-admin" && "Limited access to core features, no system settings"}
                      {formData.role === "manager" && "Access to specific departments and reporting features"}
                      {formData.role === "coordinator" && "Basic access to student and teacher management"}
                    </p>
                  </motion.div>
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
                  <div>
                    <Label className="font-semibold">System Permissions</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Select the modules and features this admin can access
                    </p>
                    <div className="space-y-6">
                      {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                        <motion.div 
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{category}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {permissions.map((permission) => (
                              <motion.div
                                key={permission.id}
                                className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Checkbox
                                  id={permission.id}
                                  checked={selectedPermissions.includes(permission.id)}
                                  onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                                />
                                <UiTooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex-1">
                                      <Label htmlFor={permission.id} className="font-medium cursor-pointer text-gray-900 dark:text-white">
                                        {permission.label}
                                      </Label>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">{permission.description}</p>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{permission.description}</p>
                                  </TooltipContent>
                                </UiTooltip>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="sendCredentials"
                        checked={formData.sendCredentials}
                        onCheckedChange={(checked) => setFormData({ ...formData, sendCredentials: !!checked })}
                      />
                      <Label htmlFor="sendCredentials" className="font-semibold">Send login credentials via email</Label>
                    </div>
                    {selectedPermissions.length > 0 && (
                      <motion.div 
                        className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                          Selected Permissions ({selectedPermissions.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPermissions.map((permissionId) => {
                            const permission = availablePermissions.find((p) => p.id === permissionId)
                            return permission ? (
                              <Badge key={permissionId} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                {permission.label}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
              >
                Previous
              </Button>
              <div className="flex space-x-2">
                {currentStep < 3 ? (
                  <Button 
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors rounded-lg"
                    disabled={!selectedInstitution && currentStep === 2}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleCreateAdmin}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors rounded-lg"
                    disabled={isLoading || !generatedPassword || selectedPermissions.length === 0 || !selectedInstitution}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Admin
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Existing Admins</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Manage all admin users in the system</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search admins..."
                  className="pl-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center space-x-1">
                      Admin
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("institution")} className="flex items-center space-x-1">
                      Institution
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("lastLogin")} className="flex items-center space-x-1">
                      Last Login
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("status")} className="flex items-center space-x-1">
                      Status
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <motion.tr 
                    key={admin._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{admin.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{admin.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{admin.institution || 'Unknown'}</p>
                        <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                          {admin.institutionType || 'Unknown'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{admin.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{admin.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 2).map((permission, index) => (
                          <UiTooltip key={index}>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                {permission}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{permission}</p>
                            </TooltipContent>
                          </UiTooltip>
                        ))}
                        {admin.permissions.length > 2 && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                            +{admin.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          admin.status === "Active"
                            ? "default"
                            : admin.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          admin.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : admin.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => {
                                setSelectedAdmin(admin);
                                setSelectedInstitution(admin.institutionId?._id || '');
                                setSelectedPermissions(admin.permissions || []);
                              }}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">Admin Details</DialogTitle>
                              <DialogDescription>Complete information about {selectedAdmin?.name}</DialogDescription>
                            </DialogHeader>
                            {selectedAdmin && (
                              <motion.div 
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedAdmin.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{selectedAdmin.role}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <h4 className="font-semibold text-gray-900 dark:text-white">Contact Information</h4>
                                      <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <p className="text-sm">{selectedAdmin.email}</p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <p className="text-sm">{selectedAdmin.phone || 'N/A'}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <h4 className="font-semibold text-gray-900 dark:text-white">Institution Details</h4>
                                      <p>
                                        <span className="font-medium">Institution:</span> {selectedAdmin.institution || 'Unknown'}
                                      </p>
                                      <p>
                                        <span className="font-medium">Type:</span> {selectedAdmin.institutionType || 'Unknown'}
                                      </p>
                                      <p>
                                        <span className="font-medium">Last Login:</span> {selectedAdmin.lastLogin ? new Date(selectedAdmin.lastLogin).toLocaleString() : 'Never'}
                                      </p>
                                      <p>
                                        <span className="font-medium">Created:</span> {new Date(selectedAdmin.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="space-y-2">
                                      <h4 className="font-semibold text-gray-900 dark:text-white">Permissions</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedAdmin.permissions.map((permission, index) => (
                                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                            {permission}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
                                  <CardHeader>
                                    <CardTitle className="text-lg text-gray-900 dark:text-white">Login Activity</CardTitle>
                                    <CardDescription>Monthly login trends for {selectedAdmin.name}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                      <LineChart data={selectedAdmin.loginActivity || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="logins" stroke="#3b82f6" name="Logins" />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            )}
                            <DialogFooter>
                              <Button 
                                variant="outline"
                                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => handleResendCredentials(selectedAdmin)}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Resend Credentials
                              </Button>
                              <Button 
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors"
                                onClick={() => handleEditAdmin(selectedAdmin._id, {
                                  ...formData,
                                  name: `${formData.firstName} ${formData.lastName}`
                                })}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Admin
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => {
                            setSelectedAdmin(admin);
                            setSelectedInstitution(admin.institutionId?._id || '');
                            setSelectedPermissions(admin.permissions || []);
                            setFormData({
                              firstName: admin.name.split(' ')[0] || '',
                              lastName: admin.name.split(' ').slice(1).join(' ') || '',
                              email: admin.email,
                              phone: admin.phone || '',
                              role: admin.role,
                              department: admin.department || '',
                              notes: admin.notes || '',
                              sendCredentials: formData.sendCredentials
                            });
                            setCurrentStep(1);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                          onClick={() => handleDeleteAdmin(admin._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}