export interface AvailableWeights {
  [key: number]: boolean;
}

export interface CalculationResult {
  platesPerSide: number[];
  totalPlatesWeight: number;
  actualTotal: number;
}

export interface PlateCount {
  [key: string]: number;
}

export interface WeightCalculatorState {
  barWeight: number;
  targetWeight: string;
  availableWeights: AvailableWeights;
  result: CalculationResult | null;
  error: string;
}