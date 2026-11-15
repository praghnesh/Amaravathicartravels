import React, { useState } from 'react';
import { Users, Briefcase, Snowflake, ShieldCheck } from 'lucide-react';
import { FLEET, VehicleCategory } from '../data/fleet';
import { formatINR } from '../config/brand';
import { useBookingModal } from '../context/BookingModalContext';

interface FleetGridProps {
  limit?: number;
  showFilters?: boolean;
}

const CATEGORIES: { id: 'all' | VehicleCategory; label: string }[] = [
  { id: 'all', label: 'All Vehicles' },
  { id: 'sedan', label: 'Sedans (4+1)' },
  { id: 'mpv', label: 'SUV / Ertiga (6+1)' },
  { id: 'luxury', label: 'Innova & Crysta (7+1)' },
  { id: 'traveller', label: 'Tempo, Urbania & Luxury Buses' },
];

export const FleetGrid: React.FC<FleetGridProps> = ({ limit, showFilters = true }) => {
  const [filter, setFilter] = useState<'all' | VehicleCategory>('all');
  const { openBooking } = useBookingModal();

  const filtered =
    filter === 'all' ? FLEET : FLEET.filter((v) => v.category === filter);
  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                filter === c.id
                  ? 'bg-[#090d16] text-amber-400 border-[#090d16] shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((car) => (
          <div
            key={car.id}
            className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all overflow-hidden flex flex-col"
          >
            {/* Image Header */}
            <div className="relative h-52 bg-slate-900 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              {car.badge && (
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow">
                  {car.badge}
                </span>
              )}
              <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur text-white text-[11px] font-semibold border border-white/15">
                {car.categoryLabel}
              </span>
              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="font-display text-xl font-extrabold leading-tight">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-300">{car.seating}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                    Outstation
                  </div>
                  <div className="font-display text-xl font-extrabold text-amber-400">
                    ₹{car.outstationRatePerKm}
                    <span className="text-xs font-semibold text-slate-300">/km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Users className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">{car.seating}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Briefcase className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800 truncate px-1">
                      {car.luggage.split(' ')[0]} {car.luggage.split(' ')[1]}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Snowflake className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">Dual AC</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{car.idealFor}</p>

                <div className="flex flex-wrap gap-1.5">
                  {car.features.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[11px] font-semibold"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">One-Way Drop:</span>
                    <span className="font-extrabold text-amber-700">
                      {car.oneWayAvailable
                        ? `₹${car.oneWayRatePerKm}/km (+₹${car.driverBatta})`
                        : 'Round Trip Only'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">4Hr / 8Hr Local:</span>
                    <span className="font-extrabold text-slate-900">
                      {formatINR(car.hourly4hr40km)} / {formatINR(car.hourly8hr80km)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => openBooking({ vehicleId: car.id, mode: 'outstation' })}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#090d16] hover:bg-slate-800 text-amber-400 text-xs font-extrabold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Reserve Cab
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

