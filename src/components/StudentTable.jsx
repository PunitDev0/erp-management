'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudents, deleteStudent } from '../../lib/api';

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const data = await getStudents();
      setStudents(data);
    }
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s.id !== id));
      alert('Deleted successfully');
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admission Records</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Place</th>
            <th className="p-2">Details</th>
            <th className="p-2">Type</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="p-2">{record.name}</td>
              <td className="p-2">{record.dob}</td>
              <td className="p-2">{record.place}</td>
              <td className="p-2">{record.schoolDetails || record.department}</td>
              <td className="p-2">{record.type}</td>
              <td className="p-2">
                <Link
                  href={`/student/edit/${record.id}`}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}