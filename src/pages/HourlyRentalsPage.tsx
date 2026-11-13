import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { FLEET } from '../data/fleet';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';
import { HomeBookingDraft, loadBookingDraft } from '../utils/bookingTransfer';
import { LocationAutocompleteInput } from '../components/LocationAutocompleteInput';

type DurationKey = '4h' | '6h' | '8h' | '10h' | '12h';

const PACKAGES: { id: DurationKey; title: string; subtitle: string; kms: string }[] = [
  { id: '4h', title: '4 Hours / 40 Kms', subtitle: 'Quick errands & hospital visits', kms: '40 Kms Included' },
  { id: '6h', title: '6 Hours / 60 Kms', subtitle: 'Half-day shopping & meetings', kms: '60 Kms Included' },
  { id: '8h', title: '8 Hours / 80 Kms', subtitle: 'Full-day meetings & family visits', kms: '80 Kms Included' },
  { id: '10h', title: '10 Hours / 100 Kms', subtitle: 'Extended city business & errands', kms: '100 Kms Included' },
  { id: '12h', title: '12 Hours / 120 Kms', subtitle: 'Weddings & Secretariat sightseeing', kms: '120 Kms Included' },
];

export const HourlyRentalsPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state || null) as (Partial<HomeBookingDraft> & { fromHomeBooking?: boolean }) | null;
  const saved = loadBookingDraft();
  const initial = navState || saved;

  const [duration, setDuration] = useState<DurationKey>(initial?.localHours || '8h');
  const [name, setName] = useState(initial?.name || '');
  const [phone, setPhone] = useState(initial?.phone || '');
  const [pickup, setPickup] = useState(initial?.pickup || 'Amaravati / Vijayawada');
  const [date, setDate] = useState(initial?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initial?.time || '08:00 AM');

  useEffect(() => {
    if (navState?.fromHomeBooking) {
      if (navState.localHours) setDuration(navState.localHours);
      if (navState.name !== undefined) setName(navState.name);
      if (navState.phone !== undefined) setPhone(navState.phone);
      if (navState.pickup) setPickup(navState.pickup);
      if (navState.date) setDate(navState.date);
      if (navState.time) setTime(navState.time);
    }
  }, [navState]);

  const getPrice = (car: (typeof FLEET)[number]) => {
    if (duration === '4h') return car.hourly4hr40km;
    if (duration === '6h') return Math.round((car.hourly4hr40km + car.hourly8hr80km) / 2);
    if (duration === '10h') return Math.round((car.hourly8hr80km + car.hourly12hr120km) / 2);
    if (duration === '12h') return car.hourly12hr120km;
    return car.hourly8hr80km;
  };

  const activePkg = PACKAGES.find((p) => p.id === duration)!;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            Local Hourly Cab Rentals • Amaravati, Vijayawada &amp; Guntur
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Flexible 4h to 12h City Car Packages
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Ideal for Amaravati Secretariat official meetings, weddings, doctor visits, and multi-stop city shopping. Fuel &amp; Driver Batta 100% included.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Loaded / Editable Booking Info Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-400/50 shadow-md space-y-4">
          {navState?.fromHomeBooking && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Hourly Rental Details Loaded from Home ({activePkg.title})
            </span>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Passenger Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Pickup Point / PIN</label>
              <LocationAutocompleteInput
                value={pickup}
                onChange={setPickup}
                accentColor="amber"
                placeholder="Area, Locality or PIN (e.g. 522503)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Pickup Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* 5 Duration Pickers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PACKAGES.map((pkg) => {
            const active = pkg.id === duration;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setDuration(pkg.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-[#090d16] text-white border-amber-500 shadow-xl'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-amber-400'
                }`}
              >
                <div className={`text-[10px] font-extrabold uppercase tracking-wider mb-1 ${active ? 'text-amber-400' : 'text-amber-600'}`}>
                  {active ? 'Selected' : 'Hourly Pkg'}
                </div>
                <div className="font-display text-lg font-extrabold">{pkg.title}</div>
                <p className={`text-[11px] mt-1 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                  {pkg.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Fleet Prices for Active Duration */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-slate-900">
                Instant Rates for {activePkg.title}
              </h2>
              <p className="text-sm text-slate-600">
                {activePkg.kms} • Fuel &amp; Chauffeur standby included
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Driver Batta 100% Included
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET.map((car) => {
              const price = getPrice(car);
              const msg = [
                `*Local Hourly Rental Booking — ${BRAND.name}*`,
                `• Package: ${activePkg.title}`,
                `• Vehicle: ${car.name} (${car.seating}) — ${formatINR(price)}`,
                `• Passenger: ${name || 'Guest'} (${phone || 'Not provided'})`,
                `• Pickup: ${pickup}`,
                `• Date & Time: ${date} at ${time}`,
              ].join('\n');

              return (
                <div
                  key={car.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 bg-slate-900 relative">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                          <div className="font-display text-lg font-extrabold">{car.name}</div>
                          <div className="text-xs text-slate-300">{car.seating}</div>
                        </div>
                        <div className="font-display text-2xl font-extrabold text-amber-400">
                          {formatINR(price)}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Extra Kilometer Rate:</span>
                        <span className="font-bold text-slate-900">₹{car.extraKmRate}/km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extra Hour Rate:</span>
                        <span className="font-bold text-slate-900">₹{car.extraHrRate}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chauffeur Allowance:</span>
                        <span className="font-bold text-emerald-700">Included ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <a
                      href={buildWhatsAppUrl(msg)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Book {activePkg.id.toUpperCase()} Package on WhatsApp
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
