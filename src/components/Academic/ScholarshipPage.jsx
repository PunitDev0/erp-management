'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Input } from '../ui/input';

export default function ScholarshipPage() {
  const [students, setStudents] = useState([
    { id: 'ST001', name: 'John Doe', department: 'Science', degree: 'BSc', semester: 'Semester 1', gpa: 3.7, rollNumber: 'S001', fatherName: 'Robert Doe', fatherOccupation: 'Engineer', income: 50000, religion: 'Christian', caste: 'General', community: 'Urban', scholarship: null },
    { id: 'ST002', name: 'Jane Smith', department: 'Arts', degree: 'BA', semester: 'Semester 2', gpa: 3.2, rollNumber: 'A001', fatherName: 'Michael Smith', fatherOccupation: 'Teacher', income: 30000, religion: 'Hindu', caste: 'OBC', community: 'Rural', scholarship: null },
    { id: 'ST003', name: 'Alex Brown', department: 'Science', degree: 'MSc', semester: 'Semester 3', gpa: 3.9, rollNumber: 'S002', fatherName: 'David Brown', fatherOccupation: 'Doctor', income: 80000, religion: 'Muslim', caste: 'SC', community: 'Urban', scholarship: null },
  ]);
  const [scholarships] = useState([
    { id: 'S001', name: 'Merit Scholarship', amount: 5000, eligibility: 'GPA > 3.5' },
    { id: 'S002', name: 'Need-Based Scholarship', amount: 3000, eligibility: 'GPA > 3.0' },
  ]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newAssignment, setNewAssignment] = useState({ scholarshipId: '', title: '', sponsoredBy: '', amount: '', scholarshipDate: '' });
  const [filters, setFilters] = useState({ search: '', department: '', degree: '', semester: '' });
  const [isSaving, setIsSaving] = useState(false);

  const departments = [...new Set(students.map(s => s.department))];
  const degrees = [...new Set(students.map(s => s.degree))];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  useEffect(() => {
    // Simulate API call or data fetch
  }, []);

  const handleAssignSave = () => {
    if (!newAssignment.scholarshipId || !newAssignment.title || !newAssignment.sponsoredBy || !newAssignment.amount || !newAssignment.scholarshipDate) {
      toast.error('Error', { description: 'All fields are required.' });
      return;
    }
    const selectedScholarship = scholarships.find(sch => sch.id === newAssignment.scholarshipId);
    const amountNum = parseInt(newAssignment.amount, 10);
    setStudents(prev => prev.map(s =>
      s.id === selectedStudent.id ? { ...s, scholarship: { ...selectedScholarship, title: newAssignment.title, sponsoredBy: newAssignment.sponsoredBy, amount: isNaN(amountNum) ? selectedScholarship.amount : amountNum, scholarshipDate: newAssignment.scholarshipDate } } : s
    ));
    setIsAssignModalOpen(false);
    setNewAssignment({ scholarshipId: '', title: '', sponsoredBy: '', amount: '', scholarshipDate: '' });
    setSelectedStudent(null);
    toast.success('Success', { description: 'Scholarship assigned successfully.' });
  };

  const suggestScholarship = (gpa) => {
    if (gpa > 3.5) return 'S001'; // Merit Scholarship
    if (gpa > 3.0) return 'S002'; // Need-Based Scholarship
    return null;
  };

  const filteredStudents = students.filter(student =>
    (!filters.search || student.name.toLowerCase().includes(filters.search.toLowerCase())) &&
    (!filters.department || student.department === filters.department) &&
    (!filters.degree || student.degree === filters.degree) &&
    (!filters.semester || student.semester === filters.semester)
  );

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
              Scholarship Assignment
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Monday, July 21, 2025 at 2:55 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Student Name..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-2/3">
                <Select value={filters.department} onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.degree} onValueChange={(value) => setFilters(prev => ({ ...prev, degree: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {degrees.map((deg) => (
                      <SelectItem key={deg} value={deg}>{deg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.semester} onValueChange={(value) => setFilters(prev => ({ ...prev, semester: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setFilters({ search: '', department: '', degree: '', semester: '' })}>
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-50">
                  <TableHead className="text-indigo-800 font-semibold">Student ID</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">GPA</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Scholarship</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.degree}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>{student.gpa}</TableCell>
                    <TableCell>{student.scholarship ? `${student.scholarship.name} ($${student.scholarship.amount})` : 'None'}</TableCell>
                    <TableCell>
                      <Dialog open={isAssignModalOpen && selectedStudent?.id === student.id} onOpenChange={setIsAssignModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={student.scholarship} onClick={() => { setSelectedStudent(student); setNewAssignment({ scholarshipId: suggestScholarship(student.gpa) || '', title: '', sponsoredBy: '', amount: '', scholarshipDate: '' }); }}>
                            Assign
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Scholarship to {student.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Student Details Section */}
                            <div className="border-b border-indigo-200 pb-4">
                              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Student Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                  value={student.rollNumber}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Roll Number"
                                />
                                <Input
                                  value={student.name}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Student Name"
                                />
                                <Input
                                  value={student.fatherName}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Father Name"
                                />
                                <Input
                                  value={student.fatherOccupation}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Father Occupation"
                                />
                                <Input
                                  value={student.income}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Your Income"
                                />
                                <Input
                                  value={student.religion}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Religion"
                                />
                                <Input
                                  value={student.caste}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Caste"
                                />
                                <Input
                                  value={student.community}
                                  readOnly
                                  className="bg-gray-100"
                                  placeholder="Community"
                                />
                              </div>
                            </div>
                            {/* Scholarship Details Section */}
                            <div className="pt-4">
                              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Scholarship Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p className="text-gray-600">Suggested Scholarship (based on GPA {student.gpa}):</p>
                                {suggestScholarship(student.gpa) ? (
                                  <Select value={newAssignment.scholarshipId} onChange={(e) => setNewAssignment(prev => ({ ...prev, scholarshipId: e.target.value }))}>
                                    <SelectTrigger><SelectValue placeholder="Select Scholarship" /></SelectTrigger>
                                    <SelectContent>
                                      {scholarships.map((sch) => (
                                        <SelectItem key={sch.id} value={sch.id} disabled={suggestScholarship(student.gpa) && sch.id !== suggestScholarship(student.gpa)}>
                                          {sch.name} ($${sch.amount}) - {sch.eligibility}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <p className="text-red-600">No eligible scholarship available.</p>
                                )}
                                <Input
                                  value={newAssignment.title}
                                  onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                                  placeholder="Title"
                                />
                                <Input
                                  value={newAssignment.sponsoredBy}
                                  onChange={(e) => setNewAssignment(prev => ({ ...prev, sponsoredBy: e.target.value }))}
                                  placeholder="Sponsored By"
                                />
                                <Input
                                  type="number"
                                  value={newAssignment.amount}
                                  onChange={(e) => setNewAssignment(prev => ({ ...prev, amount: e.target.value }))}
                                  placeholder="Amount in Rupees"
                                />
                                <Input
                                  type="date"
                                  value={newAssignment.scholarshipDate}
                                  onChange={(e) => setNewAssignment(prev => ({ ...prev, scholarshipDate: e.target.value }))}
                                  placeholder="Scholarship Date"
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => { setIsAssignModalOpen(false); setSelectedStudent(null); }}>Cancel</Button>
                            <Button onClick={() => { setIsSaving(true); setTimeout(() => { handleAssignSave(); setIsSaving(false); }, 1000); }} className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={isSaving || !suggestScholarship(student.gpa)}>
                              {isSaving ? 'Assigning...' : 'Assign'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}