import React from 'react';
import { Quote, GenerationStatus } from '../types';

interface QuoteDisplayProps {
  quote: Quote | null;
  status: GenerationStatus;
  error: string | null;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, status, error }) => {
  const textColorClass = status === GenerationStatus.ERROR ? 'text-red-400' : 'text-white';

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white border-opacity-20 flex flex-col items-center justify-center min-h-[16rem] max-w-2xl w-full text-center sm:min-h-[12rem] md:min-h-[14rem] lg:min-h-[16rem]">
      {status === GenerationStatus.LOADING && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">Generating a cool quote...</p>
        </div>
      )}

      {status === GenerationStatus.ERROR && (
        <p className={`${textColorClass} text-xl font-semibold`}>Error: {error || "Something went wrong."}</p>
      )}

      {status === GenerationStatus.SUCCESS && quote && (
        <blockquote className="relative text-2xl sm:text-3xl font-light italic leading-relaxed px-4 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-5xl before:text-indigo-400 before:opacity-75 after:content-['”'] after:absolute after:right-0 after:bottom-0 after:text-5xl after:text-indigo-400 after:opacity-75">
          <p className="text-white">
            {quote.text}
          </p>
          {quote.author && (
            <footer className="mt-4 text-xl font-normal text-indigo-300">- {quote.author}</footer>
          )}
        </blockquote>
      )}

      {status === GenerationStatus.IDLE && !quote && !error && (
        <p className="text-white text-xl font-light italic">
          Click "Generate Quote" to get started!
        </p>
      )}
    </div>
  );
};

export default QuoteDisplay;
