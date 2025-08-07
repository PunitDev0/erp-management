import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';

const PaymentHistory = ({ paymentHistory, searchTerm, setSearchTerm }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Payment History</CardTitle>
          <CardDescription>View all payment transactions and export reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Student Name</th>
                  <th className="text-left py-3">Course</th>
                  <th className="text-left py-3">Semester</th>
                  <th className="text-right py-3">Paid Amount</th>
                  <th className="text-left py-3">Payment Date</th>
                  <th className="text-left py-3">Mode</th>
                  <th className="text-left py-3">Transaction ID</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory
                  .filter((payment) => payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{payment.studentName}</td>
                      <td className="py-3">{payment.course}</td>
                      <td className="py-3">{payment.semester}</td>
                      <td className="text-right py-3 font-semibold">${payment.paidAmount.toLocaleString()}</td>
                      <td className="py-3">{payment.paymentDate}</td>
                      <td className="py-3">
                        <Badge variant="outline">{payment.paymentMode}</Badge>
                      </td>
                      <td className="py-3 font-mono text-sm">{payment.transactionId}</td>
                      <td className="text-center py-3">
                        <Badge variant="default">{payment.status}</Badge>
                      </td>
                      <td className="text-center py-3">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
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

export default PaymentHistory;