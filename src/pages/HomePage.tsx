import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  IndianRupee,
  Sparkles,
  Award,
  ArrowRight,
  Users,
  Briefcase,
  Snowflake,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { BRAND, formatINR } from '../config/brand';
import { InstantBookingWidget } from '../components/InstantBookingWidget';
import { SocialMediaSection } from '../components/SocialMediaSection';
import { TOUR_PACKAGES } from '../data/packages';
import { FLEET, VehicleCategory } from '../data/fleet';
import { saveBookingDraft } from '../utils/bookingTransfer';

const FLEET_FILTERS: { id: 'all' | VehicleCategory; label: string }[] = [
  { id: 'all', label: 'All Vehicles' },
  { id: 'sedan', label: 'Sedans (4+1)' },
  { id: 'mpv', label: 'SUV / Ertiga (6+1)' },
  { id: 'luxury', label: 'Innova & Crysta (7+1)' },
  { id: 'traveller', label: 'Tempo, Urbania & Mini Bus' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Fleet section state
  const [fleetTripMode, setFleetTripMode] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [fleetCategory, setFleetCategory] = useState<'all' | VehicleCategory>('all');

  const availableFilters =
    fleetTripMode === 'oneway'
      ? FLEET_FILTERS.filter((cat) => cat.id !== 'traveller')
      : FLEET_FILTERS;

  const modeEligibleFleet =
    fleetTripMode === 'oneway' ? FLEET.filter((car) => car.oneWayAvailable) : FLEET;

  const filteredFleet =
    fleetCategory === 'all'
      ? modeEligibleFleet
      : modeEligibleFleet.filter((car) => car.category === fleetCategory);

  const featuredTour = TOUR_PACKAGES[0];
  const secondaryTours = TOUR_PACKAGES.slice(1, 4);

  const handleSelectTour = (tourId: string) => {
    saveBookingDraft({ selectedTour: tourId });
    navigate('/tour-packages', {
      state: { selectedTour: tourId, fromHomeBooking: true },
    });
  };

  const handleBookFleetVehicle = (vehicleId: string) => {
    saveBookingDraft({
      selectedVehicleId: vehicleId,
      tripType: fleetTripMode,
      mode: fleetTripMode === 'oneway' ? 'One Way' : 'Round Trip',
    });
    navigate('/fleet', {
      state: {
        selectedVehicleId: vehicleId,
        tripType: fleetTripMode,
        fromHomeBooking: true,
      },
    });
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#070b14] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={BRAND.heroBg}
            alt={BRAND.name}
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/90 via-[#070b14]/65 to-[#070b14]/25" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 min-w-0 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 max-w-full px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Trusted Travel Partner • {BRAND.hubTagline}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08]">
                Reliable Rides for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
                  Every Journey.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Premium chauffeur-driven cab rentals across{' '}
                <strong className="text-white">Amaravati, Vijayawada &amp; Guntur</strong> with transparent per-km billing, zero advance deposit, and 24/7 dispatch.
              </p>

              {/* 4 Trust Blocks */}
              <div className="grid grid-cols-2 gap-4 pt-1 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Safe Travels</div>
                    <div className="text-xs text-slate-400">Verified Chauffeurs</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">24/7 Helpline</div>
                    <div className="text-xs text-slate-400">Doorstep Pickup</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Fair Pricing</div>
                    <div className="text-xs text-slate-400">Zero Empty Burden</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Clean AC Fleet</div>
                    <div className="text-xs text-slate-400">100% Sanitized</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Instant Booking Widget */}
            <div className="lg:col-span-5 min-w-0">
              <InstantBookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOUR PACKAGES SECTION */}
      <section className="py-12 sm:py-16 bg-slate-50" id="routes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
              Pilgrimage &amp; Outstation Trips
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Popular Tour Packages from Amaravati &amp; Vijayawada
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm">
              Hand-curated travel itineraries with experienced ghat-road chauffeurs, timely pickups, and peaceful family journeys. Click any package to view details &amp; book.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Featured Main Package (7 cols) */}
            {featuredTour && (
              <div
                onClick={() => handleSelectTour(featuredTour.id)}
                className="lg:col-span-7 min-w-0 group relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 cursor-pointer bg-slate-900"
              >
                <img
                  src={featuredTour.image}
                  alt={featuredTour.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="relative z-10 space-y-3 text-white">
                  <span className="inline-block bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 py-1 rounded-full shadow-md">
                    {featuredTour.badge}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                    {featuredTour.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4 text-amber-400" />
                      {featuredTour.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {featuredTour.distance}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-slate-300 font-medium">Sedan Package from</div>
                      <div className="font-display text-2xl sm:text-3xl font-black text-amber-400">
                        {formatINR(featuredTour.startingFare)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTour(featuredTour.id);
                      }}
                      className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black px-5 sm:px-7 py-3 rounded-xl sm:rounded-2xl inline-flex items-center gap-1.5 shadow-xl text-xs sm:text-sm cursor-pointer"
                    >
                      <span>Book Package</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Right Stack of 3 Secondary Tours (5 cols) */}
            <div className="lg:col-span-5 min-w-0 grid grid-cols-1 gap-4">
              {secondaryTours.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectTour(pkg.id)}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[145px] flex items-end p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all border border-slate-200 cursor-pointer bg-slate-900"
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
                  <div className="relative z-10 w-full flex items-end justify-between gap-3 text-white">
                    <div className="min-w-0 space-y-1">
                      <span className="inline-block bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                        {pkg.badge}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-black leading-snug line-clamp-1">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-300 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {pkg.duration}
                        </span>
                        <span className="font-extrabold text-amber-400">
                          From {formatINR(pkg.startingFare)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTour(pkg.id);
                      }}
                      className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR FLEET SECTION */}
      <section className="py-12 sm:py-16 bg-white" id="fleet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
              Our Verified Fleet
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Choose Your Vehicle
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm">
              Comfortable, clean, sanitized vehicles with licensed chauffeurs for city commutes and outstation journeys.
            </p>
          </div>

          {/* Round Trip vs One Way Toggle */}
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="bg-slate-900 p-1 rounded-2xl border border-amber-500/30 shadow-lg inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFleetTripMode('roundtrip')}
                className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  fleetTripMode === 'roundtrip'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🔄 Round Trip</span>
                <span className="hidden sm:inline text-[10.5px] opacity-75 font-semibold">
                  (Outstation)
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFleetTripMode('oneway');
                  if (fleetCategory === 'traveller') {
                    setFleetCategory('all');
                  }
                }}
                className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  fleetTripMode === 'oneway'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>➡️ One Way Drop</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
            {availableFilters.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFleetCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  fleetCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Fleet Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFleet.map((car) => {
              const displayRate =
                fleetTripMode === 'oneway'
                  ? `₹${car.oneWayRatePerKm}/km`
                  : `₹${car.outstationRatePerKm}/km`;

              return (
                <div
                  key={car.id}
                  className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 bg-slate-900 rounded-2xl overflow-hidden mb-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="bg-white/95 text-slate-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md absolute top-2.5 left-2.5">
                        {car.categoryLabel}
                      </span>
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full absolute top-2.5 right-2.5 shadow">
                        {displayRate}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{car.idealFor}</p>

                    <div className="grid grid-cols-3 gap-1.5 py-2.5 my-2.5 border-y border-slate-100 text-[11px] font-bold text-slate-700 text-center">
                      <div className="bg-slate-50 py-1.5 px-1 rounded-lg flex items-center justify-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{car.seating}</span>
                      </div>
                      <div className="bg-slate-50 py-1.5 px-1 rounded-lg flex items-center justify-center gap-1">
                        <Snowflake className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>AC</span>
                      </div>
                      <div className="bg-slate-50 py-1.5 px-1 rounded-lg flex items-center justify-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{car.luggage.split(' ')[0]} Bags</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 mb-3 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-700">
                        {fleetTripMode === 'roundtrip' ? '🔄 Round Trip' : '➡️ One Way'} (+₹{car.driverBatta} Batta)
                      </span>
                      <span className="font-black text-amber-800">{displayRate}</span>
                    </div>

                    <ul className="space-y-1 mb-3 text-xs text-slate-600">
                      {car.features.slice(0, 2).map((feat) => (
                        <li key={feat} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookFleetVehicle(car.id)}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Book {car.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SOCIAL MEDIA SECTION */}
      <SocialMediaSection />
    </div>
  );
};
