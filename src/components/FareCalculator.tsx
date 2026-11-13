import React, { useState } from 'react';
import { Calculator, MessageCircle, Check, Sparkles } from 'lucide-react';
import { FLEET } from '../data/fleet';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';

export const FareCalculator: React.FC = () => {
  const [selectedId, setSelectedId] = useState(FLEET[0].id);
  const [distanceKm, setDistanceKm] = useState(300);
  const [tripMode, setTripMode] = useState<'roundtrip' | 'oneway'>('roundtrip');

  const eligibleVehicles =
    tripMode === 'oneway' ? FLEET.filter((v) => v.oneWayAvailable) : FLEET;
  const vehicle =
    eligibleVehicles.find((v) => v.id === selectedId) || eligibleVehicles[0];

  const effectiveKm =
    tripMode === 'roundtrip' ? Math.max(distanceKm, vehicle.minKmPerDay) : distanceKm;
  const activeRate =
    tripMode === 'oneway' ? vehicle.oneWayRatePerKm : vehicle.outstationRatePerKm;
  const kmFare = Math.round(effectiveKm * activeRate);
  const batta = vehicle.driverBatta;
  const totalEstimate = kmFare + batta;

  const presets = [
    { label: '55 Km (Airport)', km: 55 },
    { label: '275 Km (Hyderabad)', km: 275 },
    { label: '350 Km (Vizag)', km: 350 },
    { label: '410 Km (Tirupati)', km: 410 },
    { label: '600 Km (Round)', km: 600 },
  ];

  const lockFareMsg = [
    `*Fare Estimate Lock Request — ${BRAND.name}*`,
    `• Trip Mode: ${tripMode === 'oneway' ? 'One-Way Drop' : 'Round Trip'}`,
    `• Vehicle: ${vehicle.name} (${vehicle.seating})`,
    `• Est. Distance: ${distanceKm} Kms`,
    `• Estimated Total: ${formatINR(totalEstimate)} (incl. ₹${batta} Driver Batta; tolls actual)`,
  ].join('\n');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Controls */}
        <div className="lg:col-span-7 min-w-0 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Calculator className="w-3.5 h-3.5" />
                Interactive Fare Estimator
              </div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Estimate Your Outstation Trip Fare
              </h3>
            </div>

            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setTripMode('roundtrip')}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  tripMode === 'roundtrip'
                    ? 'bg-[#090d16] text-amber-400 shadow'
                    : 'text-slate-600'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => {
                  setTripMode('oneway');
                  const current = FLEET.find((v) => v.id === selectedId);
                  if (!current || !current.oneWayAvailable) {
                    setSelectedId(FLEET[0].id);
                  }
                }}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  tripMode === 'oneway'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-600'
                }`}
              >
                One-Way Drop
              </button>
            </div>
          </div>

          {/* Vehicle Selector Pills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Choose Vehicle Type
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {eligibleVehicles.map((v) => {
                const active = v.id === vehicle.id;
                const pillRate =
                  tripMode === 'oneway' ? v.oneWayRatePerKm : v.outstationRatePerKm;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedId(v.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-amber-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {v.name}
                    </div>
                    <div className="text-[11px] font-semibold text-amber-700 mt-0.5">
                      ₹{pillRate}/km • {v.seating}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estimated Journey Distance
              </span>
              <span className="font-display text-xl font-extrabold text-slate-900">
                {distanceKm} Kms
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={1200}
              step={10}
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer amber-slider"
            />
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.km}
                  type="button"
                  onClick={() => setDistanceKm(p.km)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                    distanceKm === p.km
                      ? 'bg-slate-900 text-amber-400 border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-1 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> No Surge / Peak Pricing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> GST Invoice Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> Zero Advance Booking
            </span>
          </div>
        </div>

        {/* Fare Breakdown Output */}
        <div className="lg:col-span-5 min-w-0 bg-[#090d16] text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-amber-500/20">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {tripMode === 'oneway' ? 'One-Way Saver Estimate' : 'Round Trip Estimate'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{vehicle.seating}</span>
            </div>

            <div className="text-sm text-slate-400">Estimated Total Fare</div>
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-amber-400 mt-1">
              {formatINR(totalEstimate)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              For {vehicle.name} • {effectiveKm} billable kms
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Running KM Fare ({effectiveKm} km × ₹{activeRate})
                </span>
                <span className="font-bold text-white">{formatINR(kmFare)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Allowance (Batta)</span>
                <span className="font-bold text-white">{formatINR(batta)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tolls, Parking &amp; State Tax</span>
                <span className="font-semibold text-emerald-400">As per actuals</span>
              </div>
            </div>
          </div>

          <a
            href={buildWhatsAppUrl(lockFareMsg)}
            target="_blank"
            rel="noreferrer"
            className="mt-7 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Lock In Fare on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
