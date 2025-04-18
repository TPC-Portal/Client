import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

const Insights = () => {
  const studentData = useSelector((state) => state.studentData.data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 p-4 sm:p-6 md:p-8"
    >
      <h1 className="text-4xl font-bold text-white mb-8">Insights</h1>
      <p className='text-white'>{studentData[0].Branch}</p>
    </motion.div>
  );
};

export default Insights;