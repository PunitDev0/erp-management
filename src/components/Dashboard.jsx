'use client';
import { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/Layout/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, DollarSign, Bell, BarChart, FileText, Network, Search, User,
    ArrowUp, ArrowDown, Calendar, BookOpen, Send, Package, Settings,
    User2,
    PackageSearch
} from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
    Button,
} from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout/Layout';
import { Input } from './ui/input';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
const ToolsQuickSetup = () => {
    const [isDark, setIsDark] = useState(false);
  
    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
  
    const dashboardData = {
      tools: {
        courses: 18,
        departments: 7,
        syllabusUpdated: true,
      },
    };
  
    const pieData = {
      labels: ["Courses", "Departments"],
      datasets: [
        {
          data: [dashboardData.tools.courses, dashboardData.tools.departments],
          backgroundColor: [
            "rgba(99, 102, 241, 0.8)",
            "rgba(124, 58, 237, 0.8)",
          ],
          borderColor: ["rgb(99, 102, 241)", "rgb(124, 58, 237)"],
          borderWidth: 2,
          hoverOffset: 20,
        },
      ],
    };
  
    const pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: isDark ? "#e5e7eb" : "#4b5563",
            font: {
              size: 14,
              weight: "600",
              family: "Inter, sans-serif",
            },
            padding: 20,
            boxWidth: 12,
          },
        },
        title: {
          display: true,
          text: "Courses & Departments",
          font: {
            size: 16,
            weight: "700",
            family: "Inter, sans-serif",
          },
          color: isDark ? "#f9fafb" : "#111827",
          padding: { top: 8, bottom: 12 },
        },
        tooltip: {
          backgroundColor: "rgba(31, 41, 55, 0.95)",
          titleFont: { size: 14, weight: "600" },
          bodyFont: { size: 12 },
          cornerRadius: 8,
          padding: 12,
        },
      },
      animation: {
        duration: 1000,
        easing: "easeOutCubic",
        animateRotate: true,
        animateScale: false,
      },
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
        className="w-full col-span-2"
      >
        <Card className="rounded-3xl shadow-lg border-none bg-white/90 dark:bg-slate-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Settings className="mr-2 h-5 w-5 text-indigo-600" />
              Tools / Quick Setup
            </CardTitle>
          </CardHeader>
  
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.tools.courses}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Departments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.tools.departments}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Syllabus Updated</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.tools.syllabusUpdated ? "Yes" : "No"}
                </p>
              </div>
            </div>
  
            <div className="h-[14rem] mt-2">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  

