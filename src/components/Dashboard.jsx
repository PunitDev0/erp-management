import React from 'react';

const Dashboard = () => {
  const features = [
    { name: 'Admissions', icon: '👤📋', color: 'from-blue-400 to-blue-600' },
    { name: 'Attendance', icon: '✅', color: 'from-green-400 to-green-600' },
    { name: 'Fees', icon: '💰', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Payroll', icon: '💵', color: 'from-purple-400 to-purple-600' },
    { name: 'Academic', icon: '🏫', color: 'from-red-400 to-red-600' },
    { name: 'Facilities', icon: '🏢', color: 'from-indigo-400 to-indigo-600' },
    { name: 'Reports', icon: '📊', color: 'from-teal-400 to-teal-600' },
    { name: 'SMS', icon: '📱', color: 'from-pink-400 to-pink-600' },
    { name: 'Inventory', icon: '📦', color: 'from-orange-400 to-orange-600' },
    { name: 'Tools', icon: '⚙️', color: 'from-gray-400 to-gray-600' },
  ];

  return (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group bg-gradient-to-br ${feature.color} rounded-xl p-6 text-center shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="absolute inset-0 bg-white opacity-10 rounded-xl group-hover:opacity-20 transition-opacity"></div>
              <div className="relative text-5xl mb-4 text-white">{feature.icon}</div>
              <p className="text-white text-lg font-semibold tracking-wide">{feature.name}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Dashboard;