export type HomeServiceMode = 'One Way' | 'Round Trip' | 'Local Rental' | 'Airport Transfer';

export interface HomeBookingDraft {
  mode: HomeServiceMode;
  tripType: 'oneway' | 'roundtrip';
  transferType: 'drop' | 'pickup';
  selectedAirport: string;
  localHours: '4h' | '6h' | '8h' | '10h' | '12h';
  localLabel: string;
  name: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  returnDate: string;
  time: string;
  selectedTour?: string;
  selectedVehicleId?: string;
  createdAt?: number;
}

const STORAGE_KEY = 'amaravathi_booking_draft';

export function saveBookingDraft(draft: Partial<HomeBookingDraft>) {
  try {
    const existing = loadBookingDraft() || {};
    const merged = { ...existing, ...draft, createdAt: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // ignore storage errors
  }
}

export function loadBookingDraft(): Partial<HomeBookingDraft> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<HomeBookingDraft>;
  } catch {
    return null;
  }
}

