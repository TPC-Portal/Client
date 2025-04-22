import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-800 border border-gray-700 p-2 sm:p-3 rounded shadow-lg text-sm min-w-[160px] sm:min-w-[180px]">
        <p className="text-gray-300 border-b border-gray-700 pb-1 mb-2 text-xs sm:text-sm">{`CGPA Range: ${label}`}</p>
        <p className="text-blue-400 font-medium mb-1 text-xs sm:text-sm">{`Companies: ${payload[0].value}`}</p>
        {payload[0].payload.students && (
          <p className="text-green-400 text-xs">{`Students: ${payload[0].payload.students}`}</p>
        )}
      </div>
    );
  }
  return null;
};

const CGPACompaniesBarChart = ({ data, selectedYear = 'All' }) => {
  // Process data for the chart
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Filter by selected year if not 'All'
    const filteredData = selectedYear === 'All' 
      ? data 
      : data.filter(item => item.Year === selectedYear);

    // Define CGPA ranges
    const cgpaRanges = [
      { min: 9.0, max: 10.0, label: '9.0-10.0' },
      { min: 8.0, max: 8.99, label: '8.0-8.99' },
      { min: 7.0, max: 7.99, label: '7.0-7.99' },
      { min: 6.0, max: 6.99, label: '6.0-6.99' },
      { min: 0, max: 5.99, label: 'Below 6.0' }
    ];
    
    // For smaller screens, use shorter labels
    if (window.innerWidth < 640) {
      cgpaRanges.forEach(range => {
        range.label = range.label.replace('-', '-\n');
      });
      cgpaRanges[4].label = '<6.0';
    }
    
    // Categorize students into CGPA ranges
    const rangeCounts = cgpaRanges.map(range => {
      const studentsInRange = filteredData.filter(
        item => {
          const cgpa = parseFloat(item.CGPA);
          return !isNaN(cgpa) && cgpa >= range.min && cgpa <= range.max;
        }
      );
      
      // Count unique companies
      const companies = new Set();
      studentsInRange.forEach(student => companies.add(student.Company));
      
      return {
        range: range.label,
        companies: companies.size,
        students: studentsInRange.length
      };
    });
    
    return rangeCounts;
  }, [data, selectedYear]);
  
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
        No data available
      </div>
    );
  }
  
  // Determine bar size based on screen width
  const barSize = window.innerWidth < 640 ? 30 : (window.innerWidth < 1024 ? 45 : 60);
  
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 5, left: 0, bottom: 20 }}
          barSize={barSize}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="range" 
            tick={{ fill: '#aaa', fontSize: window.innerWidth < 640 ? 10 : 12 }}
            axisLine={{ stroke: '#444' }}
            height={50}
          />
          <YAxis 
            tick={{ fill: '#aaa', fontSize: window.innerWidth < 640 ? 10 : 12 }}
            axisLine={{ stroke: '#444' }}
            tickLine={{ stroke: '#444' }}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 100, 100, 0.2)' }} />
          <Legend 
            wrapperStyle={{ paddingTop: 5, fontSize: window.innerWidth < 640 ? 10 : 12 }} 
            iconSize={window.innerWidth < 640 ? 8 : 10}
          />
          <Bar 
            name="Number of Companies"
            dataKey="companies" 
            fill="#8b5cf6" 
            radius={[5, 5, 0, 0]}
            activeBar={{ fill: '#a78bfa' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CGPACompaniesBarChart; 