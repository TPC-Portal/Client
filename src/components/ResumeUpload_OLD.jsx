import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from '../utils/constant';
import AnalysisLoader from './AnalysisLoader';
import AnalysisResults from './AnalysisResults';

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

  // Check if last suggestion is available on component mount
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (role) formData.append('role', role);
    if (company) formData.append('company', company);

    setLoading(true);
    setCurrentStage(0);
    setResults(null);
    setError('');

    try {
      // Simulate stage progression
      const stageTimings = [500, 1000, 2000, 1500, 1000];
      let stageIndex = 0;

      const progressInterval = setInterval(() => {
        if (stageIndex < stages.length - 1) {
          stageIndex++;
          setCurrentStage(stageIndex);
        }
      }, stageTimings[stageIndex] || 1000);

      const response = await axios.post(`${baseURL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      clearInterval(progressInterval);
      setCurrentStage(stages.length);

      if (response.data) {
        setResults(response.data);
        toast.success('Resume analyzed successfully!');
        checkLastSuggestion(); // Update last suggestion availability
      } else {
        throw new Error('No analysis received from the server');
      }

      setFile(null);
      setRole('');
      setCompany('');
      e.target.reset();
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
    <div className="max-w-6xl mx-auto mt-8 p-6">
      {!loading && !results && (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">AI-Powered Resume Analysis</h2>
              <p className="text-gray-600">Get detailed insights, identify shortcomings, and discover your selection probability</p>
            </div>
            {lastSuggestionAvailable && (
              <button
                onClick={() => navigate('/last')}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>View Last Analysis</span>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role (Optional)</label>
              <div className="relative">
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Company (Optional)</label>
              <div className="relative">
                <select 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Upload Your Resume
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.txt"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF or TXT files only</p>
                  </div>
                </label>
              </div>
              
              {file && (
                <div className="mt-3 flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-blue-700 font-medium">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="ml-auto text-blue-400 hover:text-blue-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-blue-700">
                    {role && company
                      ? `We'll analyze your resume for ${role} position at ${company}`
                      : role
                      ? `We'll analyze your resume for ${role} position and suggest matching companies`
                      : company
                      ? `We'll analyze your resume for ${company} and suggest suitable roles`
                      : 'We\'ll provide general analysis with personalized role and company recommendations'}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl
                       hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4
                       focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                       disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Analyze My Resume</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {loading && currentStage >= 0 && (
        <AnalysisLoader stages={stages} currentStage={currentStage} />
      )}

      {results && !loading && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setResults(null);
                setFile(null);
                setRole('');
                setCompany('');
              }}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-sm hover:shadow-md font-semibold"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Analyze Another Resume</span>
            </button>
            
            {/* Stats badge */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-sm font-semibold text-blue-700">Analysis Complete</span>
            </div>
          </div>
          <AnalysisResults results={results} role={role} company={company} />
        </div>
      )}
    </div>
  );
};

export default ResumeUpload; 