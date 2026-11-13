import React from 'react';
import { MessageCircle, Youtube, Facebook, Instagram, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';
import { MEDIA } from '../assets/media';

export const SocialMediaSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white" id="social-media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#070b14] via-[#0d1222] to-[#070b14] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10 max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Connect With Our Community
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Follow {BRAND.shortName} Travels
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Stay connected across our social channels for live darshan updates, ghat road conditions, fleet walkthroughs, and exclusive one-way route deals.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10">
            {/* Instagram (7 cols) */}
            <div className="md:col-span-7 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-700/80 hover:border-pink-500/50 transition-all flex flex-col justify-between group shadow-lg min-w-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-pink-400 transition-colors">
                        Instagram
                      </h3>
                      <div className="text-xs text-pink-400 font-bold truncate">
                        {BRAND.social.instagramHandle}
                      </div>
                    </div>
                  </div>
                  <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Photos &amp; Reels
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Watch daily pilgrimage darshan updates, scenic ghat-road videos to Tirumala &amp; Srisailam, fleet inspections, and happy family travel stories.
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {[
                    { src: MEDIA.destTirupati, label: 'Tirumala' },
                    { src: MEDIA.destSrisailam, label: 'Srisailam' },
                    { src: MEDIA.destVizag, label: 'Vizag' },
                  ].map((thumb) => (
                    <div key={thumb.label} className="h-20 sm:h-24 rounded-xl overflow-hidden relative">
                      <img
                        src={thumb.src}
                        alt={thumb.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/75 px-1.5 py-0.5 rounded font-extrabold text-amber-300">
                        {thumb.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 hover:opacity-95 text-white py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-lg"
              >
                <span>Follow on Instagram ({BRAND.social.instagramHandle})</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* WhatsApp Channel (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-lg min-w-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                        WhatsApp Channel
                      </h3>
                      <div className="text-xs text-emerald-400 font-bold">VIP Travel Alerts</div>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Live Deals
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Receive instant empty-leg drops (up to 40% off), Gannavaram airport cab alerts, and priority bookings with zero advance deposit.
                </p>

                <div className="p-3.5 bg-emerald-950/40 rounded-2xl border border-emerald-500/20 space-y-2 mb-5 text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Daily One-Way empty leg route deals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct chat with 24/7 Amaravathi dispatcher</span>
                  </div>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl(`Hello ${BRAND.name}! Please add me to VIP travel deals & cab updates.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join WhatsApp Channel</span>
              </a>
            </div>

            {/* Facebook Community (6 cols) */}
            <div className="md:col-span-6 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-700/80 hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-lg min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white shadow-md shrink-0">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors">
                        Facebook Community
                      </h3>
                      <div className="text-xs text-blue-400 font-bold">Passenger Reviews</div>
                    </div>
                  </div>
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Reviews
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  Join our traveler community for seasonal temple holiday packages, verified family photo reviews, and highway recommendations across South India.
                </p>
              </div>

              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1877F2] hover:bg-blue-600 text-white py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Visit Facebook Page</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* YouTube Video Guides (6 cols) */}
            <div className="md:col-span-6 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-700/80 hover:border-red-500/50 transition-all flex flex-col justify-between group shadow-lg min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-md shrink-0">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-red-400 transition-colors">
                        YouTube Video Guides
                      </h3>
                      <div className="text-xs text-red-400 font-bold">{BRAND.social.youtubeHandle}</div>
                    </div>
                  </div>
                  <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Video Guides
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  Watch certified driver route previews, Srisailam &amp; Tirumala ghat hairpin curves, and vehicle interior walkthroughs before reserving your family cab.
                </p>
              </div>

              <a
                href={BRAND.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Watch on YouTube</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