const SMSNotifications = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    // Fake data for dashboard
    const dashboardData = {
        sms: {
            lastSent: {
                title: "Exam Reminder",
                timestamp: "10:45 AM",
            },
            totalSentToday: 233,
        },
    };

    const smsChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "SMS Sent",
                data: [40, 45, 50, 48, 50],
                backgroundColor: "rgba(20, 184, 166, 0.8)",
                borderRadius: 6,
            },
        ],
    };

    const smsChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: isDark ? "#e2e8f0" : "#334155" },
            },
            y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { color: isDark ? "#e2e8f0" : "#334155" },
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            className="w-full"
        >
            <Card className="rounded-3xl shadow-lg border-none bg-white/90 dark:bg-slate-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                        <Send className="mr-2 h-5 w-5 text-teal-600" />
                        SMS Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Last Sent SMS</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {dashboardData.sms.lastSent.title} ({dashboardData.sms.lastSent.timestamp})
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages Today</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {dashboardData.sms.totalSentToday}
                            </p>
                        </div>
                        <div className="text-center">
                            <Button
                                className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all"
                                onClick={() => alert("Send announcement feature not implemented")}
                            >
                                Send Announcement
                            </Button>
                        </div>
                    </div>
                    <div className="h-[14rem]">
                        <Bar data={smsChartData} options={smsChartOptions} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const InventoryOverview = () => {
    const [isDark, setIsDark] = useState(false);
    const [searchCode, setSearchCode] = useState("");
  
    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
  
    const inventory = {
      availableItems: 275,
      categories: 10,
      products: 340,
      sold: 210,
      unsold: 130,
      lowStock: ["Chairs", "Markers"],
      latestPurchases: [
        { item: "Whiteboard Markers", category: "Stationery", date: "Jul 15" },
        { item: "Printer Ink", category: "Electronics", date: "Jul 12" },
      ],
      purchaseByCategory: {
        Stationery: 90,
        Electronics: 65,
        Furniture: 45,
        Misc: 30,
      },
    };
  
    const doughnutData = {
      labels: ["Sold", "Unsold"],
      datasets: [
        {
          data: [inventory.sold, inventory.unsold],
          backgroundColor: ["#10b981", "#f59e0b"],
          hoverOffset: 4,
        },
      ],
    };
  
    const barData = {
      labels: Object.keys(inventory.purchaseByCategory),
      datasets: [
        {
          label: "Purchases",
          data: Object.values(inventory.purchaseByCategory),
          backgroundColor: "#3b82f6",
          borderRadius: 6,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: isDark ? "#e2e8f0" : "#1e293b" } },
        y: { grid: { display: false }, ticks: { color: isDark ? "#e2e8f0" : "#1e293b" } },
      },
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
        className="w-full"
      >
        <Card className="rounded-3xl shadow-lg border-none bg-white/90 dark:bg-slate-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Package className="mr-2 h-5 w-5 text-yellow-600" />
              Inventory Overview
            </CardTitle>
          </CardHeader>
  
          <CardContent className="space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Available Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventory.availableItems}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventory.products}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventory.categories}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">{inventory.lowStock.join(", ")}</p>
              </div>
            </div>
  
            {/* Search & Button */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 w-full sm:w-1/2">
                <PackageSearch className="text-gray-500" />
                <Input
                  placeholder="Search stock by code..."
                  className="w-full bg-gray-100 dark:bg-slate-700 text-sm text-gray-900 dark:text-white"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                />
              </div>
              <Button
                className="bg-yellow-600 text-white hover:bg-yellow-700 rounded-xl"
                onClick={() => alert("View full stock page not implemented")}
              >
                View All Stock
              </Button>
            </div>
  
            {/* Latest Purchases */}
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Latest Purchases</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc ml-5 space-y-1">
                {inventory.latestPurchases.map((item, i) => (
                  <li key={i}>
                    {item.item} - <span className="text-gray-500">{item.category}</span> ({item.date})
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[12rem]">
                <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sold vs Unsold</p>
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "bottom" } },
                    cutout: "70%",
                  }}
                />
              </div>
              <div className="h-[12rem]">
                <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purchases by Category</p>
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  

export function PayrollOverview() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    // Sample Data Per Module
    const payrollModuleData = {
        "Search Salary": 150,
        "New Staff": 12,
        "Increments": 8,
        "Leaves Logged": 24,
        "Transactions": 76,
    };

    const labels = Object.keys(payrollModuleData);
    const values = Object.values(payrollModuleData);

    const gradientColors = [
        "rgba(59,130,246,0.8)",   // blue
        "rgba(16,185,129,0.8)",   // green
        "rgba(245,158,11,0.8)",   // amber
        "rgba(99,102,241,0.8)",   // indigo
        "rgba(239,68,68,0.8)",    // red
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "This Month",
                data: values,
                backgroundColor: gradientColors,
                borderRadius: 8,
                barThickness: 40,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: "easeOutBounce",
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                padding: 10,
                backgroundColor: isDark ? "#1e293b" : "#fff",
                titleColor: isDark ? "#fff" : "#0f172a",
                bodyColor: isDark ? "#cbd5e1" : "#1e293b",
                borderColor: "#3b82f6",
                borderWidth: 1,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDark ? "#e2e8f0" : "#334155",
                    font: { weight: "500" },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                    color: isDark ? "#e2e8f0" : "#334155",
                },
                grid: {
                    display: false, // ❌ Removes y-axis grid lines
                },
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
            <Card className="rounded-3xl shadow-lg border-none bg-white dark:bg-slate-800/60 backdrop-blur-md p-4">
                <CardHeader className="pb-2 flex items-center justify-between">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Settings className="h-5 w-5 text-blue-600" />
                        Payroll Module Activity Chart
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[18rem] sm:h-[22rem]">
                    <Bar data={data} options={options} />
                </CardContent>
            </Card>
        </motion.div>
    );
}

