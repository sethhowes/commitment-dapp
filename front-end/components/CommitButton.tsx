import { useState } from 'react';

const CommitButton = () => {
  const [test, setTest] = useState(false);

  const handleClick = () => {
    setTest(true);
    // Perform the desired action when the button is clicked
  };

  return (
    <button
      className={`bg-red-500 text-white font-bold py-2 px-4 rounded ${
        test ? 'transform translate-x-8' : ''
      }`}
      onClick={handleClick}
    >
      {test ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="2"
              stroke="currentColor"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        'Commit'
      )}
    </button>
  );
};

export default CommitButton;
