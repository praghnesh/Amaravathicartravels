import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { ROUTE_PACKAGES, RoutePackage } from '../data/routePackages';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';
import { useBookingModal } from '../context/BookingModalContext';

export const RoutePackagesSection: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('hyd-to-vja');
  const { openBooking } = useBookingModal();

  const activeRoute: RoutePackage =
    ROUTE_PACKAGES.find((r) => r.id === selectedRouteId) || ROUTE_PACKAGES[0];

  const handleSwapDirection = () => {
    if (selectedRouteId === 'hyd-to-vja') setSelectedRouteId('vja-to-hyd');
    else if (selectedRouteId === 'vja-to-hyd') setSelectedRouteId('hyd-to-vja');
    else if (selectedRouteId === 'hyd-to-gnt') setSelectedRouteId('gnt-to-hyd');
    else if (selectedRouteId === 'gnt-to-hyd') setSelectedRouteId('hyd-to-gnt');
  };

  const isVjaCorridor =
    selectedRouteId === 'hyd-to-vja' || selectedRouteId === 'vja-to-hyd';

  const handleBookRoute = (carName: string, price: number) => {
    const msg = [
      `*Fixed Route Cab Booking — ${BRAND.name}*`,
      `• Route: ${activeRoute.title}`,
      `• Vehicle: ${carName}`,
      `• Fixed Package Fare: ${formatINR(price)} (All Inclusive)`,
      `• Distance & Duration: ${activeRoute.distance} • ${activeRoute.duration}`,
      `Please confirm cab availability.`,
    ].join('\n');

    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-amber-50/30 to-slate-50 border-t border-slate-200/80" id="route-packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Fixed Highway Corridor Packages
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Hyderabad ⇄ Vijayawada &amp; Guntur Fixed Rates
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            Fixed transparent pricing with zero per-km meter surprises. Clean AC cabs, experienced highway chauffeurs, and doorstep pickup across all areas.
          </p>
        </div>

        {/* Route Corridor Switcher */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            {/* Corridor Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedRouteId('hyd-to-vja')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                  isVjaCorridor
                    ? 'bg-slate-950 text-amber-400 shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Hyderabad ⇄ Vijayawada (~275 Km)
              </button>

              <button
                type="button"
                onClick={() => setSelectedRouteId('hyd-to-gnt')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                  !isVjaCorridor
                    ? 'bg-slate-950 text-amber-400 shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Hyderabad ⇄ Guntur (~290 Km)
              </button>
            </div>

            {/* Swap Direction Button */}
            <button
              type="button"
              onClick={handleSwapDirection}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Swap Direction</span>
            </button>
          </div>

          {/* Active Route Direction Pill & Highway Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-display font-black text-sm sm:text-base text-slate-900">
                {activeRoute.title}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                {activeRoute.highway}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {activeRoute.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Toll &amp; Driver Covered
              </span>
            </div>
          </div>
        </div>

        {/* 4 Car Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeRoute.tariffs.map((car) => (
            <div
              key={car.vehicleId}
              className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Vehicle Image Header */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  {car.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                      {car.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur text-white text-[10px] font-semibold border border-white/15">
                    {car.categoryLabel}
                  </span>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h3 className="font-display text-base font-extrabold leading-tight">
                      {car.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div className="p-4 space-y-3">
                  {/* Fixed Price Big Display */}
                  <div className="bg-amber-50/90 rounded-2xl p-3 border border-amber-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-900 tracking-wider">
                        Fixed Package Fare
                      </div>
                      <div className="font-display text-2xl font-black text-amber-800">
                        {formatINR(car.price)}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                      One Way Drop
                    </span>
                  </div>

                  {/* Seating & Capacity */}
                  <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2">
                    <span className="flex items-center gap-1 font-semibold">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      {car.seating}
                    </span>
                    <span className="font-semibold text-slate-500">{car.luggage}</span>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-1 text-xs text-slate-600">
                    {car.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => handleBookRoute(car.name, car.price)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Book {car.name.split(' ')[0]} ({formatINR(car.price)})</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openBooking({
                      mode: 'outstation',
                      tripType: 'oneway',
                      pickup: activeRoute.origin,
                      destination: activeRoute.destination,
                      notes: `Interested in Fixed Route Package: ${activeRoute.title} with ${car.name} for ${formatINR(car.price)}.`,
                    })
                  }
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span>Quick Reserve Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Route Summary Card with Direct Helplines */}
        <div className="bg-[#090d16] text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-wrap items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <div className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              Need Instant Pickup on this Route?
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black">
              24/7 Chauffeur Dispatch for {activeRoute.origin} ⇄ {activeRoute.destination}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              We provide doorstep pickups from any residential colony, tech park, railway station, or airport in both cities.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BRAND.phoneDisplay}</span>
            </a>

            <a
              href={buildWhatsAppUrl(
                `Hi Amaravathi Car Travels, I need immediate cab booking for route: ${activeRoute.title}. Please confirm available drivers.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Dispatch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
