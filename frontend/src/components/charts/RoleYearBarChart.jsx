import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label, allData, selectedRole }) => {
  if (active && payload && payload.length) {
    // Find companies for this year and role
    const companiesForYearAndRole = allData
      .filter(item => 
        item.Year === label && 
        (selectedRole === 'All' || item.Role === selectedRole)
      )
      .reduce((acc, item) => {
        // Create a unique key using Company name to avoid duplicates
        const key = item.Company;
        if (!acc[key]) {
          acc[key] = {
            company: item.Company,
            count: 1
          };
        } else {
          acc[key].count++;
        }
        return acc;
      }, {});
      
    // Convert to array and sort by count (descending)
    const topCompanies = Object.values(companiesForYearAndRole)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Show top 5 max
    
    return (
      <div className="custom-tooltip bg-gray-800 border border-gray-700 p-3 rounded shadow-lg text-sm min-w-[180px]">
        <p className="text-gray-300 border-b border-gray-700 pb-1 mb-2">{`Year: ${label}`}</p>
        <p className="text-blue-400 font-medium mb-2">{`Total: ${payload[0].value}`}</p>
        
        {topCompanies.length > 0 && (
          <>
            <p className="text-gray-300 text-xs mt-1 mb-1">Top Companies:</p>
            <ul className="space-y-1">
              {topCompanies.map((company, index) => (
                <li key={index} className="text-gray-400 text-xs flex justify-between">
                  <span>{company.company}</span>
                  <span className="text-gray-500">{company.count}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
  return null;
};

const RoleYearBarChart = ({ data, selectedRole }) => {
  // Prepare data for the chart
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Filter by selected role if needed
    const filteredData = selectedRole === 'All' 
      ? data 
      : data.filter(item => item.Role === selectedRole);
    
    // Group by year and count companies for each role
    const yearCountMap = {};
    
    filteredData.forEach(item => {
      const year = item.Year;
      
      if (!yearCountMap[year]) {
        yearCountMap[year] = { year, count: 0 };
      }
      
      yearCountMap[year].count += 1;
    });
    
    return Object.values(yearCountMap).sort((a, b) => a.year - b.year);
  }, [data, selectedRole]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
        No data available for the selected filter
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            barSize={90}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#aaa', fontSize: 12 }}
              axisLine={{ stroke: '#444' }}
            />
            <YAxis 
              tick={{ fill: '#aaa', fontSize: 12 }}
              axisLine={{ stroke: '#444' }}
              tickLine={{ stroke: '#444' }}
            />
            <Tooltip 
              content={<CustomTooltip allData={data} selectedRole={selectedRole} />}
              cursor={{ fill: 'rgba(100, 100, 100, 0.2)' }} 
            />
            <Bar 
              dataKey="count" 
              fill="#3b82f6" 
              radius={[5, 5, 0, 0]}
              activeBar={{ fill: '#60a5fa' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RoleYearBarChart; 