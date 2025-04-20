import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NavItem from './NavItem';

const MobileMenu = ({ isOpen, onClose, currentPath }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50"
          onClick={onClose}
        />
        
        {/* Menu panel */}
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-y-0 right-0 w-72 bg-gray-900 shadow-xl border-l border-gray-800 p-6 z-50"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800/50 hover:bg-gray-800"
          >
            <X size={20} />
          </button>
          <div className="flex flex-col space-y-4 mt-12">
            <NavItem to="/" isActive={currentPath === '/'}>Dashboard</NavItem>
            <NavItem to="/insights" isActive={currentPath === '/insights'}>Insights</NavItem>
            <NavItem to="/resume" isActive={currentPath === '/resume'}>Resume</NavItem>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default MobileMenu; 