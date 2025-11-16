import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type = 'text', error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative w-full">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 text-sm text-gray-900 dark:text-gray-100
            bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700
            rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400
            placeholder-gray-400 dark:placeholder-gray-500 transition-all
          `}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-orange-400 transition-colors"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-rose-500 mt-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
