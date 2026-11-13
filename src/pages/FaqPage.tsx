import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { FAQS, FAQItem } from '../data/faq';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

export const FaqPage: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);
  const [category, setCategory] = useState<'All' | FAQItem['category']>('All');

  const filtered = category === 'All' ? FAQS : FAQS.filter((f) => f.category === category);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#090d16] text-white py-14 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            24/7 Knowledge Base &amp; Customer Support
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
            Clear answers about outstation fares, Driver Batta, airport delay waiting, toll gates, and our zero-advance booking policy.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-wrap gap-2">
          {(['All', 'Booking', 'Pricing', 'Outstation', 'Airport'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
                category === c
                  ? 'bg-[#090d16] text-amber-400 border-[#090d16]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? '' : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-amber-50/40"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block mb-0.5">
                      {item.category}
                    </span>
                    <span className="font-display font-bold text-slate-900 text-base">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      open ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <div className="bg-[#090d16] text-white rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-xl font-extrabold">Still Have Questions?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our 24/7 dispatch team is ready right now with instant custom quotes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={buildWhatsAppUrl(`Hello ${BRAND.name}, I have a question regarding cab booking.`)}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs inline-flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

