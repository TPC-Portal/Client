import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavItem = ({ to, children, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className={`px-6 py-2 rounded-lg text-lg ${
        isActive 
          ? 'bg-white/10 text-white' 
          : 'text-gray-300 hover:text-white hover:bg-white/5'
      } transition-all duration-200`}
    >
      {children}
    </Link>
  </motion.div>
);

export default NavItem; 