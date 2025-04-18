import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import LoadingSkeleton from './components/ui/LoadingSkeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Insights = React.lazy(() => import('./pages/Insights'));
const Resume = React.lazy(() => import('./pages/Resume'));

const App = () => {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <LoadingSkeleton />
          </div>
        }>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="insights" element={<Insights />} />
              <Route path="resume" element={<Resume />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
