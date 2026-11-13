import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  User,
} from 'lucide-react';
import { LocationAutocompleteInput } from './LocationAutocompleteInput';
import { HomeServiceMode, loadBookingDraft, saveBookingDraft } from '../utils/bookingTransfer';

const HOURLY_OPTIONS: { id: '4h' | '6h' | '8h' | '10h' | '12h'; label: string }[] = [
  { id: '4h', label: '4 Hrs / 40 Km' },
  { id: '6h', label: '6 Hrs / 60 Km' },
  { id: '8h', label: '8 Hrs / 80 Km' },
  { id: '10h', label: '10 Hrs / 100 Km' },
  { id: '12h', label: '12 Hrs / 120 Km' },
];

const ROUTE_MAP: Record<HomeServiceMode, string> = {
  'One Way': '/outstation-cabs',
  'Round Trip': '/outstation-cabs',
  'Local Rental': '/hourly-rentals',
  'Airport Transfer': '/airport-cabs',
};

export const InstantBookingWidget: React.FC = () => {
  const navigate = useNavigate();
  const initialDraft = loadBookingDraft();
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultReturn = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  const [mode, setMode] = useState<HomeServiceMode>(initialDraft?.mode || 'One Way');
  const [transferType, setTransferType] = useState<'drop' | 'pickup'>(
    initialDraft?.transferType || 'drop'
  );
  const [selectedAirport, setSelectedAirport] = useState(
    initialDraft?.selectedAirport || 'Vijayawada Airport (Gannavaram - VGA)'
  );
  const [localHours, setLocalHours] = useState<'4h' | '6h' | '8h' | '10h' | '12h'>(
    initialDraft?.localHours || '8h'
  );
  const [localLabel, setLocalLabel] = useState(initialDraft?.localLabel || '8 Hrs / 80 Km');

  const [name, setName] = useState(initialDraft?.name || '');
  const [phone, setPhone] = useState(initialDraft?.phone || '');
  const [pickup, setPickup] = useState(initialDraft?.pickup || 'Amaravati / Vijayawada');
  const [drop, setDrop] = useState(initialDraft?.destination || 'Hyderabad');
  const [date, setDate] = useState(initialDraft?.date || todayStr);
  const [returnDate, setReturnDate] = useState(initialDraft?.returnDate || defaultReturn);
  const [time, setTime] = useState(initialDraft?.time || '08:00 AM');

  const handleModeSwitch = (nextMode: HomeServiceMode) => {
    setMode(nextMode);
    if (nextMode === 'Local Rental') {
      setDrop(`Local Package (${localLabel})`);
    } else if (nextMode === 'Airport Transfer') {
      if (transferType === 'drop') {
        if (pickup.includes('Airport')) setPickup('Amaravati / Vijayawada');
        setDrop(selectedAirport);
      } else {
        setPickup(selectedAirport);
        if (drop.includes('Airport') || !drop) setDrop('Amaravati / Vijayawada');
      }
    } else if (drop.includes('Local Package') || drop.includes('Airport')) {
      setDrop('Hyderabad');
    }
  };

  const handleAirportDirection = (dir: 'drop' | 'pickup') => {
    setTransferType(dir);
    if (dir === 'drop') {
      if (pickup.includes('Airport')) setPickup('Amaravati / Vijayawada');
      setDrop(selectedAirport);
    } else {
      setPickup(selectedAirport);
      if (drop.includes('Airport') || !drop) setDrop('Amaravati / Vijayawada');
    }
  };

  const handleSwap = () => {
    if (mode === 'Airport Transfer') {
      handleAirportDirection(transferType === 'drop' ? 'pickup' : 'drop');
    } else {
      setPickup(drop);
      setDrop(pickup);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tripType = mode === 'One Way' ? 'oneway' : 'roundtrip';

    const draft = {
      mode,
      tripType: tripType as 'oneway' | 'roundtrip',
      transferType,
      selectedAirport,
      localHours,
      localLabel,
      name: name.trim(),
      phone: phone.trim(),
      pickup: pickup.trim() || 'Amaravati / Vijayawada',
      destination: drop.trim() || (mode === 'Local Rental' ? localLabel : 'Hyderabad'),
      date,
      returnDate: mode === 'Round Trip' ? returnDate : '',
      time,
    };

    saveBookingDraft(draft);
    const targetRoute = ROUTE_MAP[mode] || '/outstation-cabs';
    navigate(targetRoute, { state: { ...draft, fromHomeBooking: true } });
  };

  return (
    <div className="bg-white/98 backdrop-blur-xl p-5 sm:p-7 rounded-3xl shadow-2xl border border-amber-500/25 text-slate-900">
      <div className="mb-4">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Book Your Ride
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Direct module booking &amp; verified driver dispatch
        </p>
      </div>

      {/* 4 Service Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl mb-3.5">
        {(
          [
            { id: 'One Way', label: 'One Way' },
            { id: 'Round Trip', label: 'Round Trip' },
            { id: 'Local Rental', label: 'Hourly' },
            { id: 'Airport Transfer', label: 'Airport' },
          ] as { id: HomeServiceMode; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleModeSwitch(tab.id)}
            className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
              mode === tab.id
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Local Hourly Duration Chips */}
      {mode === 'Local Rental' && (
        <div className="mb-3.5 p-3 bg-amber-50/90 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Duration (4 to 12 Hrs)
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
              {localLabel}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {HOURLY_OPTIONS.map((opt) => {
              const active = localHours === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setLocalHours(opt.id);
                    setLocalLabel(opt.label);
                    setDrop(`Local Package (${opt.label})`);
                  }}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border text-xs font-black ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/70 border-slate-200'
                  }`}
                >
                  {opt.id.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Airport Direction Toggle */}
      {mode === 'Airport Transfer' && (
        <div className="mb-3.5 p-3 bg-amber-50/90 rounded-2xl border border-amber-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-amber-600" />
              Airport Trip Type
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
              {transferType === 'drop' ? 'Going to Airport' : 'Leaving Airport'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-xl border border-amber-100">
            <button
              type="button"
              onClick={() => handleAirportDirection('drop')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                transferType === 'drop'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 hover:bg-amber-50'
              }`}
            >
              ✈️ To Airport (Drop)
            </button>
            <button
              type="button"
              onClick={() => handleAirportDirection('pickup')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                transferType === 'pickup'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 hover:bg-amber-50'
              }`}
            >
              🛬 From Airport (Pickup)
            </button>
          </div>
          <select
            value={selectedAirport}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedAirport(val);
              if (transferType === 'drop') setDrop(val);
              else setPickup(val);
            }}
            className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
          >
            <option>Vijayawada Airport (Gannavaram - VGA)</option>
            <option>Hyderabad Airport (Shamshabad - RGIA)</option>
            <option>Rajahmundry Airport (RJA)</option>
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
              <User className="w-3.5 h-3.5 text-amber-600" /> Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs sm:text-sm font-medium"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
              <Phone className="w-3.5 h-3.5 text-amber-600" /> Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 98480xxxxx"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs sm:text-sm font-medium"
            />
          </div>
        </div>

        {/* Pickup & Drop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {mode === 'Airport Transfer' && transferType === 'pickup'
                  ? 'Pickup Airport'
                  : 'Pickup Area / PIN'}
              </label>
              <button
                type="button"
                onClick={handleSwap}
                className="text-[10px] text-amber-700 hover:text-amber-800 font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <ArrowLeftRight className="w-3 h-3" /> Swap
              </button>
            </div>
            <LocationAutocompleteInput
              required
              value={pickup}
              onChange={setPickup}
              accentColor="amber"
              placeholder="Area, City or PIN (e.g. 522503)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs sm:text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {mode === 'Local Rental'
                ? 'Local Package'
                : mode === 'Airport Transfer' && transferType === 'drop'
                ? 'Destination Airport'
                : 'Drop Area / PIN'}
            </label>
            {mode === 'Local Rental' ? (
              <input
                type="text"
                required
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Local Package"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs sm:text-sm font-medium"
              />
            ) : (
              <LocationAutocompleteInput
                required
                value={drop}
                onChange={setDrop}
                accentColor="emerald"
                dropdownAlign="right"
                placeholder="Area, City or PIN (e.g. 500081)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs sm:text-sm font-medium"
              />
            )}
          </div>
        </div>

        {/* Date, Return Date (Round Trip), Time */}
        <div
          className={`grid gap-2.5 ${
            mode === 'Round Trip' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'
          }`}
        >
          <div>
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" /> Travel Date
            </label>
            <input
              type="date"
              required
              min={todayStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs font-medium"
            />
          </div>

          {mode === 'Round Trip' && (
            <div>
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Return Date
              </label>
              <input
                type="date"
                required
                min={date || todayStr}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs font-medium"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Pickup Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none text-xs font-medium"
            >
              {[
                '05:00 AM',
                '06:30 AM',
                '08:00 AM',
                '10:00 AM',
                '01:00 PM',
                '04:00 PM',
                '07:00 PM',
                '10:00 PM',
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer group"
        >
          <span>
            {mode === 'Airport Transfer'
              ? 'View Airport Cabs & Book'
              : mode === 'Local Rental'
              ? 'View Hourly Packages & Book'
              : 'Check Cabs & Fare on Page'}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Instant route quotes &amp; verified driver dispatch</span>
        </div>
      </form>
    </div>
  );
};
