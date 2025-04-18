import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NavItem from './NavItem';

const MobileMenu = ({ isOpen, onClose, currentPath }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        className="fixed inset-y-0 right-0 w-64 bg-gray-900 border-l border-gray-800 p-6 z-50"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col space-y-4 mt-12">
          <NavItem to="/" isActive={currentPath === '/'}>Dashboard</NavItem>
          <NavItem to="/insights" isActive={currentPath === '/insights'}>Insights</NavItem>
          <NavItem to="/resume" isActive={currentPath === '/resume'}>Resume</NavItem>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu; 