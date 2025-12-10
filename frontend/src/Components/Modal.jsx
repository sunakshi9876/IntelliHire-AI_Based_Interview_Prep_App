import React from 'react';

export const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm px-4">
      <div className="relative flex flex-col bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform scale-95 animate-scaleIn">
        
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center border-b border-gray-200 px-4 py-3 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-900 transition-colors rounded-full p-2"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
