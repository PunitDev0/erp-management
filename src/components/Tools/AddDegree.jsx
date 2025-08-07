'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, Search } from 'lucide-react';
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

export default function DegreeManagementPage() {
  const [degree, setDegree] = useState('');
  const [degrees, setDegrees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('Admin User');

  useEffect(() => {
    const savedDegrees = localStorage.getItem('degrees');
    if (savedDegrees) {
      setDegrees(JSON.parse(savedDegrees));
    }
  }, []);

  const handleSubmit = () => {
    if (!degree.trim()) {
      toast.error('Error', { description: 'Degree name is required and cannot be empty.' });
      return;
    }
    if (degrees.some(d => d.name.toLowerCase() === degree.trim().toLowerCase())) {
      toast.error('Error', { description: 'Degree already exists.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newDegree = { id: Date.now().toString(), name: degree.trim(), status: 'ON' };
      setDegrees(prev => [...prev, newDegree]);
      localStorage.setItem('degrees', JSON.stringify([...degrees, newDegree]));
      setDegree('');
      toast.success('Success', { description: 'Degree added successfully.' });
      setIsSubmitting(false);
    }, 500);
  };

  const handleEdit = (id) => {
    const degreeToEdit = degrees.find(d => d.id === id);
    if (degreeToEdit) {
      setDegree(degreeToEdit.name);
      setDegrees(prev => prev.filter(d => d.id !== id));
      localStorage.setItem('degrees', JSON.stringify(degrees.filter(d => d.id !== id)));
      toast.success('Success', { description: 'Degree moved to edit mode.' });
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this degree?')) {
      setDegrees(prev => prev.filter(d => d.id !== id));
      localStorage.setItem('degrees', JSON.stringify(degrees.filter(d => d.id !== id)));
      toast.success('Success', { description: 'Degree deleted successfully.' });
    }
  };

  const handleToggleStatus = (id) => {
    setDegrees(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status: d.status === 'ON' ? 'OFF' : 'ON' } : d
      )
    );
    localStorage.setItem('degrees', JSON.stringify(
      degrees.map(d =>
        d.id === id ? { ...d, status: d.status === 'ON' ? 'OFF' : 'ON' } : d
      )
    ));
    toast.success('Success', { description: 'Status updated.' });
  };

  const filteredDegrees = degrees.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans "
    >
      <div className="mx-auto p-6">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Degree Management
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Monday, July 28, 2025 at 11:53 PM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Add Degree</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <Input
                    value={loggedInUser}
                    readOnly
                    className="w-full bg-gray-100 mb-4 md:mb-0"
                  />
                </div>
                <div className="w-full md:w-2/3 flex gap-4">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Enter degree name (e.g., UG, PG, or PhD)"
                      className="pl-8 w-full"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search degrees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
            {filteredDegrees.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Degree Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="text-indigo-800 font-semibold">S.No</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Degree</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Edit</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Delete</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDegrees.map((d, index) => (
                      <TableRow key={d.id} className="hover:bg-gray-50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(d.id)}
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
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
            {filteredDegrees.length === 0 && (
              <p className="text-center text-gray-500">No degrees found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}