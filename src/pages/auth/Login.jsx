/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate credentials
    if (formData.email === 'demo@lnmiit.ac.in' && formData.password === '123456789') {
      localStorage.setItem('isLogin', 'true');
      toast.success('Login successful!');
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 1000);
    } else {
      toast.error('Wrong credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-900/50 border border-red-800 p-4"
              >
                <div className="text-sm text-red-200">{error}</div>
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900/50 text-white"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900/50 text-white"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-900/50"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 