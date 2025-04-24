import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { baseURL } from '../utils/constant';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [detailedError, setDetailedError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage('');
    setError('');
    setSummary(null);
    setDetailedError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      // console.log('Sending request to backend...');
      const response = await axios.post(`${baseURL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log('Response from backend:', response.data);

      if (response.data.response) {
        setMessage('Resume processed successfully!');
        setSummary(response.data.response);
        toast.success('Resume processed successfully!');
      } else {
        setError('No summary received from the server');
        toast.error('No summary received from the server');
      }

      setFile(null);
      // Reset the file input
      e.target.reset();
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error uploading resume';
      const errorDetails = error.response?.data?.details || '';
      const errorTraceback = error.response?.data?.traceback || '';

      setError(errorMessage);
      setDetailedError({ details: errorDetails, traceback: errorTraceback });
      toast.error(errorMessage);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  const renderSummarySection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {Array.isArray(content) ? (
          <ul className="list-disc list-inside space-y-1">
            {content.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">{content}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
        <div className="flex gap-4">
          {/* make select options for company and job title */}
          <select className="border border-gray-300 rounded-md p-2">
            <option value="Role">Role</option>
            <option value="SDE">SDE</option>
            <option value="Data Engineer">Data Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
          </select>

          <select className="border border-gray-300 rounded-md p-2">
            <option value="Company">Company</option>
            <option value="google">Google</option>
            <option value="amazon">Amazon</option>
            <option value="facebook">Facebook</option>
            <option value="apple">Apple</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Resume (PDF or DOC)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md
                   hover:bg-blue-600 focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Processing Resume...' : 'Upload Resume'}
        </button>

        {message && (
          <div className="text-green-600 text-sm mt-2">{message}</div>
        )}
        {error && (
          <div className="text-red-600 text-sm mt-2">{error}</div>
        )}
      </form>

      {summary && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Resume Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload; 