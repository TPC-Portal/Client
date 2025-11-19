/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Upload, FileText, Bell, TrendingUp, Award, Clock, ChevronRight, Target, Briefcase } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseURL } from '../utils/constant';

const defaultCompanies = [
  { name: 'Google', match: 92, package: '30 LPA', logo: 'https://logo.clearbit.com/google.com' },
  { name: 'Amazon', match: 88, package: '28 LPA', logo: 'https://logo.clearbit.com/amazon.com' },
  { name: 'Flipkart', match: 85, package: '26 LPA', logo: 'https://logo.clearbit.com/flipkart.com' },
];

// Generate random placement data for 2021-2025
const generatePlacementTrends = () => {
  return [
    { year: '2021', placements: Math.floor(Math.random() * 50) + 100 },
    { year: '2022', placements: Math.floor(Math.random() * 50) + 120 },
    { year: '2023', placements: Math.floor(Math.random() * 50) + 140 },
    { year: '2024', placements: Math.floor(Math.random() * 50) + 150 },
    { year: '2025', placements: Math.floor(Math.random() * 50) + 160 },
  ];
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [topCompanies, setTopCompanies] = useState(defaultCompanies);
  const [placementTrends, setPlacementTrends] = useState(generatePlacementTrends());
  const [resumeStats, setResumeStats] = useState([
    { label: 'Selection Chance', value: 'N/A', icon: Award },
    { label: 'Strengths', value: 0, icon: TrendingUp },
    { label: 'Recommendations', value: 0, icon: Target },
    { label: 'Last Updated', value: 'N/A', icon: Clock },
  ]);

  useEffect(() => {
    fetchLastAnalysis();
  }, []);

  const fetchLastAnalysis = async () => {
    try {
      const response = await axios.get(`${baseURL}/last-resume`);
      if (response.data && response.data.analysis) {
        const analysis = response.data.analysis;
        const uploadedAt = response.data.uploaded_at;
        
        // Format date
        let formattedDate = 'N/A';
        if (uploadedAt) {
          const date = new Date(uploadedAt);
          formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
        }
        
        // Update stats from analysis
        const newStats = [
          { 
            label: 'Selection Chance', 
            value: analysis.selection_chance || 'N/A', 
            icon: Award 
          },
          { 
            label: 'Strengths', 
            value: analysis.strengths?.length || 0, 
            icon: TrendingUp 
          },
          { 
            label: 'Recommendations', 
            value: analysis.recommendations?.length || 0, 
            icon: Target 
          },
          { 
            label: 'Last Updated', 
            value: formattedDate, 
            icon: Clock 
          },
        ];
        setResumeStats(newStats);

        // Update companies
        if (analysis.recommended_companies) {
          const companies = analysis.recommended_companies.slice(0, 3).map((companyName, index) => {
            const domain = companyName.toLowerCase().replace(/\s+/g, '').replace(/[()]/g, '') + '.com';
            return {
              name: companyName,
              match: 90 - (index * 3),
              package: `${30 - (index * 2)} LPA`,
              logo: `https://logo.clearbit.com/${domain}`
            };
          });
          setTopCompanies(companies);
        }
      }
    } catch (error) {
      console.log('No previous analysis found, using default values');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        variants={itemVariants}
      >
        Hi Sankalp 👋, ready to explore your placement possibilities?
      </motion.h1>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        {resumeStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Top Company Matches */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-white">Top Company Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCompanies.map((company, idx) => (
            <motion.div 
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-lg" />
                <div>
                  <p className="text-lg font-medium text-white">{company.name}</p>
                  <p className="text-sm text-gray-400">Matching: {company.match}%</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Package: {company.package}</p>
                <motion.button 
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  whileHover={{ x: 5 }}
                >
                  View More <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Graph Preview */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-white">Placement Trends</h2>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={placementTrends}>
              <XAxis dataKey="year" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Bar 
                dataKey="placements" 
                fill="url(#gradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <motion.button 
          className=" cursor-pointer flex items-center justify-center gap-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-4 rounded-xl border border-blue-500/30 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/Resume")}
        >
          <Upload size={20} /> Upload Resume
        </motion.button>
        <motion.button 
          className="flex items-center justify-center gap-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-4 rounded-xl border border-purple-500/30 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/last")}
        >
          <FileText size={20} /> View Analyses
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard; 