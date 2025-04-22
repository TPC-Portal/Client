import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownMenu = ({ isOpen, items, onClose }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-72 rounded-xl bg-gray-800 border border-gray-700 shadow-lg py-2 z-50"
        >
          {items.map((item, idx) => (
            <motion.button
              key={idx}
              className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700/50 flex items-center gap-3"
              whileHover={{ x: 5 }}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                  onClose();
                }
              }}
            >
              {item.icon && <item.icon size={18} />}
              <div className="flex-1">
                {item.title && <div className="font-medium">{item.title}</div>}
                {item.message && <div className="text-sm text-gray-400">{item.message}</div>}
                {item.time && <div className="text-xs text-gray-500 mt-1">{item.time}</div>}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu; 