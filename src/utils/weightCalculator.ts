import { AvailableWeights, CalculationResult, PlateCount } from '../types';
import { WEIGHT_TOLERANCE } from '../constants';

export const calculateWeights = (
  targetWeight: string,
  barWeight: number,
  availableWeights: AvailableWeights
): { result: CalculationResult | null; error: string } => {
  const target = parseFloat(targetWeight);
  
  if (!target || target <= barWeight) {
    return {
      result: null,
      error: 'Le poids total doit être supérieur au poids de la barre'
    };
  }

  const weightToDistribute = target - barWeight;
  const perSide = weightToDistribute / 2;

  const weights = Object.keys(availableWeights)
    .filter(w => availableWeights[parseFloat(w)])
    .map(w => parseFloat(w))
    .sort((a, b) => b - a);

  let remaining = perSide;
  const platesPerSide: number[] = [];

  for (const weight of weights) {
    while (remaining >= weight) {
      platesPerSide.push(weight);
      remaining -= weight;
    }
  }

  if (remaining > WEIGHT_TOLERANCE) {
    return {
      result: null,
      error: `Impossible d'atteindre exactement ${target}kg avec les poids disponibles. Poids manquant: ${(remaining * 2).toFixed(2)}kg`
    };
  }

  const totalPlatesWeight = platesPerSide.reduce((sum, w) => sum + w, 0) * 2;
  const actualTotal = barWeight + totalPlatesWeight;

  return {
    result: {
      platesPerSide,
      totalPlatesWeight,
      actualTotal
    },
    error: ''
  };
};

export const countPlates = (plates: number[]): PlateCount => {
  const counts: PlateCount = {};
  plates.forEach(plate => {
    counts[plate] = (counts[plate] || 0) + 1;
  });
  return counts;
};