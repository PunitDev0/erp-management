'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Image, Calendar, Phone, FileText, Plus, GraduationCapIcon } from 'lucide-react';
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm, useFieldArray } from 'react-hook-form';

export default function StaffAdmissionForm() {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
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
      religion: 'Hindu',
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
    }
  });
  const { fields, append } = useFieldArray({ control, name: 'academicDetails' });
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

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    setPreviewOpen(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setValue('photo', file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen font-sans"
    >
      <div className="mx-auto">
        <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-indigo-100 p-0">
          <CardHeader className="bg-indigo-600 rounded-t-lg p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              Staff Admission Form
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">{currentDateTime}</p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Staff Designation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <User className="mr-2 h-6 w-6 text-indigo-600" /> Staff Designation
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <User className="mr-2 h-5 w-5 text-indigo-600" /> Staff Designation
                    </Label>
                    <RadioGroup
                      value={watch('staffDesignation')}
                      onValueChange={(value) => setValue('staffDesignation', value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Teaching" id="teaching" className="text-indigo-600" />
                        <Label htmlFor="teaching">Teaching</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Non-Teaching" id="non-teaching" className="text-indigo-600" />
                        <Label htmlFor="non-teaching">Non-Teaching</Label>
                      </div>
                    </RadioGroup>
                    {errors.staffDesignation && <p className="text-red-500 text-xs mt-1">{errors.staffDesignation.message}</p>}
                  </div>
                </div>
              </motion.div>

              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <User className="mr-2 h-6 w-6 text-indigo-600" /> Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'firstName', label: 'First Name', type: 'text', icon: User },
                    { id: 'lastName', label: 'Last Name', type: 'text', icon: User },
                    { id: 'fatherName', label: 'Father Name', type: 'text', icon: User },
                    { id: 'husbandName', label: 'Husband Name', type: 'text', icon: User },
                    { id: 'motherName', label: 'Mother Name', type: 'text', icon: User },
                    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', icon: Calendar },
                    { id: 'placeOfBirth', label: 'Place of Birth', type: 'text', icon: MapPin },
                    { id: 'city', label: 'City', type: 'text', icon: MapPin },
                    { id: 'state', label: 'State', type: 'text', icon: MapPin },
                    { id: 'country', label: 'Country', type: 'text', icon: MapPin },
                    { id: 'pinCode', label: 'Pin Code', type: 'text', icon: MapPin },
                    { id: 'phoneNo', label: 'Phone Number', type: 'tel', icon: Phone },
                    { id: 'emailId', label: 'Email ID', type: 'email', icon: Mail },
                    { id: 'motherTongue', label: 'Mother Tongue', type: 'text', icon: User },
                    { id: 'qualification', label: 'Qualification', type: 'text', icon: FileText },
                    { id: 'dateOfJoin', label: 'Date of Join', type: 'date', icon: Calendar },
                    { id: 'experience', label: 'Experience', type: 'text', icon: FileText },
                    { id: 'basicSalary', label: 'Basic Salary', type: 'text', icon: FileText },
                    { id: 'caste', label: 'Caste', type: 'text', icon: User },
                    { id: 'photo', label: 'Photo', type: 'file', icon: Image, accept: 'image/*', onChange: handlePhotoChange },
                  ].map(({ id, label, type, icon: Icon, accept, onChange }) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
                        <Icon className="mr-2 h-5 w-5 text-indigo-600" /> {label}
                      </Label>
                      <Input
                        {...register(id, { required: `Please enter ${label.toLowerCase()}` })}
                        type={type}
                        id={id}
                        accept={accept}
                        onChange={onChange}
                        className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors[id] ? 'border-red-500' : ''}`}
                      />
                      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Sex</Label>
                    <RadioGroup
                      value={watch('sex')}
                      onValueChange={(value) => setValue('sex', value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" className="text-indigo-600" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" className="text-indigo-600" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                    {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Handicapped</Label>
                    <RadioGroup
                      value={watch('handicapped')}
                      onValueChange={(value) => setValue('handicapped', value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="handicapped_yes" className="text-indigo-600" />
                        <Label htmlFor="handicapped_yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="handicapped_no" className="text-indigo-600" />
                        <Label htmlFor="handicapped_no">No</Label>
                      </div>
                    </RadioGroup>
                    {errors.handicapped && <p className="text-red-500 text-xs mt-1">{errors.handicapped.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-sm font-medium text-gray-700">Blood Group</Label>
                    <Select
                      value={watch('bloodGroup')}
                      onValueChange={(value) => setValue('bloodGroup', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">Nationality</Label>
                    <Select
                      value={watch('nationality')}
                      onValueChange={(value) => setValue('nationality', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Religion</Label>
                    <RadioGroup
                      value={watch('religion')}
                      onValueChange={(value) => setValue('religion', value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Hindu" id="hindu" className="text-indigo-600" />
                        <Label htmlFor="hindu">Hindu</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="other" className="text-indigo-600" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    {errors.religion && <p className="text-red-500 text-xs mt-1">{errors.religion.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="community" className="text-sm font-medium text-gray-700">Community</Label>
                    <Select
                      value={watch('community')}
                      onValueChange={(value) => setValue('community', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Community" />
                      </SelectTrigger>
                      <SelectContent>
                        {['MBC', 'SC', 'ST', 'OC'].map((comm) => (
                          <SelectItem key={comm} value={comm}>{comm}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.community && <p className="text-red-500 text-xs mt-1">{errors.community.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-sm font-medium text-gray-700">Degree</Label>
                    <Select
                      value={watch('degree')}
                      onValueChange={(value) => setValue('degree', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UG">UG</SelectItem>
                        <SelectItem value="PG">PG</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handlingSubjects" className="text-sm font-medium text-gray-700">Handling Subjects</Label>
                    <Select
                      value={watch('handlingSubjects')}
                      onValueChange={(value) => setValue('handlingSubjects', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Multiple Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Indian Economy', 'Business Mathematics-II', 'Business Economics', 'Financial Economics'].map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.handlingSubjects && <p className="text-red-500 text-xs mt-1">{errors.handlingSubjects.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designationType" className="text-sm font-medium text-gray-700">Designation Type</Label>
                    <Select
                      value={watch('designationType')}
                      onValueChange={(value) => setValue('designationType', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Designation Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Accountant">Accountant</SelectItem>
                        <SelectItem value="Basic salary">Basic salary</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.designationType && <p className="text-red-500 text-xs mt-1">{errors.designationType.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-sm font-medium text-gray-700">Course</Label>
                    <Select
                      value={watch('course')}
                      onValueChange={(value) => setValue('course', value)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B.Sc Computer Science">B.Sc Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
                  </div>
                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-indigo-600" /> Address
                    </Label>
                    <Textarea
                      {...register('address', { required: 'Please enter address' })}
                      id="address"
                      rows="4"
                      className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                </div>
              </motion.div>

              {/* Academic Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Academic Details
                </h2>
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                    {[
                      { id: `academicDetails[${index}].academicYear`, label: 'Academic Year', type: 'text' },
                      { id: `academicDetails[${index}].course`, label: 'Course', type: 'text' },
                      { id: `academicDetails[${index}].degree`, label: 'Degree', type: 'text' },
                      { id: `academicDetails[${index}].department`, label: 'Department', type: 'text' },
                      { id: `academicDetails[${index}].semester`, label: 'Semester', type: 'text' },
                    ].map(({ id, label, type }) => (
                      <div key={id} className="space-y-2">
                        <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
                        <Input
                          {...register(id, { required: `Please enter ${label.toLowerCase()}` })}
                          type={type}
                          id={id}
                          className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors.academicDetails?.[index]?.[label.toLowerCase()] ? 'border-red-500' : ''}`}
                        />
                        {errors.academicDetails?.[index]?.[label.toLowerCase()] && (
                          <p className="text-red-500 text-xs mt-1">{errors.academicDetails[index][label.toLowerCase()].message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ academicYear: '', course: '', degree: '', department: '', semester: '' })}
                  className="mt-4 px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200 flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Academic Record
                </Button>
              </motion.div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <Button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                >
                  Preview
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                >
                  Submit
                </Button>
              </div>
            </form>

            {/* Preview Dialog */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="w-full sm:max-w-[90vw] bg-white border-2 border-indigo-200 rounded-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-indigo-800 flex items-center gap-2">
                    <User className="w-6 h-6 text-indigo-700" />
                    Preview Staff Admission Details
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Review your information before submission.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                  <div className="space-y-6">
                    {photoPreview && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Photo Preview:</Label>
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="mt-2 w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-3">
                        <User className="w-5 h-5" /> Staff Information
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(watch()).map(([key, value]) => {
                          if (key === 'academicDetails') return null;
                          return (
                            <div key={key} className="flex justify-between items-center border-b py-1">
                              <span className="font-medium capitalize text-gray-800">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                              </span>
                              <span className="text-gray-600">{value instanceof File ? value.name : value || 'N/A'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {watch('academicDetails').map((academic, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-2">
                          <GraduationCapIcon className="w-5 h-5" />
                          Academic Record {index + 1}
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(academic).map(([field, val]) => (
                            <div key={field} className="flex justify-between items-center border-b py-1">
                              <span className="capitalize text-gray-800 font-medium">
                                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                              </span>
                              <span className="text-gray-600">{val || 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewOpen(false)}
                    className="w-full sm:w-auto hover:scale-105 transition-all duration-200 border-indigo-300 text-indigo-600"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                  >
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