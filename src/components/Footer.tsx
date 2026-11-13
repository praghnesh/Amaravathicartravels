import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070b14] text-slate-300 border-t border-amber-500/20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className="w-12 h-12 rounded-full border-2 border-amber-400/60 object-cover"
              />
              <div>
                <div className="font-display font-extrabold text-lg text-white leading-tight">
                  {BRAND.shortName} <span className="text-amber-400">CAR TRAVELS</span>
                </div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400">
                  {BRAND.tagline}
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Serving Amaravati, Vijayawada, Guntur &amp; across South India with verified chauffeurs, sanitized AC vehicles, transparent pricing, and 24/7 dispatch.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Zero Advance Deposit • Pay After Ride
            </div>
          </div>

          {/* Services & Modules */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4">
              Cab Services &amp; Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/airport-cabs" className="hover:text-amber-400 transition-colors">
                  Gannavaram (VGA) Airport Transfers
                </Link>
              </li>
              <li>
                <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">
                  One-Way &amp; Outstation Cabs
                </Link>
              </li>
              <li>
                <Link to="/hourly-rentals" className="hover:text-amber-400 transition-colors">
                  Local Hourly Rentals (4h / 8h / 12h)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">
                  Tirupati &amp; Srisailam Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">
                  Verified Fleet &amp; Models
                </Link>
              </li>
              <li>
                <Link to="/tariff" className="hover:text-amber-400 transition-colors">
                  Official Tariff &amp; Per-Km Rates
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Us &amp; Service Standards
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Outstation Cab Routes */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4">
              Popular Outstation Routes
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">
                  Amaravati / Vijayawada to Hyderabad Cab
                </Link>
              </li>
              <li>
                <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">
                  Guntur to Gannavaram Airport Taxi
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">
                  Vijayawada &amp; Guntur to Tirupati Package
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">
                  Amaravati to Srisailam Ghat Cab
                </Link>
              </li>
              <li>
                <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">
                  Vijayawada to Visakhapatnam (Vizag) Taxi
                </Link>
              </li>
              <li>
                <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">
                  Guntur to Chennai &amp; Bangalore Drop
                </Link>
              </li>
              <li>
                <Link to="/hourly-rentals" className="hover:text-amber-400 transition-colors">
                  Amaravati Secretariat &amp; Wedding Cabs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Head Office */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4">
              24/7 Booking Desk &amp; Hubs
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-slate-400">{BRAND.headOffice.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BRAND.phoneRaw}`} className="text-white font-semibold hover:text-amber-300">
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="text-slate-300 hover:text-amber-300 break-all">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-emerald-400 font-medium">{BRAND.headOffice.hours}</span>
              </li>
            </ul>
            <a
              href={buildWhatsAppUrl('Hello Amaravathi Car Travels, I would like to get a fare quote.')}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Service Hubs Tag Strip */}
        <div className="py-5 border-b border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Service Coverage:</span>
          {BRAND.serviceCities.map((city) => (
            <span
              key={city}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
            >
              {city}
            </span>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p>
            Crafted for safe, punctual journeys across Amaravati, Vijayawada, Guntur &amp; South India.
          </p>
        </div>
      </div>
    </footer>
  );
};

