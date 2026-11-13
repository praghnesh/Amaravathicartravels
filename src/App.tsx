import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingModalProvider } from './context/BookingModalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuickBookingModal } from './components/QuickBookingModal';
import { HomePage } from './pages/HomePage';
import { AirportCabsPage } from './pages/AirportCabsPage';
import { OutstationCabsPage } from './pages/OutstationCabsPage';
import { HourlyRentalsPage } from './pages/HourlyRentalsPage';
import { TourPackagesPage } from './pages/TourPackagesPage';
import { FleetPage } from './pages/FleetPage';
import { TariffPage } from './pages/TariffPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

export function App() {
  const routerBasename =
    import.meta.env.BASE_URL && import.meta.env.BASE_URL !== './'
      ? import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'
      : undefined;

  return (
    <BookingModalProvider>
      <BrowserRouter basename={routerBasename}>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/airport-cabs" element={<AirportCabsPage />} />
              <Route path="/outstation-cabs" element={<OutstationCabsPage />} />
              <Route path="/hourly-rentals" element={<HourlyRentalsPage />} />
              <Route path="/tour-packages" element={<TourPackagesPage />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/tariff" element={<TariffPage />} />
              <Route path="/why-us" element={<WhyUsPage />} />
              <Route path="/about" element={<WhyUsPage />} />
              <Route path="/about-us" element={<WhyUsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
          <QuickBookingModal />
        </div>
      </BrowserRouter>
    </BookingModalProvider>
  );
}

export default App;
