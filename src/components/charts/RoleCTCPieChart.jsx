import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';

// Modern vibrant color palette with better contrast
const COLORS = [
  '#4f46e5', // indigo
  '#f97316', // orange
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#22c55e', // green
  '#eab308', // yellow
  '#8b5cf6', // purple
  '#ef4444', // red
  '#0ea5e9', // sky
  '#14b8a6', // teal
  '#a855f7', // violet
  '#f43f5e', // rose
];

const CustomTooltip = ({ active, payload, allData }) => {
  if (active && payload && payload.length) {
    const role = payload[0].name;
    const roleData = allData.filter(item => item.Role === role);
    
    // Calculate average CTC - ensure values are properly parsed as numbers
    const validCTCs = roleData
      .map(item => parseFloat(item.CTC))
      .filter(value => !isNaN(value));
      
    const totalCTC = validCTCs.reduce((sum, ctc) => sum + ctc, 0);
    const avgCTC = validCTCs.length > 0 ? (totalCTC / validCTCs.length).toFixed(2) : 0;
    
    // Find highest CTC
    const highestCTC = validCTCs.length > 0 
      ? Math.max(...validCTCs).toFixed(2)
      : 0;
    
    // Count number of companies
    const companies = [...new Set(roleData.map(item => item.Company))];
    
    return (
      <div className="custom-tooltip bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-xl text-sm min-w-[220px]">
        <p className="text-white border-b border-gray-700 pb-2 mb-3 font-semibold text-base flex items-center">
          <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: payload[0].color }}></span>
          {role}
        </p>
        <div className="space-y-3">
          <p className="text-gray-300 text-xs flex justify-between items-center">
            <span>Students:</span>
            <span className="text-white font-medium">{roleData.length}</span>
          </p>
          <p className="text-gray-300 text-xs flex justify-between items-center">
            <span>Companies:</span>
            <span className="text-white font-medium">{companies.length}</span>
          </p>
          <div className="h-px bg-gray-700 my-1"></div>
          <p className="text-gray-300 text-xs flex justify-between items-center">
            <span>Avg CTC:</span>
            <span className="text-green-400 font-medium">{avgCTC} LPA</span>
          </p>
          <p className="text-gray-300 text-xs flex justify-between items-center">
            <span>Highest CTC:</span>
            <span className="text-green-400 font-medium">{highestCTC} LPA</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Custom active shape renderer - separates the slice but keeps original visible
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  
  // Calculate offset for the slice
  const RADIAN = Math.PI / 180;
  const midAngle = (startAngle + endAngle) / 2;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  
  // Move slice outward by 20 pixels for more noticeable separation
  const offsetX = 18 * cos;
  const offsetY = 18 * sin;
  
  return (
    <g>
      {/* We render a duplicate slice in a pulled-out position */}
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={0}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#1a1a1a"
          strokeWidth={1.5}
        />
      </g>
    </g>
  );
};

// Custom label renderer for all slices
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, fill, value, activeIndex }) => {
  const RADIAN = Math.PI / 180;
  
  // Calculate coordinates for label lines and text - adjusted for smaller chart
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 25) * cos;
  const my = cy + (outerRadius + 25) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // Calculate percentage for display
  const percentValue = (percent * 100).toFixed(1);
  
  // Only render label if percentage is significant
  if (percentValue < 3) return null;

  // Use the color from COLORS array based on index
  const dotColor = COLORS[index % COLORS.length];

  // Calculate responsive font sizes
  const nameFontSize = window.innerWidth < 768 ? 12 : 13;
  const percentFontSize = window.innerWidth < 768 ? 11 : 12;

  return (
    <g pointerEvents="none">
      {/* Label line connecting to outer label */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke="#999"
        strokeWidth={1}
        fill="none"
      />
      
      {/* Colored dot matching the slice color */}
      <circle 
        cx={mx} 
        cy={my} 
        r={4} 
        fill={dotColor} 
        strokeWidth={1}
      />
      
      {/* Role name */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey - 10}
        textAnchor={textAnchor}
        fill="#ddd"
        fontSize={nameFontSize}
        fontWeight="500"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
        pointerEvents="none"
      >
        {window.innerWidth < 768 ? 
          (name.length > 8 ? name.substring(0, 8) + '...' : name) : 
          (name.length > 12 ? name.substring(0, 12) + '...' : name)
        }
      </text>
      
      {/* Percentage */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey + 10}
        textAnchor={textAnchor}
        fill="#aaa"
        fontSize={percentFontSize}
        fontWeight="bold"
        pointerEvents="none"
      >
        {`${percentValue}%`}
      </text>
    </g>
  );
};

