import React, { createContext, useContext, useState } from 'react';

export interface BookingPrefill {
  mode?: 'outstation' | 'airport' | 'hourly';
  tripType?: 'oneway' | 'roundtrip';
  vehicleId?: string;
  pickup?: string;
  destination?: string;
  notes?: string;
}

interface BookingModalContextValue {
  isOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export const BookingModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openBooking = (nextPrefill: BookingPrefill = {}) => {
    setPrefill(nextPrefill);
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingModalContext.Provider value={{ isOpen, prefill, openBooking, closeBooking }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error('useBookingModal must be used inside BookingModalProvider');
  }
  return ctx;
}

