'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Image, Calendar, Phone, FileText, Plus } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function StudentAdmissionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    gender: 'female',
    dateOfBirth: '',
    placeOfBirth: '',
    bloodGroup: '',
    nationality: '',
    religion: 'hindu',
    community: '',
    caste: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phoneNumber: '',
    emailId: '',
    handicapped: 'no',
    studentPhoto: null,
    fathersOccupation: '',
    yearlyIncome: '',
    fathersPhoneNumber: '',
    fathersEmailId: '',
    address: '',
    mothersTongue: '',
    communityCertificateNo: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmailId: '',
    guardianAddress: '',
    admissionNo: '',
    academicDetails: [{ academicYear: '', course: '', degree: '', department: '', semester: '' }],
  });
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' };
      setCurrentDateTime(now.toLocaleString('en-US', options).replace(',', ' at'));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name.startsWith('academicDetails')) {
      const [index, field] = name.split('.')[1].split('.');
      const newAcademicDetails = [...formData.academicDetails];
      newAcademicDetails[parseInt(index)][field] = value;
      setFormData(prev => ({ ...prev, academicDetails: newAcademicDetails }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value,
      }));
    }
    if (name === 'studentPhoto' && files && files[0]) {
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
    // Add form submission logic here (e.g., API call)
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen   font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <Card className=" to-white border-double border-2 border-indigo-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6">
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5 text-indigo-600" /> Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fathersName" className="text-sm font-medium text-gray-700">Father's Name</Label>
                    <Input type="text" id="fathersName" name="fathersName" value={formData.fathersName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mothersName" className="text-sm font-medium text-gray-700">Mother's Name</Label>
                    <Input type="text" id="mothersName" name="mothersName" value={formData.mothersName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Gender</Label>
                    <RadioGroup value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))} className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-indigo-600" /> Date of Birth
                    </Label>
                    <Input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="placeOfBirth" className="text-sm font-medium text-gray-700">Place of Birth</Label>
                    <Input type="text" id="placeOfBirth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
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
                  </div>
                  <div className="space-y-2">
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
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Religion</Label>
                    <RadioGroup value={formData.religion} onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))} className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hindu" id="hindu" />
                        <Label htmlFor="hindu">Hindu</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="community" className="text-sm font-medium text-gray-700">Community</Label>
                    <Select value={formData.community} onValueChange={(value) => setFormData(prev => ({ ...prev, community: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BC">BC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="OC">OC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caste" className="text-sm font-medium text-gray-700">Caste</Label>
                    <Input type="text" id="caste" name="caste" value={formData.caste} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                    <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                    <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                    <Input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pinCode" className="text-sm font-medium text-gray-700">Pin Code</Label>
                    <Input type="text" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-indigo-600" /> Phone Number
                    </Label>
                    <Input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailId" className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-indigo-600" /> Email ID
                    </Label>
                    <Input type="email" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Handicapped</Label>
                    <RadioGroup value={formData.handicapped} onValueChange={(value) => setFormData(prev => ({ ...prev, handicapped: value }))} className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="handicapped_yes" />
                        <Label htmlFor="handicapped_yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="handicapped_no" />
                        <Label htmlFor="handicapped_no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentPhoto" className="text-sm font-medium text-gray-700 flex items-center">
                      <Image className="mr-2 h-5 w-5 text-indigo-600" /> Student Photo
                    </Label>
                    <Input type="file" id="studentPhoto" name="studentPhoto" accept="image/*" onChange={handleChange} />
                  </div>
                </div>
              </motion.div>

              {/* Family Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5 text-indigo-600" /> Family Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fathersOccupation" className="text-sm font-medium text-gray-700">Father's Occupation</Label>
                    <Input type="text" id="fathersOccupation" name="fathersOccupation" value={formData.fathersOccupation} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearlyIncome" className="text-sm font-medium text-gray-700">Yearly Income</Label>
                    <Input type="number" id="yearlyIncome" name="yearlyIncome" value={formData.yearlyIncome} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fathersPhoneNumber" className="text-sm font-medium text-gray-700 flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-indigo-600" /> Father's Phone Number
                    </Label>
                    <Input type="tel" id="fathersPhoneNumber" name="fathersPhoneNumber" value={formData.fathersPhoneNumber} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fathersEmailId" className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-indigo-600" /> Father's Email ID
                    </Label>
                    <Input type="email" id="fathersEmailId" name="fathersEmailId" value={formData.fathersEmailId} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-indigo-600" /> Address
                    </Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mothersTongue" className="text-sm font-medium text-gray-700">Mother's Tongue</Label>
                    <Input type="text" id="mothersTongue" name="mothersTongue" value={formData.mothersTongue} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="communityCertificateNo" className="text-sm font-medium text-gray-700">Community Certificate No</Label>
                    <Input type="text" id="communityCertificateNo" name="communityCertificateNo" value={formData.communityCertificateNo} onChange={handleChange} />
                  </div>
                </div>
              </motion.div>

              {/* Guardian Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5 text-indigo-600" /> Guardian Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianName" className="text-sm font-medium text-gray-700">Guardian Name</Label>
                    <Input type="text" id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone" className="text-sm font-medium text-gray-700 flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-indigo-600" /> Guardian Phone
                    </Label>
                    <Input type="tel" id="guardianPhone" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianEmailId" className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-indigo-600" /> Guardian Email ID
                    </Label>
                    <Input type="email" id="guardianEmailId" name="guardianEmailId" value={formData.guardianEmailId} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianAddress" className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-indigo-600" /> Guardian Address
                    </Label>
                    <Textarea id="guardianAddress" name="guardianAddress" value={formData.guardianAddress} onChange={handleChange} rows="3" />
                  </div>
                </div>
              </motion.div>

              {/* Administrative */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Administrative
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admissionNo" className="text-sm font-medium text-gray-700">Admission No</Label>
                    <Input type="text" id="admissionNo" name="admissionNo" value={formData.admissionNo} onChange={handleChange} />
                  </div>
                </div>
              </motion.div>

              {/* Academic Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-indigo-600" /> Academic Details
                </h2>
                {formData.academicDetails.map((academic, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
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
                  <DialogTitle className="text-2xl font-bold text-gray-900">Preview Admission Details</DialogTitle>
                  <DialogDescription className="text-gray-600">Review your information before submission.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {photoPreview && (
                    <div className="mb-4">
                      <Label className="text-sm font-medium text-gray-700">Student Photo Preview:</Label>
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