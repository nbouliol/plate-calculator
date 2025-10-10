import React from 'react';
import { CalculationResult } from '../types';
import { countPlates } from '../utils/weightCalculator';

interface ResultDisplayProps {
  result: CalculationResult;
  barWeight: number;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, barWeight }) => {
  return (
    <div className="space-y-4 animate-[fadeIn_0.5s_ease-in]">
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Résultat</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Poids de la barre:</span>
            <span className="font-bold text-white">{barWeight} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Disques total:</span>
            <span className="font-bold text-white">{result.totalPlatesWeight.toFixed(2)} kg</span>
          </div>
          <div className="h-px bg-slate-600"></div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 font-semibold">Poids total:</span>
            <span className="font-bold text-cyan-400 text-xl">{result.actualTotal.toFixed(2)} kg</span>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Par côté:</h3>
          <div className="space-y-2">
            {Object.entries(countPlates(result.platesPerSide))
              .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
              .map(([weight, count]) => (
              <div 
                key={weight} 
                className="flex items-center gap-3 animate-[slideIn_0.3s_ease-out]"
              >
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-white font-medium">{weight} kg</span>
                </div>
                <span className="text-cyan-400 font-bold">× {count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300 text-center">
            Total par côté: {result.platesPerSide.reduce((sum, w) => sum + w, 0).toFixed(2)} kg
          </p>
        </div>
      </div>
    </div>
  );
};