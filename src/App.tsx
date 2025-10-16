import { useWeightCalculator } from './hooks/useWeightCalculator';
import {
  Header,
  WeightInput,
  WeightSelector,
  ErrorDisplay,
  ResultDisplay
} from './components';
import { useRef } from 'react';

export default function App() {
  const {
    barWeight,
    targetWeight,
    availableWeights,
    result,
    error,
    handleBarWeightChange,
    handleTargetWeightChange,
    toggleWeight,
    handleCalculate
  } = useWeightCalculator();

  const resultRef = useRef<HTMLDivElement>(null);

  function calculateAndScroll() {
    handleCalculate();
    setTimeout(() => {
      
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
  
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto min-h-full flex flex-col justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700">
          <Header />

          <div className="space-y-6">
            <WeightInput
              label="Poids total désiré (kg)"
              value={targetWeight}
              onChange={handleTargetWeightChange}
              placeholder="Ex: 100"
              autofocus
            />

            <WeightInput
              label="Poids de la barre (kg)"
              value={barWeight}
              onChange={handleBarWeightChange}
            />

            <WeightSelector
              availableWeights={availableWeights}
              onToggleWeight={toggleWeight}
            />

            <button
              onClick={calculateAndScroll}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/30"
            >
              Calculer
            </button>

            <ErrorDisplay error={error} />

            {result && (
              <ResultDisplay result={result} barWeight={barWeight} ref={resultRef} />
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