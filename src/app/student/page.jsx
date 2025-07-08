'use client';
import StudentTable from '@/components/StudentTable';

export default function Student() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">Student Management</h1>
      <StudentTable />
    </div>
  );
}