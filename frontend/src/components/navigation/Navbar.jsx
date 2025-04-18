import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Settings, LogOut, Menu, ChevronDown } from 'lucide-react';
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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileMenuItems = [
    { icon: User, title: 'View Profile', onClick: () => navigate('/profile') },
    { icon: Settings, title: 'Settings', onClick: () => navigate('/settings') },
    { icon: LogOut, title: 'Sign Out', onClick: () => {/* Handle sign out */} },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img 
              src="/lnmiit-logo.png" 
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
            <div className="relative">
              <motion.button
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-6 h-6 text-gray-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <DropdownMenu 
                isOpen={isNotificationsOpen} 
                items={notifications}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>
            
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

            <motion.button
              className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
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
      />
    </motion.nav>
  );
};

export default Navbar; 