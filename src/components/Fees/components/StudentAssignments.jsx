import { Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/components/ui/card';
import { Search, Filter, CreditCard, Receipt } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const StudentAssignments = ({ studentFeeAssignments, searchTerm, setSearchTerm, handleRecordPayment }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assign Fee Structure to Students</CardTitle>
          <CardDescription>Manage student fee assignments and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Student Name</th>
                  <th className="text-left py-3">Roll No</th>
                  <th className="text-left py-3">Course</th>
                  <th className="text-left py-3">Semester</th>
                  <th className="text-right py-3">Total Fee</th>
                  <th className="text-right py-3">Paid</th>
                  <th className="text-right py-3">Remaining</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentFeeAssignments
                  .filter((student) => student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{student.studentName}</td>
                      <td className="py-3">{student.rollNo}</td>
                      <td className="py-3">{student.course}</td>
                      <td className="py-3">{student.semester}</td>
                      <td className="text-right py-3">${student.totalFee.toLocaleString()}</td>
                      <td className="text-right py-3 text-green-600">${student.paidAmount.toLocaleString()}</td>
                      <td className="text-right py-3 text-orange-600">${student.remainingAmount.toLocaleString()}</td>
                      <td className="text-center py-3">
                        <Badge
                          variant={
                            student.status === "Paid" ? "default" : student.status === "Partial" ? "secondary" : "destructive"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleRecordPayment(student)}>
                            <CreditCard className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAssignments;