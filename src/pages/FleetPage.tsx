import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Car, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { FleetGrid } from '../components/FleetGrid';
import { FLEET } from '../data/fleet';
import { BRAND, buildWhatsAppUrl } from '../config/brand';
import { HomeBookingDraft, loadBookingDraft } from '../utils/bookingTransfer';
import { LocationAutocompleteInput } from '../components/LocationAutocompleteInput';

export const FleetPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state || null) as (Partial<HomeBookingDraft> & { fromHomeBooking?: boolean }) | null;
  const saved = loadBookingDraft();
  const initialVehicleId = navState?.selectedVehicleId || saved?.selectedVehicleId || '';

  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicleId);
  const [tripMode, setTripMode] = useState<'roundtrip' | 'oneway'>(
    navState?.tripType || saved?.tripType || 'roundtrip'
  );
  const [name, setName] = useState(navState?.name || saved?.name || '');
  const [phone, setPhone] = useState(navState?.phone || saved?.phone || '');
  const [pickup, setPickup] = useState(navState?.pickup || saved?.pickup || 'Amaravati / Vijayawada');
  const [destination, setDestination] = useState(navState?.destination || saved?.destination || 'Hyderabad');

  useEffect(() => {
    if (navState?.selectedVehicleId) {
      setSelectedVehicleId(navState.selectedVehicleId);
    }
    if (navState?.tripType) {
      setTripMode(navState.tripType);
    }
  }, [navState]);

  const activeCar = FLEET.find((c) => c.id === selectedVehicleId);

  useEffect(() => {
    if (activeCar && !activeCar.oneWayAvailable && tripMode === 'oneway') {
      setTripMode('roundtrip');
    }
  }, [activeCar, tripMode]);

  const handleConfirmVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCar) return;
    const isOneWay = tripMode === 'oneway' && activeCar.oneWayAvailable;
    const activeRate = isOneWay ? activeCar.oneWayRatePerKm : activeCar.outstationRatePerKm;
    const msg = [
      `*Vehicle Booking Request — ${BRAND.name}*`,
      `• Selected Vehicle: ${activeCar.name} (${activeCar.seating})`,
      `• Trip Mode: ${isOneWay ? 'One-Way Drop' : 'Round Trip'}`,
      `• Rate: ₹${activeRate}/km (+ ₹${activeCar.driverBatta} Driver Batta)`,
      `• Passenger: ${name || 'Guest'} (${phone || 'Not provided'})`,
      `• Pickup: ${pickup}`,
      `• Destination: ${destination}`,
    ].join('\n');
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Car className="w-3.5 h-3.5" />
            Official Verified Fleet Showroom
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Our Sanitized Tourist Permit Fleet
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Choose from fuel-efficient 4-seater sedans, 6/7-seater Ertiga &amp; Innova Crystas, 17-seater Force Tempo Travellers &amp; VIP Urbanias, and 26-seater AC Mini Buses.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Highlighted Selected Vehicle Booking Panel when arriving from Home Fleet */}
        {activeCar && (
          <form
            onSubmit={handleConfirmVehicle}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={activeCar.image}
                  alt={activeCar.name}
                  className="w-24 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
                />
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Selected Vehicle Loaded
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                    Book {activeCar.name} ({activeCar.seating})
                  </h2>
                </div>
              </div>
              <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTripMode('roundtrip')}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    tripMode === 'roundtrip' || !activeCar.oneWayAvailable
                      ? 'bg-[#090d16] text-amber-400'
                      : 'text-slate-600'
                  }`}
                >
                  Round Trip (₹{activeCar.outstationRatePerKm}/km)
                </button>
                {activeCar.oneWayAvailable ? (
                  <button
                    type="button"
                    onClick={() => setTripMode('oneway')}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                      tripMode === 'oneway' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    One-Way (₹{activeCar.oneWayRatePerKm}/km)
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg text-slate-400">
                    Round Trip Only
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Pickup Location / PIN</label>
                <LocationAutocompleteInput
                  required
                  value={pickup}
                  onChange={setPickup}
                  accentColor="amber"
                  placeholder="Area, City or PIN (e.g. 522503)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Destination / PIN</label>
                <LocationAutocompleteInput
                  required
                  value={destination}
                  onChange={setDestination}
                  accentColor="emerald"
                  placeholder="Area, City or PIN (e.g. 500081)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="px-5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-bold text-sm inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-600" /> Call {BRAND.phoneDisplay}
              </a>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Confirm {activeCar.name} on WhatsApp
              </button>
            </div>
          </form>
        )}

        <FleetGrid showFilters={true} />
      </div>
    </div>
  );
};
