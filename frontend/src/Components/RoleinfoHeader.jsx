import React from 'react';
import { CARD_BG } from '../utils/data'; // Ensure this contains { bgcolor: '#...' }

const RoleinfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {

  // Get initials from role name
  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    return words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : words[0][0].toUpperCase();
  };

  // Badge data
  const badges = [
    { text: `Experience: ${experience || 0} ${experience === 1 ? 'Year' : 'Years'}`, bg: 'bg-blue-100', color: 'text-blue-800' },
    { text: `Questions: ${questions || 0} Q&A`, bg: 'bg-green-100', color: 'text-green-800' },
    lastUpdated ? { text: `Last Updated: ${lastUpdated}`, bg: 'bg-purple-100', color: 'text-purple-800' } : null,
  ].filter(Boolean);

  return (
    <div className="relative overflow-hidden">

      {/* Main Card */}
      <div
        className="rounded-2xl p-6 md:p-8 relative z-10 mx-auto max-w-6xl shadow-xl"
        style={{ background: CARD_BG.bgcolor }}
      >
        {/* Top Section: Icon + Role Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          
          {/* Role Initial */}
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">{getInitials(role)}</span>
          </div>

          {/* Role Title & Topics */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
              {role || 'Job Role'}
            </h1>
            {topicsToFocus && (
              <p className="text-base sm:text-lg text-gray-700 mb-2">
                <span className="font-semibold">Focus Areas:</span> {topicsToFocus}
              </p>
            )}
            {description && (
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-200">
          {badges.map((b, i) => (
            <span
              key={i}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${b.bg} ${b.color}`}
            >
              {b.text}
            </span>
          ))}
        </div>
      </div>

      {/* Animated Color Blobs */}
      <div className="absolute top-0 right-0 w-2/5 h-full flex items-center justify-center pointer-events-none">
        <div
          aria-hidden="true"
          className="w-24 h-24 bg-lime-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob absolute top-1/4 right-1/4"
        />
        <div
          aria-hidden="true"
          className="w-28 h-28 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000 absolute top-1/2 left-1/4"
        />
        <div
          aria-hidden="true"
          className="w-20 h-20 bg-cyan-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000 absolute bottom-1/4 right-1/3"
        />
      </div>
    </div>
  );
};

export default RoleinfoHeader;
