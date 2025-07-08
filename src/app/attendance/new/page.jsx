'use client';
import AttendanceForm from '../../components/AttendanceForm';

export default function NewAttendance() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">New Attendance Entry</h1>
      <AttendanceForm />
    </div>
  );
}