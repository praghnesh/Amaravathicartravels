import React, { useState } from 'react';
import { Star, Users, MessageCircle } from 'lucide-react';
import { REVIEWS, Review } from '../data/reviews';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

export const ReviewsPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | Review['tag']>('All');

  const items = filter === 'All' ? REVIEWS : REVIEWS.filter((r) => r.tag === filter);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5 fill-current" />
              Rated {BRAND.rating} by {BRAND.happyTravelers} Travelers
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
              Real Stories from Our Passengers
            </h1>
            <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
              Read verified reviews from families, pilgrims, NRI airport arrivals, and corporate executives who traveled with {BRAND.name}.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(`Hello ${BRAND.name}, I'd like to share feedback or book a ride!`)}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> Book Your Trip
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-wrap gap-2">
          {(['All', 'Airport Transfer', 'Pilgrimage', 'Outstation', 'Corporate'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
                filter === t
                  ? 'bg-[#090d16] text-amber-400 border-[#090d16]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {rev.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">“{rev.text}”</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    {rev.name}
                  </span>
                  <span className="text-slate-400">{rev.date}</span>
                </div>
                <div className="text-slate-600 font-medium">{rev.route}</div>
                <div className="text-emerald-700 font-semibold">
                  {rev.vehicle} • {rev.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

