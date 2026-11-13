import React from 'react';
import { IndianRupee } from 'lucide-react';
import { TariffTable } from '../components/TariffTable';
import { FareCalculator } from '../components/FareCalculator';

export const TariffPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <IndianRupee className="w-3.5 h-3.5" />
            Official Rate Card &amp; Fare Calculator
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Transparent Fleet Tariff &amp; Per-Km Rates
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Clear local hourly rentals, outstation per-kilometer rates, and instant fare estimation with zero hidden surge charges.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <TariffTable />
        <FareCalculator />
      </div>
    </div>
  );
};

