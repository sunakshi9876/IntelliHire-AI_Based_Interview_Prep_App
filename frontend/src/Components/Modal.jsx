import React from 'react';

export const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm">
            <div className="relative flex flex-col bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform scale-95 animate-scaleIn">
                
                {!hideHeader && (
                    <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4 bg-orange-50">
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-orange-500 transition-colors rounded-full p-1"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="w-4 h-4"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M1 1L13 13M13 1L1 13"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};
