import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex justify-center items-center p-4">
      <svg
        aria-hidden="true"
        className="w-10 h-10 text-gray-300 animate-spin fill-orange-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5C100 78.3 77.6 100.7 50 100.7C22.4 100.7 0 78.3 0 50.5C0 22.7 22.4 0.299988 50 0.299988C77.6 0.299988 100 22.7 100 50.5ZM9.081 50.5C9.081 74 26.5 91.4 50 91.4C73.5 91.4 90.9 74 90.9 50.5C90.9 27 73.5 9.59999 50 9.59999C26.5 9.59999 9.081 27 9.081 50.5Z"
          fill="currentColor"
        />
        <path
          d="M93.9 39.0C96.7 38.3 98.3 35.2 97.4 32.4C95 24.5 90.2 17.3 83.6 11.7C77 6.09999 68.7 2.59999 59.8 1.49999C57 1.09999 54.2 3.09999 53.5 5.89999C52.8 8.69999 54.8 11.5 57.6 11.9C64.5 12.8 70.8 15.7 75.8 20.1C80.9 24.5 84.6 30.5 86.4 37.1C87.1 39.9 91.2 40.7 93.9 39Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
