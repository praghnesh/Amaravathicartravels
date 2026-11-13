import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [journeyType, setJourneyType] = useState('Outstation Round Trip (Tirupati, Srisailam, etc.)');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `*Website Enquiry — ${BRAND.name}*`,
      `• Name: ${name}`,
      `• Phone: ${phone}`,
      `• Journey Type: ${journeyType}`,
      `• Route & Dates: ${details}`,
    ].join('\n');
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Head Office &amp; Regional Dispatch Hubs
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            We Are Here to Assist Your Journey 24/7
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Reach our Amaravati, Vijayawada &amp; Guntur dispatch team anytime for instant cab availability, airport pickups, and custom tour quotes.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Office Info & Hubs */}
        <div className="lg:col-span-5 min-w-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              {BRAND.headOffice.title}
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Address</div>
                  <p className="text-slate-600 mt-0.5">{BRAND.headOffice.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">24/7 Direct Helplines</div>
                  <div className="space-y-0.5 mt-0.5">
                    <a
                      href={`tel:${BRAND.phoneRaw}`}
                      className="block font-bold text-amber-700 hover:underline"
                    >
                      {BRAND.phoneDisplay}
                    </a>
                    <a
                      href={`tel:${BRAND.secondaryPhoneRaw}`}
                      className="block font-semibold text-slate-700 hover:underline"
                    >
                      {BRAND.secondaryPhoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Email Bookings</div>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-slate-600 hover:text-amber-700 break-all"
                  >
                    {BRAND.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Working Hours</div>
                  <p className="text-emerald-700 font-semibold">{BRAND.headOffice.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Hubs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-display text-lg font-extrabold text-slate-900">
              Service Depot Coverage
            </h3>
            <div className="space-y-3">
              {BRAND.branchOffices.map((hub) => (
                <div
                  key={hub.city}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900">{hub.city}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{hub.area}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold whitespace-nowrap">
                    {hub.dispatchTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Enquiry Form */}
        <div className="lg:col-span-7 min-w-0">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-1">
              Send Instant Enquiry
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Custom Route &amp; Tariff Request
            </h2>
            <p className="text-sm text-slate-600 mt-1 mb-6">
              Fill in your travel details and connect immediately with our booking team on WhatsApp. We respond within 5 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 93935 XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Journey Type
                </label>
                <select
                  value={journeyType}
                  onChange={(e) => setJourneyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-amber-500"
                >
                  <option>Outstation Round Trip (Tirupati, Srisailam, etc.)</option>
                  <option>One-Way Drop (Hyderabad / Vizag / Chennai)</option>
                  <option>Airport Pickup / Drop (VGA / HYD)</option>
                  <option>Local Hourly Rental (City Use / Wedding)</option>
                  <option>Corporate or Event Fleet Booking</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pickup Location, Destination &amp; Dates
                </label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="E.g. Pickup from Amaravati Secretariat to Tirupati for 4 members on 15th morning in Innova Crysta..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Send Request to WhatsApp
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
