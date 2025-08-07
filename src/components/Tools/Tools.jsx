'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Search, Filter, Plus, Download, CreditCard, Receipt, Bell } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';

// Fee Structure Data
const feeStructures = [
  { id: 1, course: "Computer Science", semester: "Semester 1", tuitionFee: 15000, hostelFee: 8000, examFee: 1500, miscFee: 2000, totalFee: 26500, status: "Active" },
  { id: 2, course: "Computer Science", semester: "Semester 2", tuitionFee: 15000, hostelFee: 8000, examFee: 1500, miscFee: 2000, totalFee: 26500, status: "Active" },
  { id: 3, course: "Mechanical Engineering", semester: "Semester 1", tuitionFee: 18000, hostelFee: 8000, examFee: 2000, miscFee: 2500, totalFee: 30500, status: "Active" },
  { id: 4, course: "Business Administration", semester: "Semester 1", tuitionFee: 12000, hostelFee: 7000, examFee: 1200, miscFee: 1800, totalFee: 22000, status: "Active" },
];

// Student Fee Assignments
const studentFeeAssignments = [
  { id: 1, studentName: "John Smith", rollNo: "CS001", course: "Computer Science", semester: "Semester 1", feeStructureId: 1, totalFee: 26500, paidAmount: 20000, remainingAmount: 6500, status: "Partial", lastPaymentDate: "2024-01-15" },
  { id: 2, studentName: "Emma Johnson", rollNo: "CS002", course: "Computer Science", semester: "Semester 1", feeStructureId: 1, totalFee: 26500, paidAmount: 26500, remainingAmount: 0, status: "Paid", lastPaymentDate: "2024-01-10" },
  { id: 3, studentName: "Michael Brown", rollNo: "ME001", course: "Mechanical Engineering", semester: "Semester 1", feeStructureId: 3, totalFee: 30500, paidAmount: 0, remainingAmount: 30500, status: "Pending", lastPaymentDate: "Never" },
  { id: 4, studentName: "Sarah Davis", rollNo: "BA001", course: "Business Administration", semester: "Semester 1", feeStructureId: 4, totalFee: 22000, paidAmount: 15000, remainingAmount: 7000, status: "Partial", lastPaymentDate: "2024-01-20" },
];

// Payment History Data
const paymentHistory = [
  { id: 1, studentName: "John Smith", rollNo: "CS001", course: "Computer Science", semester: "Semester 1", paidAmount: 10000, paymentDate: "2024-01-15", paymentMode: "UPI", transactionId: "TXN123456789", status: "Success" },
  { id: 2, studentName: "John Smith", rollNo: "CS001", course: "Computer Science", semester: "Semester 1", paidAmount: 10000, paymentDate: "2024-01-01", paymentMode: "Card", transactionId: "TXN123456788", status: "Success" },
  { id: 3, studentName: "Emma Johnson", rollNo: "CS002", course: "Computer Science", semester: "Semester 1", paidAmount: 26500, paymentDate: "2024-01-10", paymentMode: "Bank Transfer", transactionId: "TXN123456787", status: "Success" },
];

// Chart Data
const monthlyCollectionData = [
  { month: "Jan", collected: 450000, pending: 150000, overdue: 50000 },
  { month: "Feb", collected: 480000, pending: 120000, overdue: 80000 },
  { month: "Mar", collected: 520000, pending: 100000, overdue: 60000 },
  { month: "Apr", collected: 500000, pending: 140000, overdue: 90000 },
  { month: "May", collected: 550000, pending: 80000, overdue: 40000 },
  { month: "Jun", collected: 580000, pending: 60000, overdue: 30000 },
];
const feeDistributionData = [
  { name: "Collected", value: 75, color: "#10b981" },
  { name: "Pending", value: 20, color: "#f59e0b" },
  { name: "Overdue", value: 5, color: "#ef4444" },
];

