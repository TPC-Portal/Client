import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, User, Settings, LogOut } from 'lucide-react';
import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose, currentPath, isAuthenticated }) => {
  const navigate = useNavigate();

  const profileMenuItems = [
    { icon: User, title: 'View Profile', onClick: () => navigate('/profile') },
    { icon: Settings, title: 'Settings', onClick: () => navigate('/settings') },
    { icon: LogOut, title: 'Sign Out', onClick: () => {/* Handle sign out */} },
  ];

  return (
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
              
              {!isAuthenticated ? (
                <motion.button
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg border border-indigo-400/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    window.location.href = '/login';
                  }}
                >
                  <LogIn className="w-4.5 h-4.5" />
                  <span>Login</span>
                </motion.button>
              ) : (
                <div className="space-y-2">
                  {profileMenuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      className="flex items-center gap-2 w-full px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onClose();
                        item.onClick();
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 