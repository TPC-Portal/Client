import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from '../utils/constant';
import AnalysisLoader from './AnalysisLoader';
import AnalysisResults from './AnalysisResults';
import { Upload, FileText, Sparkles, Clock, ChevronRight } from 'lucide-react';

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [lastSuggestionAvailable, setLastSuggestionAvailable] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  React.useEffect(() => {
    checkLastSuggestion();
  }, []);

  const checkLastSuggestion = async () => {
    try {
      const response = await axios.get(`${baseURL}/last-resume`);
      if (response.data && response.data.analysis) {
        setLastSuggestionAvailable(true);
      }
    } catch {
      setLastSuggestionAvailable(false);
    }
  };

  const stages = [
    { id: 1, name: 'Uploading Resume', description: 'Sending file to server' },
    { id: 2, name: 'Extracting Text', description: 'Reading resume content' },
    { id: 3, name: 'Analyzing Content', description: 'Processing with AI' },
    { id: 4, name: 'Generating Insights', description: 'Creating recommendations' },
    { id: 5, name: 'Calculating Selection Chances', description: 'Finalizing analysis' }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
    setResults(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
      setResults(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a resume file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (role) formData.append('role', role);
    if (company) formData.append('company', company);

    setLoading(true);
    setError('');
    setResults(null);
    setCurrentStage(0);

    try {
      // Simulate stage progression
      const stageInterval = setInterval(() => {
        setCurrentStage(prev => {
          if (prev < stages.length - 1) return prev + 1;
          return prev;
        });
      }, 1500);

      const response = await axios.post(`${baseURL}/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      clearInterval(stageInterval);
      setCurrentStage(stages.length - 1);

      if (response.data) {
        setResults(response.data);
        toast.success('Analysis completed successfully!');
        await checkLastSuggestion(); // Refresh last suggestion availability
      }

      setFile(null);
      setRole('');
      setCompany('');
      if (e.target) e.target.reset();
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error uploading resume';
      setError(errorMessage);
      toast.error(errorMessage);
      setResults(null);
    } finally {
      setLoading(false);
      setTimeout(() => setCurrentStage(-1), 500);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {!loading && !results && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Section */}
            {/* <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                AI Resume Analyzer
              </h1>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Get instant AI-powered insights, personalized recommendations, and discover your selection probability
              </p>
            </div> */}

            {/* Main Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
              {/* Last Analysis Button */}
              {lastSuggestionAvailable && (
                <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Previous Analysis Available</h3>
                        <p className="text-sm text-gray-600">View your last resume analysis</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/last')}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                    >
                      <span>View Analysis</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Role and Company Selection */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    Target Role
                  </label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 text-gray-700 font-medium"
                  >
                    <option value="">Select Role (Optional)</option>
                    <option value="SDE">Software Development Engineer</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="ML Engineer">Machine Learning Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Target Company
                  </label>
                  <select 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 text-gray-700 font-medium"
                  >
                    <option value="">Select Company (Optional)</option>
                    <option value="Google">Google</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Meta">Meta (Facebook)</option>
                    <option value="Apple">Apple</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Uber">Uber</option>
                    <option value="Airbnb">Airbnb</option>
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                    Upload Your Resume
                  </label>
                  <div
                    className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
                      dragActive 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                      {file ? (
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-indigo-600">{file.name}</p>
                          <p className="text-sm text-gray-500">Click to change file</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-gray-700">Drop your resume here or click to browse</p>
                          <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX (Max 10MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-800 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!file || loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-5 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg flex items-center justify-center space-x-3"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Analyze Resume with AI</span>
                </button>
              </form>

            </div>
          </div>
        )}

        {loading && (
          <div className="animate-scaleIn">
            <AnalysisLoader currentStage={currentStage} stages={stages} />
          </div>
        )}

        {!loading && results && (
          <div className="animate-fadeIn">
            <AnalysisResults results={results} role={role} company={company} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
