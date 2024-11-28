// DashboardLayout.tsx
import React from 'react';
import Sidebar from '../../components/retail/Sidebar';
import Navbar from '../../components/crm/Navbar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Container */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar Container */}
        <div className="fixed w-64 min-h-screen">
          <Sidebar />
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-grow ml-64 pt-16 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;