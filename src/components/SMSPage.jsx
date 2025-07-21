'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Send, Edit, Upload } from 'lucide-react';
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
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Input } from './ui/input';

export default function SMSPage() {
  const [smsData, setSmsData] = useState([]);
  const [newSms, setNewSms] = useState({
    recipientType: 'students',
    message: '',
    isAnnouncement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({ search: '', recipientType: 'all' });
  const [loggedInUser, setLoggedInUser] = useState('Admin User'); // Mock login user

  const recipientTypes = ['students', 'staff', 'all'];

  useEffect(() => {
    // Simulate fetching existing SMS data
  }, []);

  const handleSubmit = () => {
    if (!newSms.message) {
      toast.error('Error', { description: 'Message is required.' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setSmsData(prev => [...prev, { ...newSms, id: Date.now().toString(), timestamp: new Date().toISOString(), status: 'Sent' }]);
      setNewSms({ recipientType: 'students', message: '', isAnnouncement: false });
      toast.success('Success', { description: `${newSms.isAnnouncement ? 'Announcement' : 'SMS'} sent successfully.` });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setNewSms({ recipientType: 'students', message: '', isAnnouncement: false });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setNewSms(prev => ({ ...prev, message: text }));
        toast.success('Success', { description: 'SMS uploaded successfully.' });
      };
      reader.readAsText(file);
    }
  };

  const handleEdit = (id) => {
    const sms = smsData.find(s => s.id === id);
    if (sms) {
      setNewSms({ ...sms, isAnnouncement: false });
      setSmsData(prev => prev.filter(s => s.id !== id));
      toast.success('Success', { description: 'SMS moved to edit mode.' });
    }
  };

  const filteredSms = smsData.filter(sms =>
    (!filters.search || sms.message.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.recipientType === 'all' || sms.recipientType === filters.recipientType)
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
          <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              SMS Management
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">
              Tuesday, July 22, 2025 at 12:31 AM IST
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Message..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-2/3">
                <Select value={filters.recipientType} onValueChange={(value) => setFilters(prev => ({ ...prev, recipientType: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {recipientTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setFilters({ search: '', recipientType: 'all' })}>
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
              </div>
            </div>
            {/* SMS Master Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">SMS Master</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logged In User</label>
                  <Input value={loggedInUser} readOnly className="w-full bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Type</label>
                  <Select value={newSms.recipientType} onValueChange={(value) => setNewSms(prev => ({ ...prev, recipientType: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipientTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea
                    value={newSms.message}
                    onChange={(e) => setNewSms(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter SMS message..."
                    className="w-full h-24"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newSms.isAnnouncement}
                      onChange={(e) => setNewSms(prev => ({ ...prev, isAnnouncement: e.target.checked }))}
                      className="mr-2"
                    />
                    General Announcement
                  </label>
                  <input type="file" onChange={handleUpload} className="hidden" id="smsUpload" />
                  <Button onClick={() => document.getElementById('smsUpload').click()} variant="outline" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" /> Upload SMS
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center">
                    <Send className="mr-2 h-4 w-4" /> {isSubmitting ? 'Sending...' : 'Send SMS'}
                  </Button>
                  <Button onClick={handleReset} variant="outline">Reset</Button>
                </div>
              </div>
            </div>

            {/* SMS Transaction Section */}
            {smsData.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">SMS Transactions</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="text-indigo-800 font-semibold">Recipient Type</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Message</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Timestamp</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Status</TableHead>
                      <TableHead className="text-indigo-800 font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSms.map((sms) => (
                      <TableRow key={sms.id}>
                        <TableCell>{sms.recipientType.charAt(0).toUpperCase() + sms.recipientType.slice(1)}</TableCell>
                        <TableCell>{sms.message.substring(0, 50) + (sms.message.length > 50 ? '...' : '')}</TableCell>
                        <TableCell>{format(new Date(sms.timestamp), 'dd/MM/yyyy hh:mm a')}</TableCell>
                        <TableCell>{sms.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(sms.id)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}