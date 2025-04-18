import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <main className="pt-20 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 