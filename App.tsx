import React, { useState, useCallback } from 'react';
import { generateCoolQuote } from './services/geminiService';
import QuoteDisplay from './components/QuoteDisplay';
import GenerateButton from './components/GenerateButton';
import { Quote, GenerationStatus } from './types';

function App() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuote = useCallback(async () => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    try {
      const quote = await generateCoolQuote();
      setCurrentQuote(quote);
      setStatus(GenerationStatus.SUCCESS);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to generate quote.');
      setStatus(GenerationStatus.ERROR);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []); // Empty dependency array means this function is created once

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-12 text-center drop-shadow-lg leading-tight">
        Cool Quotes <span className="text-indigo-400">Generator</span>
      </h1>

      <QuoteDisplay quote={currentQuote} status={status} error={error} />

      <GenerateButton onClick={handleGenerateQuote} status={status} />

      <p className="mt-8 text-sm text-gray-300 text-center max-w-md">
        Powered by Google Gemini API.
      </p>
    </div>
  );
}

export default App;
