'use client'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Download,
  Shield,
  Users,
  UserCheck,
  Clock,
  Mail,
  Phone,
  Building2,
  Calendar,
  Send,
  MoreHorizontal,
  RefreshCw,
  Settings,
  CheckCircle,
  Activity,
  AlertTriangle,
  ArrowUpDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
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

export default function AdminsPage() {
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRole, setFilterRole] = useState("all")
  const [filterInstitution, setFilterInstitution] = useState("all")
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false)
  const [isActivityLogDialogOpen, setIsActivityLogDialogOpen] = useState(false)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)
  const [selectedAdminForAction, setSelectedAdminForAction] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "",
    institutionId: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [institutionsResponse, adminsResponse] = await Promise.all([
          axios.get('/api/institutions'),
          axios.get('/api/admins', {
            params: { search: searchTerm, status: filterStatus }
          })
        ])

        if (institutionsResponse.data.success) {
          setInstitutions(institutionsResponse.data.data)
        } else {
          setError(institutionsResponse.data.error)
        }

        if (adminsResponse.data.success) {
          setAdmins(adminsResponse.data.data)
        } else {
          setError(adminsResponse.data.error)
        }
      } catch (error) {
        setError(error.response?.data?.error || error.message)
        toast.error(error.response?.data?.error || error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchTerm, filterStatus])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const sortedAdmins = [...admins].sort((a, b) => {
    if (sortConfig.key === "name" || sortConfig.key === "email" || sortConfig.key === "institution" || sortConfig.key === "status" || sortConfig.key === "role") {
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
    const matchesRole = filterRole === "all" || admin.role === filterRole
    const matchesInstitution = filterInstitution === "all" || admin.institutionType === filterInstitution
    return matchesSearch && matchesStatus && matchesRole && matchesInstitution
  })

  const activeAdmins = admins.filter((admin) => admin.status === "Active").length
  const pendingAdmins = admins.filter((admin) => admin.status === "Pending").length
  const inactiveAdmins = admins.filter((admin) => admin.status === "Inactive").length
  const totalLogins = admins.reduce((sum, admin) => sum + (admin.loginCount || 0), 0)

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getActivityStatus = (lastLogin) => {
    if (!lastLogin || lastLogin === "Never") return { color: "text-gray-400", icon: Clock, text: "Never" }
    const lastLoginDate = new Date(lastLogin)
    const now = new Date()
    const diffHours = (now - lastLoginDate) / (1000 * 60 * 60)
    if (diffHours < 1) return { color: "text-green-600", icon: CheckCircle, text: "Online" }
    if (diffHours < 24) return { color: "text-yellow-600", icon: Activity, text: `${Math.round(diffHours)} hours ago` }
    return { color: "text-yellow-600", icon: Activity, text: `${Math.round(diffHours / 24)} days ago` }
  }

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin)
    setEditFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone || "",
      role: admin.role,
      department: admin.department || "",
      status: admin.status,
      institutionId: admin.institutionId?._id || ""
    })
    setIsEditDialogOpen(true)
  }

  const handleResetPassword = (admin) => {
    setSelectedAdminForAction(admin)
    setIsResetPasswordDialogOpen(true)
  }

  const handleManagePermissions = (admin) => {
    setSelectedAdminForAction(admin)
    setSelectedPermissions(admin.permissions || [])
    setIsPermissionsDialogOpen(true)
  }

  const handleViewActivityLog = (admin) => {
    setSelectedAdminForAction(admin)
    setIsActivityLogDialogOpen(true)
  }

  const handleDeactivateAdmin = (admin) => {
    setSelectedAdminForAction(admin)
    setIsDeactivateDialogOpen(true)
  }

  const handleResendCredentials = async (admin) => {
    try {
      setIsLoading(true)
      const newPassword = Math.random().toString(36).slice(-12)
      await axios.put('/api/admins', {
        id: admin._id,
        sendCredentials: true,
        password: newPassword
      })
      toast.success(`Credentials resent to ${admin.email}`)
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setSearchTerm("")
    setFilterStatus("all")
    setFilterRole("all")
    setFilterInstitution("all")
    toast.info("Admin list refreshed")
  }

  const handleExport = () => {
    toast.success("Admin data exported successfully")
  }

  const confirmResetPassword = async () => {
    try {
      setIsLoading(true)
      const newPassword = Math.random().toString(36).slice(-12)
      await axios.put('/api/admins', {
        id: selectedAdminForAction._id,
        sendCredentials: true,
        password: newPassword
      })
      toast.success(`Password reset email sent to ${selectedAdminForAction.email}`)
      setIsResetPasswordDialogOpen(false)
      setSelectedAdminForAction(null)
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDeactivateAdmin = async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`/api/admins?id=${selectedAdminForAction._id}`)
      if (response.data.success) {
        setAdmins(admins.map(admin => admin._id === selectedAdminForAction._id ? response.data.data : admin))
        toast.success(`${selectedAdminForAction.name} has been deactivated`)
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    } finally {
      setIsDeactivateDialogOpen(false)
      setSelectedAdminForAction(null)
      setIsLoading(false)
    }
  }

  const saveAdminChanges = async () => {
    try {
      setIsLoading(true)
      const response = await axios.put('/api/admins', {
        id: editingAdmin._id,
        ...editFormData
      })
      if (response.data.success) {
        setAdmins(admins.map(admin => admin._id === editingAdmin._id ? response.data.data : admin))
        toast.success(`${editingAdmin.name} updated successfully`)
        setIsEditDialogOpen(false)
        setEditingAdmin(null)
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const savePermissionChanges = async () => {
    try {
      setIsLoading(true)
      const response = await axios.put('/api/admins', {
        id: selectedAdminForAction._id,
        permissions: selectedPermissions
      })
      if (response.data.success) {
        setAdmins(admins.map(admin => admin._id === selectedAdminForAction._id ? response.data.data : admin))
        toast.success(`Permissions updated for ${selectedAdminForAction.name}`)
        setIsPermissionsDialogOpen(false)
        setSelectedAdminForAction(null)
        setSelectedPermissions([])
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePermissionChange = (permission, checked) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission])
    } else {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission))
    }
  }

  const cardVariants = {
    hover: { scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
  }

  return (
    <TooltipProvider>
      <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 space-y-6 dark:bg-gray-900 min-h-screen">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {isLoading && <div className="text-blue-500 text-sm">Loading...</div>}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Users</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Manage all admin users across institutions</p>
          </motion.div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-3 sm:px-4"
            >
              <RefreshCw className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-3 sm:px-4"
            >
              <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
              Export
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { title: "Total Admins", value: admins.length, icon: Users, progress: 75, color: "text-blue-600" },
            { title: "Active Admins", value: activeAdmins, icon: UserCheck, progress: admins.length ? (activeAdmins / admins.length) * 100 : 0, color: "text-green-600" },
            { title: "Pending Admins", value: pendingAdmins, icon: Clock, progress: admins.length ? (pendingAdmins / admins.length) * 100 : 0, color: "text-yellow-600" },
            { title: "Total Logins", value: totalLogins, icon: Activity, progress: 85, color: "text-purple-600" },
          ].map((stat, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover">
              <Card className="min-w-[200px] bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-2xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.title === "Total Logins" ? "All time sessions" : stat.title === "Pending Admins" ? "Awaiting activation" : stat.title === "Active Admins" ? `${Math.round(admins.length ? (activeAdmins / admins.length) * 100 : 0)}% of total` : "Across all institutions"}
                      </p>
                    </div>
                    <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                  <Progress value={stat.progress} className="mt-2 h-1 sm:h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-2xl overflow-x-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Admin Users</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Complete list of admin users across all institutions</CardDescription>
              </div>
              <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs sm:text-sm">{filteredAdmins.length} results</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center mb-4 sm:mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 sm:w-4 h-3 sm:h-4" />
                <Input
                  placeholder="Search admins, emails, institutions..."
                  className="pl-8 sm:pl-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-28 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-36 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Institution Admin</SelectItem>
                  <SelectItem value="sub-admin">Sub Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterInstitution} onValueChange={setFilterInstitution}>
                <SelectTrigger className="w-full sm:w-28 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="School">Schools</SelectItem>
                  <SelectItem value="College">Colleges</SelectItem>
                  <SelectItem value="University">Universities</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-3 sm:px-4"
              >
                <Filter className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                More Filters
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table className={'overflow-x-auto'}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">
                      <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center space-x-1">
                        Admin
                        <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-xs sm:text-sm">
                      <Button variant="ghost" onClick={() => handleSort("institution")} className="flex items-center space-x-1">
                        Institution
                        <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                      <Button variant="ghost" onClick={() => handleSort("role")} className="flex items-center space-x-1">
                        Role & Department
                        <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell text-xs sm:text-sm">Contact</TableHead>
                    <TableHead className="hidden lg:table-cell text-xs sm:text-sm">Activity</TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      <Button variant="ghost" onClick={() => handleSort("status")} className="flex items-center space-x-1">
                        Status
                        <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => {
                    const activityStatus = getActivityStatus(admin.lastLogin)
                    const ActivityIcon = activityStatus.icon

                    return (
                      <motion.tr 
                        key={admin._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">{admin.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-300">{admin.loginCount} total logins</p>
                              <div className="sm:hidden">
                                <p className="text-xs text-gray-600 dark:text-gray-300">{admin.institution || 'Unknown'}</p>
                                <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs mt-1">
                                  {admin.institutionType || 'Unknown'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">{admin.institution || 'Unknown'}</p>
                              <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                                {admin.institutionType || 'Unknown'}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs mb-1">
                              {admin.role}
                            </Badge>
                            <p className="text-xs text-gray-600 dark:text-gray-300">{admin.department || 'N/A'}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-xs">{admin.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-xs">{admin.phone || 'N/A'}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <ActivityIcon className={`w-3 h-3 ${activityStatus.color}`} />
                              <span className={`text-xs ${activityStatus.color}`}>{activityStatus.text}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(admin.status)} text-xs`}>{admin.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setSelectedAdmin(admin)}
                                  className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 sm:p-2"
                                >
                                  <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl">
                                <DialogHeader>
                                  <DialogTitle className="text-lg sm:text-xl">Admin Details</DialogTitle>
                                  <DialogDescription className="text-xs sm:text-sm">Complete information about {selectedAdmin?.name}</DialogDescription>
                                </DialogHeader>
                                {selectedAdmin && (
                                  <motion.div 
                                    className="space-y-4 sm:space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                      <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center space-x-3 sm:space-x-4">
                                          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                            <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                                          </div>
                                          <div>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{selectedAdmin.name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{selectedAdmin.role}</p>
                                            <Badge className={`${getStatusColor(selectedAdmin.status)} text-xs`}>
                                              {selectedAdmin.status}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Contact Information</h4>
                                          <div className="flex items-center space-x-2">
                                            <Mail className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                                            <p className="text-xs sm:text-sm">{selectedAdmin.email}</p>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Phone className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                                            <p className="text-xs sm:text-sm">{selectedAdmin.phone || 'N/A'}</p>
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Activity Statistics</h4>
                                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                              <p className="text-xs sm:text-sm font-medium">Total Logins</p>
                                              <p className="text-base sm:text-xl font-bold text-blue-600">{selectedAdmin.loginCount}</p>
                                            </div>
                                            <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                              <p className="text-xs sm:text-sm font-medium">Last Activity</p>
                                              <p className="text-xs sm:text-sm font-medium text-green-600">{getActivityStatus(selectedAdmin.lastLogin).text}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-3 sm:space-y-4">
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Institution Details</h4>
                                          <div className="flex items-center space-x-2">
                                            <Building2 className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                                            <p className="text-xs sm:text-sm">{selectedAdmin.institution || 'Unknown'}</p>
                                          </div>
                                          <p className="text-xs sm:text-sm">
                                            <span className="font-medium">Type:</span> {selectedAdmin.institutionType || 'Unknown'}
                                          </p>
                                          <p className="text-xs sm:text-sm">
                                            <span className="font-medium">Department:</span> {selectedAdmin.department || 'N/A'}
                                          </p>
                                        </div>
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Permissions & Access</h4>
                                          <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {selectedAdmin.permissions.map((permission, index) => (
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
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Account Information</h4>
                                          <p className="text-xs sm:text-sm">
                                            <span className="font-medium">Last Login:</span> {selectedAdmin.lastLogin ? new Date(selectedAdmin.lastLogin).toLocaleString() : 'Never'}
                                          </p>
                                          <p className="text-xs sm:text-sm">
                                            <span className="font-medium">Account Created:</span> {new Date(selectedAdmin.createdAt).toLocaleString()}
                                          </p>
                                        </div>
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Quick Actions</h4>
                                          <div className="flex flex-wrap gap-2">
                                            <Button 
                                              size="sm" 
                                              variant="outline"
                                              onClick={() => handleResetPassword(selectedAdmin)}
                                              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
                                            >
                                              <Send className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                                              Reset Password
                                            </Button>
                                            <Button 
                                              size="sm" 
                                              variant="outline"
                                              onClick={() => handleManagePermissions(selectedAdmin)}
                                              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
                                            >
                                              <Settings className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                                              Manage Permissions
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleResendCredentials(selectedAdmin)}
                                    className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
                                  >
                                    <Send className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                                    Resend Credentials
                                  </Button>
                                  <Button 
                                    onClick={() => handleEditAdmin(selectedAdmin)}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm px-2 sm:px-3"
                                  >
                                    <Edit className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                                    Edit Admin
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 sm:p-2"
                                >
                                  <MoreHorizontal className="w-3 sm:w-4 h-3 sm:h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditAdmin(admin)}>
                                  <Edit className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                                  Edit Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResetPassword(admin)}>
                                  <Send className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleManagePermissions(admin)}>
                                  <Settings className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                                  Manage Permissions
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleViewActivityLog(admin)}>
                                  <Activity className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                                  View Activity Log
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600" 
                                  onClick={() => handleDeactivateAdmin(admin)}
                                >
                                  <Trash2 className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                                  Deactivate Admin
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredAdmins.length === 0 && (
              <motion.div 
                className="text-center py-6 sm:py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No admins found</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-xl bg-white dark:bg-gray-800 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Edit Admin User</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">Update admin user information and settings</DialogDescription>
            </DialogHeader>
            {editingAdmin && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName" className="font-semibold text-xs sm:text-sm">Full Name</Label>
                    <Input 
                      id="editName" 
                      value={editFormData.name} 
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEmail" className="font-semibold text-xs sm:text-sm">Email</Label>
                    <Input 
                      id="editEmail" 
                      type="email" 
                      value={editFormData.email} 
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editPhone" className="font-semibold text-xs sm:text-sm">Phone</Label>
                    <Input 
                      id="editPhone" 
                      value={editFormData.phone} 
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editRole" className="font-semibold text-xs sm:text-sm">Role</Label>
                    <Select value={editFormData.role} onValueChange={(value) => setEditFormData({ ...editFormData, role: value })}>
                      <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Institution Admin</SelectItem>
                        <SelectItem value="sub-admin">Sub Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="coordinator">Coordinator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editDepartment" className="font-semibold text-xs sm:text-sm">Department</Label>
                    <Input 
                      id="editDepartment" 
                      value={editFormData.department} 
                      onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editInstitution" className="font-semibold text-xs sm:text-sm">Institution</Label>
                    <Select value={editFormData.institutionId} onValueChange={(value) => setEditFormData({ ...editFormData, institutionId: value })}>
                      <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg">
                        <SelectValue placeholder="Select institution" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem key={institution._id} value={institution._id}>
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-3 sm:w-4 h-3 sm:h-4 text-blue-500" />
                              <div>
                                <span className="font-medium text-xs sm:text-sm">{institution.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({institution.type})</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editStatus" className="font-semibold text-xs sm:text-sm">Status</Label>
                    <Select value={editFormData.status} onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}>
                      <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
              >
                Cancel
              </Button>
              <Button 
                onClick={saveAdminChanges}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm px-2 sm:px-3"
                disabled={isLoading}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md bg-white dark:bg-gray-800 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Reset Password</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">Send a password reset email to {selectedAdminForAction?.name}?</DialogDescription>
            </DialogHeader>
            <div className="py-3 sm:py-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                A password reset link will be sent to <strong>{selectedAdminForAction?.email}</strong>. The user will be
                required to create a new password upon their next login.
              </p>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsResetPasswordDialogOpen(false)}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmResetPassword}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm px-2 sm:px-3"
                disabled={isLoading}
              >
                Send Reset Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-xl bg-white dark:bg-gray-800 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Manage Permissions</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">Update permissions for {selectedAdminForAction?.name}</DialogDescription>
            </DialogHeader>
            {selectedAdminForAction && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {["students", "teachers", "attendance", "grades", "fees", "reports", "settings", "analytics"].map(
                    (permission) => (
                      <motion.div
                        key={permission}
                        className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <input
                          type="checkbox"
                          id={permission}
                          checked={selectedPermissions.includes(permission)}
                          onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                          className="rounded"
                        />
                        <UiTooltip>
                          <TooltipTrigger asChild>
                            <Label htmlFor={permission} className="font-medium cursor-pointer text-xs sm:text-sm text-gray-900 dark:text-white">
                              {permission.charAt(0).toUpperCase() + permission.slice(1)}
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Access to {permission.toLowerCase()} management</p>
                          </TooltipContent>
                        </UiTooltip>
                      </motion.div>
                    ),
                  )}
                </div>
                {selectedPermissions.length > 0 && (
                  <motion.div 
                    className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-medium text-xs sm:text-sm text-green-900 dark:text-green-100 mb-2">
                      Selected Permissions ({selectedPermissions.length})
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {selectedPermissions.map((permission, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                          {permission.charAt(0).toUpperCase() + permission.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsPermissionsDialogOpen(false)}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
              >
                Cancel
              </Button>
              <Button 
                onClick={savePermissionChanges}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm px-2 sm:px-3"
                disabled={isLoading}
              >
                Save Permissions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isActivityLogDialogOpen} onOpenChange={setIsActivityLogDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Activity Log</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">Recent activity for {selectedAdminForAction?.name}</DialogDescription>
            </DialogHeader>
            <motion.div 
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3 sm:space-y-4">
                {[
                  { time: "2025-08-07 10:30", action: "Logged in", details: "Successful login from Chrome" },
                  { time: "2025-08-07 09:45", action: "Updated student record", details: "Modified Emma Wilson's information" },
                  { time: "2025-08-07 09:20", action: "Generated report", details: "Attendance report for Grade 10" },
                  { time: "2025-08-06 16:30", action: "Logged out", details: "Session ended normally" },
                  { time: "2025-08-06 14:15", action: "Created new user", details: "Added teacher: John Doe" },
                ].map((activity, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Activity className="w-3 sm:w-4 h-3 sm:h-4 mt-1 text-blue-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">{activity.action}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{activity.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {selectedAdminForAction && (
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-gray-900 dark:text-white">Login Activity Trend</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Monthly login trends for {selectedAdminForAction.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200} className="min-h-[180px] sm:min-h-[200px]">
                      <LineChart data={selectedAdminForAction.loginActivity || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="logins" stroke="#3b82f6" name="Logins" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </motion.div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsActivityLogDialogOpen(false)}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md bg-white dark:bg-gray-800 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Deactivate Admin User</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">Are you sure you want to deactivate {selectedAdminForAction?.name}?</DialogDescription>
            </DialogHeader>
            <div className="py-3 sm:py-4">
              <div className="flex items-center space-x-2 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200">Warning</p>
                  <p className="text-xs sm:text-sm text-red-600 dark:text-red-300">
                    This action will immediately revoke all access permissions. The user will not be able to log in.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeactivateDialogOpen(false)}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeactivateAdmin}
                className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm px-2 sm:px-3"
                disabled={isLoading}
              >
                Deactivate User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}