import React from 'react';
import { Dumbbell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Dumbbell className="w-8 h-8 text-cyan-400" />
      <h1 className="text-3xl font-bold text-white">Calculateur de Poids</h1>
    </div>
  );
};