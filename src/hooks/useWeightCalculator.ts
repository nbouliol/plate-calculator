import { useState } from 'react';
import { AvailableWeights, CalculationResult } from '../types';
import { DEFAULT_AVAILABLE_WEIGHTS, DEFAULT_BAR_WEIGHT } from '../constants';
import { calculateWeights } from '../utils/weightCalculator';

export const useWeightCalculator = () => {
  const [barWeight, setBarWeight] = useState<number>(DEFAULT_BAR_WEIGHT);
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [availableWeights, setAvailableWeights] = useState<AvailableWeights>(DEFAULT_AVAILABLE_WEIGHTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleBarWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarWeight(parseFloat(e.target.value) || 0);
    setResult(null);
  };

  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetWeight(e.target.value);
    setResult(null);
  };

  const toggleWeight = (weight: number): void => {
    setAvailableWeights((prev: AvailableWeights) => ({
      ...prev,
      [weight]: !prev[weight]
    }));
    setResult(null);
  };

  const handleCalculate = (): void => {
    const { result: calculationResult, error: calculationError } = calculateWeights(
      targetWeight,
      barWeight,
      availableWeights
    );

    setResult(calculationResult);
    setError(calculationError);
  };

  return {
    barWeight,
    targetWeight,
    availableWeights,
    result,
    error,
    handleBarWeightChange,
    handleTargetWeightChange,
    toggleWeight,
    handleCalculate
  };
};