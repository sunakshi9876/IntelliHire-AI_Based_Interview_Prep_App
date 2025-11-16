import React from 'react';

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
    return (
        <div className="p-6 sm:p-5 bg-white rounded-2xl shadow-xl max-w-sm mx-auto relative overflow-hidden">
            {/* Header */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Confirm Deletion
            </h3>

            {/* Content */}
            <p className="text-base text-gray-700 leading-relaxed mb-6">
                {content}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 sm:gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-base font-medium text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-200"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    className="px-5 py-2.5 text-base font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlertContent;
