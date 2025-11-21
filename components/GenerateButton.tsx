import React from 'react';
import { GenerationStatus } from '../types';

interface GenerateButtonProps {
  onClick: () => void;
  status: GenerationStatus;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, status }) => {
  const isLoading = status === GenerationStatus.LOADING;

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        mt-8 px-8 py-3 rounded-full text-lg font-bold
        transition-all duration-300 ease-in-out transform
        focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-75
        ${isLoading
          ? 'bg-gray-600 cursor-not-allowed flex items-center justify-center'
          : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-lg shadow-indigo-500/50'}
      `}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-t-2 border-white border-solid rounded-full animate-spin mr-3"></div>
          Generating...
        </>
      ) : (
        'Generate Quote'
      )}
    </button>
  );
};

export default GenerateButton;
