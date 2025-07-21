'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Download, Search, Edit, Trash, Filter } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { Input } from '../ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';

export default function AllocateStaffTimetablePage() {
  const [timetables, setTimetables] = useState([
    { 
      staffId: 'S001', 
      course: 'Mathematics', 
      day: 'Monday', 
      periods: [
        { time: '09:00-10:00', semester: 'Semester 1', periodNumber: 1 },
        { time: '10:00-11:00', semester: 'Semester 2', periodNumber: 2 },
      ], 
      room: 'A101', 
      department: 'Science', 
      status: 'Active' 
    },
    { 
      staffId: 'S002', 
      course: 'Physics', 
      day: 'Tuesday', 
      periods: [
        { time: '10:00-11:00', semester: 'Semester 1', periodNumber: 1 },
      ], 
      room: 'A102', 
      department: 'Science', 
      status: 'Active' 
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [newTimetable, setNewTimetable] = useState({ 
    staffId: '', 
    course: '', 
    day: '', 
    periods: [{ time: '', semester: '', periodNumber: 1 }], 
    room: '', 
    department: '', 
    status: 'Active' 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filters, setFilters] = useState({ department: [], course: [], timePeriod: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const departments = [...new Set(timetables.map(t => t.department))];
  const courses = [...new Set(timetables.map(t => t.course))];
  const timePeriods = {
    Morning: ['09:00-10:00', '10:00-11:00', '11:00-12:00'],
    Afternoon: ['12:00-13:00', '13:00-14:00', '14:00-15:00'],
    Evening: ['15:00-16:00', '16:00-17:00'],
  };

  useEffect(() => {
    // Simulate API call or data fetch
  }, []);

  const handleAddSave = () => {
    if (!newTimetable.staffId || !newTimetable.course || !newTimetable.day || !newTimetable.room || !newTimetable.department || 
        newTimetable.periods.some(p => !p.time || !p.semester)) {
      toast({ title: 'Error', description: 'All fields, including period times and semesters, are required.', variant: 'destructive' });
      return;
    }
    // Check for overlapping times
    const times = newTimetable.periods.map(p => p.time);
    if (new Set(times).size !== times.length) {
      toast({ title: 'Error', description: 'Period times cannot overlap.', variant: 'destructive' });
      return;
    }
    setTimetables(prev => [...prev, { ...newTimetable, status: newTimetable.status || 'Active' }]);
    setIsAddModalOpen(false);
    setNewTimetable({ 
      staffId: '', 
      course: '', 
      day: '', 
      periods: [{ time: '', semester: '', periodNumber: 1 }], 
      room: '', 
      department: '', 
      status: 'Active' 
    });
    toast({ title: 'Success', description: 'Timetable added successfully.' });
  };

  const handleEditSave = () => {
    if (!selectedTimetable.staffId || !selectedTimetable.course || !selectedTimetable.day || !selectedTimetable.room || !selectedTimetable.department || 
        selectedTimetable.periods.some(p => !p.time || !p.semester)) {
      toast({ title: 'Error', description: 'All fields, including period times and semesters, are required.', variant: 'destructive' });
      return;
    }
    const times = selectedTimetable.periods.map(p => p.time);
    if (new Set(times).size !== times.length) {
      toast({ title: 'Error', description: 'Period times cannot overlap.', variant: 'destructive' });
      return;
    }
    setTimetables(prev => prev.map(t => t.staffId === selectedTimetable.staffId ? selectedTimetable : t));
    setIsEditModalOpen(false);
    toast({ title: 'Success', description: 'Timetable updated successfully.' });
  };

  const handleDelete = (staffId) => {
    setTimetables(prev => prev.filter(t => t.staffId !== staffId));
    setIsDeleteDialogOpen(false);
    toast({ title: 'Success', description: 'Timetable deleted successfully.' });
  };

  const exportToCSV = () => {
    const csv = [
      ['Staff ID', 'Course', 'Day', 'Periods', 'Room', 'Department', 'Status'].join(','),
      ...timetables.map(t => [
        t.staffId, 
        t.course, 
        t.day, 
        t.periods.map(p => `${p.periodNumber}: ${p.time} (${p.semester})`).join('; '), 
        t.room, 
        t.department, 
        t.status
      ].join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'staff_timetables.csv');
    toast({ title: 'Success', description: 'CSV exported successfully.' });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTimetables = [...timetables].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const filteredTimetables = sortedTimetables.filter(t =>
    (t.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.periods.some(p => p.time.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filters.department.length === 0 || filters.department.includes(t.department)) &&
    (filters.course.length === 0 || filters.course.includes(t.course)) &&
    (filters.timePeriod === '' || t.periods.some(p => timePeriods[filters.timePeriod].includes(p.time)))
  );

  const addPeriod = () => {
    setNewTimetable(prev => ({
      ...prev,
      periods: [...prev.periods, { time: '', semester: '', periodNumber: prev.periods.length + 1 }],
    }));
  };

  const updatePeriod = (index, field, value) => {
    setNewTimetable(prev => {
      const newPeriods = [...prev.periods];
      newPeriods[index] = { ...newPeriods[index], [field]: value };
      return { ...prev, periods: newPeriods };
    });
  };

  const removePeriod = (index) => {
    setNewTimetable(prev => {
      const newPeriods = prev.periods.filter((_, i) => i !== index);
      return { ...prev, periods: newPeriods.map((p, i) => ({ ...p, periodNumber: i + 1 })) };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans  "
    >
      <div className="mx-auto ">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Allocate Staff Timetable
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 8:43 PM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Staff ID, Course, Day, or Time..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-2/3">
                <Select value={filters.department} onValueChange={(value) => setFilters(prev => ({ ...prev, department: value.split(',') }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <Command>
                      <CommandInput placeholder="Search department..." />
                      <CommandEmpty>No department found.</CommandEmpty>
                      <CommandGroup>
                        {departments.map((dept) => (
                          <CommandItem
                            key={dept}
                            onSelect={() => {
                              setFilters(prev => ({
                                ...prev,
                                department: prev.department.includes(dept)
                                  ? prev.department.filter(d => d !== dept)
                                  : [...prev.department, dept],
                              }));
                            }}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={filters.department.includes(dept)}
                                onChange={() => {}}
                                className="mr-2"
                              />
                              {dept}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </SelectContent>
                </Select>
                <Select value={filters.course} onValueChange={(value) => setFilters(prev => ({ ...prev, course: value.split(',') }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <Command>
                      <CommandInput placeholder="Search course..." />
                      <CommandEmpty>No course found.</CommandEmpty>
                      <CommandGroup>
                        {courses.map((c) => (
                          <CommandItem
                            key={c}
                            onSelect={() => {
                              setFilters(prev => ({
                                ...prev,
                                course: prev.course.includes(c)
                                  ? prev.course.filter(d => d !== c)
                                  : [...prev.course, c],
                              }));
                            }}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={filters.course.includes(c)}
                                onChange={() => {}}
                                className="mr-2"
                              />
                              {c}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </SelectContent>
                </Select>
                <Select value={filters.timePeriod} onValueChange={(value) => setFilters(prev => ({ ...prev, timePeriod: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Afternoon">Afternoon</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setFilters({ department: [], course: [], timePeriod: '' })}>
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
                <Button onClick={exportToCSV} className="bg-green-600 text-white hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                      <Plus className="mr-2 h-4 w-4" /> Add Timetable
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Staff Timetable</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Staff ID" value={newTimetable.staffId} onChange={(e) => setNewTimetable(prev => ({ ...prev, staffId: e.target.value }))} />
                      <Input placeholder="Course" value={newTimetable.course} onChange={(e) => setNewTimetable(prev => ({ ...prev, course: e.target.value }))} />
                      <Select value={newTimetable.day} onValueChange={(value) => setNewTimetable(prev => ({ ...prev, day: value }))}>
                        <SelectTrigger><SelectValue placeholder="Select Day" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monday">Monday</SelectItem>
                          <SelectItem value="Tuesday">Tuesday</SelectItem>
                          <SelectItem value="Wednesday">Wednesday</SelectItem>
                          <SelectItem value="Thursday">Thursday</SelectItem>
                          <SelectItem value="Friday">Friday</SelectItem>
                        </SelectContent>
                      </Select>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Periods</label>
                        {newTimetable.periods.map((period, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <Input
                              placeholder="Time (e.g., 09:00-10:00)"
                              value={period.time}
                              onChange={(e) => updatePeriod(index, 'time', e.target.value)}
                              className="w-1/3"
                            />
                            <Select value={period.semester} onValueChange={(value) => updatePeriod(index, 'semester', value)} className="w-1/3">
                              <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Semester 1">Semester 1</SelectItem>
                                <SelectItem value="Semester 2">Semester 2</SelectItem>
                                <SelectItem value="Semester 3">Semester 3</SelectItem>
                                <SelectItem value="Semester 4">Semester 4</SelectItem>
                              </SelectContent>
                            </Select>
                            <span className="w-1/6 text-center">{`Period ${period.periodNumber}`}</span>
                            {index > 0 && (
                              <Button variant="destructive" size="sm" onClick={() => removePeriod(index)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addPeriod} className="mt-2">
                          <Plus className="mr-2 h-4 w-4" /> Add Period
                        </Button>
                      </div>
                      <Input placeholder="Room" value={newTimetable.room} onChange={(e) => setNewTimetable(prev => ({ ...prev, room: e.target.value }))} />
                      <Input placeholder="Department" value={newTimetable.department} onChange={(e) => setNewTimetable(prev => ({ ...prev, department: e.target.value }))} />
                      <Select value={newTimetable.status} onValueChange={(value) => setNewTimetable(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <TableHead className="text-indigo-800 font-semibold cursor-pointer" onClick={() => requestSort('staffId')}>
                    Staff ID {sortConfig.key === 'staffId' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-indigo-800 font-semibold cursor-pointer" onClick={() => requestSort('course')}>
                    Course {sortConfig.key === 'course' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-indigo-800 font-semibold cursor-pointer" onClick={() => requestSort('day')}>
                    Day {sortConfig.key === 'day' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Periods</TableHead>
                  <TableHead className="text-indigo-800 font-semibold cursor-pointer" onClick={() => requestSort('room')}>
                    Room {sortConfig.key === 'room' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-indigo-800 font-semibold cursor-pointer" onClick={() => requestSort('department')}>
                    Department {sortConfig.key === 'department' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-indigo-800 font-semibold cursor-pointer" onClick={() => requestSort('status')}>
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimetables.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell>{t.staffId}</TableCell>
                    <TableCell>{t.course}</TableCell>
                    <TableCell>{t.day}</TableCell>
                    <TableCell>
                      {t.periods.map(p => `${p.periodNumber}: ${p.time} (${p.semester})`).join(', ')}
                    </TableCell>
                    <TableCell>{t.room}</TableCell>
                    <TableCell>{t.department}</TableCell>
                    <TableCell>{t.status}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setSelectedTimetable({ ...t }); setIsEditModalOpen(true); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Staff Timetable</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input placeholder="Staff ID" value={selectedTimetable?.staffId || ''} onChange={(e) => setSelectedTimetable(prev => ({ ...prev, staffId: e.target.value }))} />
                              <Input placeholder="Course" value={selectedTimetable?.course || ''} onChange={(e) => setSelectedTimetable(prev => ({ ...prev, course: e.target.value }))} />
                              <Select value={selectedTimetable?.day || ''} onValueChange={(value) => setSelectedTimetable(prev => ({ ...prev, day: value }))}>
                                <SelectTrigger><SelectValue placeholder="Select Day" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Monday">Monday</SelectItem>
                                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                                  <SelectItem value="Thursday">Thursday</SelectItem>
                                  <SelectItem value="Friday">Friday</SelectItem>
                                </SelectContent>
                              </Select>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Periods</label>
                                {selectedTimetable?.periods.map((period, index) => (
                                  <div key={index} className="flex gap-2 mb-2">
                                    <Input
                                      placeholder="Time (e.g., 09:00-10:00)"
                                      value={period.time}
                                      onChange={(e) => {
                                        const newPeriods = [...selectedTimetable.periods];
                                        newPeriods[index] = { ...newPeriods[index], time: e.target.value };
                                        setSelectedTimetable(prev => ({ ...prev, periods: newPeriods }));
                                      }}
                                      className="w-1/3"
                                    />
                                    <Select value={period.semester} onValueChange={(value) => {
                                      const newPeriods = [...selectedTimetable.periods];
                                      newPeriods[index] = { ...newPeriods[index], semester: value };
                                      setSelectedTimetable(prev => ({ ...prev, periods: newPeriods }));
                                    }} className="w-1/3">
                                      <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Semester 1">Semester 1</SelectItem>
                                        <SelectItem value="Semester 2">Semester 2</SelectItem>
                                        <SelectItem value="Semester 3">Semester 3</SelectItem>
                                        <SelectItem value="Semester 4">Semester 4</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <span className="w-1/6 text-center">{`Period ${period.periodNumber}`}</span>
                                    {index > 0 && (
                                      <Button variant="destructive" size="sm" onClick={() => {
                                        const newPeriods = selectedTimetable.periods.filter((_, i) => i !== index);
                                        setSelectedTimetable(prev => ({ ...prev, periods: newPeriods.map((p, i) => ({ ...p, periodNumber: i + 1 })) }));
                                      }}>
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => {
                                  setSelectedTimetable(prev => ({
                                    ...prev,
                                    periods: [...prev.periods, { time: '', semester: '', periodNumber: prev.periods.length + 1 }],
                                  }));
                                }} className="mt-2">
                                  <Plus className="mr-2 h-4 w-4" /> Add Period
                                </Button>
                              </div>
                              <Input placeholder="Room" value={selectedTimetable?.room || ''} onChange={(e) => setSelectedTimetable(prev => ({ ...prev, room: e.target.value }))} />
                              <Input placeholder="Department" value={selectedTimetable?.department || ''} onChange={(e) => setSelectedTimetable(prev => ({ ...prev, department: e.target.value }))} />
                              <Select value={selectedTimetable?.status || 'Active'} onValueChange={(value) => setSelectedTimetable(prev => ({ ...prev, status: value }))}>
                                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                              <Button onClick={() => { setIsSaving(true); setTimeout(() => { handleEditSave(); setIsSaving(false); }, 1000); }} className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" onClick={() => { setSelectedTimetable(t); setIsDeleteDialogOpen(true); }}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the timetable for {selectedTimetable?.staffId}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(selectedTimetable?.staffId)} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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