const AcademicSummary = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const dashboardData = {
        academic: {
            todayClasses: 4,
            assignmentsDue: 3,
            upcomingExams: ["Mid-term Exam - Sep 20"],
            scholarships: { awarded: 12 },
        },
    };

    const classData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Classes",
                data: [3, 4, 2, 5, dashboardData.academic.todayClasses],
                backgroundColor: "#6366f1",
                borderRadius: 6,
            },
        ],
    };

    const assignmentsData = {
        labels: ["Due", "Completed"],
        datasets: [
            {
                data: [
                    dashboardData.academic.assignmentsDue,
                    10 - dashboardData.academic.assignmentsDue,
                ],
                backgroundColor: ["#f97316", "#10b981"],
                borderWidth: 1,
            },
        ],
    };

    const scholarshipsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Scholarships",
                data: [2, 3, 4, 6, 8, dashboardData.academic.scholarships.awarded],
                fill: true,
                borderColor: "#8b5cf6",
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const commonGridOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            className="w-full"
        >
            <Card className="rounded-3xl shadow-lg border-none bg-white/90 dark:bg-slate-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-purple-600" />
                        Academic Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col space-y-8">

                    {/* Charts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Bar Chart */}
                        <div className="h-[12rem]">
                            <h3 className="text-sm text-center mb-2 font-semibold text-gray-700 dark:text-gray-300">
                                Classes This Week
                            </h3>
                            <Bar data={classData} options={commonGridOptions} />
                        </div>

                        {/* Doughnut Chart */}
                        <div className="h-[12rem] flex flex-col justify-center">
                            <h3 className="text-sm text-center mb-2 font-semibold text-gray-700 dark:text-gray-300">
                                Assignment Status
                            </h3>
                            <Doughnut
                                data={assignmentsData}
                                options={{
                                    responsive: true,
                                    cutout: "70%",
                                    plugins: { legend: { position: "bottom" } },
                                }}
                            />
                        </div>
                    </div>

                    {/* Line Chart */}
                    <div className="h-[14rem]">
                        <h3 className="text-sm text-center mb-2 font-semibold text-gray-700 dark:text-gray-300">
                            Scholarship Growth
                        </h3>
                        <Line data={scholarshipsData} options={commonGridOptions} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};



