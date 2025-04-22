import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ResumeUpload from '../components/ResumeUpload';

const Resume = () => {
  const theme = useSelector((state) => state.theme?.current || 'light');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 p-4 sm:p-6 md:p-8"
    >
      <ResumeUpload />
    </motion.div>
  );
};

export default Resume;
