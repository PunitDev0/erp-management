'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Book, Users, FileText, Download } from 'lucide-react';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { format } from 'date-fns';

export default function ViewAcademicTransactionsPage() {
  const [filter, setFilter] = useState('');
  const [timetables] = useState([
    { id: 'ST001', type: 'Student', course: 'Mathematics', day: 'Monday', time: '09:00-10:00' },
    { id: 'S001', type: 'Staff', course: 'Physics', day: 'Tuesday', time: '10:00-11:00' },
  ]);
  const [examSchedules] = useState([
    { course: 'Mathematics', date: '2025-07-25', time: '09:00-11:00' },
  ]);
  const [activities] = useState([
    { type: 'Meeting', date: '2025-07-22', time: '14:00-15:00', details: 'Staff Meeting' },
    { type: 'Scholarship', date: '2025-07-23', time: 'N/A', details: 'Merit Scholarship' },
  ]);
  const [reports] = useState([
    { studentId: 'ST001', subject: 'Mathematics', marks: 85 },
  ]);

  const filteredData = (type) => {
    switch (type) {
      case 'studentTimetable': return timetables.filter(t => t.type === 'Student');
      case 'staffTimetable': return timetables.filter(t => t.type === 'Staff');
      case 'examSchedule': return examSchedules;
      case 'activities': return activities;
      case 'progressReport': return reports;
      default: return [];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans p-4 md:p-8"
    >
      <div className="mx-auto max-w-7xl">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              View Academic Transactions
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 4:28 PM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="studentTimetable">Student Timetable</SelectItem>
                  <SelectItem value="staffTimetable">Staff Timetable</SelectItem>
                  <SelectItem value="examSchedule">Exam Schedule</SelectItem>
                  <SelectItem value="activities">Meetings/Assignments/Scholarships</SelectItem>
                  <SelectItem value="progressReport">Progress Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger asChild>
                <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-6 cursor-pointer">
                  <h2 className="text-xl font-semibold text-indigo-800 flex items-center">
                    {filter === 'studentTimetable' && <Calendar className="mr-2 h-6 w-6 text-indigo-600" />} {filter === 'staffTimetable' && <Users className="mr-2 h-6 w-6 text-indigo-600" />} {filter === 'examSchedule' && <Calendar className="mr-2 h-6 w-6 text-indigo-600" />} {filter === 'activities' && <Users className="mr-2 h-6 w-6 text-indigo-600" />} {filter === 'progressReport' && <FileText className="mr-2 h-6 w-6 text-indigo-600" />} {filter ? `${filter.replace(/([A-Z])/g, ' $1').replace('Timetable', ' Timetable').trim()}` : 'Select a Category'}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-indigo-50">
                        {filter === 'studentTimetable' && <><TableHead className="text-indigo-800 font-semibold">Student ID</TableHead><TableHead className="text-indigo-800 font-semibold">Course</TableHead><TableHead className="text-indigo-800 font-semibold">Day</TableHead><TableHead className="text-indigo-800 font-semibold">Time</TableHead></>}
                        {filter === 'staffTimetable' && <><TableHead className="text-indigo-800 font-semibold">Staff ID</TableHead><TableHead className="text-indigo-800 font-semibold">Course</TableHead><TableHead className="text-indigo-800 font-semibold">Day</TableHead><TableHead className="text-indigo-800 font-semibold">Time</TableHead></>}
                        {filter === 'examSchedule' && <><TableHead className="text-indigo-800 font-semibold">Course</TableHead><TableHead className="text-indigo-800 font-semibold">Date</TableHead><TableHead className="text-indigo-800 font-semibold">Time</TableHead></>}
                        {filter === 'activities' && <><TableHead className="text-indigo-800 font-semibold">Type</TableHead><TableHead className="text-indigo-800 font-semibold">Date</TableHead><TableHead className="text-indigo-800 font-semibold">Time</TableHead><TableHead className="text-indigo-800 font-semibold">Details</TableHead></>}
                        {filter === 'progressReport' && <><TableHead className="text-indigo-800 font-semibold">Student ID</TableHead><TableHead className="text-indigo-800 font-semibold">Subject</TableHead><TableHead className="text-indigo-800 font-semibold">Marks</TableHead></>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData(filter).map((item, index) => (
                        <TableRow key={index}>
                          {filter === 'studentTimetable' && <><TableCell>{item.id}</TableCell><TableCell>{item.course}</TableCell><TableCell>{item.day}</TableCell><TableCell>{item.time}</TableCell></>}
                          {filter === 'staffTimetable' && <><TableCell>{item.id}</TableCell><TableCell>{item.course}</TableCell><TableCell>{item.day}</TableCell><TableCell>{item.time}</TableCell></>}
                          {filter === 'examSchedule' && <><TableCell>{item.course}</TableCell><TableCell>{item.date}</TableCell><TableCell>{item.time}</TableCell></>}
                          {filter === 'activities' && <><TableCell>{item.type}</TableCell><TableCell>{item.date}</TableCell><TableCell>{item.time}</TableCell><TableCell>{item.details}</TableCell></>}
                          {filter === 'progressReport' && <><TableCell>{item.studentId}</TableCell><TableCell>{item.subject}</TableCell><TableCell>{item.marks}</TableCell></>}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end mt-4">
                    <Button className="bg-green-600 text-white hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}