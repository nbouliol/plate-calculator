import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface AvailableWeights {
  [key: string]: boolean;
}

interface CalculationResult {
  platesPerSide: number[];
  totalPlatesWeight: number;
  actualTotal: number;
}

interface PlateCount {
  [key: string]: number;
}

export default function App() {
  const [barWeight, setBarWeight] = useState<number>(20);
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [availableWeights, setAvailableWeights] = useState<AvailableWeights>({
    20: true,
    10: true,
    5: true,
    2.5: true,
    1.25: true
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateWeights = (): void => {
    setError('');
    setResult(null);

    const target = parseFloat(targetWeight);
    
    if (!target || target <= barWeight) {
      setError('Le poids total doit être supérieur au poids de la barre');
      return;
    }

    const weightToDistribute = target - barWeight;
    const perSide = weightToDistribute / 2;

    const weights = Object.keys(availableWeights)
      .filter(w => availableWeights[w])
      .map(w => parseFloat(w))
      .sort((a, b) => b - a);

    let remaining = perSide;
    const platesPerSide = [];

    for (const weight of weights) {
      while (remaining >= weight) {
        platesPerSide.push(weight);
        remaining -= weight;
      }
    }

    if (remaining > 0.01) {
      setError(`Impossible d'atteindre exactement ${target}kg avec les poids disponibles. Poids manquant: ${(remaining * 2).toFixed(2)}kg`);
      return;
    }

    const totalPlatesWeight = platesPerSide.reduce((sum, w) => sum + w, 0) * 2;
    const actualTotal = barWeight + totalPlatesWeight;

    setResult({
      platesPerSide,
      totalPlatesWeight,
      actualTotal
    });
  };

  const toggleWeight = (weight: string): void => {
    setAvailableWeights((prev: AvailableWeights) => ({
      ...prev,
      [weight]: !prev[weight]
    }));
    setResult(null);
  };

  const countPlates = (plates: number[]): PlateCount => {
    const counts: PlateCount = {};
    plates.forEach(plate => {
      counts[plate] = (counts[plate] || 0) + 1;
    });
    return counts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <Dumbbell className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Calculateur de Poids</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Poids de la barre (kg)
              </label>
              <input
                type="number"
                value={barWeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBarWeight(parseFloat(e.target.value) || 0);
                  setResult(null);
                }}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                min="0"
                step="0.5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Poids total désiré (kg)
              </label>
              <input
                type="number"
                value={targetWeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTargetWeight(e.target.value);
                  setResult(null);
                }}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                placeholder="Ex: 100"
                min="0"
                step="0.5"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">
                Poids disponibles
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(availableWeights).map(weight => (
                  <button
                    key={weight}
                    onClick={() => toggleWeight(weight)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      availableWeights[weight]
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                    }`}
                  >
                    {weight} kg
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateWeights}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/30"
            >
              Calculer
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-[fadeIn_0.3s_ease-in]">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {result && (
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
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}