export default function FeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAddFeeStructureOpen, setIsAddFeeStructureOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isSendReminderOpen, setIsSendReminderOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [institutionType, setInstitutionType] = useState('College');
  const [loggedInUser, setLoggedInUser] = useState('Admin User');

  // Form states
  const [newFeeStructure, setNewFeeStructure] = useState({
    course: '', semester: '', tuitionFee: '', hostelFee: '', examFee: '', miscFee: '',
  });
  const [paymentForm, setPaymentForm] = useState({
    amount: '', paymentDate: '', paymentMode: '', transactionId: '', remarks: '',
  });

  // Calculate totals
  const totalFeesCollected = studentFeeAssignments.reduce((sum, student) => sum + student.paidAmount, 0);
  const totalDues = studentFeeAssignments.reduce((sum, student) => sum + student.remainingAmount, 0);
  const overdueAmount = studentFeeAssignments
    .filter((student) => student.status === "Pending" && student.remainingAmount > 0)
    .reduce((sum, student) => sum + student.remainingAmount, 0);
  const pendingPayments = studentFeeAssignments.filter((student) => student.status === "Partial").length;
  const collectionRate = (totalFeesCollected / (totalFeesCollected + totalDues)) * 100;

  const handleStudentSelection = (studentId, checked) => {
    if (checked) setSelectedStudents([...selectedStudents, studentId]);
    else setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
  };

  const handleRecordPayment = (student) => {
    setSelectedStudent(student);
    setIsRecordPaymentOpen(true);
  };

  const calculateTotal = () => {
    const tuition = Number.parseFloat(newFeeStructure.tuitionFee) || 0;
    const hostel = Number.parseFloat(newFeeStructure.hostelFee) || 0;
    const exam = Number.parseFloat(newFeeStructure.examFee) || 0;
    const misc = Number.parseFloat(newFeeStructure.miscFee) || 0;
    return tuition + hostel + exam + misc;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-h-screen font-sans"
    >
      <div className="mx-auto h-full">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-indigo-100 p-0  max-h-screen">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Fee Management System
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Thursday, July 31, 2025 at 11:11 PM IST
            </p>
            {/* <div className="mt-4">
              <select
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="School">School</option>
                <option value="College">College</option>
              </select>
            </div> */}
          </CardHeader>
          <CardContent className="p-6 md:p-8 h-screen">
            <Tabs defaultValue="dashboard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="structure">Fee Structure</TabsTrigger>
                {institutionType === 'College' && (
                  <>
                    <TabsTrigger value="assignments">Student Assignments</TabsTrigger>
                    <TabsTrigger value="payments">Payment History</TabsTrigger>
                    <TabsTrigger value="reminders">Reminders</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </>
                )}
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Fees Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">${totalFeesCollected.toLocaleString()}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={collectionRate} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{collectionRate.toFixed(1)}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Dues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">${totalDues.toLocaleString()}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={(totalDues / (totalFeesCollected + totalDues)) * 100} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{((totalDues / (totalFeesCollected + totalDues)) * 100).toFixed(1)}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{pendingPayments} students pending</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Overdue Fees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={(overdueAmount / totalDues) * 100} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{((overdueAmount / totalDues) * 100).toFixed(1)}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{collectionRate.toFixed(1)}%</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={collectionRate} className="flex-1" />
                        <span className="text-sm text-muted-foreground">Target: 90%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Excellent performance</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Fee Collection Trends</CardTitle>
                      <CardDescription>Collection vs Pending vs Overdue amounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyCollectionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Bar dataKey="collected" fill="#10b981" name="Collected" />
                          <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                          <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fee Distribution</CardTitle>
                      <CardDescription>Current fee collection status breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={feeDistributionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {feeDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Fee Structure Tab */}
              <TabsContent value="structure" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Manage Fee Structure</CardTitle>
                      <CardDescription>Create and manage fee structures</CardDescription>
                    </div>
                    <Dialog open={isAddFeeStructureOpen} onOpenChange={setIsAddFeeStructureOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" /> Add New Fee Structure
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add New Fee Structure</DialogTitle>
                          <DialogDescription>Create a fee structure</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="course">Course</Label>
                              <Select
                                value={newFeeStructure.course}
                                onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, course: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select course" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="computer-science">Computer Science</SelectItem>
                                  <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                                  <SelectItem value="business-administration">Business Administration</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="semester">Semester</Label>
                              <Select
                                value={newFeeStructure.semester}
                                onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, semester: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="semester-1">Semester 1</SelectItem>
                                  <SelectItem value="semester-2">Semester 2</SelectItem>
                                  <SelectItem value="semester-3">Semester 3</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="tuition">Tuition Fee ($)</Label>
                              <Input
                                id="tuition"
                                type="number"
                                placeholder="15000"
                                value={newFeeStructure.tuitionFee}
                                onChange={(e) => setNewFeeStructure({ ...newFeeStructure, tuitionFee: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hostel">Hostel Fee ($)</Label>
                              <Input
                                id="hostel"
                                type="number"
                                placeholder="8000"
                                value={newFeeStructure.hostelFee}
                                onChange={(e) => setNewFeeStructure({ ...newFeeStructure, hostelFee: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="exam">Exam Fee ($)</Label>
                              <Input
                                id="exam"
                                type="number"
                                placeholder="1500"
                                value={newFeeStructure.examFee}
                                onChange={(e) => setNewFeeStructure({ ...newFeeStructure, examFee: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="misc">Miscellaneous Fee ($)</Label>
                              <Input
                                id="misc"
                                type="number"
                                placeholder="2000"
                                value={newFeeStructure.miscFee}
                                onChange={(e) => setNewFeeStructure({ ...newFeeStructure, miscFee: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Total Fee:</span>
                              <span className="text-2xl font-bold text-blue-600">${calculateTotal().toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddFeeStructureOpen(false)}>Cancel</Button>
                          <Button onClick={() => setIsAddFeeStructureOpen(false)}>Create Fee Structure</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="relative mb-4">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search fee structures..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3">Course</th>
                            <th className="text-left py-3">Semester</th>
                            <th className="text-right py-3">Tuition Fee</th>
                            <th className="text-right py-3">Hostel Fee</th>
                            <th className="text-right py-3">Exam Fee</th>
                            <th className="text-right py-3">Misc Fee</th>
                            <th className="text-right py-3">Total Fee</th>
                            <th className="text-center py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeStructures
                            .filter((fee) => fee.course.toLowerCase().includes(searchTerm.toLowerCase()) || fee.semester.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((fee) => (
                              <tr key={fee.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 font-medium">{fee.course}</td>
                                <td className="py-3">{fee.semester}</td>
                                <td className="text-right py-3">${fee.tuitionFee.toLocaleString()}</td>
                                <td className="text-right py-3">${fee.hostelFee.toLocaleString()}</td>
                                <td className="text-right py-3">${fee.examFee.toLocaleString()}</td>
                                <td className="text-right py-3">${fee.miscFee.toLocaleString()}</td>
                                <td className="text-right py-3 font-bold">${fee.totalFee.toLocaleString()}</td>
                                <td className="text-center py-3">
                                  <div className="flex justify-center space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Student Assignments Tab (College only) */}
              {institutionType === 'College' && (
                <TabsContent value="assignments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assign Fee Structure to Students</CardTitle>
                      <CardDescription>Manage student fee assignments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4 mb-6">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search students..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-8"
                            />
                          </div>
                        </div>
                        <Button variant="outline">
                          <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3">Student Name</th>
                              <th className="text-left py-3">Roll No</th>
                              <th className="text-left py-3">Course</th>
                              <th className="text-left py-3">Semester</th>
                              <th className="text-right py-3">Total Fee</th>
                              <th className="text-right py-3">Paid</th>
                              <th className="text-right py-3">Remaining</th>
                              <th className="text-center py-3">Status</th>
                              <th className="text-center py-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentFeeAssignments
                              .filter((student) => student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((student) => (
                                <tr key={student.id} className="border-b hover:bg-gray-50">
                                  <td className="py-3 font-medium">{student.studentName}</td>
                                  <td className="py-3">{student.rollNo}</td>
                                  <td className="py-3">{student.course}</td>
                                  <td className="py-3">{student.semester}</td>
                                  <td className="text-right py-3">${student.totalFee.toLocaleString()}</td>
                                  <td className="text-right py-3 text-green-600">${student.paidAmount.toLocaleString()}</td>
                                  <td className="text-right py-3 text-orange-600">${student.remainingAmount.toLocaleString()}</td>
                                  <td className="text-center py-3">
                                    <Badge
                                      variant={
                                        student.status === "Paid" ? "default" : student.status === "Partial" ? "secondary" : "destructive"
                                      }
                                    >
                                      {student.status}
                                    </Badge>
                                  </td>
                                  <td className="text-center py-3">
                                    <div className="flex justify-center space-x-2">
                                      <Button variant="outline" size="sm" onClick={() => handleRecordPayment(student)}>
                                        <CreditCard className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Receipt className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                  <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                        <DialogDescription>Record payment for {selectedStudent?.studentName}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount Paid ($)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={paymentForm.amount}
                            onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payment-date">Payment Date</Label>
                          <Input
                            id="payment-date"
                            type="date"
                            value={paymentForm.paymentDate}
                            onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payment-mode">Payment Mode</Label>
                          <Select
                            value={paymentForm.paymentMode}
                            onValueChange={(value) => setPaymentForm({ ...paymentForm, paymentMode: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                              <SelectItem value="cheque">Cheque</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="transaction-id">Transaction ID</Label>
                          <Input
                            id="transaction-id"
                            placeholder="Enter transaction ID"
                            value={paymentForm.transactionId}
                            onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="remarks">Remarks</Label>
                          <Textarea
                            id="remarks"
                            placeholder="Additional remarks (optional)"
                            value={paymentForm.remarks}
                            onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRecordPaymentOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsRecordPaymentOpen(false)}>Record Payment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
              )}

              {/* Payment History Tab (College only) */}
              {institutionType === 'College' && (
                <TabsContent value="payments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Payment History</CardTitle>
                      <CardDescription>View all payment transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4 mb-6">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search payments..." className="pl-8" />
                          </div>
                        </div>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3">Student Name</th>
                              <th className="text-left py-3">Course</th>
                              <th className="text-left py-3">Semester</th>
                              <th className="text-right py-3">Paid Amount</th>
                              <th className="text-left py-3">Payment Date</th>
                              <th className="text-left py-3">Mode</th>
                              <th className="text-left py-3">Transaction ID</th>
                              <th className="text-center py-3">Status</th>
                              <th className="text-center py-3">Receipt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentHistory.map((payment) => (
                              <tr key={payment.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 font-medium">{payment.studentName}</td>
                                <td className="py-3">{payment.course}</td>
                                <td className="py-3">{payment.semester}</td>
                                <td className="text-right py-3 font-semibold">${payment.paidAmount.toLocaleString()}</td>
                                <td className="py-3">{payment.paymentDate}</td>
                                <td className="py-3">
                                  <Badge variant="outline">{payment.paymentMode}</Badge>
                                </td>
                                <td className="py-3 font-mono text-sm">{payment.transactionId}</td>
                                <td className="text-center py-3">
                                  <Badge variant="default">{payment.status}</Badge>
                                </td>
                                <td className="text-center py-3">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Reminders Tab (College only) */}
              {institutionType === 'College' && (
                <TabsContent value="reminders" className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Send Payment Reminders</CardTitle>
                        <CardDescription>Send reminders to students with pending fees</CardDescription>
                      </div>
                      <Dialog open={isSendReminderOpen} onOpenChange={setIsSendReminderOpen}>
                        <DialogTrigger asChild>
                          <Button disabled={selectedStudents.length === 0}>
                            <Bell className="mr-2 h-4 w-4" /> Send Reminder ({selectedStudents.length})
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Payment Reminder</DialogTitle>
                            <DialogDescription>Send reminder to {selectedStudents.length} selected student(s)</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-gray-600">This will send reminders via email and SMS.</p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsSendReminderOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsSendReminderOpen(false)}>Send Reminders</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {studentFeeAssignments
                          .filter((student) => student.remainingAmount > 0)
                          .map((student) => (
                            <Card key={student.id} className="p-4">
                              <div className="flex items-center space-x-4">
                                <Checkbox
                                  checked={selectedStudents.includes(student.id)}
                                  onCheckedChange={(checked) => handleStudentSelection(student.id)}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="font-semibold">{student.studentName}</h3>
                                      <p className="text-sm text-gray-600">{student.rollNo} • {student.course} • {student.semester}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-red-600">${student.remainingAmount.toLocaleString()}</div>
                                      <div className="text-sm text-gray-500">Pending Amount</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Reports Tab (College only) */}
              {institutionType === 'College' && (
                <TabsContent value="reports" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Fee Collection Analytics</CardTitle>
                        <CardDescription>Visual reports of fee collection</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex space-x-4">
                          <Select>
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Filter by course" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Courses</SelectItem>
                              <SelectItem value="cs">Computer Science</SelectItem>
                              <SelectItem value="me">Mechanical Engineering</SelectItem>
                              <SelectItem value="ba">Business Administration</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Filter by semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Semesters</SelectItem>
                              <SelectItem value="sem1">Semester 1</SelectItem>
                              <SelectItem value="sem2">Semester 2</SelectItem>
                              <SelectItem value="sem3">Semester 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="date" className="w-48" placeholder="From date" />
                          <Input type="date" className="w-48" placeholder="To date" />
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={monthlyCollectionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            <Bar dataKey="collected" fill="#10b981" name="Collected" />
                            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Export Reports</CardTitle>
                        <CardDescription>Download detailed fee reports</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button className="w-full bg-transparent" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Fee Collection Report (CSV)
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Pending Fees Report (PDF)
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Payment History (Excel)
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Defaulter List (PDF)
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Course-wise Summary (CSV)
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}