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
import { Line, Bar, Pie } from 'react-chartjs-2';
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
  ArrowUp, ArrowDown, Calendar, BookOpen, Send, Package, Settings 
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

const AttendanceStats = ({ isMounted, attendanceData, timeRange, setTimeRange }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const chartData = {
    labels: timeRange === '7 Days' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : timeRange === '30 Days' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Student Attendance %',
        data: timeRange === '7 Days' ? attendanceData.weekly : timeRange === '30 Days' ? [82, 87, 91, 78] : [85, 88, 90],
        backgroundColor: 'rgba(34, 197, 94, 0.9)',
        borderColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Staff Attendance %',
        data: timeRange === '7 Days' ? attendanceData.weeklyStaff : timeRange === '30 Days' ? [80, 85, 88, 75] : [82, 86, 89],
        backgroundColor: 'rgba(59, 130, 246, 0.9)',
        borderColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom',
        labels: { font: { size: 12, family: 'Inter, sans-serif' } },
      },
      title: {
        display: true,
        text: 'Attendance Trends',
        font: { size: 20, weight: '700', family: 'Inter, sans-serif' },
        color: '#111827',
        padding: { bottom: 12, top: 8 },
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleFont: { size: 14, weight: '600' },
        bodyFont: { size: 12 },
        cornerRadius: 6,
        padding: 10,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        max: 100,
      },
      x: { display: false },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
      loop: false,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full"
    >
      <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-green-600" /> Attendance Summary
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 border-gray-200 rounded-xl hover:bg-gray-50/50 transition-colors duration-200"
                  aria-label="Select time range"
                >
                  Last {timeRange} ▼
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl bg-white shadow-lg border border-gray-200">
                {['7 Days', '30 Days', '90 Days'].map((range) => (
                  <DropdownMenuItem
                    key={range}
                    className="text-gray-900 hover:bg-gray-100 rounded-lg"
                    onClick={() => setTimeRange(range)}
                  >
                    Last {range}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Today’s Student Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStudent}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Today’s Staff Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStaff}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Student Absentees Today</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.absenteesStudent}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Staff Absentees Today</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.absenteesStaff}</p>
            </div>
          </div>
          <div className="h-[12rem]">
            <Bar data={chartData} options={chartOptions} />
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

  // Pie Chart Data for Fees
  const feeChartData = {
    labels: ['Paid', 'Pending', 'Partial'],
    datasets: [{
      data: [dashboardData.fees.paid, dashboardData.fees.pending, dashboardData.fees.partial],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(249, 115, 22, 0.8)'],
      borderColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)', 'rgb(249, 115, 22)'],
      borderWidth: 2,
      hoverOffset: 30,
      hoverBorderWidth: 4,
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen  p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-500">
          {/* Header */}
         

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <Breadcrumb className="mb-6 sm:mb-8">
              <BreadcrumbList className="text-sm sm:text-base">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 mx-2" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 font-semibold">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Admissions Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-indigo-600" /> Admissions Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    {/* Sub-Box 1: Weekly Admissions */}
                    <motion.div
                      className="bg-gray-50/90 backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[12rem]"
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
                      className="bg-gray-50/90 backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[12rem]"
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
                      className="bg-gray-50/90 backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[12rem]"
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
                      className="bg-gray-50/90 backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-[10rem] sm:h-[12rem]"
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
                        <Bar
                          data={{
                            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                            datasets: [{
                              label: 'Pending Fees',
                              data: [120000, 130000, 150000, 140000],
                              backgroundColor: 'rgba(239, 68, 68, 0.8)',
                              borderColor: 'rgba(239, 68, 68, 0.2)',
                              borderWidth: 1,
                            }],
                          }}
                          options={commonChartOptions}
                        />
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Attendance Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <AttendanceStats isMounted={isMounted} attendanceData={dashboardData.attendance} timeRange={timeRange} setTimeRange={setTimeRange} />
            </motion.div>

            {/* Fees Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-red-600" /> Fees Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Fees Collected</p>
                      <p className="text-2xl font-bold text-gray-900">₹{dashboardData.fees.totalCollected?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Today’s Transactions</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.fees.todayTransactions}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Pending Fees</p>
                      <p className="text-2xl font-bold text-gray-900">₹{dashboardData.fees.pendingAmount?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="h-[14rem] flex items-center justify-center">
                    <Pie
                      data={feeChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: 'rgb(107, 114, 128)',
                              font: { size: 14, family: 'Inter, sans-serif', weight: '600' },
                              padding: 20,
                              boxWidth: 12,
                            },
                          },
                          tooltip: {
                            backgroundColor: 'rgba(31, 41, 55, 0.95)',
                            titleFont: { size: 14, weight: '600' },
                            bodyFont: { size: 12 },
                            cornerRadius: 8,
                            padding: 12,
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
                          title: {
                            display: true,
                            text: 'Fee Status Distribution',
                            font: { size: 16, weight: '700', family: 'Inter, sans-serif' },
                            color: '#111827',
                            padding: { top: 8, bottom: 12 },
                          },
                        },
                        animation: {
                          duration: 1000,
                          easing: 'easeOutCubic',
                          loop: false,
                          animateRotate: true,
                          animateScale: false,
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payroll Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-blue-600" /> Payroll Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Staff</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.payroll.totalStaff}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Salary Paid This Month</p>
                      <p className="text-2xl font-bold text-gray-900">₹{dashboardData.payroll.salaryPaid?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Pending Salaries</p>
                      <p className="text-2xl font-bold text-gray-900">₹{dashboardData.payroll.pendingSalaries?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Staff on Leave Today</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.payroll.staffOnLeave}</p>
                    </div>
                  </div>
                  <div className="h-[14rem]">
                    <Bar data={payrollChartData} options={commonChartOptions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Academic Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.0 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-purple-600" /> Academic Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Today’s Classes</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.academic.todayClasses}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Assignments Due Today</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.academic.assignmentsDue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Upcoming Events</p>
                      <p className="text-sm font-semibold text-gray-900">{dashboardData.academic.upcomingExams[0]}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Scholarships Awarded</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.academic.scholarships.awarded}</p>
                    </div>
                  </div>
                  <div className="h-[14rem]">
                    <Line data={scholarshipChartData} options={commonChartOptions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reports Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-orange-600" /> Reports Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    {[
                      { label: 'Student Progress', link: dashboardData.reports.studentProgress },
                      { label: 'Attendance', link: dashboardData.reports.attendance },
                      { label: 'Fees', link: dashboardData.reports.fees },
                      { label: 'Leave', link: dashboardData.reports.leave },
                    ].map((report, index) => (
                      <motion.a
                        key={index}
                        href={report.link}
                        className="block text-sm sm:text-base text-gray-900 bg-gray-100/50 rounded-lg p-2 hover:bg-gray-200/50 transition-colors duration-200 flex items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FileText className="mr-2 h-4 w-4 text-orange-600" /> {report.label} Report
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SMS Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <Send className="mr-2 h-5 w-5 text-teal-600" /> SMS Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Last Sent SMS</p>
                      <p className="text-sm font-semibold text-gray-900">{dashboardData.sms.lastSent.title} ({dashboardData.sms.lastSent.timestamp})</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Messages Today</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.sms.totalSentToday}</p>
                    </div>
                    <div className="text-center">
                      <Button
                        className="bg-teal-600 text-white hover:bg-teal-700 rounded-xl"
                        onClick={() => alert('Send announcement feature not implemented')}
                      >
                        Send Announcement
                      </Button>
                    </div>
                  </div>
                  <div className="h-[14rem]">
                    <Bar
                      data={{
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                        datasets: [{
                          label: 'SMS Sent',
                          data: [40, 45, 50, 48, 50],
                          backgroundColor: 'rgba(20, 184, 166, 0.8)',
                          borderColor: 'rgba(20, 184, 166, 0.2)',
                          borderWidth: 1,
                        }],
                      }}
                      options={commonChartOptions}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inventory Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.6 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <Package className="mr-2 h-5 w-5 text-yellow-600" /> Inventory Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Low Stock Alerts</p>
                      <p className="text-sm font-semibold text-gray-900">{dashboardData.inventory.lowStock.join(', ')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Latest Purchase</p>
                      <p className="text-sm font-semibold text-gray-900">{dashboardData.inventory.latestPurchases[0]}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Categories</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.inventory.categories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.inventory.products}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      className="bg-yellow-600 text-white hover:bg-yellow-700 rounded-xl"
                      onClick={() => alert('View all stock feature not implemented')}
                    >
                      View All Stock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tools/Quick Setup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.8 }}
              className="w-full h-[28rem] sm:h-[32rem]"
            >
              <Card className="rounded-3xl shadow-lg border-none bg-white/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-indigo-600" /> Tools/Quick Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.tools.courses}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Departments</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.tools.departments}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Syllabus Updated</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.tools.syllabusUpdated ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <div className="h-[14rem]">
                    <Pie
                      data={{
                        labels: ['Courses', 'Departments'],
                        datasets: [{
                          data: [dashboardData.tools.courses, dashboardData.tools.departments],
                          backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(124, 58, 237, 0.8)'],
                          borderColor: ['rgb(99, 102, 241)', 'rgb(124, 58, 237)'],
                          borderWidth: 2,
                          hoverOffset: 30,
                        }],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: 'rgb(107, 114, 128)',
                              font: { size: 14, family: 'Inter, sans-serif', weight: '600' },
                              padding: 20,
                              boxWidth: 12,
                            },
                          },
                          tooltip: {
                            backgroundColor: 'rgba(31, 41, 55, 0.95)',
                            titleFont: { size: 14, weight: '600' },
                            bodyFont: { size: 12 },
                            cornerRadius: 8,
                            padding: 12,
                          },
                          title: {
                            display: true,
                            text: 'Courses & Departments',
                            font: { size: 16, weight: '700', family: 'Inter, sans-serif' },
                            color: '#111827',
                            padding: { top: 8, bottom: 12 },
                          },
                        },
                        animation: {
                          duration: 1000,
                          easing: 'easeOutCubic',
                          loop: false,
                          animateRotate: true,
                          animateScale: false,
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 2.0 }}
              className="bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-lg border border-gray-200/50 col-span-1 sm:col-span-2 lg:col-span-3 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Bell className="mr-2 h-5 w-5 text-yellow-600" /> Alerts
              </h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {[
                    { text: '10 Admissions Pending Approval', color: 'text-yellow-600' },
                    { text: 'Due Date for Fees: 15/07/2025', color: 'text-red-600' },
                    { text: 'System Maintenance Scheduled: 20/07/2025', color: 'text-blue-600' },
                  ].map((alert, index) => (
                    <motion.p
                      key={index}
                      className={`text-sm sm:text-base ${alert.color} bg-gray-100/50 rounded-lg p-2 hover:bg-gray-200/50 transition-colors duration-200 flex items-center`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Bell className="mr-2 h-4 w-4" /> {alert.text}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Buttons */}
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}