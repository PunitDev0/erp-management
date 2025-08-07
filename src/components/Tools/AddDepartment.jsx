'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, Search, RotateCcw } from 'lucide-react';
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

export default function DepartmentManagementPage() {
  const [degree, setDegree] = useState('UG');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [semesters, setSemesters] = useState('6');
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('Admin User');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedDepartments = localStorage.getItem('departments');
    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments));
    }
  }, []);

  const handleSubmit = () => {
    if (!department.trim()) {
      toast.error('Error', { description: 'Department name is required.' });
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(department.trim())) {
      toast.error('Error', { description: 'Department name must contain only letters and spaces.' });
      return;
    }
    if (semesters <= 0 || semesters > 12 || !Number.isInteger(Number(semesters))) {
      toast.error('Error', { description: 'Semesters must be an integer between 1 and 12.' });
      return;
    }
    if (departments.some(d => d.degree === degree && d.course === course && d.name.toLowerCase() === department.trim().toLowerCase())) {
      toast.error('Error', { description: 'Department already exists for this degree and course.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newDepartment = { id: Date.now().toString(), degree, course, name: department.trim(), semesters, status: 'ON' };
      setDepartments(prev => [...prev, newDepartment]);
      localStorage.setItem('departments', JSON.stringify([...departments, newDepartment]));
      resetForm();
      toast.success('Success', { description: 'Department added successfully.' });
      setIsSubmitting(false);
    }, 500);
  };

  const handleEdit = (id) => {
    const deptToEdit = departments.find(d => d.id === id);
    if (deptToEdit) {
      setDegree(deptToEdit.degree);
      setCourse(deptToEdit.course);
      setDepartment(deptToEdit.name);
      setSemesters(deptToEdit.semesters);
      setDepartments(prev => prev.filter(d => d.id !== id));
      localStorage.setItem('departments', JSON.stringify(departments.filter(d => d.id !== id)));
      toast.success('Success', { description: 'Department moved to edit mode.' });
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this department?')) {
      setDepartments(prev => prev.filter(d => d.id !== id));
      localStorage.setItem('departments', JSON.stringify(departments.filter(d => d.id !== id)));
      toast.success('Success', { description: 'Department deleted successfully.' });
    }
  };

  const handleToggleStatus = (id) => {
    setDepartments(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status: d.status === 'ON' ? 'OFF' : 'ON' } : d
      )
    );
    localStorage.setItem('departments', JSON.stringify(
      departments.map(d =>
        d.id === id ? { ...d, status: d.status === 'ON' ? 'OFF' : 'ON' } : d
      )
    ));
    toast.success('Success', { description: 'Status updated.' });
  };

  const resetForm = () => {
    setDegree('UG');
    setCourse('');
    setDepartment('');
    setSemesters('6');
  };

  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.course.toLowerCase().includes(searchTerm.toLowerCase())
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
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              ERP Management System
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Tuesday, July 29, 2025 at 12:16 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Add Department</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <Input
                    value={loggedInUser}
                    readOnly
                    className="w-full bg-gray-100 mb-4 md:mb-0"
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-4">
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="PhD">PhD</option>
                  </select>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Course</option>
                    <option value="B.C.A">B.C.A</option>
                    <option value="B.Sc Maths">B.Sc Maths</option>
                    <option value="B.Sc Computer">B.Sc Computer</option>
                    <option value="B.A English">B.A English</option>
                    <option value="B.Com (C.S)">B.Com (C.S)</option>
                    <option value="B.B.A">B.B.A</option>
                  </select>
                  <Input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Enter department name"
                    className="w-full"
                  />
                  <Input
                    type="number"
                    value={semesters}
                    onChange={(e) => setSemesters(e.target.value)}
                    placeholder="Total semesters"
                    className="w-full"
                    min="1"
                    max="12"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" /> Reset
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by department or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
            {filteredDepartments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Department Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="text-indigo-800 font-semibold">S.No</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Semesters</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Edit</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Delete</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepartments.map((d, index) => (
                      <TableRow key={d.id} className="hover:bg-gray-50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{d.degree}</TableCell>
                        <TableCell>{d.course}</TableCell>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>{d.semesters}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(d.id)}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(d.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(d.id)}
                            className={`${
                              d.status === 'ON' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                          >
                            {d.status}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {filteredDepartments.length === 0 && (
              <p className="text-center text-gray-500">No departments found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}