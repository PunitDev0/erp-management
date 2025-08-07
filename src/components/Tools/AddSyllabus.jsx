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

export default function SyllabusManagementPage() {
  const [degree, setDegree] = useState('UG');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [semester, setSemester] = useState('1');
  const [syllabuses, setSyllabuses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('Admin User');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedSyllabuses = localStorage.getItem('syllabuses');
    if (savedSyllabuses) {
      setSyllabuses(JSON.parse(savedSyllabuses));
    }
  }, []);

  const handleSubmit = () => {
    if (!syllabus.trim()) {
      toast.error('Error', { description: 'Syllabus content is required.' });
      return;
    }
    if (!/^[a-zA-Z0-9\s.,-]+$/.test(syllabus.trim())) {
      toast.error('Error', { description: 'Syllabus content must contain only letters, numbers, spaces, and basic punctuation.' });
      return;
    }
    if (semester <= 0 || semester > 12 || !Number.isInteger(Number(semester))) {
      toast.error('Error', { description: 'Semester must be an integer between 1 and 12.' });
      return;
    }
    if (syllabuses.some(s => s.degree === degree && s.course === course && s.department === department && s.subject === subject && s.semester === semester)) {
      toast.error('Error', { description: 'Syllabus already exists for this degree, course, department, subject, and semester.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newSyllabus = { id: Date.now().toString(), degree, course, department, subject, syllabus: syllabus.trim(), semester, status: 'ON' };
      setSyllabuses(prev => [...prev, newSyllabus]);
      localStorage.setItem('syllabuses', JSON.stringify([...syllabuses, newSyllabus]));
      resetForm();
      toast.success('Success', { description: 'Syllabus added successfully.' });
      setIsSubmitting(false);
    }, 500);
  };

  const handleEdit = (id) => {
    const syllToEdit = syllabuses.find(s => s.id === id);
    if (syllToEdit) {
      setDegree(syllToEdit.degree);
      setCourse(syllToEdit.course);
      setDepartment(syllToEdit.department);
      setSubject(syllToEdit.subject);
      setSyllabus(syllToEdit.syllabus);
      setSemester(syllToEdit.semester);
      setSyllabuses(prev => prev.filter(s => s.id !== id));
      localStorage.setItem('syllabuses', JSON.stringify(syllabuses.filter(s => s.id !== id)));
      toast.success('Success', { description: 'Syllabus moved to edit mode.' });
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this syllabus?')) {
      setSyllabuses(prev => prev.filter(s => s.id !== id));
      localStorage.setItem('syllabuses', JSON.stringify(syllabuses.filter(s => s.id !== id)));
      toast.success('Success', { description: 'Syllabus deleted successfully.' });
    }
  };

  const handleToggleStatus = (id) => {
    setSyllabuses(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status: s.status === 'ON' ? 'OFF' : 'ON' } : s
      )
    );
    localStorage.setItem('syllabuses', JSON.stringify(
      syllabuses.map(s =>
        s.id === id ? { ...s, status: s.status === 'ON' ? 'OFF' : 'ON' } : s
      )
    ));
    toast.success('Success', { description: 'Status updated.' });
  };

  const resetForm = () => {
    setDegree('UG');
    setCourse('');
    setDepartment('');
    setSubject('');
    setSyllabus('');
    setSemester('1');
  };

  const filteredSyllabuses = syllabuses.filter(s =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans"
    >
      <div className="mx-auto ">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              ERP Management System
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Tuesday, July 29, 2025 at 12:45 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Add Syllabus</h3>
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
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Application">Computer Application</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                    <option value="Corporate Secretariship">Corporate Secretariship</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Subject</option>
                    <option value="Programming">Programming</option>
                    <option value="Calculus">Calculus</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Literature">Literature</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Management">Management</option>
                  </select>
                  <Input
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    placeholder="Enter syllabus content"
                    className="w-full"
                  />
                  <Input
                    type="number"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Semester"
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
                  placeholder="Search by subject, course, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
            {filteredSyllabuses.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Syllabus Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="text-indigo-800 font-semibold">S.No</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Subject</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Syllabus</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Semester</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Edit</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Delete</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSyllabuses.map((s, index) => (
                      <TableRow key={s.id} className="hover:bg-gray-50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{s.degree}</TableCell>
                        <TableCell>{s.course}</TableCell>
                        <TableCell>{s.department}</TableCell>
                        <TableCell>{s.subject}</TableCell>
                        <TableCell>{s.syllabus.substring(0, 30) + (s.syllabus.length > 30 ? '...' : '')}</TableCell>
                        <TableCell>{s.semester}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(s.id)}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(s.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(s.id)}
                            className={`${
                              s.status === 'ON' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                          >
                            {s.status}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {filteredSyllabuses.length === 0 && (
              <p className="text-center text-gray-500">No syllabuses found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}