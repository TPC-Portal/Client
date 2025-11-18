import React from 'react';
import { motion } from 'framer-motion';
import ResumeUpload from '../components/ResumeUpload';

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen "
    >
      <div className="py-8">
        <ResumeUpload />
      </div>
    </motion.div>
  );
};

export default Resume;
