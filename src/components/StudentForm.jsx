'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addStudent } from '../../lib/api';

export default function StudentForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    place: '',
    schoolDetails: type === 'student' ? '' : undefined,
    department: type === 'staff' ? '' : undefined,
    type,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      alert(`${type === 'student' ? 'Student' : 'Staff'} added successfully`);
      router.push('/admission');
    } catch (error) {
      alert(`Failed to add ${type === 'student' ? 'student' : 'staff'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New {type === 'student' ? 'Student' : 'Staff'}</h2>
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
        {type === 'student' ? (
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
        Add {type === 'student' ? 'Student' : 'Staff'}
      </button>
    </form>
  );
}