import React from 'react';
import { motion } from 'framer-motion';

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-white">Resume</h1>
      <p className="text-gray-400">Coming soon...</p>
    </motion.div>
  );
};

export default Resume; 