'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, Search, Filter, Edit, FileText } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Input,
} from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Button,
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function StudentsPage() {
  // Mock student data (replace with actual API call in a real application)
  const [students, setStudents] = useState([
    {
      admissionNo: 'A001',
      firstName: 'John',
      lastName: 'Doe',
      course: 'B.Sc Computer Science',
      degree: 'UG',
      semester: '3',
      emailId: 'john.doe@example.com',
      phoneNumber: '1234567890',
    },
    {
      admissionNo: 'A002',
      firstName: 'Jane',
      lastName: 'Smith',
      course: 'B.A Economics',
      degree: 'UG',
      semester: '5',
      emailId: 'jane.smith@example.com',
      phoneNumber: '0987654321',
    },
    // Add more mock data as needed
  ]);

  const [filters, setFilters] = useState({
    name: '',
    admissionNo: '',
    course: '',
    degree: '',
    semester: '',
  });
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();


  // Filter students based on filter criteria
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      return (
        (filters.name === '' || 
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.admissionNo === '' || 
          student.admissionNo.toLowerCase().includes(filters.admissionNo.toLowerCase())) &&
        (filters.course === '' || student.course === filters.course) &&
        (filters.degree === '' || filters.degree === student.degree) &&
        (filters.semester === '' || filters.semester === student.semester)
      );
    });
  }, [students, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    Object.entries(student).forEach(([key, value]) => setValue(key, value));
    setUpdateDialogOpen(true);
  };

  const onUpdateSubmit = (data) => {
    setStudents(prev => 
      prev.map(student => 
        student.admissionNo === selectedStudent.admissionNo ? { ...student, ...data } : student
      )
    );
    setUpdateDialogOpen(false);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans p-4 md:p-8"
    >
      <div className="mx-auto">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Students List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                <Filter className="mr-2 h-6 w-6 text-indigo-600" /> Filter Students
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Search className="mr-2 h-5 w-5 text-indigo-600" /> Name
                  </label>
                  <Input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search by name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Admission No
                  </label>
                  <Input
                    type="text"
                    value={filters.admissionNo}
                    onChange={(e) => handleFilterChange('admissionNo', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search by admission number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Course
                  </label>
                  <Select
                    value={filters.course}
                    onValueChange={(value) => handleFilterChange('course', value)}
                  >
                    <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      {['B.Sc Computer Science', 'B.A Economics'].map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Degree
                  </label>
                  <Select
                    value={filters.degree}
                    onValueChange={(value) => handleFilterChange('degree', value)}
                  >
                    <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {['UG', 'PG'].map((degree) => (
                        <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Semester
                  </label>
                  <Select
                    value={filters.semester}
                    onValueChange={(value) => handleFilterChange('semester', value)}
                  >
                    <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {['1', '2', '3', '4', '5', '6'].map((sem) => (
                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Students Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                <User className="mr-2 h-6 w-6 text-indigo-600" /> Students
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-50">
                    <TableHead className="text-indigo-800 font-semibold">Admission No</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Email</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Phone</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.admissionNo} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{student.admissionNo}</TableCell>
                      <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.degree}</TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell>{student.emailId}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleUpdateClick(student)}
                          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200 flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" /> Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </CardContent>
        </Card>

        {/* Update Dialog */}
        <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
          <DialogContent className="w-full sm:max-w-[90vw] bg-white border-2 border-indigo-200 rounded-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-indigo-800 flex items-center gap-2">
                <User className="w-6 h-6 text-indigo-700" />
                Update Student Details
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Modify the student information below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 'admissionNo', label: 'Admission No', type: 'text', readOnly: true },
                  { id: 'firstName', label: 'First Name', type: 'text' },
                  { id: 'lastName', label: 'Last Name', type: 'text' },
                  { id: 'course', label: 'Course', type: 'text' },
                  { id: 'degree', label: 'Degree', type: 'text' },
                  { id: 'semester', label: 'Semester', type: 'text' },
                  { id: 'emailId', label: 'Email ID', type: 'email' },
                  { id: 'phoneNumber', label: 'Phone Number', type: 'tel' },
                ].map(({ id, label, type, readOnly }) => (
                  <div key={id} className="space-y-2">
                    <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-indigo-600" /> {label}
                    </label>
                    <Input
                      {...register(id, { required: !readOnly && `Please enter ${label.toLowerCase()}` })}
                      type={type}
                      id={id}
                      readOnly={readOnly}
                      className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors[id] ? 'border-red-500' : ''}`}
                    />
                    {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
                  </div>
                ))}
              </div>
              <DialogFooter className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUpdateDialogOpen(false);
                    reset();
                  }}
                  className="w-full sm:w-auto hover:scale-105 transition-all duration-200 border-indigo-300 text-indigo-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}