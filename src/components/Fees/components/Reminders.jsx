import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Reminders = ({ studentFeeAssignments, selectedStudents, setSelectedStudents, isSendReminderOpen, setIsSendReminderOpen }) => {
  const handleStudentSelection = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Send Payment Reminders</CardTitle>
            <CardDescription>Send reminders to students with pending fees</CardDescription>
          </div>
          <Dialog open={isSendReminderOpen} onOpenChange={setIsSendReminderOpen}>
            <DialogTrigger asChild>
              <Button disabled={selectedStudents.length === 0}>
                <Bell className="mr-2 h-4 w-4" /> Send Reminder ({selectedStudents.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Payment Reminder</DialogTitle>
                <DialogDescription>Send reminder to {selectedStudents.length} selected student(s)</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-gray-600">This will send reminders via email and SMS.</p>
                <div className="mt-4">
                  <Label htmlFor="reminder-message">Custom Message (Optional)</Label>
                  <Textarea id="reminder-message" placeholder="Enter custom reminder message..." className="mt-2" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSendReminderOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  if (selectedStudents.length === 0) {
                    alert('Please select at least one student.');
                    return;
                  }
                  setIsSendReminderOpen(false);
                }}>Send Reminders</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentFeeAssignments
              .filter((student) => student.remainingAmount > 0)
              .map((student) => (
                <Card key={student.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleStudentSelection(student.id, checked)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{student.studentName}</h3>
                          <p className="text-sm text-gray-600">{student.rollNo} • {student.course} • {student.semester}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">${student.remainingAmount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Pending Amount</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reminders;