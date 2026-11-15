import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Loader2,
  CalendarCheck,
} from 'lucide-react';
import { MEDIA } from '../assets/media';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

export const PromoCarousel: React.FC = () => {
  const banners = MEDIA.banners;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = banners.length;
  const current = banners[currentIndex];

  const [activeSrc, setActiveSrc] = useState<string>(current.image);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  // Sync active source whenever slide index changes
  useEffect(() => {
    setActiveSrc(current.image);
    setIsLoaded(false);
    setHasFailed(false);
  }, [currentIndex, current.image]);

  // Preload all banners and fallback URLs on mount for instant switching
  useEffect(() => {
    banners.forEach((b) => {
      const img = new Image();
      img.src = b.image;
      const fallback = new Image();
      fallback.src = b.fallbackUrl;
    });
  }, [banners]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide effect (pauses on user hover / touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Fallback image error handler
  const handleImageError = () => {
    if (activeSrc !== current.fallbackUrl) {
      // Fallback from bundled hash to public root image
      setActiveSrc(current.fallbackUrl);
    } else {
      setHasFailed(true);
      setIsLoaded(true);
    }
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const phoneFormatted =
    current.phone === '9948924786' ? '+91 99489 24786' : BRAND.phoneDisplay;
  const rawPhone = current.phone ? `+91${current.phone}` : BRAND.phoneRaw;

  return (
    <section className="py-12 bg-gradient-to-b from-slate-100 via-amber-50/40 to-slate-100 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Special Fleet &amp; Route Specials
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Featured Service Highlights &amp; Exclusive Banners
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Explore our Luxury Sleeper Coaches, Force Urbania VIP 16-Seaters, Premium Wedding Cars &amp; Hyderabad ↔ Vijayawada One-Way corridors.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide Card */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/60 bg-slate-950 min-h-[220px] xs:min-h-[260px] sm:min-h-[380px] md:min-h-[460px] aspect-[16/10] sm:aspect-[16/9] transition-all flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Loading Shimmer / Spinner */}
            {!isLoaded && !hasFailed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-amber-400 gap-3 z-10">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                <span className="text-xs font-bold tracking-wider text-slate-300">
                  Loading banner...
                </span>
              </div>
            )}

            {/* Error Fallback Card if image completely unreachable */}
            {hasFailed ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-4">
                  <CalendarCheck className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                  {current.badge}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-white max-w-md">
                  {current.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-sm">
                  {current.subtitle}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={`tel:${rawPhone}`}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all"
                  >
                    Call {phoneFormatted}
                  </a>
                </div>
              </div>
            ) : (
              <img
                key={current.id}
                src={activeSrc}
                alt={current.title}
                loading="eager"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover sm:object-contain bg-slate-950 transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* Badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
              <span className="px-3 sm:px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-400/50 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
                ⭐ {current.badge}
              </span>
            </div>

            {/* Slide Index Counter */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20">
              <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                {currentIndex + 1} / {total}
              </span>
            </div>

            {/* Prev / Next Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/75 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all shadow-xl cursor-pointer group z-20"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/75 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all shadow-xl cursor-pointer group z-20"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Action Bar under Active Slide */}
          <div className="mt-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-display text-base sm:text-lg font-black text-slate-900 truncate">
                {current.title}
              </div>
              <div className="text-xs text-slate-500 truncate mt-0.5">
                {current.subtitle}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a
                href={`tel:${rawPhone}`}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold text-xs sm:text-sm border border-slate-700 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call {phoneFormatted}</span>
              </a>

              <a
                href={buildWhatsAppUrl(
                  `Hi Amaravathi Car Travels, I am inquiring about: ${current.title}. Please share availability and tariff details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Enquiry</span>
              </a>

              <Link
                to={current.link}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Thumbnail Dot Selectors */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            {banners.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 bg-amber-500 ring-2 ring-amber-300'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Mini Preview Strip (Clickable Thumbnails) */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-4 pt-3 border-t border-slate-200/80">
            {banners.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105 shadow-md'
                    : 'border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + b.fallbackUrl) {
                      target.src = b.fallbackUrl;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
