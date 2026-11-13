import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { FLEET } from '../data/fleet';
import { formatINR } from '../config/brand';
import { useBookingModal } from '../context/BookingModalContext';

export const TariffTable: React.FC = () => {
  const { openBooking } = useBookingModal();

  return (
    <div className="space-y-5 min-w-0">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden max-w-full">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#090d16] text-white text-xs uppercase tracking-wider">
                <th className="py-4 px-5 font-bold">Vehicle Model</th>
                <th className="py-4 px-4 font-bold">Seating</th>
                <th className="py-4 px-4 font-bold">Round Trip</th>
                <th className="py-4 px-4 font-bold">One-Way</th>
                <th className="py-4 px-4 font-bold">4Hrs / 40Km</th>
                <th className="py-4 px-4 font-bold">8Hrs / 80Km</th>
                <th className="py-4 px-4 font-bold">Airport (VGA)</th>
                <th className="py-4 px-4 font-bold">Driver Batta</th>
                <th className="py-4 px-5 font-bold text-right">Booking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {FLEET.map((car) => (
                <tr
                  key={car.id}
                  className="hover:bg-amber-50/60 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900">{car.name}</div>
                    <div className="text-xs text-slate-500">{car.categoryLabel}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">{car.seating}</td>
                  <td className="py-4 px-4">
                    <span className="font-extrabold text-amber-700 text-base">
                      ₹{car.outstationRatePerKm}
                    </span>
                    <span className="text-xs text-slate-500">/km</span>
                  </td>
                  <td className="py-4 px-4">
                    {car.oneWayAvailable ? (
                      <>
                        <span className="font-extrabold text-emerald-700 text-base">
                          ₹{car.oneWayRatePerKm}
                        </span>
                        <span className="text-xs text-slate-500">/km</span>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">Round Trip Only</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {formatINR(car.hourly4hr40km)}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {formatINR(car.hourly8hr80km)}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {car.airportAvailable ? (
                      formatINR(car.airportDropFare)
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-800">
                      {formatINR(car.driverBatta)}/day
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      *Included in local pkg
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => openBooking({ vehicleId: car.id, mode: 'outstation' })}
                      className="px-4 py-2 rounded-xl bg-[#090d16] hover:bg-amber-500 hover:text-slate-950 text-amber-400 text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      Reserve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-emerald-950 text-sm mb-0.5">
              Driver Batta 100% Included in Local Packages
            </div>
            <p className="text-emerald-900/80 leading-relaxed">
              All 4-Hour (40Km), 8-Hour (80Km), and 12-Hour (120Km) local city rentals include chauffeur allowance and fuel.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-950 text-sm mb-0.5">
              Transparent Outstation Billing Policy
            </div>
            <p className="text-amber-900/80 leading-relaxed">
              Toll gates (FASTag), parking, and interstate entry permits are payable as per actuals. Standard night driving allowance (10 PM–6 AM) is ₹200.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
