import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Plane,
  ArrowLeftRight,
  Clock,
  ShieldCheck,
  Briefcase,
  MessageCircle,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { FLEET } from '../data/fleet';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';
import { HomeBookingDraft, loadBookingDraft } from '../utils/bookingTransfer';
import { LocationAutocompleteInput } from '../components/LocationAutocompleteInput';

export const AirportCabsPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state || null) as (Partial<HomeBookingDraft> & { fromHomeBooking?: boolean }) | null;
  const saved = loadBookingDraft();
  const initial = navState || saved;

  const [direction, setDirection] = useState<'drop' | 'pickup'>(initial?.transferType || 'drop');
  const [cityPoint, setCityPoint] = useState(
    initial?.transferType === 'pickup'
      ? initial?.destination || 'Amaravati Secretariat / Mangalagiri'
      : initial?.pickup || 'Amaravati Secretariat / Mangalagiri'
  );
  const [airport, setAirport] = useState(
    initial?.selectedAirport || 'Vijayawada Airport (Gannavaram - VGA)'
  );
  const [phone, setPhone] = useState(initial?.phone || '');
  const [flightNo, setFlightNo] = useState('');
  const [date, setDate] = useState(initial?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initial?.time || '05:30 AM');
  const [selectedCarId, setSelectedCarId] = useState('swift-dzire');

  useEffect(() => {
    if (navState?.fromHomeBooking) {
      if (navState.transferType) setDirection(navState.transferType);
      if (navState.selectedAirport) setAirport(navState.selectedAirport);
      if (navState.phone !== undefined) setPhone(navState.phone);
      if (navState.date) setDate(navState.date);
      if (navState.time) setTime(navState.time);
      const cityVal =
        navState.transferType === 'pickup' ? navState.destination : navState.pickup;
      if (cityVal && !cityVal.includes('Airport')) setCityPoint(cityVal);
    }
  }, [navState]);

  const airportFleet = FLEET.filter((v) => v.airportAvailable);
  const selectedCar = airportFleet.find((v) => v.id === selectedCarId) || airportFleet[0];
  const isRGIA = airport.includes('Hyderabad');
  const getCarAirportFare = (car: (typeof FLEET)[number]) =>
    isRGIA
      ? car.airportDropFare * 2 + (car.category === 'sedan' ? 3900 : 4500)
      : car.airportDropFare;
  const estimatedFare = getCarAirportFare(selectedCar);

  const buildAirportWhatsAppMsg = (car: (typeof FLEET)[number]) =>
    [
      `*Airport Transfer Booking — ${BRAND.name}*`,
      `• Type: ${direction === 'drop' ? 'Drop to Airport' : 'Pickup from Airport'}`,
      `• Contact Phone: ${phone || 'Not provided'}`,
      `• Airport: ${airport}`,
      `• City Point: ${cityPoint}`,
      flightNo ? `• Flight Number: ${flightNo}` : '',
      `• Date & Time: ${date} at ${time}`,
      `• Vehicle: ${car.name} (${car.seating})`,
      `• Est. All-Inclusive Fare: ${formatINR(getCarAirportFare(car))} (Tolls/Parking as per actuals)`,
    ]
      .filter(Boolean)
      .join('\n');

  const whatsappText = buildAirportWhatsAppMsg(selectedCar);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Plane className="w-3.5 h-3.5" />
            24/7 Airport Taxi Desk • Gannavaram (VGA) &amp; Hyderabad (RGIA)
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            On-Time Airport Pickup &amp; Drop Services
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Guaranteed doorstep airport transfers across Amaravati, Vijayawada, Guntur &amp; Mangalagiri with live flight tracking, 60-min free waiting, and zero surge pricing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configurator */}
        <div className="lg:col-span-8 min-w-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            {navState?.fromHomeBooking && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Airport Transfer Details Loaded from Home
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                1. Confirm Transfer Type &amp; Passenger Info
              </h2>
              <button
                type="button"
                onClick={() => setDirection((d) => (d === 'drop' ? 'pickup' : 'drop'))}
                className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Swap Direction
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDirection('drop')}
                className={`py-3 rounded-2xl border text-sm font-bold cursor-pointer transition-all ${
                  direction === 'drop'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                ✈️ Drop to Airport
              </button>
              <button
                type="button"
                onClick={() => setDirection('pickup')}
                className={`py-3 rounded-2xl border text-sm font-bold cursor-pointer transition-all ${
                  direction === 'pickup'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                🛬 Pickup from Airport
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number (Driver will contact you)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 93935xxxxx)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Designated Airport
                </label>
                <select
                  value={airport}
                  onChange={(e) => setAirport(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                >
                  <option>Vijayawada Airport (Gannavaram - VGA)</option>
                  <option>Hyderabad Airport (Shamshabad - RGIA)</option>
                  <option>Rajahmundry Airport (RJA)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {direction === 'drop' ? 'Pickup Area / PIN Code' : 'Drop Area / PIN Code'}
                </label>
                <LocationAutocompleteInput
                  value={cityPoint}
                  onChange={setCityPoint}
                  accentColor="amber"
                  placeholder="Area, Locality or PIN (e.g. 522503)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Flight Number (Optional for tracking)
                </label>
                <input
                  type="text"
                  value={flightNo}
                  onChange={(e) => setFlightNo(e.target.value)}
                  placeholder="e.g., IndiGo 6E-7142"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                2. Select Vehicle Category
              </h2>
              <span className="text-xs font-bold text-slate-500">
                {airport.split('(')[0].trim()} • Urbania &amp; Mini Bus excluded from airport transfers
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {airportFleet.map((car) => {
                const active = car.id === selectedCar.id;
                const fare = getCarAirportFare(car);
                return (
                  <div
                    key={car.id}
                    onClick={() => setSelectedCarId(car.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-20 h-16 rounded-xl object-cover shrink-0 bg-slate-900 border border-slate-100"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-slate-900 leading-snug">
                            {car.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {car.seating} • {car.luggage}
                          </div>
                          <div className="font-display text-base font-extrabold text-emerald-700 mt-1">
                            {formatINR(fare)}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                          active
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {active ? 'Selected ✓' : 'Select'}
                      </span>
                    </div>

                    <div
                      className={`pt-3 mt-3.5 border-t grid grid-cols-2 gap-2.5 ${
                        active ? 'border-amber-200/80' : 'border-slate-100'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCarId(car.id);
                          window.open(buildWhatsAppUrl(buildAirportWhatsAppMsg(car)), '_blank', 'noopener,noreferrer');
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

        {/* Sticky Summary */}
        <div className="lg:col-span-4 min-w-0 space-y-5">
          <div className="bg-[#090d16] text-white rounded-3xl p-6 border border-amber-500/25 shadow-xl sticky top-24 space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Airport Transfer Summary
              </div>
              <h3 className="font-display text-2xl font-extrabold mt-1">
                {formatINR(estimatedFare)}
              </h3>
              <p className="text-xs text-slate-400">Estimated All-Inclusive Base Fare</p>
            </div>

            <div className="space-y-2.5 text-sm border-y border-white/10 py-4">
              {phone && (
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400">Contact:</span>
                  <span className="font-bold text-right text-amber-400">{phone}</span>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Direction:</span>
                <span className="font-bold text-right">
                  {direction === 'drop' ? 'Drop to Airport' : 'Airport Pickup'}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Airport:</span>
                <span className="font-semibold text-right">{airport.split('(')[0]}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">City Hub:</span>
                <span className="font-semibold text-right">{cityPoint}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Date &amp; Time:</span>
                <span className="font-semibold text-right">{date} • {time}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-bold text-amber-400 text-right">{selectedCar.name}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>60 Mins Free Waiting for flight delays</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed 15-min early chauffeur arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Doorstep luggage loading assistance</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={buildWhatsAppUrl(whatsappText)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Confirm on WhatsApp
              </a>
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call Dispatch: {BRAND.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
