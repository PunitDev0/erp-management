'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAttendance } from '../../lib/api';

export default function AttendanceForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    status: 'Present',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAttendance(formData);
      alert('Attendance added successfully');
      router.push('/attendance');
    } catch (error) {
      alert('Failed to add attendance');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Attendance</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <button type="submit" className="mt-4 bg-erp-blue text-white p-2 rounded hover:bg-blue-700">
        Add Attendance
      </button>
    </form>
  );
}