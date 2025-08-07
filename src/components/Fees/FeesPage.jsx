'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Dashboard from './components/Dashboard';
import FeeStructure from './components/FeeStructure';
import StudentAssignments from './components/StudentAssignments';
import PaymentHistory from './components/PaymentHistory';
import Reminders from './components/Reminders';
import Reports from './components/Reports';
import RecordPaymentDialog from './components/RecordPaymentDialog';

// Data
const feeStructures = [
  { id: 1, course: "Computer Science", semester: "Semester 1", tuitionFee: 15000, hostelFee: 8000, examFee: 1500, miscFee: 2000, totalFee: 26500, status: "Active" },
  { id: 2, course: "Computer Science", semester: "Semester 2", tuitionFee: 15000, hostelFee: 8000, examFee: 1500, miscFee: 2000, totalFee: 26500, status: "Active" },
  { id: 3, course: "Mechanical Engineering", semester: "Semester 1", tuitionFee: 18000, hostelFee: 8000, examFee: 2000, miscFee: 2500, totalFee: 30500, status: "Active" },
  { id: 4, course: "Business Administration", semester: "Semester 1", tuitionFee: 12000, hostelFee: 7000, examFee: 1200, miscFee: 1800, totalFee: 22000, status: "Active" },
];

const studentFeeAssignments = [
  { id: 1, studentName: "John Smith", rollNo: "CS001", course: "Computer Science", semester: "Semester 1", feeStructureId: 1, totalFee: 26500, paidAmount: 20000, remainingAmount: 6500, status: "Partial", lastPaymentDate: "2024-01-15" },
  { id: 2, studentName: "Emma Johnson", rollNo: "CS002", course: "Computer Science", semester: "Semester 1", feeStructureId: 1, totalFee: 26500, paidAmount: 26500, remainingAmount: 0, status: "Paid", lastPaymentDate: "2024-01-10" },
  { id: 3, studentName: "Michael Brown", rollNo: "ME001", course: "Mechanical Engineering", semester: "Semester 1", feeStructureId: 3, totalFee: 30500, paidAmount: 0, remainingAmount: 30500, status: "Pending", lastPaymentDate: "Never" },
  { id: 4, studentName: "Sarah Davis", rollNo: "BA001", course: "Business Administration", semester: "Semester 1", feeStructureId: 4, totalFee: 22000, paidAmount: 15000, remainingAmount: 7000, status: "Partial", lastPaymentDate: "2024-01-20" },
];

const paymentHistory = [
  { id: 1, studentName: "John Smith", rollNo: "CS001", course: "Computer Science", semester: "Semester 1", paidAmount: 10000, paymentDate: "2024-01-15", paymentMode: "UPI", transactionId: "TXN123456789", status: "Success" },
  { id: 2, studentName: "John Smith", rollNo: "CS001", course: "Computer Science", semester: "Semester 1", paidAmount: 10000, paymentDate: "2024-01-01", paymentMode: "Card", transactionId: "TXN123456788", status: "Success" },
  { id: 3, studentName: "Emma Johnson", rollNo: "CS002", course: "Computer Science", semester: "Semester 1", paidAmount: 26500, paymentDate: "2024-01-10", paymentMode: "Bank Transfer", transactionId: "TXN123456787", status: "Success" },
];

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

const FeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAddFeeStructureOpen, setIsAddFeeStructureOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isSendReminderOpen, setIsSendReminderOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [institutionType, setInstitutionType] = useState('College');
  const [newFeeStructure, setNewFeeStructure] = useState({
    course: '', semester: '', tuitionFee: '', hostelFee: '', examFee: '', miscFee: '',
  });
  const [paymentForm, setPaymentForm] = useState({
    amount: '', paymentDate: '', paymentMode: '', transactionId: '', remarks: '',
  });

  const totalFeesCollected = studentFeeAssignments.reduce((sum, student) => sum + student.paidAmount, 0);
  const totalDues = studentFeeAssignments.reduce((sum, student) => sum + student.remainingAmount, 0);
  const overdueAmount = studentFeeAssignments
    .filter((student) => student.status === "Pending" && student.remainingAmount > 0)
    .reduce((sum, student) => sum + student.remainingAmount, 0);
  const pendingPayments = studentFeeAssignments.filter((student) => student.status === "Partial").length;
  const collectionRate = (totalFeesCollected / (totalFeesCollected + totalDues)) * 100;

  const handleRecordPayment = (student) => {
    setSelectedStudent(student);
    setIsRecordPaymentOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans "
    >
      <div className="mx-auto  ">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Fee Management System
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              {new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata' })}
            </p>
            <div className="mt-4 flex justify-center">
              <Select value={institutionType} onValueChange={setInstitutionType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
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
              <TabsContent value="dashboard">
                <Dashboard
                  totalFeesCollected={totalFeesCollected}
                  totalDues={totalDues}
                  overdueAmount={overdueAmount}
                  collectionRate={collectionRate}
                  pendingPayments={pendingPayments}
                  monthlyCollectionData={monthlyCollectionData}
                  feeDistributionData={feeDistributionData}
                />
              </TabsContent>
              <TabsContent value="structure">
                <FeeStructure
                  feeStructures={feeStructures}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  isAddFeeStructureOpen={isAddFeeStructureOpen}
                  setIsAddFeeStructureOpen={setIsAddFeeStructureOpen}
                  newFeeStructure={newFeeStructure}
                  setNewFeeStructure={setNewFeeStructure}
                />
              </TabsContent>
              {institutionType === 'College' && (
                <>
                  <TabsContent value="assignments">
                    <StudentAssignments
                      studentFeeAssignments={studentFeeAssignments}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      handleRecordPayment={handleRecordPayment}
                    />
                  </TabsContent>
                  <TabsContent value="payments">
                    <PaymentHistory
                      paymentHistory={paymentHistory}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </TabsContent>
                  <TabsContent value="reminders">
                    <Reminders
                      studentFeeAssignments={studentFeeAssignments}
                      selectedStudents={selectedStudents}
                      setSelectedStudents={setSelectedStudents}
                      isSendReminderOpen={isSendReminderOpen}
                      setIsSendReminderOpen={setIsSendReminderOpen}
                    />
                  </TabsContent>
                  <TabsContent value="reports">
                    <Reports monthlyCollectionData={monthlyCollectionData} />
                  </TabsContent>
                </>
              )}
            </Tabs>
            <RecordPaymentDialog
              isRecordPaymentOpen={isRecordPaymentOpen}
              setIsRecordPaymentOpen={setIsRecordPaymentOpen}
              selectedStudent={selectedStudent}
              paymentForm={paymentForm}
              setPaymentForm={setPaymentForm}
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default FeesPage;