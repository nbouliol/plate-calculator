import React from 'react';
import { AvailableWeights } from '../types';

interface WeightSelectorProps {
  availableWeights: AvailableWeights;
  onToggleWeight: (weight: number) => void;
}

export const WeightSelector: React.FC<WeightSelectorProps> = ({
  availableWeights,
  onToggleWeight
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        Poids disponibles
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.keys(availableWeights).sort((a, b) => parseFloat(b) - parseFloat(a)).map(weight => {
            const weightNum = parseFloat(weight);
            return (
          <button
            key={weight}
            onClick={() => onToggleWeight(weightNum)}
            className={`px-4 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              availableWeights[weightNum    ]
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600'
            }`}
          >
            {weight} kg
          </button>
        )})}
      </div>
    </div>
  );
};