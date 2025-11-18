import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import LoadingSkeleton from './components/ui/LoadingSkeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStudentData } from './utils/loadStudentData';
import { useDispatch } from 'react-redux';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Insights = React.lazy(() => import('./pages/Insights'));
const Resume = React.lazy(() => import('./pages/Resume'));
const LastAnalysis = React.lazy(() => import('./pages/LastAnalysis'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Signup = React.lazy(() => import('./pages/auth/Signup'));

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadStudentData(dispatch);
        // console.log("Student data loaded successfully:", data);
      } catch (error) {
        console.error("Error loading student data:", error);
      }
    };
    fetchData();
  }, []);
  
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
              <Route path="last" element={<LastAnalysis />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
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
