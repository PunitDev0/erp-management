import { Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { Download } from 'lucide-react';

const Reports = ({ monthlyCollectionData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fee Collection Analytics</CardTitle>
            <CardDescription>Visual reports of fee collection trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex space-x-4">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                  <SelectItem value="ba">Business Administration</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="sem1">Semester 1</SelectItem>
                  <SelectItem value="sem2">Semester 2</SelectItem>
                  <SelectItem value="sem3">Semester 3</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" className="w-48" placeholder="From date" />
              <Input type="date" className="w-48" placeholder="To date" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="collected" fill="#10b981" name="Collected" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
            <CardDescription>Download detailed fee reports in various formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Fee Collection Report (CSV)
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Pending Fees Report (PDF)
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Payment History (Excel)
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Defaulter List (PDF)
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Course-wise Summary (CSV)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;