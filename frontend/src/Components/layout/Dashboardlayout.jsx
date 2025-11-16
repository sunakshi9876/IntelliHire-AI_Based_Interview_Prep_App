import React, { useContext } from 'react';
import { UserContext } from '../../context/useContext';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main content area */}
      {user ? (
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      ) : (
        <div className="flex items-center justify-center h-full p-6 text-gray-500">
          Please log in to access the dashboard.
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
