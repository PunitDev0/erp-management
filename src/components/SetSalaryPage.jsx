'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, FileText, Download } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

export default function SetSalaryPage() {
  const [staff, setStaff] = useState([
    { staffId: 'S001', name: 'Ravi Kumar', type: 'Teaching', department: 'Mathematics', salary: 60000, increment: 5000 },
    { staffId: 'S002', name: 'Priya Sharma', type: 'Non-Teaching', department: 'Admin', salary: 45000, increment: 3000 },
    { staffId: 'S003', name: 'Amit Patel', type: 'Teaching', department: 'Physics', salary: 65000, increment: 6000 },
    { staffId: 'S004', name: 'Neha Gupta', type: 'Non-Teaching', department: 'Library', salary: 40000, increment: 2000 },
    { staffId: 'S005', name: 'Vikram Singh', type: 'Teaching', department: 'Computer Science', salary: 70000, increment: 7000 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ staffId: '', name: '', type: '', department: '', salary: '', increment: '' });
  const [editStaff, setEditStaff] = useState({ staffId: '', name: '', type: '', department: '', salary: '', increment: '' });

  const handleAddModalOpen = () => {
    setNewStaff({ staffId: '', name: '', type: '', department: '', salary: '', increment: '' });
    setIsAddModalOpen(true);
  };

  const handleAddSave = () => {
    setStaff(prev => [...prev, { ...newStaff, salary: Number(newStaff.salary), increment: Number(newStaff.increment) }]);
    setIsAddModalOpen(false);
  };

  const handleEditModalOpen = (s) => {
    setEditStaff({ ...s, salary: s.salary.toString(), increment: s.increment.toString() });
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    setStaff(prev => prev.map(s => s.staffId === editStaff.staffId ? { ...editStaff, salary: Number(editStaff.salary), increment: Number(editStaff.increment) } : s));
    setIsEditModalOpen(false);
  };

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
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Set Salary Page
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 3:35 PM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6"
            >
              <div className="flex justify-end mb-4">
                <Button
                  onClick={handleAddModalOpen}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Staff
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-50">
                    <TableHead className="text-indigo-800 font-semibold">Staff ID</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Type</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Department</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Salary</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Increment</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.length > 0 ? (
                    staff.map((s) => (
                      <TableRow key={s.staffId} className="hover:bg-gray-50 transition-colors">
                        <TableCell>{s.staffId}</TableCell>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.type}</TableCell>
                        <TableCell>{s.department}</TableCell>
                        <TableCell>₹{s.salary.toLocaleString()}</TableCell>
                        <TableCell>₹{s.increment.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEditModalOpen(s)}
                            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                        No staff salary details available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => exportToCSV(staff, 'salary_structure.csv')}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
            </motion.div>

            {/* Add Staff Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Staff Salary</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Staff ID</label>
                    <Input
                      value={newStaff.staffId}
                      onChange={(e) => setNewStaff(prev => ({ ...prev, staffId: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input
                      value={newStaff.name}
                      onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <Select
                      value={newStaff.type}
                      onValueChange={(value) => setNewStaff(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Teaching">Teaching</SelectItem>
                        <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <Select
                      value={newStaff.department}
                      onValueChange={(value) => setNewStaff(prev => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger className="mt-1">
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
                  <div>
                    <label className="text-sm font-medium text-gray-700">Salary</label>
                    <Input
                      value={newStaff.salary}
                      onChange={(e) => setNewStaff(prev => ({ ...prev, salary: e.target.value }))}
                      className="mt-1"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Increment</label>
                    <Input
                      value={newStaff.increment}
                      onChange={(e) => setNewStaff(prev => ({ ...prev, increment: e.target.value }))}
                      className="mt-1"
                      type="number"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsAddModalOpen(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleAddSave} className="bg-indigo-600 text-white hover:bg-indigo-700">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Staff Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Staff Salary</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Staff ID</label>
                    <Input
                      value={editStaff.staffId}
                      onChange={(e) => setEditStaff(prev => ({ ...prev, staffId: e.target.value }))}
                      className="mt-1"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input
                      value={editStaff.name}
                      onChange={(e) => setEditStaff(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <Select
                      value={editStaff.type}
                      onValueChange={(value) => setEditStaff(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Teaching">Teaching</SelectItem>
                        <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <Select
                      value={editStaff.department}
                      onValueChange={(value) => setEditStaff(prev => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger className="mt-1">
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
                  <div>
                    <label className="text-sm font-medium text-gray-700">Salary</label>
                    <Input
                      value={editStaff.salary}
                      onChange={(e) => setEditStaff(prev => ({ ...prev, salary: e.target.value }))}
                      className="mt-1"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Increment</label>
                    <Input
                      value={editStaff.increment}
                      onChange={(e) => setEditStaff(prev => ({ ...prev, increment: e.target.value }))}
                      className="mt-1"
                      type="number"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsEditModalOpen(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleEditSave} className="bg-indigo-600 text-white hover:bg-indigo-700">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}