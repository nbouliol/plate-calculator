import React from 'react';

interface WeightInputProps {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  step?: string;
}

export const WeightInput: React.FC<WeightInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  min = "0",
  step = "0.5"
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        placeholder={placeholder}
        min={min}
        step={step}
      />
    </div>
  );
};