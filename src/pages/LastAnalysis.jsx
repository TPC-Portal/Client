import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import AnalysisResults from '../components/AnalysisResults';
import AnalysisLoader from '../components/AnalysisLoader';
import { baseURL } from '../utils/constant';

const LastAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const stages = [
    { id: 1, name: 'Fetching Data', description: 'Loading last analysis' },
    { id: 2, name: 'Processing', description: 'Preparing results' },
  ];

  useEffect(() => {
    fetchLastAnalysis();
  }, []);

  const fetchLastAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseURL}/last-resume`);
      
      if (response.data.error) {
        setError(response.data.error);
        toast.error(response.data.error);
      } else {
        setAnalysisData(response.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to load last analysis';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Loading Last Analysis...</h1>
          </div>
          <AnalysisLoader stages={stages} currentStage={2} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-lg p-8 text-center border border-red-100">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Previous Analysis Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/resume"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Upload New Resume
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Last Resume Analysis</h1>
            <p className="text-gray-600">
              Analyzed on {new Date(analysisData.uploaded_at).toLocaleString()}
            </p>
            {analysisData.filename && (
              <p className="text-sm text-gray-500 mt-1">
                File: <span className="font-medium">{analysisData.filename}</span>
              </p>
            )}
          </div>
          <a
            href="/resume"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Analysis
          </a>
        </div>

        {/* Analysis Results */}
        <AnalysisResults
          results={analysisData.analysis}
          role={analysisData.role}
          company={analysisData.company}
        />
      </div>
    </motion.div>
  );
};

export default LastAnalysis;
