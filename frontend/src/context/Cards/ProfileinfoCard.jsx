import React, { useContext } from 'react';
import { UserContext } from '../useContext';
import { useNavigate } from 'react-router-dom';

const ProfileinfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="flex items-center gap-3">
      {/* Profile Image or Initials */}
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.name || 'Profile'}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
          {initials}
        </div>
      )}

      {/* Username + Logout */}
      <div className="flex flex-col justify-center -mt-1">
        <span className="text-lg sm:text-xl font-semibold text-indigo-900">
          {user.name || ''}
        </span>
        <button
          onClick={handleLogout}
          className="text-indigo-600 text-sm sm:text-base font-medium hover:underline hover:text-indigo-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileinfoCard;
