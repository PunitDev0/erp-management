'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Image, Calendar, Phone, FileText, Plus, GraduationCapIcon, Wallet } from 'lucide-react';
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
import { useForm, useFieldArray } from 'react-hook-form';

export default function StudentAdmissionForm() {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
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
      fees: {
        admissionFees: 0,
        universityFees: 0,
        markSheet: 0,
        tuition: 2075,
        specialFees: 7800,
        englishLab: 200,
        computerLab: 0,
        stationary: 200,
        pta: 0,
        other: 100,
        paidAmount: 15000,
        balanceAmount: 4000,
        totalAmount: 10375,
        hostel: false,
        transport: false
      }
    }
  });
  const { fields, append } = useFieldArray({ control, name: 'academicDetails' });
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [feesOpen, setFeesOpen] = useState(false);
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
    setFeesOpen(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setValue('studentPhoto', file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleFeesSubmit = (feesData) => {
    setValue('fees', feesData);
    setFeesOpen(false);
    console.log('Fees submitted:', feesData);
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
              Student Admission Form
            </CardTitle>
            <p className="text-sm text-indigo-100 text-center mt-2">{currentDateTime}</p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <User className="mr-2 h-6 w-6 text-indigo-600" /> Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'firstName', label: 'First Name', type: 'text', icon: User },
                    { id: 'lastName', label: 'Last Name', type: 'text', icon: User },
                    { id: 'fathersName', label: "Father's Name", type: 'text', icon: User },
                    { id: 'mothersName', label: "Mother's Name", type: 'text', icon: User },
                    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', icon: Calendar },
                    { id: 'placeOfBirth', label: 'Place of Birth', type: 'text', icon: MapPin },
                    { id: 'city', label: 'City', type: 'text', icon: MapPin },
                    { id: 'state', label: 'State', type: 'text', icon: MapPin },
                    { id: 'country', label: 'Country', type: 'text', icon: MapPin },
                    { id: 'pinCode', label: 'Pin Code', type: 'text', icon: MapPin },
                    { id: 'phoneNumber', label: 'Phone Number', type: 'tel', icon: Phone },
                    { id: 'emailId', label: 'Email ID', type: 'email', icon: Mail },
                    { id: 'studentPhoto', label: 'Student Photo', type: 'file', icon: Image, accept: 'image/*', onChange: handlePhotoChange },
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
                    <Label className="text-sm font-medium text-gray-700">Gender</Label>
                    <RadioGroup
                      value={watch('gender')}
                      onValueChange={(value) => setValue('gender', value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="text-indigo-600" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="text-indigo-600" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
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
                        <RadioGroupItem value="hindu" id="hindu" className="text-indigo-600" />
                        <Label htmlFor="hindu">Hindu</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" className="text-indigo-600" />
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
                        {['BC', 'SC', 'ST', 'OC'].map((comm) => (
                          <SelectItem key={comm} value={comm}>{comm}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.community && <p className="text-red-500 text-xs mt-1">{errors.community.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caste" className="text-sm font-medium text-gray-700">Caste</Label>
                    <Input
                      {...register('caste', { required: 'Please enter caste' })}
                      type="text"
                      id="caste"
                      className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors.caste ? 'border-red-500' : ''}`}
                    />
                    {errors.caste && <p className="text-red-500 text-xs mt-1">{errors.caste.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Handicapped</Label>
                    <RadioGroup
                      value={watch('handicapped')}
                      onValueChange={(value) => setValue('handicapped', value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="handicapped_yes" className="text-indigo-600" />
                        <Label htmlFor="handicapped_yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="handicapped_no" className="text-indigo-600" />
                        <Label htmlFor="handicapped_no">No</Label>
                      </div>
                    </RadioGroup>
                    {errors.handicapped && <p className="text-red-500 text-xs mt-1">{errors.handicapped.message}</p>}
                  </div>
                </div>
              </motion.div>

              {/* Family Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <User className="mr-2 h-6 w-6 text-indigo-600" /> Family Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'fathersOccupation', label: "Father's Occupation", type: 'text', icon: User },
                    { id: 'yearlyIncome', label: 'Yearly Income', type: 'number', icon: FileText },
                    { id: 'fathersPhoneNumber', label: "Father's Phone Number", type: 'tel', icon: Phone },
                    { id: 'fathersEmailId', label: "Father's Email ID", type: 'email', icon: Mail },
                    { id: 'mothersTongue', label: "Mother's Tongue", type: 'text', icon: User },
                    { id: 'communityCertificateNo', label: 'Community Certificate No', type: 'text', icon: FileText },
                  ].map(({ id, label, type, icon: Icon }) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
                        <Icon className="mr-2 h-5 w-5 text-indigo-600" /> {label}
                      </Label>
                      <Input
                        {...register(id, { required: `Please enter ${label.toLowerCase()}` })}
                        type={type}
                        id={id}
                        className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors[id] ? 'border-red-500' : ''}`}
                      />
                      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
                    </div>
                  ))}
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

              {/* Guardian Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <User className="mr-2 h-6 w-6 text-indigo-600" /> Guardian Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'guardianName', label: 'Guardian Name', type: 'text', icon: User },
                    { id: 'guardianPhone', label: 'Guardian Phone', type: 'tel', icon: Phone },
                    { id: 'guardianEmailId', label: 'Guardian Email ID', type: 'email', icon: Mail },
                  ].map(({ id, label, type, icon: Icon }) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
                        <Icon className="mr-2 h-5 w-5 text-indigo-600" /> {label}
                      </Label>
                      <Input
                        {...register(id)}
                        type={type}
                        id={id}
                        className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  ))}
                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <Label htmlFor="guardianAddress" className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-indigo-600" /> Guardian Address
                    </Label>
                    <Textarea
                      {...register('guardianAddress')}
                      id="guardianAddress"
                      rows="4"
                      className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Administrative */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Administrative
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="admissionNo" className="text-sm font-medium text-gray-700">Admission No</Label>
                    <Input
                      {...register('admissionNo', { required: 'Please enter admission number' })}
                      type="text"
                      id="admissionNo"
                      className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors.admissionNo ? 'border-red-500' : ''}`}
                    />
                    {errors.admissionNo && <p className="text-red-500 text-xs mt-1">{errors.admissionNo.message}</p>}
                  </div>
                </div>
              </motion.div>

              {/* Academic Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
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
                    Preview Admission Details
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Review your information before submission.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">

                  {/* Left Side */}
                  <div className="space-y-6">
                    {/* Student Photo */}
                    {photoPreview && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Student Photo Preview:</Label>
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="mt-2 w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Student Info */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-3">
                        <User className="w-5 h-5" /> Student Information
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(watch()).map(([key, value]) => {
                          if (key === "fees" || key === "academicDetails") return null;
                          return (
                            <div key={key} className="flex justify-between items-center border-b py-1">
                              <span className="font-medium capitalize text-gray-800">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                :</span>
                              <span className="text-gray-600">{value instanceof File ? value.name : value || "N/A"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Academic Info */}
                    {watch("academicDetails").map((academic, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-2">
                          <GraduationCapIcon className="w-5 h-5" />
                          Academic Record {index + 1}
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(academic).map(([field, val]) => (
                            <div key={field} className="flex justify-between items-center border-b py-1">
                              <span className="capitalize text-gray-800 font-medium">
                                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                :</span>
                              <span className="text-gray-600">{val || "N/A"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Side: Fees */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-3">
                        <Wallet className="w-5 h-5" />
                        Fees Details
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(watch("fees")).map(([field, val]) => (
                          <div key={field} className="flex justify-between items-center border-b py-1">
                            <span className="capitalize text-gray-800 font-medium">
                              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              :</span>
                            <span className="text-gray-600">
                              {typeof val === "boolean" ? (val ? "Yes" : "No") : `₹${val}` || "N/A"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
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

            {/* Fees Dialog */}
            <Dialog open={feesOpen} onOpenChange={setFeesOpen}>
              <DialogContent className="bg-white border-2 border-indigo-200 rounded-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-indigo-800">Fees Details (₹)</DialogTitle>
                  <DialogDescription className="text-gray-600">Enter the fees details.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit((data) => handleFeesSubmit(data.fees))} className="space-y-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 'admissionFees', label: 'Admission Fees', defaultValue: 0 },
                      { id: 'universityFees', label: 'University Fees', defaultValue: 0 },
                      { id: 'markSheet', label: '+12 Mark Sheet', defaultValue: 0 },
                      { id: 'tuition', label: 'Tuition', defaultValue: 2075 },
                      { id: 'specialFees', label: 'Special Fees', defaultValue: 7800 },
                      { id: 'englishLab', label: 'English Lab', defaultValue: 200 },
                      { id: 'computerLab', label: 'Computer Lab', defaultValue: 0 },
                      { id: 'stationary', label: 'Stationary', defaultValue: 200 },
                      { id: 'pta', label: 'PTA', defaultValue: 0 },
                      { id: 'other', label: 'Other', defaultValue: 100 },
                      { id: 'paidAmount', label: 'Paid Amount', defaultValue: 15000 },
                      { id: 'balanceAmount', label: 'Balance Amount', defaultValue: 4000 },
                      { id: 'totalAmount', label: 'Total Amount', defaultValue: 10375, readOnly: true },
                    ].map(({ id, label, defaultValue, readOnly }) => (
                      <div key={id} className="space-y-2">
                        <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
                        <Input
                          {...register(`fees.${id}`, { required: !readOnly && `Please enter ${label.toLowerCase()}` })}
                          type="number"
                          id={id}
                          defaultValue={defaultValue}
                          readOnly={readOnly}
                          className={`w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${errors.fees?.[id] ? 'border-red-500' : ''}`}
                        />
                        {errors.fees?.[id] && <p className="text-red-500 text-xs mt-1">{errors.fees[id].message}</p>}
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Hostel</Label>
                      <div className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('fees.hostel')}
                            id="hostel_yes"
                            className="w-5 h-5 rounded-full border-2 border-indigo-600 text-indigo-600 focus:ring-0"
                          />
                          <Label htmlFor="hostel_yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('fees.hostel')}
                            id="hostel_no"
                            className="w-5 h-5 rounded-full border-2 border-indigo-600 text-indigo-600 focus:ring-0"
                          />
                          <Label htmlFor="hostel_no">No</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Transport</Label>
                      <div className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('fees.transport')}
                            id="transport_yes"
                            className="w-5 h-5 rounded-full border-2 border-indigo-600 text-indigo-600 focus:ring-0"
                          />
                          <Label htmlFor="transport_yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('fees.transport')}
                            id="transport_no"
                            className="w-5 h-5 rounded-full border-2 border-indigo-600 text-indigo-600 focus:ring-0"
                          />
                          <Label htmlFor="transport_no">No</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setFeesOpen(false)}
                      className="w-full sm:w-auto hover:scale-105 transition-all duration-200 border-indigo-300 text-indigo-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                    >
                      Save Fees
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}