'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Download } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Input } from '../ui/input';

export default function AllocateStudentTimetablePage() {
  const [timetables, setTimetables] = useState([
    { studentId: 'ST001', course: 'Mathematics', day: 'Monday', time: '09:00-10:00', room: 'A101' },
    { studentId: 'ST002', course: 'Physics', day: 'Tuesday', time: '10:00-11:00', room: 'A102' },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTimetable, setNewTimetable] = useState({ studentId: '', course: '', day: '', time: '', room: '' });

  const handleAddSave = () => {
    setTimetables(prev => [...prev, newTimetable]);
    setIsAddModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans p-4 md:p-8"
    >
      <div className="mx-auto max-w-7xl">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Allocate Student Timetable
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 4:28 PM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" /> Add Timetable
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-50">
                  <TableHead className="text-indigo-800 font-semibold">Student ID</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Course</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Day</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Time</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Room</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetables.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell>{t.studentId}</TableCell>
                    <TableCell>{t.course}</TableCell>
                    <TableCell>{t.day}</TableCell>
                    <TableCell>{t.time}</TableCell>
                    <TableCell>{t.room}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Student Timetable</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Student ID" value={newTimetable.studentId} onChange={(e) => setNewTimetable(prev => ({ ...prev, studentId: e.target.value }))} />
                  <Input placeholder="Course" value={newTimetable.course} onChange={(e) => setNewTimetable(prev => ({ ...prev, course: e.target.value }))} />
                  <Select value={newTimetable.day} onValueChange={(value) => setNewTimetable(prev => ({ ...prev, day: value }))}>
                    <SelectTrigger><SelectValue placeholder="Select Day" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Time (e.g., 09:00-10:00)" value={newTimetable.time} onChange={(e) => setNewTimetable(prev => ({ ...prev, time: e.target.value }))} />
                  <Input placeholder="Room" value={newTimetable.room} onChange={(e) => setNewTimetable(prev => ({ ...prev, room: e.target.value }))} />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddSave} className="bg-indigo-600 text-white hover:bg-indigo-700">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}