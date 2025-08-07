'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Download, User, Calendar, X } from 'lucide-react';
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

export default function PayrollMainPage() {
  const [staff] = useState([
    { staffId: 'S001', name: 'Ravi Kumar', type: 'Teaching', department: 'Mathematics', salary: 60000, increment: 5000, leaves: 2 },
    { staffId: 'S002', name: 'Priya Sharma', type: 'Non-Teaching', department: 'Admin', salary: 45000, increment: 3000, leaves: 1 },
    { staffId: 'S003', name: 'Amit Patel', type: 'Teaching', department: 'Physics', salary: 65000, increment: 6000, leaves: 3 },
    { staffId: 'S004', name: 'Neha Gupta', type: 'Non-Teaching', department: 'Library', salary: 40000, increment: 2000, leaves: 0 },
    { staffId: 'S005', name: 'Vikram Singh', type: 'Teaching', department: 'Computer Science', salary: 70000, increment: 7000, leaves: 2 },
  ]);

  const [filters, setFilters] = useState({ staffType: '', department: '' });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'staffId', direction: 'asc' });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedStaff(null);
  };

  const handleClearFilters = () => {
    setFilters({ staffType: '', department: '' });
    setSelectedStaff(null);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredStaff = useMemo(() => {
    return staff.filter(s => (
      (filters.staffType === '' || s.type === filters.staffType) &&
      (filters.department === '' || s.department === filters.department)
    )).sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === 'name') {
        aValue = a.name;
        bValue = b.name;
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [staff, filters, sortConfig]);

  const staffSalaryDetails = useMemo(() => {
    if (!selectedStaff) return { grossPay: 0, netPay: 0, allowances: 0 };
    const s = staff.find(s => s.staffId === selectedStaff);
    const allowances = s.increment * 0.5; // Example: 50% of increment as allowance
    const grossPay = s.salary + allowances;
    const netPay = grossPay - (grossPay * 0.1); // Example: 10% deduction
    return { grossPay, netPay, allowances };
  }, [selectedStaff, staff]);

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
      className="min-h-screen font-sans "
      >
        <div className="mx-auto">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Payroll Main Page
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 3:35 PM IST
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
                  <Search className="mr-2 h-6 w-6 text-indigo-600" /> Search Salary Details
                </h2>
                <Button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                >
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="mr-2 h-5 w-5 text-indigo-600" /> Staff Type
                  </label>
                  <Select
                    value={filters.staffType}
                    onValueChange={(value) => handleFilterChange('staffType', value)}
                  >
                    <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Select Staff Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teaching">Teaching</SelectItem>
                      <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Department
                  </label>
                  <Select
                    value={filters.department}
                    onValueChange={(value) => handleFilterChange('department', value)}
                  >
                    <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Library">Library</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Staff Salary Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
                <User className="mr-2 h-6 w-6 text-indigo-600" /> Staff Salary Details
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-50">
                    <TableHead
                      className="text-indigo-800 font-semibold cursor-pointer"
                      onClick={() => handleSort('staffId')}
                    >
                      Staff ID {sortConfig.key === 'staffId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      className="text-indigo-800 font-semibold cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Type</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Salary</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((s) => (
                      <TableRow key={s.staffId} className="hover:bg-gray-50 transition-colors">
                        <TableCell>{s.staffId}</TableCell>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.type}</TableCell>
                        <TableCell>{s.department}</TableCell>
                        <TableCell>₹{s.salary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setSelectedStaff(s.staffId)}
                            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                        No staff found matching the filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </motion.div>

            {/* Individual Salary Details */}
            {selectedStaff && (
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                      <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Individual Salary Details
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
                        onClick={() => exportToCSV([{
                          staffId: selectedStaff,
                          name: staff.find(s => s.staffId === selectedStaff)?.name,
                          salary: staff.find(s => s.staffId === selectedStaff)?.salary,
                          allowances: staffSalaryDetails.allowances,
                          grossPay: staffSalaryDetails.grossPay,
                          netPay: staffSalaryDetails.netPay,
                        }], 'salary_details.csv')}
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-indigo-50">
                          <TableHead className="text-indigo-800 font-semibold">Staff ID</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Salary</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Allowances</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Gross Pay</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Net Pay</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-gray-50 transition-colors">
                          <TableCell>{selectedStaff}</TableCell>
                          <TableCell>{staff.find(s => s.staffId === selectedStaff)?.name}</TableCell>
                          <TableCell>₹{staff.find(s => s.staffId === selectedStaff)?.salary.toLocaleString()}</TableCell>
                          <TableCell>₹{staffSalaryDetails.allowances.toLocaleString()}</TableCell>
                          <TableCell>₹{staffSalaryDetails.grossPay.toLocaleString()}</TableCell>
                          <TableCell>₹{staffSalaryDetails.netPay.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Increment Details */}
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                  className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Increment Details
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
                      onClick={() => exportToCSV(filteredStaff.map(s => ({
                        staffId: s.staffId,
                        name: s.name,
                        increment: s.increment,
                      })), 'increment_details.csv')}
                      className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-indigo-50">
                        <TableHead className="text-indigo-800 font-semibold">Staff ID</TableHead>
                        <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                        <TableHead className="text-indigo-800 font-semibold">Increment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.length > 0 ? (
                        filteredStaff.map((s) => (
                          <TableRow key={s.staffId} className="hover:bg-gray-50 transition-colors">
                            <TableCell>{s.staffId}</TableCell>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>₹{s.increment.toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                            No increment details found for the selected filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>

            {/* Leave Report */}
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                  className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                    <Calendar className="mr-2 h-6 w-6 text-indigo-600" /> Leave Report
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
                      onClick={() => exportToCSV(filteredStaff.map(s => ({
                        staffId: s.staffId,
                        name: s.name,
                        leaves: s.leaves,
                      })), 'leave_report.csv')}
                      className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-indigo-50">
                        <TableHead className="text-indigo-800 font-semibold">Staff ID</TableHead>
                        <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                        <TableHead className="text-indigo-800 font-semibold">Leaves Taken</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.length > 0 ? (
                        filteredStaff.map((s) => (
                          <TableRow key={s.staffId} className="hover:bg-gray-50 transition-colors">
                            <TableCell>{s.staffId}</TableCell>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>{s.leaves}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                            No leave details found for the selected filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}