import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

export const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col gap-3">
      <a
        href={`tel:${BRAND.phoneRaw}`}
        aria-label="Call 24/7 Helpline"
        className="w-12 h-12 sm:w-auto sm:px-4 sm:py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-amber-400/40 shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
      >
        <Phone className="w-5 h-5 text-amber-400" />
        <span className="hidden sm:inline text-sm font-bold">Call 24/7</span>
      </a>
      <a
        href={buildWhatsAppUrl('Hello Amaravathi Car Travels! I want to book a cab.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Book on WhatsApp"
        className="w-12 h-12 sm:w-auto sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-bold">WhatsApp Book</span>
      </a>
    </div>
  );
};

