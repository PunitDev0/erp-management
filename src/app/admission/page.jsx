'use client';
import Link from 'next/link';
import StudentTable from '../components/StudentTable';

export default function Admission() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">Admission Management</h1>
      <div className="mb-6">
        <Link href="/admission/new-student" className="bg-erp-blue text-white p-2 rounded hover:bg-blue-700 mr-4">
          Add New Student
        </Link>
        <Link href="/admission/new-staff" className="bg-erp-blue text-white p-2 rounded hover:bg-blue-700">
          Add New Staff
        </Link>
      </div>
      <StudentTable />
    </div>
  );
}