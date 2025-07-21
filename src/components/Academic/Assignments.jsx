'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '../ui/input';

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    degree: 'UG',
    course: 'B.Com General',
    department: 'COMMERCE',
    semester: 'Semester 1',
    subject: '',
    workDescription: '',
    dueDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({ search: '', department: '', degree: '', semester: '' });

  const degrees = ['UG', 'PG'];
  const courses = ['B.Com General', 'BSc', 'BA'];
  const departments = ['COMMERCE', 'SCIENCE', 'ARTS'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  useEffect(() => {
    // Simulate fetching existing assignments
  }, []);

  const handleSubmit = () => {
    if (!newAssignment.subject || !newAssignment.workDescription || !newAssignment.dueDate) {
      toast.error('Error', { description: 'Subject, Work Description, and Deadline Date are required.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setAssignments(prev => [...prev, { ...newAssignment, id: Date.now().toString() }]);
      setNewAssignment({
        degree: 'UG',
        course: 'B.Com General',
        department: 'COMMERCE',
        semester: 'Semester 1',
        subject: '',
        workDescription: '',
        dueDate: '',
      });
      toast.success('Success', { description: 'Assignment created successfully.' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setNewAssignment({
      degree: 'UG',
      course: 'B.Com General',
      department: 'COMMERCE',
      semester: 'Semester 1',
      subject: '',
      workDescription: '',
      dueDate: '',
    });
  };

  const filteredAssignments = assignments.filter(ass =>
    (!filters.search || ass.subject.toLowerCase().includes(filters.search.toLowerCase())) &&
    (!filters.department || ass.department === filters.department) &&
    (!filters.degree || ass.degree === filters.degree) &&
    (!filters.semester || ass.semester === filters.semester)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans "
    >
      <div className="mx-auto ">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Assignment Management
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              {format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a 'IST'")}
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Subject..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-2/3">
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
                <Button variant="outline" onClick={() => setFilters({ search: '', degree: '', department: '', semester: '' })}>
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
              </div>
            </div>

            {/* Assignment Form */}
            <div className="mb-6 p-4 border border-indigo-100 rounded-xl">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Add New Assignment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Degree</label>
                    <Select value={newAssignment.degree} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, degree: value }))}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        {degrees.map((deg) => (
                          <SelectItem key={deg} value={deg}>{deg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Course</label>
                    <Select value={newAssignment.course} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, course: value }))}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <Select value={newAssignment.department} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Semester</label>
                    <Select value={newAssignment.semester} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, semester: value }))}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((sem) => (
                          <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <Input
                      value={newAssignment.subject}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Enter Subject"
                      className="w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Work Description</label>
                    <Input
                      value={newAssignment.workDescription}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, workDescription: e.target.value }))}
                      placeholder="Enter Work Description"
                      className="w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Deadline Date</label>
                    <Input
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Submit
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              </div>
            </div>

            {/* Display Assigned Assignments */}
            {assignments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Assigned Assignments</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Subject</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Work Description</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Deadline Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.map((ass) => (
                      <TableRow key={ass.id}>
                        <TableCell>{ass.degree}</TableCell>
                        <TableCell>{ass.course}</TableCell>
                        <TableCell>{ass.department}</TableCell>
                        <TableCell>{ass.semester}</TableCell>
                        <TableCell>{ass.subject}</TableCell>
                        <TableCell>{ass.workDescription}</TableCell>
                        <TableCell>{ass.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}