import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import RoleYearBarChart from '../components/charts/RoleYearBarChart';
import RoleCTCPieChart from '../components/charts/RoleCTCPieChart';
import CGPACompaniesBarChart from '../components/charts/CGPACompaniesBarChart';

const Insights = () => {
  const studentData = useSelector((state) => state.studentData.data);
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  
  // Extract unique roles for dropdown
  const roles = useMemo(() => {
    if (!studentData || studentData.length === 0) return ['All'];
    
    const uniqueRoles = [...new Set(studentData.map(item => item.Role))];
    return ['All', ...uniqueRoles];
  }, [studentData]);
  
  // Extract unique years for dropdown
  const years = useMemo(() => {
    if (!studentData || studentData.length === 0) return ['All'];
    
    const uniqueYears = [...new Set(studentData.map(item => item.Year))];
    return ['All', ...uniqueYears];
  }, [studentData]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 sm:p-6 md:p-8 space-y-8"
    >
      {/* Bar Chart Section - Full Width */}
      <div className="bg-gray-900 rounded-lg p-5 shadow-md w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-2xl ml-13 font-semibold text-gray-100 tracking-wide">
            Companies by Year {selectedRole !== 'All' && (
              <span className="text-blue-400">{`(${selectedRole})`}</span>
            )}
          </h2>
          
          <div className="w-full sm:w-48">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="block w-full px-3 py-2 text-sm font-medium bg-gray-800 border-0 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem', appearance: 'none' }}
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="h-[450px] w-full mt-6 mb-2">
          <RoleYearBarChart data={studentData} selectedRole={selectedRole} />
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-4">
          * Hover over bars to see top companies for the selected role
        </div>
      </div>
      
      {/* Bottom Section - Two Column Layout */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
        {/* Pie Chart Section - Half Width */}
        <div className="bg-gray-900 rounded-lg p-5 shadow-md md:w-1/2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-2xl ml-13 font-semibold text-gray-100 tracking-wide">
              Roles Distribution {selectedYear !== 'All' && (
                <span className="text-blue-400">{`(${selectedYear})`}</span>
              )}
            </h2>
            
            <div className="w-full sm:w-48">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="block w-full px-3 py-2 text-sm font-medium bg-gray-800 border-0 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem', appearance: 'none' }}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="h-[500px] w-full mt-6 mb-2">
            <RoleCTCPieChart data={studentData} selectedYear={selectedYear} />
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-4">
            * Labels show role names and percentages for all segments
            <br />
            * Hover over a segment to highlight it and see detailed CTC data
          </div>
        </div>
        
        {/* CGPA vs Companies Chart */}
        <div className="bg-gray-900 rounded-lg p-5 shadow-md md:w-1/2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-2xl ml-13 font-semibold text-gray-100 tracking-wide">
              CGPA vs Companies {selectedYear !== 'All' && (
                <span className="text-blue-400">{`(${selectedYear})`}</span>
              )}
            </h2>
            
            <div className="w-full sm:w-48">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="block w-full px-3 py-2 text-sm font-medium bg-gray-800 border-0 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem', appearance: 'none' }}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="h-[500px] w-full mt-6 mb-2">
            <CGPACompaniesBarChart data={studentData} selectedYear={selectedYear} />
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-4">
            * Bar chart shows number of unique companies per CGPA range
            <br />
            * Use the dropdown to filter by year
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;