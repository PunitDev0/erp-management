'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Download } from 'lucide-react';
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

export default function StaffLeavePage() {
  const [staff] = useState([
    { staffId: 'S001', name: 'Ravi Kumar', type: 'Teaching', department: 'Mathematics', leaves: 2 },
    { staffId: 'S002', name: 'Priya Sharma', type: 'Non-Teaching', department: 'Admin', leaves: 1 },
    { staffId: 'S003', name: 'Amit Patel', type: 'Teaching', department: 'Physics', leaves: 3 },
    { staffId: 'S004', name: 'Neha Gupta', type: 'Non-Teaching', department: 'Library', leaves: 0 },
    { staffId: 'S005', name: 'Vikram Singh', type: 'Teaching', department: 'Computer Science', leaves: 2 },
  ]);

  const [leaveRecords, setLeaveRecords] = useState([
    { staffId: 'S001', date: '2025-07-01', days: 1, reason: 'Personal' },
    { staffId: 'S002', date: '2025-07-03', days: 1, reason: 'Medical' },
    { staffId: 'S003', date: '2025-07-02', days: 2, reason: 'Family' },
    { staffId: 'S004', date: '2025-07-05', days: 0, reason: 'N/A' },
    { staffId: 'S005', date: '2025-07-04', days: 1, reason: 'Personal' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({ staffId: '', date: format(new Date(), 'yyyy-MM-dd'), days: '', reason: '' });

  const handleAddModalOpen = () => {
    setNewLeave({ staffId: '', date: format(new Date(), 'yyyy-MM-dd'), days: '', reason: '' });
    setIsAddModalOpen(true);
  };

  const handleAddSave = () => {
    setLeaveRecords(prev => [...prev, { ...newLeave, days: Number(newLeave.days) }]);
    setStaff(prev => prev.map(s => s.staffId === newLeave.staffId ? { ...s, leaves: s.leaves + Number(newLeave.days) } : s));
    setIsAddModalOpen(false);
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
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Staff Leave Page
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
                  <Plus className="mr-2 h-4 w-4" /> Add Leave
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-50">
                    <TableHead className="text-indigo-800 font-semibold">Staff ID</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Date</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Days</TableHead>
                    <TableHead className="text-indigo-800 font-semibold">Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRecords.length > 0 ? (
                    leaveRecords.map((l, index) => {
                      const staffMember = staff.find(s => s.staffId === l.staffId);
                      return (
                        <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                          <TableCell>{l.staffId}</TableCell>
                          <TableCell>{staffMember?.name}</TableCell>
                          <TableCell>{l.date}</TableCell>
                          <TableCell>{l.days}</TableCell>
                          <TableCell>{l.reason}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                        No leave records available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => exportToCSV(leaveRecords, 'leave_records.csv')}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 rounded-lg flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
            </motion.div>

            {/* Add Leave Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Leave Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Staff ID</label>
                    <Select
                      value={newLeave.staffId}
                      onValueChange={(value) => setNewLeave(prev => ({ ...prev, staffId: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Staff ID" />
                      </SelectTrigger>
                      <SelectContent>
                        {staff.map(s => (
                          <SelectItem key={s.staffId} value={s.staffId}>{s.staffId} - {s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <Input
                      type="date"
                      value={newLeave.date}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, date: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Days</label>
                    <Input
                      value={newLeave.days}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, days: e.target.value }))}
                      className="mt-1"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reason</label>
                    <Input
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, reason: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsAddModalOpen(false)} variant="outline">Cancel</Button>
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