const RoleCTCPieChart = ({ data, selectedYear }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Enhanced data preparation for the pie chart
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return { data: [], totalCompanies: 0 };
    
    // Filter by selected year
    const filteredData = selectedYear === 'All' 
      ? data 
      : data.filter(item => item.Year === selectedYear);
    
    // Count total unique companies for percentage calculation
    const uniqueCompanies = new Set();
    filteredData.forEach(item => uniqueCompanies.add(item.Company));
    const totalCompanies = uniqueCompanies.size;
    
    // Group by role and count
    const roleCountMap = filteredData.reduce((acc, item) => {
      const role = item.Role;
      const company = item.Company;
      
      if (!acc[role]) {
        acc[role] = { 
          name: role, 
          value: 0,
          companies: new Set(),
          students: 0,
          ctcValues: []
        };
      }
      
      acc[role].companies.add(company);
      acc[role].students += 1;
      
      // Collect CTC values for accurate statistics
      const ctc = parseFloat(item.CTC);
      if (!isNaN(ctc)) {
        acc[role].ctcValues.push(ctc);
      }
      
      return acc;
    }, {});
    
    // Convert company Sets to counts and calculate CTC stats
    Object.values(roleCountMap).forEach(item => {
      // Use company count for the pie chart value
      item.value = item.companies.size;
      item.companyCount = item.companies.size;
      delete item.companies;
      
      // Calculate CTC stats
      if (item.ctcValues.length > 0) {
        const sum = item.ctcValues.reduce((a, b) => a + b, 0);
        item.avgCTC = (sum / item.ctcValues.length).toFixed(2);
        item.maxCTC = Math.max(...item.ctcValues).toFixed(2);
      } else {
        item.avgCTC = "0.00";
        item.maxCTC = "0.00";
      }
      delete item.ctcValues;
    });
    
    // Convert to array and sort by count
    return { 
      data: Object.values(roleCountMap).sort((a, b) => b.value - a.value),
      totalCompanies
    };
  }, [data, selectedYear]);

  if (chartData.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
        No data available for the selected year
      </div>
    );
  }
  
  // Handle mouse events for hover effect
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div 
      className="flex justify-center w-full h-full" 
      style={{ outline: 'none' }}
      tabIndex="-1"
      onMouseDown={(e) => e.preventDefault()}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart 
          style={{ outline: 'none', userSelect: 'none' }}
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          margin={{ top: 10, right: 5, bottom: 10, left: 5 }}
        >
          {/* Main pie chart - will have invisible active slice */}
          <Pie
            data={chartData.data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="70%"
            dataKey="value"
            paddingAngle={2}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            isAnimationActive={true}
            animationDuration={800}
            label={false}
            labelLine={false}
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          >
            {chartData.data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                stroke={"#1a1a1a"}
                strokeWidth={1}
              />
            ))}
          </Pie>
          
          {/* Labels layer */}
          <Pie
            data={chartData.data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="70%"
            dataKey="value"
            paddingAngle={2}
            isAnimationActive={false}
            label={(props) => renderCustomizedLabel({...props, activeIndex})}
            labelLine={false}
            stroke="none"
            fill="none"
            style={{ pointerEvents: 'none' }}
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          />

          <Tooltip 
            content={<CustomTooltip allData={data} />} 
            wrapperStyle={{ outline: 'none' }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ 
              paddingTop: '10px',
              userSelect: 'none',
              outline: 'none',
              fontSize: '10px'
            }}
            iconSize={8}
            iconType="circle"
            payload={chartData.data.map((item, index) => ({
              id: item.name,
              type: 'circle',
              value: item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name,
              color: COLORS[index % COLORS.length]
            }))}
            formatter={(value) => (
              <span style={{ 
                color: '#ddd', 
                fontSize: '10px', 
                fontWeight: '500',
                outline: 'none'
              }}>
                {value}
              </span>
            )}
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoleCTCPieChart; 