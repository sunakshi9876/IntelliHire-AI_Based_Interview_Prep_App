import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="space-y-6 max-w-3xl w-full mx-auto">
      {/* Top Heading or Title Skeleton */}
      <div role="status" className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2 mb-4"></div>
      </div>

      {/* First Content Block */}
      <div className="animate-pulse space-y-3">
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
      </div>

      {/* Second Box/Card Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 space-y-3 animate-pulse">
        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-2.5 bg-gray-300 rounded w-2/4"></div>
        <div className="h-2.5 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Optional Bottom Spacing Skeleton */}
      <div role="status" className="animate-pulse space-y-3 mt-10">
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-2/3"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader
