import React from 'react';

function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">{children}</div>
          <button className="absolute top-4 right-4" onClick={onClose}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="x w-6 h-6">
              <path
                fillRule="evenodd"
                d="M13.414 12l3.293 3.293a1 1 0 01-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12 7.293 8.707a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 011.414 1.414L13.414 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}