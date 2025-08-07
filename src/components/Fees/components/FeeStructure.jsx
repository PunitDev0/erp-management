import { Card, CardHeader, CardTitle, CardContent, CardDescription,} from '@/components/ui/card';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
const FeeStructure = ({ feeStructures, searchTerm, setSearchTerm, isAddFeeStructureOpen, setIsAddFeeStructureOpen, newFeeStructure, setNewFeeStructure }) => {
  const calculateTotal = () => {
    const tuition = Number.parseFloat(newFeeStructure.tuitionFee) || 0;
    const hostel = Number.parseFloat(newFeeStructure.hostelFee) || 0;
    const exam = Number.parseFloat(newFeeStructure.examFee) || 0;
    const misc = Number.parseFloat(newFeeStructure.miscFee) || 0;
    return tuition + hostel + exam + misc;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Fee Structure</CardTitle>
            <CardDescription>Create and manage fee structures for different courses</CardDescription>
          </div>
          <Dialog open={isAddFeeStructureOpen} onOpenChange={setIsAddFeeStructureOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Fee Structure
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Fee Structure</DialogTitle>
                <DialogDescription>Create a new fee structure for a course and semester</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newFeeStructure.course}
                      onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, course: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                        <SelectItem value="business-administration">Business Administration</SelectItem>
                        <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                        <SelectItem value="civil-engineering">Civil Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select
                      value={newFeeStructure.semester}
                      onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, semester: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semester-1">Semester 1</SelectItem>
                        <SelectItem value="semester-2">Semester 2</SelectItem>
                        <SelectItem value="semester-3">Semester 3</SelectItem>
                        <SelectItem value="semester-4">Semester 4</SelectItem>
                        <SelectItem value="semester-5">Semester 5</SelectItem>
                        <SelectItem value="semester-6">Semester 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tuition">Tuition Fee ($)</Label>
                    <Input
                      id="tuition"
                      type="number"
                      placeholder="15000"
                      value={newFeeStructure.tuitionFee}
                      onChange={(e) => setNewFeeStructure({ ...newFeeStructure, tuitionFee: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hostel">Hostel Fee ($)</Label>
                    <Input
                      id="hostel"
                      type="number"
                      placeholder="8000"
                      value={newFeeStructure.hostelFee}
                      onChange={(e) => setNewFeeStructure({ ...newFeeStructure, hostelFee: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exam">Exam Fee ($)</Label>
                    <Input
                      id="exam"
                      type="number"
                      placeholder="1500"
                      value={newFeeStructure.examFee}
                      onChange={(e) => setNewFeeStructure({ ...newFeeStructure, examFee: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="misc">Miscellaneous Fee ($)</Label>
                    <Input
                      id="misc"
                      type="number"
                      placeholder="2000"
                      value={newFeeStructure.miscFee}
                      onChange={(e) => setNewFeeStructure({ ...newFeeStructure, miscFee: e.target.value })}
                    />
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Fee:</span>
                    <span className="text-2xl font-bold text-blue-600">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddFeeStructureOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  if (!newFeeStructure.course || !newFeeStructure.semester) {
                    alert('Please fill in all required fields.');
                    return;
                  }
                  setIsAddFeeStructureOpen(false);
                }}>Create Fee Structure</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search fee structures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Course</th>
                  <th className="text-left py-3">Semester</th>
                  <th className="text-right py-3">Tuition Fee</th>
                  <th className="text-right py-3">Hostel Fee</th>
                  <th className="text-right py-3">Exam Fee</th>
                  <th className="text-right py-3">Misc Fee</th>
                  <th className="text-right py-3">Total Fee</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeStructures
                  .filter((fee) => fee.course.toLowerCase().includes(searchTerm.toLowerCase()) || fee.semester.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((fee) => (
                    <tr key={fee.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{fee.course}</td>
                      <td className="py-3">{fee.semester}</td>
                      <td className="text-right py-3">${fee.tuitionFee.toLocaleString()}</td>
                      <td className="text-right py-3">${fee.hostelFee.toLocaleString()}</td>
                      <td className="text-right py-3">${fee.examFee.toLocaleString()}</td>
                      <td className="text-right py-3">${fee.miscFee.toLocaleString()}</td>
                      <td className="text-right py-3 font-bold">${fee.totalFee.toLocaleString()}</td>
                      <td className="text-center py-3">
                        <Badge variant={fee.status === "Active" ? "default" : "secondary"}>{fee.status}</Badge>
                      </td>
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
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

export default FeeStructure;