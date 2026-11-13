import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';
import { FLEET } from '../data/fleet';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';
import { LocationAutocompleteInput } from './LocationAutocompleteInput';

export const QuickBookingModal: React.FC = () => {
  const { isOpen, prefill, closeBooking } = useBookingModal();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'outstation' | 'airport' | 'hourly'>('outstation');
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('roundtrip');
  const [pickup, setPickup] = useState('Amaravati / Vijayawada');
  const [destination, setDestination] = useState('Hyderabad');
  const [vehicleId, setVehicleId] = useState('swift-dzire');
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [travelTime, setTravelTime] = useState('06:00 AM');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      if (prefill.mode) setMode(prefill.mode);
      if (prefill.tripType) setTripType(prefill.tripType);
      if (prefill.vehicleId) setVehicleId(prefill.vehicleId);
      if (prefill.pickup) setPickup(prefill.pickup);
      if (prefill.destination) setDestination(prefill.destination);
    }
  }, [isOpen, prefill]);

  const eligibleVehicles =
    mode === 'airport'
      ? FLEET.filter((v) => v.airportAvailable)
      : mode === 'outstation' && tripType === 'oneway'
      ? FLEET.filter((v) => v.oneWayAvailable)
      : FLEET;

  useEffect(() => {
    const validVehicles =
      mode === 'airport'
        ? FLEET.filter((v) => v.airportAvailable)
        : mode === 'outstation' && tripType === 'oneway'
        ? FLEET.filter((v) => v.oneWayAvailable)
        : FLEET;
    if (!validVehicles.some((v) => v.id === vehicleId)) {
      setVehicleId(validVehicles[0]?.id || 'swift-dzire');
    }
  }, [mode, tripType, vehicleId]);

  if (!isOpen) return null;

  const selectedVehicle = eligibleVehicles.find((v) => v.id === vehicleId) || eligibleVehicles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*New Cab Booking Request — ${BRAND.name}*`,
      `• Service: ${mode === 'airport' ? 'Airport Transfer' : mode === 'hourly' ? 'Local Hourly Rental' : `Outstation (${tripType === 'oneway' ? 'One-Way Drop' : 'Round Trip'})`}`,
      `• Passenger: ${name || 'Guest'} (${phone || 'Not provided'})`,
      `• Pickup: ${pickup}`,
      `• Drop / Package: ${destination}`,
      `• Vehicle: ${selectedVehicle.name} (${selectedVehicle.seating})`,
      `• Date & Time: ${travelDate} at ${travelTime}`,
      prefill.notes ? `• Notes: ${prefill.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    setSubmitted(true);
    window.open(buildWhatsAppUrl(lines), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-visible my-8">
        {/* Header */}
        <div className="bg-[#090d16] text-white px-6 py-5 rounded-t-3xl flex items-center justify-between border-b border-amber-500/20">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Instant Dispatch Desk
            </div>
            <h3 className="font-display text-xl font-bold mt-0.5">
              Confirm Your Ride — {BRAND.shortName}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-7 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-xl font-bold text-slate-900">
              Booking Summary Sent to WhatsApp!
            </h4>
            <p className="text-sm text-slate-600">
              If WhatsApp did not open automatically, click below or call our 24/7 dispatch desk directly. No advance payment needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call {BRAND.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={closeBooking}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Mode Toggle */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {(
                [
                  { id: 'outstation', label: 'Outstation' },
                  { id: 'airport', label: 'Airport' },
                  { id: 'hourly', label: 'Local Hourly' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    mode === tab.id
                      ? 'bg-[#090d16] text-amber-400 shadow'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {mode === 'outstation' && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTripType('roundtrip')}
                  className={`py-2 rounded-xl text-xs font-bold border ${
                    tripType === 'roundtrip'
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`py-2 rounded-xl text-xs font-bold border ${
                    tripType === 'oneway'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  One-Way Drop (Sedans &amp; SUVs)
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Point / PIN</label>
                <LocationAutocompleteInput
                  required
                  value={pickup}
                  onChange={setPickup}
                  accentColor="amber"
                  placeholder="Area, City or PIN (e.g. 522503)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {mode === 'hourly' ? 'Package Duration' : 'Destination / PIN / Airport'}
                </label>
                {mode === 'hourly' ? (
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. 8 Hours / 80 Kms"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                  />
                ) : (
                  <LocationAutocompleteInput
                    required
                    value={destination}
                    onChange={setDestination}
                    accentColor="emerald"
                    dropdownAlign="right"
                    placeholder="Area, City or PIN (e.g. 500081)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Vehicle</label>
              <select
                value={selectedVehicle.id}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-amber-500"
              >
                {eligibleVehicles.map((v) => {
                  const detail =
                    mode === 'airport'
                      ? `Airport Drop ${formatINR(v.airportDropFare)} (VGA/RJA)`
                      : mode === 'hourly'
                      ? `4h ${formatINR(v.hourly4hr40km)} • 8h ${formatINR(v.hourly8hr80km)}`
                      : tripType === 'oneway'
                      ? `₹${v.oneWayRatePerKm}/km + ₹${v.driverBatta} Batta`
                      : `₹${v.outstationRatePerKm}/km + ₹${v.driverBatta}/day Batta`;
                  return (
                    <option key={v.id} value={v.id}>
                      {v.shortName} — {detail}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date</label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time</label>
                <select
                  value={travelTime}
                  onChange={(e) => setTravelTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-amber-500"
                >
                  {[
                    '04:00 AM',
                    '05:00 AM',
                    '06:00 AM',
                    '07:30 AM',
                    '09:00 AM',
                    '11:00 AM',
                    '01:00 PM',
                    '04:00 PM',
                    '07:00 PM',
                    '09:30 PM',
                    '11:00 PM',
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
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Confirm &amp; Book on WhatsApp
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Zero advance required • Direct driver dispatch in 15 mins
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

