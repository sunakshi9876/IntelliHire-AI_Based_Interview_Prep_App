import React from 'react';
import { Link } from 'react-router-dom';
import ProfileinfoCard from '../../context/Cards/ProfileinfoCard';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">

        {/* Brand / Logo on the Left */}
        <Link to="/dashboard" className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">IH</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">
            IntelliHire
          </h1>
        </Link>

        {/* Right Side Profile Card or User Controls */}
        <div className="flex items-center space-x-4">
          <ProfileinfoCard />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
