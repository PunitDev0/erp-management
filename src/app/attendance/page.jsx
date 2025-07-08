'use client';
import Link from 'next/link';
import AttendanceTable from '@/components/AttendanceTable';

export default function Attendance() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">Attendance Management</h1>
      <div className="mb-6">
        <Link href="/attendance/new" className="bg-erp-blue text-white p-2 rounded hover:bg-blue-700">
          Add New Attendance
        </Link>
      </div>
      <AttendanceTable />
    </div>
  );
}