'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Search, FileText, Download, X, Plus, Edit } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Input,
} from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Button,
} from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

export default function FeesModulePage() {
  const [students] = useState([
    { admissionNo: 'A001', firstName: 'John', lastName: 'Doe', degree: 'UG', department: 'B.Sc', semester: 3, academicYear: '2024-2025' },
    { admissionNo: 'A002', firstName: 'Jane', lastName: 'Smith', degree: 'UG', department: 'B.A', semester: 5, academicYear: '2024-2025' },
    { admissionNo: 'A003', firstName: 'Alice', lastName: 'Johnson', degree: 'PG', department: 'B.Sc', semester: 2, academicYear: '2024-2025' },
    { admissionNo: 'A004', firstName: 'Bob', lastName: 'Williams', degree: 'UG', department: 'B.Com', semester: 4, academicYear: '2023-2024' },
    { admissionNo: 'A005', firstName: 'Emma', lastName: 'Brown', degree: 'PG', department: 'B.B.A', semester: 1, academicYear: '2024-2025' },
    { admissionNo: 'A006', firstName: 'Michael', lastName: 'Davis', degree: 'UG', department: 'B.Sc', semester: 3, academicYear: '2024-2025' },
    { admissionNo: 'A007', firstName: 'Sarah', lastName: 'Wilson', degree: 'UG', department: 'B.A', semester: 6, academicYear: '2023-2024' },
    { admissionNo: 'A008', firstName: 'David', lastName: 'Clark', degree: 'PG', department: 'B.Com', semester: 2, academicYear: '2024-2025' },
  ]);

  const [feeStructures, setFeeStructures] = useState([
    { course: 'B.Sc', semester: 3, feeDetails: [{ feeType: 'Tuition', amount: 50000 }, { feeType: 'Library', amount: 5000 }], totalFee: 55000 },
    { course: 'B.A', semester: 5, feeDetails: [{ feeType: 'Tuition', amount: 40000 }, { feeType: 'Lab', amount: 3000 }], totalFee: 43000 },
    { course: 'B.Sc', semester: 2, feeDetails: [{ feeType: 'Tuition', amount: 60000 }, { feeType: 'Research', amount: 10000 }], totalFee: 70000 },
    { course: 'B.Com', semester: 4, feeDetails: [{ feeType: 'Tuition', amount: 45000 }], totalFee: 45000 },
    { course: 'B.B.A', semester: 1, feeDetails: [{ feeType: 'Tuition', amount: 55000 }, { feeType: 'Library', amount: 5000 }], totalFee: 60000 },
  ]);

  const [feeTransactions, setFeeTransactions] = useState([
    { admissionNo: 'A001', transactionId: 'T001', date: '2025-07-01', amount: 30000, modeOfPayment: 'Cash', feeType: 'Tuition' },
    { admissionNo: 'A001', transactionId: 'T002', date: '2025-07-03', amount: 10000, modeOfPayment: 'Card', feeType: 'Library' },
    { admissionNo: 'A002', transactionId: 'T003', date: '2025-07-02', amount: 20000, modeOfPayment: 'Online', feeType: 'Tuition' },
    { admissionNo: 'A002', transactionId: 'T004', date: '2025-07-04', amount: 5000, modeOfPayment: 'Cash', feeType: 'Lab' },
    { admissionNo: 'A003', transactionId: 'T005', date: '2025-07-01', amount: 40000, modeOfPayment: 'Card', feeType: 'Tuition' },
    { admissionNo: 'A003', transactionId: 'T006', date: '2025-07-05', amount: 5000, modeOfPayment: 'Online', feeType: 'Research' },
    { admissionNo: 'A004', transactionId: 'T007', date: '2025-07-02', amount: 25000, modeOfPayment: 'Cash', feeType: 'Tuition' },
    { admissionNo: 'A005', transactionId: 'T008', date: '2025-07-03', amount: 30000, modeOfPayment: 'Card', feeType: 'Tuition' },
    { admissionNo: 'A005', transactionId: 'T009', date: '2025-07-04', amount: 5000, modeOfPayment: 'Online', feeType: 'Library' },
    { admissionNo: 'A006', transactionId: 'T010', date: '2025-07-01', amount: 35000, modeOfPayment: 'Cash', feeType: 'Tuition' },
  ]);

  const [filters, setFilters] = useState({
    academicYear: '',
    degree: '',
    department: '',
    semester: '',
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'admissionNo', direction: 'asc' });
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    course: '',
    semester: '',
    feeDetails: [{ feeType: '', amount: '' }],
  });
  const [billData, setBillData] = useState({
    admissionNo: '',
    amount: '',
    modeOfPayment: '',
    feeType: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedStudent(null);
  };

  const handleClearFilters = () => {
    setFilters({ academicYear: '', degree: '', department: '', semester: '' });
    setSelectedStudent(null);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFeeModalOpen = (course = '', semester = '') => {
    const existingStructure = feeStructures.find(fs => fs.course === course && fs.semester === Number(semester));
    setModalData({
      course: course || filters.department,
      semester: semester || filters.semester,
      feeDetails: existingStructure?.feeDetails || [{ feeType: '', amount: '' }],
    });
    setIsFeeModalOpen(true);
  };

  const handleFeeModalSave = () => {
    const totalFee = modalData.feeDetails.reduce((sum, { amount }) => sum + Number(amount || 0), 0);
    setFeeStructures(prev => {
      const existingIndex = prev.findIndex(fs => fs.course === modalData.course && fs.semester === Number(modalData.semester));
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...modalData, totalFee };
        return updated;
      }
      return [...prev, { ...modalData, semester: Number(modalData.semester), totalFee }];
    });
    setIsFeeModalOpen(false);
  };

  const handleBillModalOpen = (admissionNo = '') => {
    setBillData({
      admissionNo,
      amount: '',
      modeOfPayment: '',
      feeType: '',
      date: format(new Date(), 'yyyy-MM-dd'),
    });
    setIsBillModalOpen(true);
  };

  const handleBillModalSave = () => {
    const transactionId = `T${(feeTransactions.length + 1).toString().padStart(3, '0')}`;
    setFeeTransactions(prev => [...prev, { ...billData, transactionId, amount: Number(billData.amount) }]);
    setIsBillModalOpen(false);
  };

  const areAllFiltersFilled = useMemo(() => {
    return filters.academicYear !== '' && filters.degree !== '' && filters.department !== '' && filters.semester !== '';
  }, [filters]);

  const sortedStudents = useMemo(() => {
    const filtered = students.filter(s => (
      (filters.academicYear === '' || s.academicYear === filters.academicYear) &&
      (filters.degree === '' || s.degree === filters.degree) &&
      (filters.department === '' || s.department === filters.department) &&
      (filters.semester === '' || s.semester === Number(filters.semester))
    ));
    return [...filtered].sort((a, b) => {
      let aValue = sortConfig.key === 'name' ? `${a.firstName} ${a.lastName}` : a[sortConfig.key];
      let bValue = sortConfig.key === 'name' ? `${b.firstName} ${b.lastName}` : b[sortConfig.key];
      if (sortConfig.key === 'balance') {
        const feeStructure = feeStructures.find(fs => fs.course === a.department && fs.semester === a.semester);
        const totalFee = feeStructure?.totalFee || 0;
        const paid = feeTransactions.filter(t => t.admissionNo === a.admissionNo).reduce((sum, t) => sum + t.amount, 0);
        aValue = totalFee - paid;
        const bFeeStructure = feeStructures.find(fs => fs.course === b.department && fs.semester === b.semester);
        const bTotalFee = bFeeStructure?.totalFee || 0;
        const bPaid = feeTransactions.filter(t => t.admissionNo === b.admissionNo).reduce((sum, t) => sum + t.amount, 0);
        bValue = bTotalFee - bPaid;
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, filters, sortConfig, feeStructures, feeTransactions]);

  const feeSummary = useMemo(() => {
    const summary = { totalStudents: sortedStudents.length, totalFee: 0, totalPaid: 0, totalBalance: 0 };
    sortedStudents.forEach(s => {
      const feeStructure = feeStructures.find(fs => fs.course === s.department && fs.semester === s.semester);
      const totalFee = feeStructure?.totalFee || 0;
      const paid = feeTransactions.filter(t => t.admissionNo === s.admissionNo).reduce((sum, t) => sum + t.amount, 0);
      summary.totalFee += totalFee;
      summary.totalPaid += paid;
      summary.totalBalance += totalFee - paid;
    });
    return summary;
  }, [sortedStudents, feeStructures, feeTransactions]);

  const studentFeeReport = useMemo(() => {
    if (!selectedStudent) return { feeDetails: [], totalFee: 0, totalPaid: 0, balance: 0 };
    const student = students.find(s => s.admissionNo === selectedStudent);
    const feeStructure = feeStructures.find(fs => fs.course === student?.department && fs.semester === student?.semester);
    const totalFee = feeStructure?.totalFee || 0;
    const transactions = feeTransactions.filter(t => t.admissionNo === selectedStudent);
    const totalPaid = transactions.reduce((sum, t) => sum + t.amount, 0);
    return { feeDetails: feeStructure?.feeDetails || [], totalFee, totalPaid, balance: totalFee - totalPaid };
  }, [selectedStudent, students, feeStructures, feeTransactions]);

  const feeReceipts = useMemo(() => {
    return feeTransactions.filter(t => sortedStudents.some(s => s.admissionNo === t.admissionNo));
  }, [feeTransactions, sortedStudents]);

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${val.toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans p-4 md:p-8"
    >
      <div className="mx-auto max-w-7xl">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Fees Module
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 12:27 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                  <Search className="mr-2 h-6 w-6 text-indigo-600" /> Search Fees
                </h2>
                <Button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                >
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { key: 'academicYear', label: 'Academic Year', options: ['2024-2025', '2023-2024'] },
                  { key: 'degree', label: 'Degree', options: ['UG', 'PG'] },
                  { key: 'department', label: 'Department', options: ['B.Sc', 'B.A', 'B.Com', 'B.B.A'] },
                  { key: 'semester', label: 'Semester', options: ['1', '2', '3', '4', '5', '6'] },
                ].map(({ key, label, options }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-indigo-600" /> {label}
                    </label>
                    <Select
                      value={filters[key]}
                      onValueChange={(value) => handleFilterChange(key, value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder={`Select ${label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
              {areAllFiltersFilled && (
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => handleFeeModalOpen(filters.department, filters.semester)}
                    className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit Fee Structure
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Fee Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
                <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Fee Summary
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-50">
                    <TableHead className="text-indigo-800 font-semibold">Total Students</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Total Fee</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Total Paid</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Total Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50 transition-colors">
                    <TableCell>{feeSummary.totalStudents}</TableCell>
                    <TableCell>₹{feeSummary.totalFee.toLocaleString()}</TableCell>
                    <TableCell>₹{feeSummary.totalPaid.toLocaleString()}</TableCell>
                    <TableCell>₹{feeSummary.totalBalance.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>

            {/* Students Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                  <DollarSign className="mr-2 h-6 w-6 text-indigo-600" /> Fees Details
                </h2>
                {areAllFiltersFilled && (
                  <Button
                    onClick={() => handleBillModalOpen()}
                    className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Bill Entry
                  </Button>
                )}
              </div>
              {areAllFiltersFilled ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead
                        className="text-indigo-800 font-semibold cursor-pointer"
                        onClick={() => handleSort('admissionNo')}
                      >
                        Admission No {sortConfig.key === 'admissionNo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead
                        className="text-indigo-800 font-semibold cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Total Fee</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Paid</TableHead>
                      <TableHead
                        className="text-indigo-800 font-semibold cursor-pointer"
                        onClick={() => handleSort('balance')}
                      >
                        Balance {sortConfig.key === 'balance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStudents.length > 0 ? (
                      sortedStudents.map((s) => {
                        const feeStructure = feeStructures.find(fs => fs.course === s.department && fs.semester === s.semester);
                        const totalFee = feeStructure?.totalFee || 0;
                        const paid = feeTransactions.filter(t => t.admissionNo === s.admissionNo).reduce((sum, t) => sum + t.amount, 0);
                        const balance = totalFee - paid;
                        return (
                          <TableRow key={s.admissionNo} className="hover:bg-gray-50 transition-colors">
                            <TableCell>{s.admissionNo}</TableCell>
                            <TableCell>{`${s.firstName} ${s.lastName}`}</TableCell>
                            <TableCell>{s.degree}</TableCell>
                            <TableCell>{s.department}</TableCell>
                            <TableCell>{s.semester}</TableCell>
                            <TableCell>₹{totalFee.toLocaleString()}</TableCell>
                            <TableCell>₹{paid.toLocaleString()}</TableCell>
                            <TableCell className={balance > 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                              ₹{balance.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => setSelectedStudent(s.admissionNo)}
                                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg"
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-gray-500 py-4">
                          No students found matching the filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Please fill all filter options to view fees details.
                </p>
              )}
            </motion.div>

            {/* Fee Structure */}
            {areAllFiltersFilled && (
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                      <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Fee Structure
                    </h2>
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
                  >
                    <div className="flex justify-end mb-4">
                      <Button
                        onClick={() => exportToCSV(feeStructures.filter(fs => fs.course === filters.department && fs.semester === Number(filters.semester)).map(fs => ({
                          course: fs.course,
                          semester: fs.semester,
                          ...fs.feeDetails.reduce((acc, { feeType, amount }) => ({ ...acc, [feeType]: amount }), {}),
                          totalFee: fs.totalFee,
                        })), 'fee_structure.csv')}
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-indigo-50">
                          <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Fee Type</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feeStructures
                          .filter(fs => fs.course === filters.department && fs.semester === Number(filters.semester))
                          .flatMap(fs => fs.feeDetails.map(fd => (
                            <TableRow key={`${fs.course}-${fs.semester}-${fd.feeType}`} className="hover:bg-gray-50 transition-colors">
                              <TableCell>{fs.course}</TableCell>
                              <TableCell>{fs.semester}</TableCell>
                              <TableCell>{fd.feeType}</TableCell>
                              <TableCell>₹{fd.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          )))
                        }
                        {feeStructures.some(fs => fs.course === filters.department && fs.semester === Number(filters.semester)) ? null : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                              No fee structure found for the selected filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Fee Receipts */}
            {areAllFiltersFilled && (
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                      <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Fee Receipts
                    </h2>
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
                  >
                    <div className="flex justify-end mb-4">
                      <Button
                        onClick={() => exportToCSV(feeReceipts.map(t => ({
                          admissionNo: t.admissionNo,
                          name: `${students.find(s => s.admissionNo === t.admissionNo)?.firstName} ${students.find(s => s.admissionNo === t.admissionNo)?.lastName}`,
                          transactionId: t.transactionId,
                          date: t.date,
                          feeType: t.feeType,
                          amount: t.amount,
                          modeOfPayment: t.modeOfPayment,
                        })), 'fee_receipts.csv')}
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-indigo-50">
                          <TableHead className="text-indigo-800 font-semibold">Admission No</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Transaction ID</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Date</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Fee Type</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Amount</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Mode of Payment</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feeReceipts.length > 0 ? (
                          feeReceipts.map((t) => (
                            <TableRow key={t.transactionId} className="hover:bg-gray-50 transition-colors">
                              <TableCell>{t.admissionNo}</TableCell>
                              <TableCell>{`${students.find(s => s.admissionNo === t.admissionNo)?.firstName} ${students.find(s => s.admissionNo === t.admissionNo)?.lastName}`}</TableCell>
                              <TableCell>{t.transactionId}</TableCell>
                              <TableCell>{t.date}</TableCell>
                              <TableCell>{t.feeType}</TableCell>
                              <TableCell>₹{t.amount.toLocaleString()}</TableCell>
                              <TableCell>{t.modeOfPayment}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                              No fee receipts found for the selected filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Student Fee Report */}
            {selectedStudent && (
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                      <DollarSign className="mr-2 h-6 w-6 text-indigo-600" /> Student Fee Report
                    </h2>
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
                  >
                    <div className="flex justify-end mb-4">
                      <Button
                        onClick={() => exportToCSV([{
                          admissionNo: selectedStudent,
                          name: `${students.find(s => s.admissionNo === selectedStudent)?.firstName} ${students.find(s => s.admissionNo === selectedStudent)?.lastName}`,
                          ...studentFeeReport.feeDetails.reduce((acc, { feeType, amount }) => ({ ...acc, [feeType]: amount }), {}),
                          totalFee: studentFeeReport.totalFee,
                          totalPaid: studentFeeReport.totalPaid,
                          balance: studentFeeReport.balance,
                        }], 'student_fee_report.csv')}
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-indigo-50">
                          <TableHead className="text-indigo-800 font-semibold">Admission No</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Fee Type</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Amount</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Total Fee</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Total Paid</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentFeeReport.feeDetails.length > 0 ? (
                          studentFeeReport.feeDetails.map((fd, index) => (
                            <TableRow key={`${selectedStudent}-${fd.feeType}`} className="hover:bg-gray-50 transition-colors">
                              {index === 0 && (
                                <>
                                  <TableCell rowSpan={studentFeeReport.feeDetails.length}>{selectedStudent}</TableCell>
                                  <TableCell rowSpan={studentFeeReport.feeDetails.length}>
                                    {`${students.find(s => s.admissionNo === selectedStudent)?.firstName} ${students.find(s => s.admissionNo === selectedStudent)?.lastName}`}
                                  </TableCell>
                                </>
                              )}
                              <TableCell>{fd.feeType}</TableCell>
                              <TableCell>₹{fd.amount.toLocaleString()}</TableCell>
                              {index === 0 && (
                                <>
                                  <TableCell rowSpan={studentFeeReport.feeDetails.length}>₹{studentFeeReport.totalFee.toLocaleString()}</TableCell>
                                  <TableCell rowSpan={studentFeeReport.feeDetails.length}>₹{studentFeeReport.totalPaid.toLocaleString()}</TableCell>
                                  <TableCell rowSpan={studentFeeReport.feeDetails.length} className={studentFeeReport.balance > 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                                    ₹{studentFeeReport.balance.toLocaleString()}
                                  </TableCell>
                                </>
                              )}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                              No fee details found for the selected student.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Fee Structure Modal */}
            <Dialog open={isFeeModalOpen} onOpenChange={setIsFeeModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Fee Structure</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Course</label>
                    <Input
                      value={modalData.course}
                      onChange={(e) => setModalData(prev => ({ ...prev, course: e.target.value }))}
                      className="mt-1"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Semester</label>
                    <Input
                      value={modalData.semester}
                      onChange={(e) => setModalData(prev => ({ ...prev, semester: e.target.value }))}
                      className="mt-1"
                      type="number"
                      disabled
                    />
                  </div>
                  {modalData.feeDetails.map((fd, index) => (
                    <div key={index} className="flex space-x-2">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">Fee Type</label>
                        <Input
                          value={fd.feeType}
                          onChange={(e) => {
                            const newFeeDetails = [...modalData.feeDetails];
                            newFeeDetails[index].feeType = e.target.value;
                            setModalData(prev => ({ ...prev, feeDetails: newFeeDetails }));
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">Amount</label>
                        <Input
                          value={fd.amount}
                          onChange={(e) => {
                            const newFeeDetails = [...modalData.feeDetails];
                            newFeeDetails[index].amount = e.target.value;
                            setModalData(prev => ({ ...prev, feeDetails: newFeeDetails }));
                          }}
                          className="mt-1"
                          type="number"
                        />
                      </div>
                      {modalData.feeDetails.length > 1 && (
                        <Button
                          onClick={() => {
                            const newFeeDetails = modalData.feeDetails.filter((_, i) => i !== index);
                            setModalData(prev => ({ ...prev, feeDetails: newFeeDetails }));
                          }}
                          className="mt-7 bg-red-600 text-white hover:bg-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => setModalData(prev => ({
                      ...prev,
                      feeDetails: [...prev.feeDetails, { feeType: '', amount: '' }],
                    }))}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Add Fee Type
                  </Button>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsFeeModalOpen(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleFeeModalSave} className="bg-indigo-600 text-white hover:bg-indigo-700">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Bill Entry Modal */}
            <Dialog open={isBillModalOpen} onOpenChange={setIsBillModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Fee Bill Entry</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Admission No</label>
                    <Input
                      value={billData.admissionNo}
                      onChange={(e) => setBillData(prev => ({ ...prev, admissionNo: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Amount</label>
                    <Input
                      value={billData.amount}
                      onChange={(e) => setBillData(prev => ({ ...prev, amount: e.target.value }))}
                      className="mt-1"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mode of Payment</label>
                    <Select
                      value={billData.modeOfPayment}
                      onValueChange={(value) => setBillData(prev => ({ ...prev, modeOfPayment: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Fee Type</label>
                    <Input
                      value={billData.feeType}
                      onChange={(e) => setBillData(prev => ({ ...prev, feeType: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <Input
                      type="date"
                      value={billData.date}
                      onChange={(e) => setBillData(prev => ({ ...prev, date: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsBillModalOpen(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleBillModalSave} className="bg-indigo-600 text-white hover:bg-indigo-700">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}