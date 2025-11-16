import React from 'react';

const Drawer = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="relative ml-auto w-3/4 md:w-1/3 h-full bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto transition-transform duration-300 transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {title && (
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl transition-colors duration-200"
            aria-label="Close drawer"
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
