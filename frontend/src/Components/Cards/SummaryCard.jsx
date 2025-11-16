import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  color,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 relative group transform hover:-translate-y-1"
      onClick={onSelect}
    >
      {/* Top Section */}
      <div
        className="rounded-lg p-4 relative flex flex-col gap-2"
        style={{ background: color.bgcolor }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-md flex items-center justify-center shadow-md">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {getInitials(role)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {role}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 truncate">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:flex items-center gap-1 text-xs text-rose-500 font-medium px-2 py-0.5 rounded border border-rose-100 hover:border-rose-200 absolute top-3 right-3 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="px-2 pb-2 mt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-gray-900 dark:text-gray-100 px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded-full">
            Experience {experience} {experience === 1 ? 'Year' : 'Years'}
          </span>
          <span className="text-xs font-medium text-gray-900 dark:text-gray-100 px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded-full">
            {questions} Q&A
          </span>
          <span className="text-xs font-medium text-gray-900 dark:text-gray-100 px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {description || 'No description provided.'}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
