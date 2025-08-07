'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Download } from 'lucide-react';
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

export default function EnterProgressReportPage() {
  const [reports, setReports] = useState([
    { studentId: 'ST001', subject: 'Mathematics', marks: 85 },
    { studentId: 'ST002', subject: 'Physics', marks: 78 },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({ studentId: '', subject: '', marks: '' });

  const handleAddSave = () => {
    setReports(prev => [...prev, { ...newReport, marks: Number(newReport.marks) }]);
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
              Enter Progress Report
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Sunday, July 20, 2025 at 4:28 PM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" /> Add Report
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-50">
                  <TableHead className="text-indigo-800 font-semibold">Student ID</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Subject</TableHead>
                  <TableHead className="text-indigo-800 font-semibold">Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((r, index) => (
                  <TableRow key={index}>
                    <TableCell>{r.studentId}</TableCell>
                    <TableCell>{r.subject}</TableCell>
                    <TableCell>{r.marks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Progress Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Student ID" value={newReport.studentId} onChange={(e) => setNewReport(prev => ({ ...prev, studentId: e.target.value }))} />
                  <Input placeholder="Subject" value={newReport.subject} onChange={(e) => setNewReport(prev => ({ ...prev, subject: e.target.value }))} />
                  <Input type="number" placeholder="Marks" value={newReport.marks} onChange={(e) => setNewReport(prev => ({ ...prev, marks: e.target.value }))} />
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