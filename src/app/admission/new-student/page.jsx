'use client';
import StudentForm from '../../components/StudentForm';

export default function NewStudent() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">New Student Admission</h1>
      <StudentForm type="student" />
    </div>
  );
}