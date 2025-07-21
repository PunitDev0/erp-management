'use client';
import Link from 'next/link';
import AttendanceTable from '@/components/StudentAttendance';
import Layout from '@/components/Layout/Layout';

export default function Attendance() {
  return (
    <Layout>
      <AttendanceTable />
    </Layout>
  );
}