const AttendanceStats = ({ isMounted, attendanceData, timeRange, setTimeRange }) => {
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState('Users');
    const [showCustomRange, setShowCustomRange] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Handle custom date range submission
    const handleCustomRangeSubmit = () => {
        if (customStartDate && customEndDate) {
            setTimeRange({ type: 'custom', startDate: customStartDate, endDate: customEndDate });
            setShowCustomRange(false);
        }
    };

    // Compute attendance and absence
    const attendancePercentage = userType === 'Users'
        ? (timeRange.type === 'custom'
            ? (attendanceData.weekly.slice(0, 3).reduce((sum, val) => sum + val, 0) / 3).toFixed(1) // Mock for custom range
            : timeRange === '7 Days' ? attendanceData.weekly[2]
                : timeRange === '30 Days' ? 87
                    : 88)
        : (timeRange.type === 'custom'
            ? (attendanceData.weeklyStaff.slice(0, 3).reduce((sum, val) => sum + val, 0) / 3).toFixed(1) // Mock for custom range
            : timeRange === '7 Days' ? attendanceData.weeklyStaff[2]
                : timeRange === '30 Days' ? 85
                    : 86);

    const absencePercentage = 100 - attendancePercentage;

    // Calculate average attendance over the selected time range
    const averageAttendance = userType === 'Users'
        ? timeRange.type === 'custom'
            ? (attendanceData.weekly.slice(0, 3).reduce((sum, val) => sum + val, 0) / 3).toFixed(1) // Mock for custom range
            : timeRange === '7 Days'
                ? (attendanceData.weekly.reduce((sum, val) => sum + val, 0) / attendanceData.weekly.length).toFixed(1)
                : timeRange === '30 Days'
                    ? 87
                    : 88
        : timeRange.type === 'custom'
            ? (attendanceData.weeklyStaff.slice(0, 3).reduce((sum, val) => sum + val, 0) / 3).toFixed(1) // Mock for custom range
            : timeRange === '7 Days'
                ? (attendanceData.weeklyStaff.reduce((sum, val) => sum + val, 0) / attendanceData.weeklyStaff.length).toFixed(1)
                : timeRange === '30 Days'
                    ? 85
                    : 86;

    // Total users (mock values, replace with actual data if available in attendanceData)
    const totalUsers = userType === 'Users' ? (attendanceData.totalStudents || 100) : (attendanceData.totalStaff || 20);

    const chartData = {
        labels: ['Absent', 'Present'],
        datasets: [{
            data: [absencePercentage, attendancePercentage],
            backgroundColor: [
                'rgba(239, 68, 68, 0.85)', // red for absent
                'rgba(34, 197, 94, 0.8)', // green for present
            ],
            borderColor: ['rgba(239, 68, 68, 0.2)', 'rgba(34, 197, 94, 0.2)'],
            borderWidth: 1,
            hoverOffset: 20,
        }],
    };

    const chartOptions = {
        responsive: true,
        cutout: '70%',
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(31, 41, 55, 0.95)',
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 10 },
                cornerRadius: 6,
                padding: 8,
            },
        },
        animation: {
            duration: 1200,
            easing: 'easeOutCubic',
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full"
        >
            <Card className="rounded-3xl shadow-lg border-none bg-white backdrop-blur-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="px-6">
                    <div className="flex gap-2 justify-between items-center">
                        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                            <BarChart className="mr-2 h-6 w-6 text-green-600" />
                            Attendance
                        </CardTitle>
                        <div className="flex flex-col  justify-center gap-2">
                            {/* Time Range Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 border-gray-200 rounded-full px-4 py-1 hover:bg-indigo-50/50 transition-colors duration-200"
                                    >
                                        {timeRange.type === 'custom' ? `${timeRange.startDate} - ${timeRange.endDate}` : `Last ${timeRange}`} ▼
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="rounded-xl bg-white shadow-lg border border-gray-100">
                                    {['7 Days', '30 Days', '90 Days', 'Custom Range'].map((range) => (
                                        <DropdownMenuItem
                                            key={range}
                                            className="text-gray-900 hover:bg-gray-100 rounded-lg"
                                            onClick={() => {
                                                if (range === 'Custom Range') {
                                                    setShowCustomRange(true);
                                                } else {
                                                    setTimeRange(range);
                                                    setShowCustomRange(false);
                                                }
                                            }}
                                        >
                                            {range}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {showCustomRange && (
                                <div className="flex space-x-2 items-center">
                                    <Input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="text-sm text-gray-700 border-gray-200 rounded-full px-3 py-1"
                                    />
                                    <Input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="text-sm text-gray-700 border-gray-200 rounded-full px-3 py-1"
                                    />
                                    <Button
                                        onClick={handleCustomRangeSubmit}
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 border-gray-200 rounded-full px-4 py-1 hover:bg-indigo-50/50 transition-colors duration-200"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            )}
                            {/* User Type Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 border-gray-200 rounded-full px-4 py-1 hover:bg-indigo-50/50 transition-colors duration-200"
                                    >
                                        {userType === 'Users' ? 'Students' : 'Staff'} ▼
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="rounded-xl bg-white shadow-lg border border-gray-100">
                                    {['Users', 'Staffs'].map((type) => (
                                        <DropdownMenuItem
                                            key={type}
                                            className="text-gray-900 hover:bg-gray-100 rounded-lg"
                                            onClick={() => setUserType(type)}
                                        >
                                            {type === 'Users' ? 'Students' : 'Staff'}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-lg font-bold text-gray-900">{userType === 'Users' ? 'Students' : 'Staff'}</p>
                    <p className="text-6xl font-bold text-gray-900">{totalUsers}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Stats Panel */}
                        <div className="space-y-4 flex flex-col justify-center">
                            <motion.div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-1">
                                    <BarChart className="h-5 w-5 text-gray-600" />
                                    <p className="text-xs font-medium text-gray-600">Today’s Attendance</p>
                                </div>
                                <p className="font-semibold text-gray-900">{userType === 'Users' ? attendanceData.todayStudent : attendanceData.todayStaff}%</p>
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-rose-600" />
                                    <p className="text-xs font-medium text-gray-600">{userType === 'Users' ? 'Student' : 'Staff'} Absentees</p>
                                </div>
                                <p className="font-semibold text-rose-600">{userType === 'Users' ? attendanceData.absenteesStudent : attendanceData.absenteesStaff}</p>
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-2">
                                    <BarChart className="h-5 w-5 text-indigo-600" />
                                    <p className="text-xs font-medium text-gray-600">Average Attendance ({timeRange.type === 'custom' ? 'Custom' : timeRange})</p>
                                </div>
                                <p className="font-semibold text-indigo-600">{averageAttendance}%</p>
                            </motion.div>
                        </div>
                        {/* Chart Panel */}
                        <div className="relative h-[12rem] sm:h-[16rem] flex justify-center items-center">
                            <Doughnut data={chartData} options={chartOptions} />
                            <div className="absolute text-center space-y-2">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Present</p>
                                    <p className="text-lg font-bold text-green-600">{attendancePercentage}%</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Absent</p>
                                    <p className="text-lg font-bold text-rose-600">{absencePercentage}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const FeesSummary = ({ isMounted, dashboardData, timeRange, setTimeRange }) => {
    const [showCustomRange, setShowCustomRange] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    // Handle custom date range submission
    const handleCustomRangeSubmit = () => {
        if (customStartDate && customEndDate) {
            setTimeRange({ type: 'custom', startDate: customStartDate, endDate: customEndDate });
            setShowCustomRange(false);
        }
    };

    // Mock data filtering for custom range
    const feeData = timeRange.type === 'custom'
        ? {
            paid: 65, // Mock for custom range
            pending: 25,
            partial: 10,
            totalCollected: 1100000,
            pendingAmount: 60000,
            todayTransactions: 12,
        }
        : dashboardData.fees;

    const feeChartData = {
        labels: ['Paid', 'Pending', 'Partial'],
        datasets: [{
            data: [feeData.paid, feeData.pending, feeData.partial],
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)', // blue for paid
                'rgba(147, 197, 253, 0.8)', // light blue for pending
                'rgba(30, 64, 175, 0.8)', // dark blue for partial
            ],
            borderColor: [
                'rgba(59, 130, 246, 0.2)',
                'rgba(147, 197, 253, 0.2)',
                'rgba(30, 64, 175, 0.2)',
            ],
            borderWidth: 1,
            hoverOffset: 20,
        }],
    };

    const chartOptions = {
        responsive: true,
        cutout: '70%',
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(31, 41, 55, 0.95)',
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 10 },
                cornerRadius: 6,
                padding: 8,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value}% (${percentage}%)`;
                    },
                },
            },
        },
        animation: {
            duration: 1200,
            easing: 'easeOutCubic',
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="w-full"
        >
            <Card className="rounded-3xl shadow-lg border-none bg-white backdrop-blur-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="px-6">
                    <div className="flex gap-2 justify-between items-center">
                        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                            <DollarSign className="mr-2 h-6 w-6 text-blue-600" />
                            Fees Summary
                        </CardTitle>
                        <div className="flex space-x-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 border-gray-200 rounded-full px-4 py-1 hover:bg-indigo-50/50 transition-colors duration-200"
                                    >
                                        {timeRange.type === 'custom' ? `${timeRange.startDate} - ${timeRange.endDate}` : `Last ${timeRange}`} ▼
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="rounded-xl bg-white shadow-lg border border-gray-100">
                                    {['7 Days', '30 Days', '90 Days', 'Custom Range'].map((range) => (
                                        <DropdownMenuItem
                                            key={range}
                                            className="text-gray-900 hover:bg-gray-100 rounded-lg"
                                            onClick={() => {
                                                if (range === 'Custom Range') {
                                                    setShowCustomRange(true);
                                                } else {
                                                    setTimeRange(range);
                                                    setShowCustomRange(false);
                                                }
                                            }}
                                        >
                                            {range}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {showCustomRange && (
                                <div className="flex space-x-2 items-center">
                                    <Input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="text-sm text-gray-700 border-gray-200 rounded-full px-3 py-1"
                                    />
                                    <Input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="text-sm text-gray-700 border-gray-200 rounded-full px-3 py-1"
                                    />
                                    <Button
                                        onClick={handleCustomRangeSubmit}
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 border-gray-200 rounded-full px-4 py-1 hover:bg-indigo-50/50 transition-colors duration-200"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-lg font-bold text-gray-900 mb-4">Fee Status</p>
                    <p className="font-bold text-6xl text-gray-900">₹{feeData.totalCollected?.toLocaleString() || 'N/A'}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Stats Panel */}
                        <div className="space-y-4 flex flex-col justify-center">
                            <motion.div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-gray-600" />
                                    <p className="text-xs font-medium text-gray-600">Total Fees Collected</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-gray-600" />
                                    <p className="text-xs font-medium text-gray-600">Today’s Transactions</p>
                                </div>
                                <p className="font-semibold text-gray-900">{feeData.todayTransactions}</p>
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-blue-600" />
                                    <p className="text-xs font-medium text-gray-600">Pending Fees</p>
                                </div>
                                <p className="font-semibold text-blue-600">₹{feeData.pendingAmount?.toLocaleString() || 'N/A'}</p>
                            </motion.div>
                        </div>
                        {/* Chart Panel */}
                        <div className="relative h-[12rem] sm:h-[16rem] flex justify-center items-center">
                            <Pie data={feeChartData} options={chartOptions} />
                            <div className="absolute text-center space-y-2">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Paid</p>
                                    <p className="text-lg font-bold text-blue-600">{feeData.paid}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [timeRange, setTimeRange] = useState('7 Days');

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Mock Data
    const dashboardData = {
        admissions: {
            total: 50,
            students: 45,
            staff: 5,
            pendingFees: 150000,
            weeklyTrends: {
                weeklyAdmissions: [1000, 1200, 1322, 1100, 900],
                studentApplications: [950, 1150, 1250, 1050, 850],
                change: -4.5,
            },
            staffTrends: {
                total: 15,
                change: 2.3,
                data: [12, 13, 15, 14, 13],
                staffData: [10, 12, 14, 13, 11],
            },
            appTrends: {
                total: 2000,
                change: 7.8,
                data: [1800, 1900, 2000, 1950, 1850],
                appData: [1750, 1850, 1950, 1900, 1800],
            },
        },
        attendance: {
            todayStudent: 92,
            todayStaff: 95,
            absenteesStudent: 8,
            absenteesStaff: 2,
            weekly: [80, 85, 90, 75, 88],
            weeklyStaff: [82, 87, 91, 78, 85],
            totalStudents: 100,
            totalStaff: 20,
        },
        fees: {
            paid: 70,
            pending: 20,
            partial: 10,
            totalCollected: 1200000,
            pendingAmount: 50000,
            todayTransactions: 15,
        },
        payroll: {
            totalStaff: 60,
            salaryPaid: 1500000,
            pendingSalaries: 50000,
            staffOnLeave: 3,
        },
        academic: {
            todayClasses: 25,
            upcomingExams: ['Math Midterm - 12/07/2025', 'Science Quiz - 15/07/2025'],
            assignmentsDue: 10,
            scholarships: { awarded: 5, totalAmount: 100000 },
        },
        reports: {
            studentProgress: '/reports/student-progress.pdf',
            attendance: '/reports/attendance.pdf',
            fees: '/reports/fees.pdf',
            leave: '/reports/leave.pdf',
        },
        sms: {
            lastSent: { title: 'Fee Reminder', timestamp: '2025-07-10 10:30 AM' },
            totalSentToday: 50,
        },
        inventory: {
            lowStock: ['Notebooks', 'Lab Equipment'],
            latestPurchases: ['Projectors - 2025-07-08', 'Chairs - 2025-07-05'],
            categories: 10,
            products: 150,
        },
        tools: {
            courses: 30,
            syllabusUpdated: true,
            departments: 8,
        },
    };

    // Common Chart Options
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(31, 41, 55, 0.95)',
                titleFont: { size: 10, weight: '600' },
                bodyFont: { size: 8 },
                cornerRadius: 6,
                padding: 8,
            },
        },
        scales: {
            y: { display: false },
            x: { display: false },
        },
        animation: {
            duration: 1200,
            easing: 'easeInOutCubic',
            loop: false,
        },
    };

    // Line Chart Data for Admissions
    const weeklyAdmissionsChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Admissions',
                data: dashboardData.admissions.weeklyTrends.weeklyAdmissions,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
            {
                label: 'Applications',
                data: dashboardData.admissions.weeklyTrends.studentApplications,
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
        ],
    };

    const staffAdmissionsChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Staff Admissions',
                data: dashboardData.admissions.staffTrends.data,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
            {
                label: 'Staff Data',
                data: dashboardData.admissions.staffTrends.staffData,
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
        ],
    };

    const applicationTrendsChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Applications',
                data: dashboardData.admissions.appTrends.data,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
            {
                label: 'App Data',
                data: dashboardData.admissions.appTrends.appData,
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
        ],
    };

    // Line Chart Data for Pending Fees
    const pendingFeesChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Pending Fees',
            data: [120000, 130000, 150000, 140000],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
        }],
    };

    // Bar Chart Data for Payroll
    const payrollChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Salary Paid',
                data: [400000, 450000, 375000, 425000],
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                borderColor: 'rgba(34, 197, 94, 0.2)',
                borderWidth: 1,
            },
        ],
    };

    // Line Chart Data for Academic Scholarships
    const scholarshipChartData = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            {
                label: 'Scholarship Amount',
                data: [30000, 40000, 35000],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
        ],
    };

    return (

        <Layout>
            <motion.div
                initial={{ opacity: 0, x: 0, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className='grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-screen'
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className="flex flex-col gap-5"
                >
                    <Card className="rounded-3xl bg-transparent shadow-none border-none backdrop-blur-md transition-all duration-300  flex flex-col p-0">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                {/* Sub-Box 1: Weekly Admissions */}
                                <motion.div
                                    className="bg-white backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[15rem]"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Weekly Admissions</h3>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            {dashboardData.admissions.weeklyTrends.weeklyAdmissions[2]?.toLocaleString() || 'N/A'}
                                        </p>
                                        <p className={`text-base sm:text-lg flex items-center ${dashboardData.admissions.weeklyTrends.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {dashboardData.admissions.weeklyTrends.change}%
                                            {dashboardData.admissions.weeklyTrends.change >= 0 ? (
                                                <ArrowUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ArrowDown className="ml-1 h-4 w-4" />
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full h-20 sm:h-24">
                                        <Line data={weeklyAdmissionsChartData} options={commonChartOptions} />
                                    </div>
                                </motion.div>
                                {/* Sub-Box 2: Staff Admissions */}
                                <motion.div
                                    className="bg-white backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[15rem]"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Staff Admissions</h3>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            {dashboardData.admissions.staffTrends.total?.toLocaleString() || 'N/A'}
                                        </p>
                                        <p className={`text-base sm:text-lg flex items-center ${dashboardData.admissions.staffTrends.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {dashboardData.admissions.staffTrends.change}%
                                            {dashboardData.admissions.staffTrends.change >= 0 ? (
                                                <ArrowUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ArrowDown className="ml-1 h-4 w-4" />
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full h-20 sm:h-24">
                                        <Line data={staffAdmissionsChartData} options={commonChartOptions} />
                                    </div>
                                </motion.div>
                                {/* Sub-Box 3: Application Trends */}
                                <motion.div
                                    className="bg-white backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[15rem]"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Application Trends</h3>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            {dashboardData.admissions.appTrends.total?.toLocaleString() || 'N/A'}
                                        </p>
                                        <p className={`text-base sm:text-lg flex items-center ${dashboardData.admissions.appTrends.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {dashboardData.admissions.appTrends.change}%
                                            {dashboardData.admissions.appTrends.change >= 0 ? (
                                                <ArrowUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ArrowDown className="ml-1 h-4 w-4" />
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full h-20 sm:h-24">
                                        <Line data={applicationTrendsChartData} options={commonChartOptions} />
                                    </div>
                                </motion.div>
                                {/* Sub-Box 4: Pending Admission Fees */}
                                <motion.div
                                    className="bg-white backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[15rem]"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Pending Admission Fees</h3>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            ₹{dashboardData.admissions.pendingFees?.toLocaleString() || 'N/A'}
                                        </p>
                                        <p className="text-base sm:text-lg flex items-center text-red-500">
                                            +5% <ArrowUp className="ml-1 h-4 w-4" />
                                        </p>
                                    </div>
                                    <div className="w-full h-20 sm:h-24">
                                        <Line data={pendingFeesChartData} options={commonChartOptions} />
                                    </div>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                    <PayrollOverview />
                    {/* Inventory Overview */}
                   <InventoryOverview/>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                    className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    <AttendanceStats isMounted={isMounted} attendanceData={dashboardData.attendance} timeRange={timeRange} setTimeRange={setTimeRange} />
                    <FeesSummary isMounted={isMounted} dashboardData={dashboardData} timeRange={timeRange} setTimeRange={setTimeRange} />
                    {/* Academic Summary */}
                    <AcademicSummary />
                    {/* SMS Notifications */}
                    <SMSNotifications />

                    {/* Tools/Quick Setup */}
                    <ToolsQuickSetup/>
                </motion.div>
            </motion.div>
        </Layout>

    );
}