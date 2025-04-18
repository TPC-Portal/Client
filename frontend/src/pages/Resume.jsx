import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileURL, setFileURL] = useState(null);
  const theme = useSelector((state) => state.theme?.current || 'light');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFileURL(url);
      setUploadStatus('');
      toast.success('PDF file selected!');
    } else {
      toast.error('Please select a PDF file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFileURL(url);
      setUploadStatus('');
      toast.success('PDF file selected!');
    } else {
      toast.error('Please select a PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Upload successful!');
      toast.success('Upload successful!');
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
      toast.error('Upload failed. Please try again.');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileURL(null);
    setUploadStatus('');
    toast.info('File removed.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 p-4 sm:p-6 md:p-8"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-white">Resume</h1>

      <motion.div
        className={`dropbox-ui ${dragActive ? 'active' : ''} ${theme === 'light'
          ? 'bg-gradient-to-br from-gray-100 to-gray-200'
          : 'bg-gradient-to-br from-gray-800 to-gray-900'
          } p-4 sm:p-6 rounded-lg shadow-lg border-dashed border-2 ${dragActive ? 'border-blue-500' : 'border-gray-400'
          } transition-all duration-300 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && document.getElementById('fileInput').click()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
          disabled={!!file}
        />

        <p
          className={`text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
        >
          Drag & drop your PDF here, or click to select a file
        </p>
      </motion.div>

      {file && (
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-green-500 mb-2 sm:mb-0">
            File selected: {file.name}
          </p>
          <button
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}

      {fileURL && (
        <div className="mt-6 flex justify-center">
          <div className="w-full sm:w-3/4 md:w-1/2 max-w-[700px] border rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="PDF Preview"
              src={fileURL}
              className="w-full h-[400px] sm:h-[500px]"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </div>
      )}

      <motion.button
        onClick={handleUpload}
        className={`upload-button w-full sm:w-auto px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${theme === 'light'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        disabled={!!file}
      >
        Upload Resume
      </motion.button>

      {uploadStatus && (
        <p
          className={`text-center ${uploadStatus.includes('successful')
            ? 'text-green-500'
            : 'text-red-500'
            }`}
        >
          {uploadStatus}
        </p>
      )}
    </motion.div>
  );
};

export default Resume;
