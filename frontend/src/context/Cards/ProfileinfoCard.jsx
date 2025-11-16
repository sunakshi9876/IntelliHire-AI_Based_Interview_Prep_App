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

  if (!user) return null; // Don't render if user is undefined

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
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.name || 'Profile'}
          className="w-11 h-11 rounded-full bg-gray-300 object-cover shadow-sm"
        />
      ) : (
        <div className="w-11 h-11 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shadow-sm">
          {initials}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">{user.name || ''}</span>
        <button
          className="text-amber-600 text-xs font-medium hover:underline hover:text-amber-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileinfoCard;
