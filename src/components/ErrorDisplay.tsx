import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-[fadeIn_0.3s_ease-in]">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );
};