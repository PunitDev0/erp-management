'use client';
import StudentForm from '../../components/StudentForm';

export default function NewStaff() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">New Staff Admission</h1>
      <StudentForm type="staff" />
    </div>
  );
}