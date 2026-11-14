import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingModalProvider } from './context/BookingModalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuickBookingModal } from './components/QuickBookingModal';
import { HomePage } from './pages/HomePage';

const AirportCabsPage = lazy(() => import('./pages/AirportCabsPage').then((m) => ({ default: m.AirportCabsPage })));
const OutstationCabsPage = lazy(() => import('./pages/OutstationCabsPage').then((m) => ({ default: m.OutstationCabsPage })));
const HourlyRentalsPage = lazy(() => import('./pages/HourlyRentalsPage').then((m) => ({ default: m.HourlyRentalsPage })));
const TourPackagesPage = lazy(() => import('./pages/TourPackagesPage').then((m) => ({ default: m.TourPackagesPage })));
const FleetPage = lazy(() => import('./pages/FleetPage').then((m) => ({ default: m.FleetPage })));
const TariffPage = lazy(() => import('./pages/TariffPage').then((m) => ({ default: m.TariffPage })));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage').then((m) => ({ default: m.WhyUsPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
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
