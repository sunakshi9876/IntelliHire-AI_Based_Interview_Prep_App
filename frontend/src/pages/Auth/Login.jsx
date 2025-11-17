import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/input/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/useContext';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError('Please enter a valid email');
    if (!password) return setError('Please enter your password');
    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md sm:px-12 sm:py-12 px-6 py-8 transform transition-transform duration-500 hover:scale-[1.02] border border-gray-200">
        
        {/* Back / Switch Button */}
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage('signup')}
            className="flex items-center text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-300"
          >
            &#8592; Back
          </button>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-2 text-center">
          Welcome Back
        </h3>
        <p className="text-gray-700 text-lg sm:text-xl mb-6 text-center">
          Enter your credentials to log in to your account.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            className="focus:ring-indigo-400 focus:border-indigo-500 rounded-xl shadow-sm"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
            className="focus:ring-indigo-400 focus:border-indigo-500 rounded-xl shadow-sm"
          />

          {error && <p className="text-sm text-red-500 mt-1 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-purple-600 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            LOGIN
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('signup')}
              className="text-purple-600 font-medium underline hover:text-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
