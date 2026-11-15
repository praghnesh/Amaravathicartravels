import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { FLEET, Vehicle } from '../data/fleet';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';
import { LocationAutocompleteInput } from '../components/LocationAutocompleteInput';
import { OutstationRouteMap } from '../components/OutstationRouteMap';
import { HomeBookingDraft, loadBookingDraft } from '../utils/bookingTransfer';

export const OutstationCabsPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state || null) as (Partial<HomeBookingDraft> & { fromHomeBooking?: boolean }) | null;
  const saved = loadBookingDraft();
  const initial = navState || saved;

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultReturn = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  const [tripMode, setTripMode] = useState<'oneway' | 'roundtrip'>(
    initial?.tripType || (initial?.mode === 'Round Trip' ? 'roundtrip' : 'oneway')
  );
  const [phone, setPhone] = useState(initial?.phone || '');
  const [pickup, setPickup] = useState(initial?.pickup || 'Amaravati / Vijayawada');
  const [destination, setDestination] = useState(initial?.destination || 'Hyderabad');
  const [date, setDate] = useState(initial?.date || todayStr);
  const [returnDate, setReturnDate] = useState(initial?.returnDate || defaultReturn);
  const [time, setTime] = useState(initial?.time || '08:00 AM');
  const [selectedVehicleId, setSelectedVehicleId] = useState(initial?.selectedVehicleId || FLEET[0].id);

  const [routeKm, setRouteKm] = useState(275);
  const [routeDuration, setRouteDuration] = useState('5h 15m');

  useEffect(() => {
    if (navState?.fromHomeBooking) {
      if (navState.tripType) setTripMode(navState.tripType);
      if (navState.phone !== undefined) setPhone(navState.phone);
      if (navState.pickup) setPickup(navState.pickup);
      if (navState.destination) setDestination(navState.destination);
      if (navState.date) setDate(navState.date);
      if (navState.returnDate) setReturnDate(navState.returnDate);
      if (navState.time) setTime(navState.time);
      if (navState.selectedVehicleId) setSelectedVehicleId(navState.selectedVehicleId);
    }
  }, [navState]);

  const visibleFleet = tripMode === 'oneway' ? FLEET.filter((c) => c.oneWayAvailable) : FLEET;

  useEffect(() => {
    if (tripMode === 'oneway') {
      const current = FLEET.find((c) => c.id === selectedVehicleId);
      if (!current || !current.oneWayAvailable) {
        setSelectedVehicleId(FLEET[0].id);
      }
    }
  }, [tripMode, selectedVehicleId]);

  const handleDistanceChange = useCallback((km: number, dur: string) => {
    setRouteKm(km);
    setRouteDuration(dur);
  }, []);

  // Number of days for Round Trip
  const tripDays = (() => {
    if (tripMode === 'oneway') return 1;
    if (!date || !returnDate) return 1;
    const diff = Math.round(
      (new Date(returnDate).getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(1, diff + 1);
  })();

  const calcCarEstimate = (car: Vehicle) => {
    if (tripMode === 'oneway') {
      const kmFare = Math.round(routeKm * car.oneWayRatePerKm);
      return {
        billableKm: routeKm,
        kmFare,
        batta: car.driverBatta,
        total: kmFare + car.driverBatta,
      };
    }
    const minTotalKm = tripDays * car.minKmPerDay;
    const roundKm = routeKm * 2;
    const billableKm = Math.max(roundKm, minTotalKm);
    const kmFare = billableKm * car.outstationRatePerKm;
    const batta = tripDays * car.driverBatta;
    return {
      billableKm,
      kmFare,
      batta,
      total: kmFare + batta,
    };
  };

  const sendWhatsAppBooking = (car: Vehicle) => {
    const est = calcCarEstimate(car);
    const activeRate = tripMode === 'oneway' ? car.oneWayRatePerKm : car.outstationRatePerKm;
    const msg = [
      `*OUTSTATION CAB RESERVATION — ${BRAND.name}*`,
      `• Trip Type: ${tripMode === 'oneway' ? 'One-Way Drop' : `Round Trip (${tripDays} Day${tripDays > 1 ? 's' : ''})`}`,
      `• Contact Phone: ${phone || 'Not provided'}`,
      `• Pickup: ${pickup}`,
      `• Destination: ${destination}`,
      `• Est. Distance: ~${routeKm} Kms (One-Way) / ${est.billableKm} Kms Billable`,
      `• Vehicle: ${car.name} (${car.seating}) — ₹${activeRate}/km`,
      `• Date & Time: ${date} at ${time}`,
      tripMode === 'roundtrip' ? `• Return Date: ${returnDate}` : '',
      `• Driver Batta: ${formatINR(est.batta)}`,
      `• Estimated Total Fare: ${formatINR(est.total)} (Tolls/Parking as per actuals)`,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#090d16] text-white py-10 sm:py-12 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL OUTSTATION &amp; ONE-WAY DROPPING DESK</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/airport-cabs"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 inline-flex items-center gap-1.5"
              >
                <span>Airport Cabs</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                to="/tour-packages"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 inline-flex items-center gap-1.5"
              >
                <span>Tour Packages</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            Outstation Cabs &amp;{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
              One-Way Drops
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Reliable highway travel from Amaravati, Vijayawada &amp; Guntur to Hyderabad, Tirupati, Vizag, Srisailam, Bangalore &amp; Chennai with verified drivers.
          </p>
        </div>
      </section>

      {/* Main Outstation Workspace: Row 1 = Form + Live Map (Mobile: Form -> Map), Row 2 = Fleet Cars */}
      <section className="py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* 1. Booking Form (Left) + Interactive GPS Route Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* FIRST: Outstation Booking Form */}
            <div className="lg:col-span-7 min-w-0 relative z-20 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-center space-y-5">
              {navState?.fromHomeBooking && (
                <div className="inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                  <CheckCircle2 className="w-4 h-4" />
                  Booking Details Loaded from Home
                </div>
              )}

              {/* Trip Mode Toggle */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Select Trip Mode
                </label>
                <div className="grid grid-cols-2 gap-2.5 bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setTripMode('oneway')}
                    className={`py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      tripMode === 'oneway'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    One-Way Drop (Sedans &amp; SUVs)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripMode('roundtrip')}
                    className={`py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      tripMode === 'roundtrip'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    Round Trip Journey
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-600" /> Phone Number (Driver will contact you)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 93935xxxxx)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Pickup & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" /> Pickup Area / City / PIN
                  </label>
                  <LocationAutocompleteInput
                    value={pickup}
                    onChange={setPickup}
                    accentColor="amber"
                    placeholder="Area, City or PIN (e.g. 522503)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Destination Area / City / PIN
                  </label>
                  <LocationAutocompleteInput
                    value={destination}
                    onChange={setDestination}
                    accentColor="emerald"
                    placeholder="Area, City or PIN (e.g. 500081)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Dates & Time */}
              <div
                className={`grid gap-4 ${
                  tripMode === 'roundtrip' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Departure Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {tripMode === 'roundtrip' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" /> Return Date
                    </label>
                    <input
                      type="date"
                      min={date || todayStr}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-slate-50 border border-amber-300 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Departure Time
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* NEXT: Interactive GPS Route Map (Side-by-side on desktop, 2nd on mobile) */}
            <div className="lg:col-span-5 min-w-0">
              <OutstationRouteMap
                pickup={pickup}
                destination={destination}
                tripMode={tripMode}
                onDistanceChange={handleDistanceChange}
              />
            </div>
          </div>

          {/* AFTERWARDS: Available Commercial AC Fleet Cars (3rd on mobile, full grid below Form + Map on desktop) */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                  Available Commercial AC Fleet
                </span>
                <h2 className="font-display text-2xl font-black text-slate-900">
                  Select Vehicle for Outstation Ride
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {pickup || 'Pickup'} → {destination || 'Drop'} • ~{routeKm} Kms ({routeDuration}) •{' '}
                  {tripMode === 'oneway'
                    ? 'One-Way Drop (+₹500 Driver Batta; Coaches available on Round Trip)'
                    : `${tripDays} Day Round Trip`}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Driver Batta Included • Zero Advance Deposit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleFleet.map((car) => {
                const isSelected = car.id === selectedVehicleId;
                const est = calcCarEstimate(car);
                const activeRate = tripMode === 'oneway' ? car.oneWayRatePerKm : car.outstationRatePerKm;
                return (
                  <div
                    key={car.id}
                    onClick={() => setSelectedVehicleId(car.id)}
                    className={`rounded-2xl border-2 p-4 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
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
                            ₹{activeRate}/km • {car.seating}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Incl. {formatINR(est.batta)} driver batta
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-display text-lg font-black text-amber-700">
                          {formatINR(est.total)}
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-1 ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isSelected ? 'Selected ✓' : 'Select'}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`pt-3 mt-3.5 border-t grid grid-cols-2 gap-2.5 ${
                        isSelected ? 'border-amber-200/80' : 'border-slate-100'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicleId(car.id);
                          sendWhatsAppBooking(car);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book Now</span>
                      </button>
                      <a
                        href={`tel:${BRAND.phoneRaw}`}
                        onClick={(e) => e.stopPropagation()}
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
      </section>
    </div>
  );
};
