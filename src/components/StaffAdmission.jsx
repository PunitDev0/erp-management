'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Image, Calendar, Phone, FileText, Plus } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Input,
} from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Label,
} from "@/components/ui/label";
import {
  Button,
} from "@/components/ui/button";
import {
  Textarea,
} from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function StaffAdmissionForm() {
  const [formData, setFormData] = useState({
    staffDesignation: 'Teaching',
    firstName: '',
    lastName: '',
    fatherName: '',
    husbandName: '',
    motherName: '',
    dateOfBirth: '',
    bloodGroup: '',
    emailId: '',
    motherTongue: '',
    address: '',
    city: '',
    country: '',
    religion: '',
    caste: '',
    qualification: '',
    dateOfJoin: '',
    experience: '',
    degree: '',
    placeOfBirth: '',
    sex: 'Male',
    phoneNo: '',
    handicapped: 'No',
    state: '',
    pinCode: '',
    community: '',
    nationality: '',
    handlingSubjects: '',
    designationType: '',
    photo: null,
    basicSalary: '',
    course: '',
    department: '',
    academicDetails: [{ academicYear: '', course: '', degree: '', department: '', semester: '' }],
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' };
      // No need to set currentDateTime as it's not used in the UI yet, but keeping for consistency
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith('academicDetails')) {
      const [index, field] = name.split('.')[1].split('.');
      const newAcademicDetails = [...formData.academicDetails];
      newAcademicDetails[parseInt(index)][field] = value;
      setFormData(prev => ({ ...prev, academicDetails: newAcademicDetails }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
    if (name === 'photo' && files && files[0]) {
      setPhotoPreview(URL.createObjectURL(files[0]));
    }
  };

  const addAcademicRecord = () => {
    setFormData(prev => ({
      ...prev,
      academicDetails: [...prev.academicDetails, { academicYear: '', course: '', degree: '', department: '', semester: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans"
    >
      <div className=" mx-auto p-4">
        <Card className="border-none shadow-none p-0 bg-transparent">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-8 rounded-lg">

              {/* Staff Designation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100 rounded-t-xl"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center bg-blue-500 rounded-t-xl p-4">
                  <User className="mr-2 h-5 w-5 text-indigo-600" /> Staff Designation
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Staff Designation</Label>
                    <RadioGroup value={formData.staffDesignation} onValueChange={(value) => setFormData(prev => ({ ...prev, staffDesignation: value }))} className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Teaching" id="teaching" />
                        <Label htmlFor="teaching">Teaching</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Non-Teaching" id="non-teaching" />
                        <Label htmlFor="non-teaching">Non-Teaching</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </motion.div>

              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100 rounded-t-xl"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center bg-blue-500 rounded-t-xl p-4">
                  <User className="mr-2 h-5 w-5 text-indigo-600" /> Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">Father Name</Label>
                    <Input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                    <Label htmlFor="husbandName" className="text-sm font-medium text-gray-700">Husband Name</Label>
                    <Input type="text" id="husbandName" name="husbandName" value={formData.husbandName} onChange={handleChange} />
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">Date of Birth</Label>
                    <Input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    <Label htmlFor="bloodGroup" className="text-sm font-medium text-gray-700">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, bloodGroup: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="emailId" className="text-sm font-medium text-gray-700">Email Id</Label>
                    <Input type="email" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} />
                    <Label htmlFor="motherTongue" className="text-sm font-medium text-gray-700">Mother Tongue</Label>
                    <Input type="text" id="motherTongue" name="motherTongue" value={formData.motherTongue} onChange={handleChange} />
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" />
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                    <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                    <Input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
                    <Label htmlFor="religion" className="text-sm font-medium text-gray-700">Religion</Label>
                    <Select value={formData.religion} onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="caste" className="text-sm font-medium text-gray-700">Caste</Label>
                    <Input type="text" id="caste" name="caste" value={formData.caste} onChange={handleChange} />
                    <Label htmlFor="qualification" className="text-sm font-medium text-gray-700">Qualification</Label>
                    <Input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
                    <Label htmlFor="dateOfJoin" className="text-sm font-medium text-gray-700">Date of Join</Label>
                    <Input type="date" id="dateOfJoin" name="dateOfJoin" value={formData.dateOfJoin} onChange={handleChange} />
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700">Experience</Label>
                    <Input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
                    <Label htmlFor="degree" className="text-sm font-medium text-gray-700">Degree</Label>
                    <Select value={formData.degree} onValueChange={(value) => setFormData(prev => ({ ...prev, degree: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UG">UG</SelectItem>
                        <SelectItem value="PG">PG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    <Label htmlFor="motherName" className="text-sm font-medium text-gray-700">Mother Name</Label>
                    <Input type="text" id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} />
                    <Label htmlFor="placeOfBirth" className="text-sm font-medium text-gray-700">Place of Birth</Label>
                    <Input type="text" id="placeOfBirth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
                    <Label htmlFor="sex" className="text-sm font-medium text-gray-700">Sex</Label>
                    <RadioGroup value={formData.sex} onValueChange={(value) => setFormData(prev => ({ ...prev, sex: value }))} className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                    <Label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">Phone No</Label>
                    <Input type="tel" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                    <Label htmlFor="handicapped" className="text-sm font-medium text-gray-700">Handicapped</Label>
                    <RadioGroup value={formData.handicapped} onValueChange={(value) => setFormData(prev => ({ ...prev, handicapped: value }))} className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="handicapped_yes" />
                        <Label htmlFor="handicapped_yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="handicapped_no" />
                        <Label htmlFor="handicapped_no">No</Label>
                      </div>
                    </RadioGroup>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                    <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
                    <Label htmlFor="pinCode" className="text-sm font-medium text-gray-700">Pin Code</Label>
                    <Input type="text" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                    <Label htmlFor="community" className="text-sm font-medium text-gray-700">Community</Label>
                    <Select value={formData.community} onValueChange={(value) => setFormData(prev => ({ ...prev, community: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MBC">MBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="OC">OC</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">Nationality</Label>
                    <Select value={formData.nationality} onValueChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="handlingSubjects" className="text-sm font-medium text-gray-700">Handling Subjects</Label>
                    <Select value={formData.handlingSubjects} onValueChange={(value) => setFormData(prev => ({ ...prev, handlingSubjects: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Multiple Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indian Economy">Indian Economy</SelectItem>
                        <SelectItem value="Business Mathematics-II">Business Mathematics-II</SelectItem>
                        <SelectItem value="Business Economics">Business Economics</SelectItem>
                        <SelectItem value="Financial Economics">Financial Economics</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="designationType" className="text-sm font-medium text-gray-700">Designation Type</Label>
                    <Select value={formData.designationType} onValueChange={(value) => setFormData(prev => ({ ...prev, designationType: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Designation Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Accountant">Accountant</SelectItem>
                        <SelectItem value="Basic salary">Basic salary</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="photo" className="text-sm font-medium text-gray-700">Photo</Label>
                    <Input type="file" id="photo" name="photo" accept="image/*" onChange={handleChange} />
                    {photoPreview && <img src={photoPreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300" />}
                    <Label htmlFor="basicSalary" className="text-sm font-medium text-gray-700">Basic Salary</Label>
                    <Input type="text" id="basicSalary" name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
                    <Label htmlFor="course" className="text-sm font-medium text-gray-700">Course</Label>
                    <Select value={formData.course} onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B.Sc Computer Science">B.Sc Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="department" className="text-sm font-medium text-gray-700">Department</Label>
                    <Input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
                  </div>
                </div>
              </motion.div>

              {/* Academic Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100 rounded-t-xl"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center bg-blue-500 rounded-t-xl p-4">
                  <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Academic Details
                </h2>
                {formData.academicDetails.map((academic, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`academicDetails.${index}.academicYear`} className="text-sm font-medium text-gray-700">Academic Year</Label>
                      <Input type="text" id={`academicDetails.${index}.academicYear`} name={`academicDetails.${index}.academicYear`} value={academic.academicYear} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`academicDetails.${index}.course`} className="text-sm font-medium text-gray-700">Course</Label>
                      <Input type="text" id={`academicDetails.${index}.course`} name={`academicDetails.${index}.course`} value={academic.course} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`academicDetails.${index}.degree`} className="text-sm font-medium text-gray-700">Degree</Label>
                      <Input type="text" id={`academicDetails.${index}.degree`} name={`academicDetails.${index}.degree`} value={academic.degree} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`academicDetails.${index}.department`} className="text-sm font-medium text-gray-700">Department</Label>
                      <Input type="text" id={`academicDetails.${index}.department`} name={`academicDetails.${index}.department`} value={academic.department} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`academicDetails.${index}.semester`} className="text-sm font-medium text-gray-700">Semester</Label>
                      <Input type="text" id={`academicDetails.${index}.semester`} name={`academicDetails.${index}.semester`} value={academic.semester} onChange={handleChange} />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addAcademicRecord} className="mt-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add Academic Record
                </Button>
              </motion.div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 mt-6">
                <Button type="button" onClick={handlePreview} className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                  Preview
                </Button>
                <Button type="submit" className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200">
                  Submit
                </Button>
              </div>
            </form>

            {/* Preview Dialog */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="bg-gradient-to-br from-gray-50 to-white border-2 border-indigo-200 rounded-2xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">Preview Staff Admission Details</DialogTitle>
                  <DialogDescription className="text-gray-600">Review your information before submission.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {photoPreview && (
                    <div className="mb-4">
                      <Label className="text-sm font-medium text-gray-700">Photo Preview:</Label>
                      <img src={photoPreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300" />
                    </div>
                  )}
                  {Object.entries(formData).map(([key, value]) => {
                    if (key === 'academicDetails') {
                      return value.map((academic, index) => (
                        <div key={index} className="ml-4">
                          <h3 className="font-medium text-gray-800">Academic Record {index + 1}</h3>
                          {Object.entries(academic).map(([field, val]) => (
                            <div key={field} className="flex justify-between items-center mt-1">
                              <span className="capitalize text-gray-800">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                              <span className="text-gray-600">{val || 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      ));
                    }
                    return (
                      <div key={key} className="flex justify-between items-center">
                        <span className="font-medium capitalize text-gray-800">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                        <span className="text-gray-600">{value instanceof File ? value.name : value || 'N/A'}</span>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setPreviewOpen(false)} className="hover:scale-105 transition-all duration-200">
                    Close
                  </Button>
                  <Button onClick={handleSubmit} className="bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200">
                    Confirm Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}