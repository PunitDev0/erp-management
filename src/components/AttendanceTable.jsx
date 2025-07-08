'use client';
import { useState, useEffect } from 'react';
import { getAttendance } from '@/lib/api';

export default function AttendanceTable() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      const data = await getAttendance();
      setAttendance(data);
    }
    fetchAttendance();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Student ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="p-2">{record.studentId}</td>
              <td className="p-2">{record.date}</td>
              <td className="p-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}