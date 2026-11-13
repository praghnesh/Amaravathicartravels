import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ShieldCheck,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';
import { useBookingModal } from '../context/BookingModalContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBookingModal();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
      isActive
        ? 'text-amber-400 bg-white/10'
        : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="bg-[#060911] border-b border-white/10 text-xs text-slate-300 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {BRAND.hubTagline}
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Advance Deposit • 24/7 Chauffeur Dispatch
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={buildWhatsAppUrl('Hello Amaravathi Car Travels! I would like to enquire about a cab booking.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Instant WhatsApp Desk
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              24/7 Helpline: {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#090d16]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-md shadow-amber-500/10 group-hover:border-amber-300 transition-colors bg-[#090d16] shrink-0">
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold tracking-wide text-sm sm:text-lg text-white leading-tight group-hover:text-amber-300 transition-colors whitespace-nowrap">
                {BRAND.shortName}{' '}
                <span className="text-amber-400">CAR TRAVELS</span>
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-slate-400 font-semibold whitespace-nowrap">
                {BRAND.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/airport-cabs" className={navLinkClass}>
              Airport Transfer
            </NavLink>
            <NavLink to="/fleet" className={navLinkClass}>
              Fleet
            </NavLink>
            <NavLink to="/tour-packages" className={navLinkClass}>
              Tour Packages
            </NavLink>
            <NavLink to="/tariff" className={navLinkClass}>
              Tariff
            </NavLink>
            <NavLink to="/why-us" className={navLinkClass}>
              Why Us
            </NavLink>
            <NavLink to="/reviews" className={navLinkClass}>
              Reviews
            </NavLink>
            <NavLink to="/faq" className={navLinkClass}>
              FAQ
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-100 text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Call Us
            </a>
            <button
              type="button"
              onClick={() => openBooking({ mode: 'outstation' })}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-sm font-extrabold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0c1220] border-t border-white/10 px-4 py-4 space-y-1.5 max-h-[80vh] overflow-y-auto">
            {[
              { to: '/', label: 'Home' },
              { to: '/airport-cabs', label: 'Airport Transfer' },
              { to: '/outstation-cabs', label: 'Outstation Cabs' },
              { to: '/hourly-rentals', label: 'Hourly Rentals' },
              { to: '/tour-packages', label: 'Tour Packages' },
              { to: '/tariff', label: 'Tariff & Pricing' },
              { to: '/why-us', label: 'Why Choose Us' },
              { to: '/reviews', label: 'Customer Reviews' },
              { to: '/faq', label: 'FAQ' },
              { to: '/contact', label: 'Contact & Hubs' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-100 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="flex-1 py-2.5 rounded-xl border border-white/15 text-center text-sm font-semibold text-white bg-white/5"
              >
                Call {BRAND.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openBooking({ mode: 'outstation' });
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm"
              >
                Book Cab Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
