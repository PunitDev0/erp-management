'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getStudents, updateStudent } from '@/lib/api';

export default function EditStudent() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      const students = await getStudents();
      const student = students.find((s) => s.id.toString() === id);
      if (student) {
        setFormData(student);
      }
    }
    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, formData);
      alert('Student updated successfully');
      router.push('/student');
    } catch (error) {
      alert('Failed to update student');
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-erp-blue">Edit Student</h1>
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Update {formData.type === 'student' ? 'Student' : 'Staff'} Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Place"
            value={formData.place}
            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            className="p-2 border rounded"
            required
          />
          {formData.type === 'student' ? (
            <input
              type="text"
              placeholder="School Details"
              value={formData.schoolDetails}
              onChange={(e) => setFormData({ ...formData, schoolDetails: e.target.value })}
              className="p-2 border rounded"
              required
            />
          ) : (
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="p-2 border rounded"
              required
            />
          )}
        </div>
        <button type="submit" className="mt-4 bg-erp-blue text-white p-2 rounded hover:bg-blue-700">
          Update {formData.type === 'student' ? 'Student' : 'Staff'}
        </button>
      </form>
    </div>
  );
}