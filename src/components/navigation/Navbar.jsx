import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Settings, LogOut, Menu, ChevronDown, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import MobileMenu from './MobileMenu';

const notifications = [
  { id: 1, title: 'New job match', message: 'Google has a new position matching your profile', time: '5m ago' },
  { id: 2, title: 'Resume tip', message: 'Add your latest project to improve score', time: '1h ago' },
  { id: 3, title: 'Interview scheduled', message: 'Amazon interview on Monday 10 AM', time: '2h ago' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const profileMenuItems = [
    { icon: User, title: 'View Profile', onClick: () => navigate('/profile') },
    { icon: Settings, title: 'Settings', onClick: () => navigate('/settings') },
    { icon: LogOut, title: 'Sign Out', onClick: () => {/* Handle sign out */} },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 border-b border-gray-800 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="LNMIIT Logo" 
              className="h-8 cursor-pointer"
              onClick={() => navigate('/')}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://www.lnmiit.ac.in/images/LNMIIT_logo.png';
              }}
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavItem to="/" isActive={location.pathname === '/'}>Dashboard</NavItem>
            <NavItem to="/insights" isActive={location.pathname === '/insights'}>Insights</NavItem>
            <NavItem to="/resume" isActive={location.pathname === '/resume'}>Resume</NavItem>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg border border-indigo-400/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
              >
                <LogIn className="w-4.5 h-4.5" />
                <span className="hidden sm:inline">Login</span>
              </motion.button>
            ) : (
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <User className="w-6 h-6 text-gray-300" />
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.button>
                <DropdownMenu 
                  isOpen={isProfileOpen} 
                  items={profileMenuItems}
                  onClose={() => setIsProfileOpen(false)}
                />
              </div>
            )}

            <motion.button
              className="md:hidden p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        currentPath={location.pathname}
        isAuthenticated={isAuthenticated}
      />
    </motion.nav>
  );
};

export default Navbar; 