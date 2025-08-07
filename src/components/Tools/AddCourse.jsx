'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, Plus } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

export default function CourseManagementPage() {
  const [degree, setDegree] = useState('UG');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('Admin User');

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  const handleSubmit = () => {
    if (!course.trim()) {
      toast.error('Error', { description: 'Course name is required.' });
      return;
    }
    if (courses.some(c => c.degree === degree && c.name.toLowerCase() === course.trim().toLowerCase())) {
      toast.error('Error', { description: 'Course already exists for this degree.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newCourse = { id: Date.now().toString(), degree, name: course.trim(), status: 'ON' };
      setCourses(prev => [...prev, newCourse]);
      localStorage.setItem('courses', JSON.stringify([...courses, newCourse]));
      setCourse('');
      toast.success('Success', { description: 'Course added successfully.' });
      setIsSubmitting(false);
    }, 500);
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find(c => c.id === id);
    if (courseToEdit) {
      setDegree(courseToEdit.degree);
      setCourse(courseToEdit.name);
      setCourses(prev => prev.filter(c => c.id !== id));
      localStorage.setItem('courses', JSON.stringify(courses.filter(c => c.id !== id)));
      toast.success('Success', { description: 'Course moved to edit mode.' });
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
      localStorage.setItem('courses', JSON.stringify(courses.filter(c => c.id !== id)));
      toast.success('Success', { description: 'Course deleted successfully.' });
    }
  };

  const handleToggleStatus = (id) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: c.status === 'ON' ? 'OFF' : 'ON' } : c
      )
    );
    localStorage.setItem('courses', JSON.stringify(
      courses.map(c =>
        c.id === id ? { ...c, status: c.status === 'ON' ? 'OFF' : 'ON' } : c
      )
    ));
    toast.success('Success', { description: 'Status updated.' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans"
    >
      <div className="mx-auto">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              ERP Management System
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Tuesday, July 29, 2025 at 12:09 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Add Course</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <Input
                    value={loggedInUser}
                    readOnly
                    className="w-full bg-gray-100 mb-4 md:mb-0"
                  />
                </div>
                <div className="w-full md:w-2/3 flex gap-4">
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="PhD">PhD</option>
                  </select>
                  <Input
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="Enter course name (e.g., B.Tech or B.B.A)"
                    className="w-full"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            {courses.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Course Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="text-indigo-800 font-semibold">S.No</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Edit</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Delete</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((c, index) => (
                      <TableRow key={c.id} className="hover:bg-gray-50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{c.degree}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(c.id)}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(c.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(c.id)}
                            className={`${
                              c.status === 'ON' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                          >
                            {c.status}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {courses.length === 0 && (
              <p className="text-center text-gray-500">No courses found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}