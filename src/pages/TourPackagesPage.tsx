import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Compass,
  Clock,
  Route,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packages';
import { FLEET, VehicleCategory } from '../data/fleet';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';
import { HomeBookingDraft, loadBookingDraft } from '../utils/bookingTransfer';

const VEHICLE_FILTERS: { id: 'all' | VehicleCategory; label: string }[] = [
  { id: 'all', label: 'All Vehicles' },
  { id: 'sedan', label: 'Sedans (4+1)' },
  { id: 'mpv', label: 'SUV / Ertiga (6+1)' },
  { id: 'luxury', label: 'Innova & Crysta (7+1)' },
  { id: 'traveller', label: 'Tempo, Urbania & Mini Bus' },
];

export const TourPackagesPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state || null) as (Partial<HomeBookingDraft> & { fromHomeBooking?: boolean }) | null;
  const saved = loadBookingDraft();

  const initialTourId = navState?.selectedTour || saved?.selectedTour || TOUR_PACKAGES[0].id;
  const validInitial = TOUR_PACKAGES.some((p) => p.id === initialTourId)
    ? initialTourId
    : TOUR_PACKAGES[0].id;

  const [selectedPkgId, setSelectedPkgId] = useState(validInitial);
  const [vehicleFilter, setVehicleFilter] = useState<'all' | VehicleCategory>('all');

  useEffect(() => {
    if (navState?.selectedTour && TOUR_PACKAGES.some((p) => p.id === navState.selectedTour)) {
      setSelectedPkgId(navState.selectedTour);
    }
  }, [navState]);

  const pkg = TOUR_PACKAGES.find((p) => p.id === selectedPkgId) || TOUR_PACKAGES[0];
  const filteredFleet =
    vehicleFilter === 'all' ? FLEET : FLEET.filter((c) => c.category === vehicleFilter);

  const baseSedanRate = FLEET[0].outstationRatePerKm;
  const calcTourCarFare = (car: (typeof FLEET)[number]) =>
    car.outstationRatePerKm === baseSedanRate
      ? pkg.startingFare
      : Math.round((pkg.startingFare * (car.outstationRatePerKm / baseSedanRate)) / 10) * 10;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            Pilgrimage &amp; Holiday Tour Packages
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Curated Temple &amp; Holiday Car Packages
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Explore day-by-day itineraries, inclusions, and instant car rates with experienced Tirumala &amp; Srisailam ghat drivers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {navState?.fromHomeBooking && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <CheckCircle2 className="w-4 h-4" />
            Selected Tour Loaded: {pkg.title}
          </div>
        )}

        {/* Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TOUR_PACKAGES.map((item) => {
            const active = item.id === selectedPkgId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPkgId(item.id)}
                className={`rounded-2xl sm:rounded-3xl overflow-hidden border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'border-amber-500 ring-2 ring-amber-500/30 bg-white shadow-xl'
                    : 'border-slate-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="w-full h-24 sm:h-32 relative bg-slate-900">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-extrabold">
                    {item.category}
                  </span>
                  <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3 text-white font-display font-bold text-xs sm:text-sm leading-tight line-clamp-2">
                    {item.title}
                  </div>
                </div>
                <div className="w-full p-2.5 sm:p-3.5 flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs bg-white">
                  <span className="text-slate-500 font-medium">{item.duration}</span>
                  <span className="font-extrabold text-emerald-700">From {formatINR(item.startingFare)}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2nd: Selected Destination Detail & Itinerary */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 min-w-0 relative min-h-[280px] bg-slate-900">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold">
                  {pkg.badge}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold">{pkg.title}</h2>
                <p className="text-xs sm:text-sm text-slate-200">{pkg.subtitle}</p>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0 p-6 sm:p-8 space-y-6">
              {/* Meta Chips */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> DURATION
                  </div>
                  <div className="font-display font-extrabold text-sm sm:text-base text-slate-900 mt-0.5">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Route className="w-3.5 h-3.5 text-amber-600" /> DISTANCE
                  </div>
                  <div className="font-display font-extrabold text-sm sm:text-base text-slate-900 mt-0.5">
                    {pkg.distance}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> DRIVER BATTA
                  </div>
                  <div className="font-display font-extrabold text-sm sm:text-base text-emerald-900 mt-0.5">
                    INCLUDED ✓
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="font-display text-lg font-extrabold text-slate-900 mb-3">
                  Day-by-Day Journey &amp; Places Covered
                </h3>
                <div className="space-y-3">
                  {pkg.itinerary.map((step) => (
                    <div
                      key={step.day}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200"
                    >
                      <div className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                        {step.day} — {step.title}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2">
                    What Is Included
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    What Is Excluded
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.exclusions.map((exc) => (
                      <li key={exc} className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3rd (Next): Filtered Vehicle Rates & Prices for Selected Tour */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
                Filtered Rates for Selected Tour
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900">
                {pkg.title} — Package Rates
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {pkg.duration} • {pkg.distance} • Driver Batta Included
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Advance Deposit • Chauffeur Batta Included</span>
            </div>
          </div>

          {/* Vehicle Type Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {VEHICLE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setVehicleFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  vehicleFilter === f.id
                    ? 'bg-[#090d16] text-amber-400 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFleet.map((car) => {
              const estPkgFare = calcTourCarFare(car);
              const msg = [
                `*Tour Package Booking — ${BRAND.name}*`,
                `• Package: ${pkg.title}`,
                `• Duration & Distance: ${pkg.duration} (${pkg.distance})`,
                `• Vehicle: ${car.name} (${car.seating})`,
                `• Estimated Package Fare: ${formatINR(estPkgFare)} (Driver Batta Included)`,
              ].join('\n');

              return (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-4 transition-all flex flex-col justify-between space-y-3.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-20 h-14 object-cover rounded-xl shrink-0 bg-slate-900 border border-slate-100"
                      />
                      <div className="min-w-0">
                        <div className="font-black text-sm text-slate-900 leading-snug">
                          {car.name}
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">
                          {car.seating} • {pkg.duration}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          Driver Batta Included ✓
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-display text-lg font-black text-amber-700">
                        {formatINR(estPkgFare)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 block">
                        Est. Package
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                    <a
                      href={buildWhatsAppUrl(msg)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Book Now</span>
                    </a>
                    <a
                      href={`tel:${BRAND.phoneRaw}`}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Driver</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
