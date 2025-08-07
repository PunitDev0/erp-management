"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Users,
  GraduationCap,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Database,
  Shield,
  Server,
  BookOpen,
  Network,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts"

const monthlyGrowthData = [
  { month: "Jan", institutions: 12, admins: 15, students: 2400, teachers: 180, revenue: 45000 },
  { month: "Feb", institutions: 15, admins: 18, students: 2800, teachers: 200, revenue: 52000 },
  { month: "Mar", institutions: 18, admins: 22, students: 3200, teachers: 230, revenue: 58000 },
  { month: "Apr", institutions: 22, admins: 28, students: 3800, teachers: 260, revenue: 65000 },
  { month: "May", institutions: 25, admins: 32, students: 4200, teachers: 290, revenue: 72000 },
  { month: "Jun", institutions: 28, admins: 35, students: 4600, teachers: 320, revenue: 78000 },
]

const studentAttendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 89 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 93 },
  { month: "Jun", attendance: 90 },
]

const teacherAttendanceData = [
  { month: "Jan", attendance: 95 },
  { month: "Feb", attendance: 93 },
  { month: "Mar", attendance: 96 },
  { month: "Apr", attendance: 94 },
  { month: "May", attendance: 92 },
  { month: "Jun", attendance: 91 },
]

const institutionTypes = [
  { name: "Primary Schools", value: 12, color: "#3b82f6", percentage: 42.9 },
  { name: "Secondary Schools", value: 8, color: "#10b981", percentage: 28.6 },
  { name: "Colleges", value: 6, color: "#f59e0b", percentage: 21.4 },
  { name: "Universities", value: 2, color: "#ef4444", percentage: 7.1 },
]

const academicPerformance = [
  { name: "Math", value: 85, color: "#3b82f6" },
  { name: "Science", value: 78, color: "#10b981" },
  { name: "Literature", value: 72, color: "#f59e0b" },
  { name: "History", value: 65, color: "#ef4444" },
]

const recentActivities = [
  {
    id: 1,
    action: "New institution registered",
    institution: "Green Valley School",
    time: "2 hours ago",
    type: "success",
    details: "Primary school with 450 students and 30 teachers",
  },
  {
    id: 2,
    action: "Admin account created",
    institution: "Tech College",
    time: "4 hours ago",
    type: "info",
    details: "Full permissions for academic and financial modules",
  },
  {
    id: 3,
    action: "Course enrollment completed",
    institution: "City University",
    time: "5 hours ago",
    type: "success",
    details: "500 students enrolled in Computer Science program",
  },
  {
    id: 4,
    action: "System backup completed",
    institution: "System",
    time: "6 hours ago",
    type: "success",
    details: "All academic and administrative data backed up",
  },
  {
    id: 5,
    action: "License renewal required",
    institution: "Bright Future School",
    time: "1 day ago",
    type: "warning",
    details: "Expires in 15 days for student management module",
  },
]

export default function SuperAdminDashboard() {
  const [selectedMetric] = useState("institutions")

  return (
    <div className="max-w-screen mx-auto p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: "Total Institutions", value: 28, icon: Building2, growth: "+3 (12%)", progress: 85 },
              { title: "Active Admins", value: 35, icon: Users, growth: "+7 (25%)", progress: 92 },
              { title: "Total Students", value: "4,600", icon: GraduationCap, growth: "+400 (9.5%)", progress: 76 },
              { title: "Total Teachers", value: 320, icon: Users, growth: "+30 (10.3%)", progress: 88 },
              { title: "Course Enrollment", value: "12,500", icon: BookOpen, growth: "+1,200 (10.6%)", progress: 82 },
              { title: "System Uptime", value: "99.9%", icon: Activity, growth: "Excellent", progress: 99.9 },
            ].map((stat, index) => (
              <Card key={index} className="min-w-[250px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    {stat.growth.includes("Excellent") ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    )}
                    <span className="text-green-600">{stat.growth}</span>
                    <span>{stat.growth.includes("Excellent") ? "performance" : "from last month"}</span>
                  </div>
                  <Progress value={stat.progress} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Attendance Charts */}
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Attendance Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Average attendance rates for students and teachers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 sm:flex sm:space-y-0 sm:gap-4">
              <div className="w-full">
                <h3 className="text-sm sm:text-base font-medium mb-3">Student Attendance</h3>
                <ResponsiveContainer width="100%" height={200} className="min-h-[180px] sm:min-h-[200px]">
                  <BarChart data={studentAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full">
                <h3 className="text-sm sm:text-base font-medium mb-3">Teacher Attendance</h3>
                <ResponsiveContainer width="100%" height={200} className="min-h-[180px] sm:min-h-[200px]">
                  <BarChart data={teacherAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity and System Status */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Latest system and academic activities</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.institution}</p>
                        <p className="text-xs text-slate-400 hidden sm:block">{activity.details}</p>
                      </div>
                      <div className="flex-shrink-0 text-xs text-slate-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">System Status</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Current system health and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: Database, name: "Database", subtext: "Primary & Backup", status: "Healthy", color: "green" },
                    { icon: Server, name: "API Services", subtext: "LMS & Admin endpoints", status: "Online", color: "green" },
                    { icon: Clock, name: "Backup System", subtext: "Next: 2:00 AM", status: "Scheduled", color: "yellow" },
                    { icon: Shield, name: "Security", subtext: "SSL & Firewall", status: "Protected", color: "blue" },
                    { icon: AlertTriangle, name: "License Alerts", subtext: "Renewal required", status: "3 Pending", color: "red" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-900/20`}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className={`h-4 w-4 text-${item.color}-600`} />
                        <div>
                          <span className="text-sm font-medium">{item.name}</span>
                          <p className="text-xs text-slate-500">{item.subtext}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`bg-${item.color}-100 text-${item.color}-800 dark:bg-${item.color}-900 dark:text-${item.color}-300`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Common administrative and academic tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { icon: Building2, text: "Add Institution", gradient: "from-blue-600 to-blue-700" },
                  { icon: Users, text: "Create Admin", variant: "outline" },
                  { icon: BookOpen, text: "Manage Courses", variant: "outline" },
                  { icon: Activity, text: "System Logs", variant: "outline" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    className={`h-14 sm:h-16 flex-col space-y-1 ${
                      action.gradient
                        ? `bg-gradient-to-r ${action.gradient} hover:from-blue-700 hover:to-blue-800`
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
                    }`}
                  >
                    <action.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">{action.text}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Growth Trends</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly growth across key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200} className="min-h-[180px] sm:min-h-[200px]">
                <AreaChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="institutions"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="admins"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="teachers"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Institution Distribution</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Breakdown by institution type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {institutionTypes.map((type) => (
                  <div key={type.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-sm font-medium">{type.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{type.value}</span>
                      <Badge variant="secondary">{type.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={180} className="mt-3 min-h-[150px] sm:min-h-[180px]">
                <PieChart>
                  <Pie
                    data={institutionTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    labelLine={{ stroke: "#8884d8", strokeWidth: 1 }}
                  >
                    {institutionTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Academic Performance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Average student performance by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {academicPerformance.map((subject) => (
                  <div key={subject.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }} />
                      <span className="text-sm font-medium">{subject.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{subject.value}%</span>
                      <Badge variant="secondary">
                        {subject.value >= 80 ? "Excellent" : subject.value >= 70 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={180} className="mt-3 min-h-[150px] sm:min-h-[180px]">
                <PieChart>
                  <Pie
                    data={academicPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={{ stroke: "#8884d8", strokeWidth: 1 }}
                  >
                    {academicPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}