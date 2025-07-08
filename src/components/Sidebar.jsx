'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const modules = [
  'Admission', 'Student', 'Attendance', 'Fees', 'Payroll',
  'Academic', 'Facilities', 'Reports', 'SMS', 'Inventory', 'Tools'
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-erp-blue text-white p-4 h-screen ">
      <h2 className="text-2xl font-bold mb-6">ERP System</h2>
      <nav>
        <ul>
          {modules.map((module) => (
            <li key={module} className="mb-2">
              <Link
                href={`/${module.toLowerCase()}`}
                className={`block p-2 rounded ${
                  pathname.startsWith(`/${module.toLowerCase()}`)
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-600'
                }`}
              >
                {module}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}