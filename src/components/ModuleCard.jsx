'use client';
import Link from 'next/link';

export default function ModuleCard({ name, href, icon }) {
  return (
    <Link href={href} className="bg-blue-200 p-4 rounded-lg shadow border-4 border-purple-500 text-center hover:bg-blue-300 transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </Link>
  );
}