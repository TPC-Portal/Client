import React from 'react';

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-700/50 rounded-lg w-3/4 mb-4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-700/50 rounded-xl"></div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton; 