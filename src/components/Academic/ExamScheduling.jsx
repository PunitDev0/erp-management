'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
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

export default function ExamSchedulingPage() {
  const [exams, setExams] = useState([
    { id: 'E001', course: 'Mathematics', degree: 'BSc', department: 'Science', semester: 'Semester 1', date: '2025-07-21', time: '09:00-11:00', room: 'A101' },
    { id: 'E002', course: 'Physics', degree: 'BSc', department: 'Science', semester: 'Semester 2', date: '2025-07-22', time: '10:00-12:00', room: 'A102' },
    { id: 'E003', course: 'Chemistry', degree: 'BA', department: 'Arts', semester: 'Semester 1', date: '2025-07-23', time: '09:00-11:00', room: 'A103' },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExam, setNewExam] = useState({ id: '', course: '', degree: '', department: '', semester: '', date: '', time: '', room: '' });
  const [filters, setFilters] = useState({ course: '', degree: '', department: '', semester: '', date: '' });
  const [isSaving, setIsSaving] = useState(false);

  const departments = [...new Set(exams.map(exam => exam.department))];
  const degrees = [...new Set(exams.map(exam => exam.degree))];
  const courses = [...new Set(exams.map(exam => exam.course))];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  useEffect(() => {
    // Simulate API call or data fetch
  }, []);

  const handleAddSave = () => {
    if (!newExam.id || !newExam.course || !newExam.degree || !newExam.department || !newExam.semester || !newExam.date || !newExam.time || !newExam.room) {
      toast({ title: 'Error', description: 'All fields are required.', variant: 'destructive' });
      return;
    }
    setExams(prev => [...prev, { ...newExam }]);
    setIsAddModalOpen(false);
    setNewExam({ id: '', course: '', degree: '', department: '', semester: '', date: '', time: '', room: '' });
    toast({ title: 'Success', description: 'Exam scheduled successfully.' });
  };

  const filteredExams = exams.filter(exam =>
    (!filters.course || exam.course.toLowerCase().includes(filters.course.toLowerCase())) &&
    (!filters.degree || exam.degree === filters.degree) &&
    (!filters.department || exam.department === filters.department) &&
    (!filters.semester || exam.semester === filters.semester) &&
    (!filters.date || exam.date === filters.date)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans"
    >
      <div className="mx-auto">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Exam Scheduling
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Monday, July 21, 2025 at 12:49 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Course..."
                    value={filters.course}
                    onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
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
                <Input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full"
                />
                <Button variant="outline" onClick={() => setFilters({ course: '', degree: '', department: '', semester: '', date: '' })}>
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                      <Plus className="mr-2 h-4 w-4" /> Add Exam
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Exam</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Exam ID (e.g., E004)" value={newExam.id} onChange={(e) => setNewExam(prev => ({ ...prev, id: e.target.value }))} />
                      <Select value={newExam.course} onValueChange={(value) => setNewExam(prev => ({ ...prev, course: value }))}>
                        <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={newExam.degree} onValueChange={(value) => setNewExam(prev => ({ ...prev, degree: value }))}>
                        <SelectTrigger><SelectValue placeholder="Select Degree" /></SelectTrigger>
                        <SelectContent>
                          {degrees.map((deg) => (
                            <SelectItem key={deg} value={deg}>{deg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={newExam.department} onValueChange={(value) => setNewExam(prev => ({ ...prev, department: value }))}>
                        <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={newExam.semester} onValueChange={(value) => setNewExam(prev => ({ ...prev, semester: value }))}>
                        <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                        <SelectContent>
                          {semesters.map((sem) => (
                            <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="date" value={newExam.date} onChange={(e) => setNewExam(prev => ({ ...prev, date: e.target.value }))} />
                      <Input placeholder="Time (e.g., 09:00-11:00)" value={newExam.time} onChange={(e) => setNewExam(prev => ({ ...prev, time: e.target.value }))} />
                      <Input placeholder="Room" value={newExam.room} onChange={(e) => setNewExam(prev => ({ ...prev, room: e.target.value }))} />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                      <Button onClick={() => { setIsSaving(true); setTimeout(() => { handleAddSave(); setIsSaving(false); }, 1000); }} className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-50">
                  <TableHead className="text-indigo-800 font-semibold">Exam ID</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Date</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Time</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Room</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam, index) => (
                  <TableRow key={index}>
                    <TableCell>{exam.id}</TableCell>
                    <TableCell>{exam.course}</TableCell>
                    <TableCell>{exam.degree}</TableCell>
                    <TableCell>{exam.department}</TableCell>
                    <TableCell>{exam.semester}</TableCell>
                    <TableCell>{format(new Date(exam.date), 'yyyy-MM-dd')}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                    <TableCell>{exam.room}</TableCell>
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