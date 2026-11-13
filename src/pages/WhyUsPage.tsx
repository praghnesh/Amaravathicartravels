import React from 'react';
import { ShieldCheck, Clock, Award, CheckCircle2, Sparkles, MapPin, Phone, MessageCircle } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';
import { useBookingModal } from '../context/BookingModalContext';

export const WhyUsPage: React.FC = () => {
  const { openBooking } = useBookingModal();

  const pillars = [
    {
      title: '100% Verified Chauffeurs',
      desc: 'Every driver carries commercial yellow-board credentials, police background verification, and years of highway & ghat driving experience.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 Dispatch Across Capital Region',
      desc: 'Whether it is a 3:30 AM Gannavaram airport drop or an urgent Amaravati Secretariat trip, our dispatch desk responds within minutes.',
      icon: Clock,
    },
    {
      title: 'Zero Advance Deposit Policy',
      desc: 'Reserve your cab on WhatsApp or phone without paying upfront online deposits. Pay conveniently by UPI, Cash, or Card after your ride.',
      icon: CheckCircle2,
    },
    {
      title: 'Transparent Odometer Billing',
      desc: 'Start and end odometer readings are shared transparently with the passenger. Zero hidden night add-ons or surprise surges.',
      icon: Award,
    },
    {
      title: 'Sanitized, Maintained AC Vehicles',
      desc: 'Clean seat covers, odor-free cabins, chilled AC, first-aid kits, and routine preventive servicing before every outstation journey.',
      icon: Sparkles,
    },
    {
      title: 'Multi-Hub Local Presence',
      desc: 'Active dispatch hubs across Amaravati, Vijayawada, Guntur, Mangalagiri & Tenali ensure doorstep pickup within 15 minutes.',
      icon: MapPin,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            About {BRAND.name} • Since {BRAND.foundedYear}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold max-w-3xl">
            12+ Years of Safe, Punctual Journeys Across Andhra Pradesh
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Founded with a commitment to honest pricing and traditional Andhra hospitality, {BRAND.name} connects Amaravati, Vijayawada, Guntur, and South India with reliable chauffeur-driven travel.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: BRAND.yearsExperience, label: 'Years Experience' },
            { value: BRAND.happyTravelers, label: 'Happy Passengers' },
            { value: BRAND.verifiedCars, label: 'Verified AC Cars' },
            { value: BRAND.rating, label: 'Customer Rating' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-3xl p-6 border border-slate-200 text-center shadow-sm">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-600">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Our 6 Unbreakable Pillars of Trust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#090d16] text-white rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
              Planning a Family Pilgrimage or Corporate Trip?
            </h3>
            <p className="text-sm text-slate-300">
              Speak directly with our dispatch team for tailored multi-day quotes, wedding fleet packages, or corporate monthly contracts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openBooking({ mode: 'outstation' })}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm cursor-pointer"
            >
              Book Online Now
            </button>
            <a
              href={buildWhatsAppUrl(`Hello ${BRAND.name}, I would like to enquire about corporate/family travel.`)}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-sm inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" /> {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

