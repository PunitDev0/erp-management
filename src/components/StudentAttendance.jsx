'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Search, FileText, Download, X } from 'lucide-react';
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
import { format, startOfMonth, endOfMonth, parse } from 'date-fns';

export default function StudentAttendancePage() {
  // Expanded demo data
  const [students] = useState([
    {
      admissionNo: 'A001',
      firstName: 'John',
      lastName: 'Doe',
      degree: 'UG',
      department: 'Computer Science',
      academicYear: '2024-2025',
      course: 'B.Sc Computer Science',
      semester: '3',
    },
    {
      admissionNo: 'A002',
      firstName: 'Jane',
      lastName: 'Smith',
      degree: 'UG',
      department: 'Economics',
      academicYear: '2024-2025',
      course: 'B.A Economics',
      semester: '5',
    },
    {
      admissionNo: 'A003',
      firstName: 'Alice',
      lastName: 'Johnson',
      degree: 'PG',
      department: 'Computer Science',
      academicYear: '2024-2025',
      course: 'M.Sc Computer Science',
      semester: '2',
    },
    {
      admissionNo: 'A004',
      firstName: 'Bob',
      lastName: 'Williams',
      degree: 'UG',
      department: 'Mathematics',
      academicYear: '2023-2024',
      course: 'B.Sc Mathematics',
      semester: '4',
    },
    {
      admissionNo: 'A005',
      firstName: 'Emma',
      lastName: 'Brown',
      degree: 'PG',
      department: 'Economics',
      academicYear: '2024-2025',
      course: 'M.A Economics',
      semester: '1',
    },
    {
      admissionNo: 'A006',
      firstName: 'Michael',
      lastName: 'Davis',
      degree: 'UG',
      department: 'Physics',
      academicYear: '2024-2025',
      course: 'B.Sc Physics',
      semester: '3',
    },
    {
      admissionNo: 'A007',
      firstName: 'Sarah',
      lastName: 'Wilson',
      degree: 'UG',
      department: 'Computer Science',
      academicYear: '2023-2024',
      course: 'B.Sc Computer Science',
      semester: '6',
    },
    {
      admissionNo: 'A008',
      firstName: 'David',
      lastName: 'Clark',
      degree: 'PG',
      department: 'Mathematics',
      academicYear: '2024-2025',
      course: 'M.Sc Mathematics',
      semester: '2',
    },
    {
      admissionNo: 'A009',
      firstName: 'Lisa',
      lastName: 'Lewis',
      degree: 'UG',
      department: 'Economics',
      academicYear: '2024-2025',
      course: 'B.A Economics',
      semester: '4',
    },
    {
      admissionNo: 'A010',
      firstName: 'James',
      lastName: 'Walker',
      degree: 'UG',
      department: 'Physics',
      academicYear: '2023-2024',
      course: 'B.Sc Physics',
      semester: '5',
    },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    { admissionNo: 'A001', date: '2025-07-01', status: 'Present' },
    { admissionNo: 'A001', date: '2025-07-02', status: 'Absent' },
    { admissionNo: 'A001', date: '2025-07-03', status: 'Present' },
    { admissionNo: 'A001', date: '2025-07-04', status: 'Late' },
    { admissionNo: 'A002', date: '2025-07-01', status: 'Late' },
    { admissionNo: 'A002', date: '2025-07-02', status: 'Excused' },
    { admissionNo: 'A002', date: '2025-07-03', status: 'Present' },
    { admissionNo: 'A002', date: '2025-07-05', status: 'Absent' },
    { admissionNo: 'A003', date: '2025-07-01', status: 'Present' },
    { admissionNo: 'A003', date: '2025-07-02', status: 'Present' },
    { admissionNo: 'A003', date: '2025-07-04', status: 'Late' },
    { admissionNo: 'A004', date: '2025-07-01', status: 'Absent' },
    { admissionNo: 'A004', date: '2025-07-03', status: 'Present' },
    { admissionNo: 'A004', date: '2025-07-05', status: 'Excused' },
    { admissionNo: 'A005', date: '2025-07-02', status: 'Present' },
    { admissionNo: 'A005', date: '2025-07-04', status: 'Late' },
    { admissionNo: 'A006', date: '2025-07-01', status: 'Present' },
    { admissionNo: 'A006', date: '2025-07-03', status: 'Absent' },
    { admissionNo: 'A007', date: '2025-07-02', status: 'Excused' },
    { admissionNo: 'A007', date: '2025-07-04', status: 'Present' },
    { admissionNo: 'A008', date: '2025-07-01', status: 'Late' },
    { admissionNo: 'A008', date: '2025-07-05', status: 'Present' },
    { admissionNo: 'A009', date: '2025-07-02', status: 'Absent' },
    { admissionNo: 'A009', date: '2025-07-03', status: 'Present' },
    { admissionNo: 'A010', date: '2025-07-01', status: 'Present' },
    { admissionNo: 'A010', date: '2025-07-04', status: 'Excused' },
  ]);

  const [filters, setFilters] = useState({
    degree: '',
    department: '',
    academicYear: '',
    course: '',
    semester: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    month: format(new Date(), 'yyyy-MM'),
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'admissionNo', direction: 'asc' });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedStudent(null); // Reset selected student when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      degree: '',
      department: '',
      academicYear: '',
      course: '',
      semester: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      month: format(new Date(), 'yyyy-MM'),
    });
    setSelectedStudent(null);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleStatusChange = (admissionNo, status) => {
    if (status === 'Select Status') return; // Prevent overwriting with placeholder
    setAttendanceRecords(prev => {
      const existingRecord = prev.find(
        r => r.admissionNo === admissionNo && r.date === filters.date
      );
      if (existingRecord) {
        return prev.map(r =>
          r.admissionNo === admissionNo && r.date === filters.date
            ? { ...r, status }
            : r
        );
      } else {
        return [...prev, { admissionNo, date: filters.date, status }];
      }
    });
  };

  // Check if all filters are filled
  const areAllFiltersFilled = useMemo(() => {
    return (
      filters.degree !== '' &&
      filters.department !== '' &&
      filters.academicYear !== '' &&
      filters.course !== '' &&
      filters.semester !== '' &&
      filters.date !== ''
    );
  }, [filters]);

  // Filter and sort students
  const sortedStudents = useMemo(() => {
    const filtered = students.filter(student => (
      (filters.degree === '' || student.degree === filters.degree) &&
      (filters.department === '' || student.department === filters.department) &&
      (filters.academicYear === '' || student.academicYear === filters.academicYear) &&
      (filters.course === '' || student.course === filters.course) &&
      (filters.semester === '' || student.semester === filters.semester)
    ));

    return [...filtered].sort((a, b) => {
      let aValue = sortConfig.key === 'name' ? `${a.firstName} ${a.lastName}` : a[sortConfig.key];
      let bValue = sortConfig.key === 'name' ? `${b.firstName} ${b.lastName}` : b[sortConfig.key];
      if (sortConfig.key === 'status') {
        aValue = attendanceRecords.find(r => r.admissionNo === a.admissionNo && r.date === filters.date)?.status || 'N/A';
        bValue = attendanceRecords.find(r => r.admissionNo === b.admissionNo && r.date === filters.date)?.status || 'N/A';
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, filters, sortConfig, attendanceRecords]);

  // Attendance summary for filtered students on selected date
  const attendanceSummary = useMemo(() => {
    const summary = {
      totalStudents: sortedStudents.length,
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
    };
    sortedStudents.forEach(student => {
      const record = attendanceRecords.find(
        r => r.admissionNo === student.admissionNo && r.date === filters.date
      );
      if (record) {
        summary[record.status.toLowerCase()] = (summary[record.status.toLowerCase()] || 0) + 1;
      }
    });
    const totalAttendance = summary.present + summary.absent + summary.late + summary.excused;
    summary.attendancePercentage = totalAttendance > 0 ? ((summary.present / totalAttendance) * 100).toFixed(2) : 0;
    return summary;
  }, [sortedStudents, attendanceRecords, filters.date]);

  // Individual attendance for selected student and date
  const individualAttendance = useMemo(() => {
    if (!selectedStudent) return [];
    return attendanceRecords.filter(record => 
      record.admissionNo === selectedStudent && record.date === filters.date
    );
  }, [attendanceRecords, selectedStudent, filters.date]);

  // Monthly attendance for selected student
  const monthlyAttendance = useMemo(() => {
    if (!selectedStudent) return { records: [], summary: {} };
    const [year, month] = filters.month.split('-');
    const startDate = startOfMonth(parse(`${year}-${month}`, 'yyyy-MM', new Date()));
    const endDate = endOfMonth(startDate);
    const records = attendanceRecords.filter(record => {
      const recordDate = parse(record.date, 'yyyy-MM-dd', new Date());
      return (
        record.admissionNo === selectedStudent &&
        recordDate >= startDate &&
        recordDate <= endDate
      );
    });
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === 'Present').length;
    const absentDays = records.filter(r => r.status === 'Absent').length;
    const lateDays = records.filter(r => r.status === 'Late').length;
    const excusedDays = records.filter(r => r.status === 'Excused').length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
    return { 
      records, 
      summary: { 
        admissionNo: selectedStudent,
        name: `${students.find(s => s.admissionNo === selectedStudent)?.firstName} ${students.find(s => s.admissionNo === selectedStudent)?.lastName}`,
        totalDays, 
        presentDays, 
        absentDays, 
        lateDays, 
        excusedDays, 
        attendancePercentage 
      }
    };
  }, [attendanceRecords, selectedStudent, filters.month]);

  // Date-wise attendance for selected student
  const dateWiseAttendance = useMemo(() => {
    if (!selectedStudent) return [];
    return attendanceRecords.filter(record => record.admissionNo === selectedStudent);
  }, [attendanceRecords, selectedStudent]);

  // Export to CSV
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(val => `"${val.toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');
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
      className="min-h-screen font-sans"
    >
      <div className="mx-auto">
        <Card className="bg-white/95 backdrop-blur-md shadow-lg rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Student Attendance
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              {format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a")} IST
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
                  <Search className="mr-2 h-6 w-6 text-indigo-600" /> Search Attendance
                </h2>
                <Button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                >
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: 'degree', label: 'Degree', options: ['UG', 'PG'] },
                  { key: 'department', label: 'Department', options: ['Computer Science', 'Economics', 'Mathematics', 'Physics'] },
                  { key: 'academicYear', label: 'Academic Year', options: ['2024-2025', '2023-2024'] },
                  { key: 'course', label: 'Course', options: ['B.Sc Computer Science', 'B.A Economics', 'M.Sc Computer Science', 'B.Sc Mathematics', 'M.A Economics', 'B.Sc Physics', 'M.Sc Mathematics'] },
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-600" /> Date
                  </label>
                  <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-600" /> Month
                  </label>
                  <Input
                    type="month"
                    value={filters.month}
                    onChange={(e) => handleFilterChange('month', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Attendance Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
                <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Attendance Summary
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-50">
                    <TableHead className="text-indigo-800 font-semibold">Total Students</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Present</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Absent</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Late</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Excused</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Attendance %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50 transition-colors">
                    <TableCell>{attendanceSummary.totalStudents}</TableCell>
                    <TableCell>{attendanceSummary.present}</TableCell>
                    <TableCell>{attendanceSummary.absent}</TableCell>
                    <TableCell>{attendanceSummary.late}</TableCell>
                    <TableCell>{attendanceSummary.excused}</TableCell>
                    <TableCell>{attendanceSummary.attendancePercentage}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>

            {/* Students Table (Conditional) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                <User className="mr-2 h-6 w-6 text-indigo-600" /> Students
              </h2>
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
                      <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                      <TableHead
                        className="text-indigo-800 font-semibold cursor-pointer"
                        onClick={() => handleSort('status')}
                      >
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStudents.length > 0 ? (
                      sortedStudents.map((student) => {
                        const status = attendanceRecords.find(
                          r => r.admissionNo === student.admissionNo && r.date === filters.date
                        )?.status || 'Select Status';
                        return (
                          <TableRow key={student.admissionNo} className="hover:bg-gray-50 transition-colors">
                            <TableCell>{student.admissionNo}</TableCell>
                            <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                            <TableCell>{student.degree}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>{student.course}</TableCell>
                            <TableCell>{student.semester}</TableCell>
                            <TableCell>
                              <Select
                                value={status}
                                onValueChange={(value) => handleStatusChange(student.admissionNo, value)}
                              >
                                <SelectTrigger className={`w-[120px] rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${
                                  status === 'Present' ? 'text-green-600 font-medium' :
                                  status === 'Absent' ? 'text-red-600 font-medium' :
                                  status === 'Late' ? 'text-yellow-600 font-medium' :
                                  status === 'Excused' ? 'text-blue-600 font-medium' : 'text-gray-500'
                                }`}>
                                  <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Select Status">Select Status</SelectItem>
                                  <SelectItem value="Present">Present</SelectItem>
                                  <SelectItem value="Absent">Absent</SelectItem>
                                  <SelectItem value="Late">Late</SelectItem>
                                  <SelectItem value="Excused">Excused</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => setSelectedStudent(student.admissionNo)}
                                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg"
                              >
                                View Attendance
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                          No students found matching the filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Please fill all filter options to view and mark student attendance.
                </p>
              )}
            </motion.div>

            {/* Individual Attendance Report */}
            {selectedStudent && (
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                      <User className="mr-2 h-6 w-6 text-indigo-600" /> Individual Attendance
                    </h2>
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
                  >
                    <div className="flex justify-end mb-4">
                      <Button
                        onClick={() => exportToCSV(individualAttendance, 'individual_attendance.csv')}
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
                          <TableHead className="text-indigo-800 font-semibold">Date</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {individualAttendance.length > 0 ? (
                          individualAttendance.map((record) => {
                            const student = students.find(s => s.admissionNo === record.admissionNo);
                            return (
                              <TableRow key={`${record.admissionNo}-${record.date}`} className="hover:bg-gray-50 transition-colors">
                                <TableCell>{record.admissionNo}</TableCell>
                                <TableCell>{`${student?.firstName} ${student?.lastName}`}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell className={
                                  record.status === 'Present' ? 'text-green-600 font-medium' :
                                  record.status === 'Absent' ? 'text-red-600 font-medium' :
                                  record.status === 'Late' ? 'text-yellow-600 font-medium' :
                                  record.status === 'Excused' ? 'text-blue-600 font-medium' : 'text-gray-500'
                                }>
                                  {record.status}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                              No attendance records found for the selected date.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Monthly Attendance Report */}
            {selectedStudent && (
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                      <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Monthly Attendance Summary
                    </h2>
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
                  >
                    <div className="flex justify-end mb-4">
                      <Button
                        onClick={() => exportToCSV([monthlyAttendance.summary], 'monthly_attendance.csv')}
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </div>
                    {monthlyAttendance.records.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-indigo-50">
                            <TableHead className="text-indigo-800 font-semibold">Admission No</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Total Days</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Present</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Absent</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Late</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Excused</TableHead>
                            <TableHead className="text-indigo-800 font-semibold">Attendance %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-gray-50 transition-colors">
                            <TableCell>{monthlyAttendance.summary.admissionNo}</TableCell>
                            <TableCell>{monthlyAttendance.summary.name}</TableCell>
                            <TableCell>{monthlyAttendance.summary.totalDays}</TableCell>
                            <TableCell>{monthlyAttendance.summary.presentDays}</TableCell>
                            <TableCell>{monthlyAttendance.summary.absentDays}</TableCell>
                            <TableCell>{monthlyAttendance.summary.lateDays}</TableCell>
                            <TableCell>{monthlyAttendance.summary.excusedDays}</TableCell>
                            <TableCell>{monthlyAttendance.summary.attendancePercentage}%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-center text-gray-500 py-4">No monthly attendance records found for the selected student.</p>
                    )}
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Date-wise Attendance Report */}
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
                      <Calendar className="mr-2 h-6 w-6 text-indigo-600" /> Date-wise Attendance
                    </h2>
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
                  >
                    <div className="flex justify-end mb-4">
                      <Button
                        onClick={() => exportToCSV(dateWiseAttendance.map(record => ({
                          admissionNo: record.admissionNo,
                          name: `${students.find(s => s.admissionNo === record.admissionNo)?.firstName} ${students.find(s => s.admissionNo === record.admissionNo)?.lastName}`,
                          date: record.date,
                          status: record.status,
                        })), 'datewise_attendance.csv')}
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
                          <TableHead className="text-indigo-800 font-semibold">Date</TableHead>
                          <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dateWiseAttendance.length > 0 ? (
                          dateWiseAttendance.map((record) => {
                            const student = students.find(s => s.admissionNo === record.admissionNo);
                            return (
                              <TableRow key={`${record.admissionNo}-${record.date}`} className="hover:bg-gray-50 transition-colors">
                                <TableCell>{record.admissionNo}</TableCell>
                                <TableCell>{`${student?.firstName} ${student?.lastName}`}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell className={
                                  record.status === 'Present' ? 'text-green-600 font-medium' :
                                  record.status === 'Absent' ? 'text-red-600 font-medium' :
                                  record.status === 'Late' ? 'text-yellow-600 font-medium' :
                                  record.status === 'Excused' ? 'text-blue-600 font-medium' : 'text-gray-500'
                                }>
                                  {record.status}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                              No date-wise attendance records found for the selected student.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}