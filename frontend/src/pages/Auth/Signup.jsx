import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/input/Input';
import ProfilePhotoSelector from '../../Components/input/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/useContext';
import uploadImage from '../../utils/uploadimage';

function Signup({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';

    if (!fullName) return setError('Please enter your full name');
    if (!validateEmail(email)) return setError('Please enter a valid email');
    if (!password) return setError('Please enter a valid password');

    setError('');

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.ImageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

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
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md transform transition-transform duration-500 hover:scale-[1.02] border border-gray-200">

        {/* Back Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="flex items-center text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-300"
          >
            &#8592; Back
          </button>
        </div>

        {/* Header */}
        <h3 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-2 text-center">
          Create an Account
        </h3>
        <p className="text-gray-700 text-lg sm:text-xl mb-4 text-center">
          Join us today by entering your details below.
        </p>

        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* Shrunk Profile Photo Selector */}
          <div className="flex justify-center mb-2">
            <ProfilePhotoSelector
              image={profilePic}
              setImage={setProfilePic}
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
          </div>

          {/* Inputs */}
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Abhishek"
            type="text"
            className="focus:ring-indigo-400 focus:border-indigo-500 rounded-xl shadow-sm"
          />
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
            placeholder="Min 8 Characters"
            type="password"
            className="focus:ring-indigo-400 focus:border-indigo-500 rounded-xl shadow-sm"
          />

          {error && <p className="text-sm text-red-500 mt-1 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-purple-600 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            Sign Up
          </button>

          {/* Switch to Login */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('login')}
              className="text-purple-600 font-medium underline hover:text-indigo-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
