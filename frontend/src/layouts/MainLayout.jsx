import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <main className="pt-16 sm:pt-20 px-3 sm:px-6 md:px-8 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 