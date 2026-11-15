import amaravathiLogoImg from './images/amaravathi-logo.jpg';
import heroBgImg from './images/hero-bg.jpg';
import destAmaravatiImg from './images/dest-amaravati.jpg';
import destSrisailamImg from './images/dest-srisailam.jpg';
import destTirupatiImg from './images/dest-tirupati.jpg';
import destVizagImg from './images/dest-vizag.jpg';
import fleetSedanImg from './images/fleet-sedan.jpg';
import fleetEtiosImg from './images/fleet-etios.jpg';
import fleetMpvImg from './images/fleet-mpv.jpg';
import fleetInnovaImg from './images/fleet-innova.jpg';
import fleetCrystaImg from './images/fleet-crysta.jpg';
import fleetTravellerImg from './images/fleet-traveller.jpg';
import fleetUrbaniaImg from './images/fleet-urbania.jpg';
import fleetMinibusImg from './images/fleet-minibus.jpg';
import fleetBus40Img from './images/fleet-bus-40.jpg';
import promoSleeperBusImg from './images/promo-sleeper-bus.jpg';
import promoUrbania16Img from './images/promo-urbania-16.jpg';
import promoLuxuryBusImg from './images/promo-luxury-bus.jpg';
import promoLuxuryCarsImg from './images/promo-luxury-cars.jpg';
import promoOnewayCabsImg from './images/promo-oneway-cabs.jpg';
import promoHydVjaImg from './images/promo-hyd-vja.jpg';
import promoTeluguVjaHydImg from './images/promo-telugu-vja-hyd.jpg';
import promoTeluguBusToursImg from './images/promo-telugu-bus-tours.jpg';

export const MEDIA = {
  logo: amaravathiLogoImg,
  heroBg: heroBgImg,
  destAmaravati: destAmaravatiImg,
  destSrisailam: destSrisailamImg,
  destTirupati: destTirupatiImg,
  destVizag: destVizagImg,
  fleetSedan: fleetSedanImg,
  fleetEtios: fleetEtiosImg,
  fleetMpv: fleetMpvImg,
  fleetInnova: fleetInnovaImg,
  fleetCrysta: fleetCrystaImg,
  fleetTraveller: fleetTravellerImg,
  fleetUrbania: fleetUrbaniaImg,
  fleetMinibus: fleetMinibusImg,
  fleetBus40: fleetBus40Img,
  banners: [
    {
      id: 'promo-sleeper-bus',
      title: 'Amaravathi Luxury Sleeper Bus',
      subtitle: 'Luxury Sleeper Beds • Pushback Seats • Safe & Secure Travel',
      image: promoSleeperBusImg,
      fallbackUrl: '/images/promo-sleeper-bus.jpg',
      phone: '9393591444',
      badge: 'Luxury Sleeper',
      link: '/outstation-cabs',
    },
    {
      id: 'promo-urbania-16',
      title: 'Force Urbania — 16 Seater VIP Coach',
      subtitle: 'Spacious 16 Seater • AC Coach • Push Back Seats',
      image: promoUrbania16Img,
      fallbackUrl: '/images/promo-urbania-16.jpg',
      phone: '9393591444',
      badge: 'VIP Urbania',
      link: '/fleet',
    },
    {
      id: 'promo-luxury-cars',
      title: 'Amaravathi Vijayawada Luxury Cars',
      subtitle: 'Innova Crysta, Mercedes-Benz, BMW • 24x7 Service',
      image: promoLuxuryCarsImg,
      fallbackUrl: '/images/promo-luxury-cars.jpg',
      phone: '9393591444',
      badge: 'Luxury Cars',
      link: '/fleet',
    },
    {
      id: 'promo-oneway-cabs',
      title: 'Vijayawada One Way Cabs',
      subtitle: 'One Way & Round Trips • Airport Transfers • Tour Packages',
      image: promoOnewayCabsImg,
      fallbackUrl: '/images/promo-oneway-cabs.jpg',
      phone: '9393591444',
      badge: 'One Way Drops',
      link: '/outstation-cabs',
    },
    {
      id: 'promo-hyd-vja',
      title: 'Hyderabad to Vijayawada One Way Cabs',
      subtitle: 'Comfortable Ride • On-Time Pickup • Affordable Fare',
      image: promoHydVjaImg,
      fallbackUrl: '/images/promo-hyd-vja.jpg',
      phone: '9393591444',
      badge: 'Hyd ↔ Vja',
      link: '/outstation-cabs',
    },
    {
      id: 'promo-luxury-bus',
      title: 'Amaravathi Vijayawada Luxury Bus',
      subtitle: 'Premium Comfort • AC Coach • Push Back Seats',
      image: promoLuxuryBusImg,
      fallbackUrl: '/images/promo-luxury-bus.jpg',
      phone: '9393591444',
      badge: 'Luxury AC Bus',
      link: '/outstation-cabs',
    },
    {
      id: 'promo-telugu-vja-hyd',
      title: 'విజయవాడ టు హైదరాబాద్ వన్ వే క్యాబ్ సర్వీస్',
      subtitle: 'సౌకర్యవంతమైన ప్రయాణం • ఆన్ టైమ్ పికప్ • సరసమైన ధరలు',
      image: promoTeluguVjaHydImg,
      fallbackUrl: '/images/promo-telugu-vja-hyd.jpg',
      phone: '9948924786',
      badge: 'విజయవాడ ↔ హైదరాబాద్',
      link: '/outstation-cabs',
    },
    {
      id: 'promo-telugu-bus-tours',
      title: 'అమరావతి బస్సు టూర్స్ అండ్ ట్రావెల్స్',
      subtitle: 'Temple Tours • Family Tours • Hill Stations • Pilgrimage',
      image: promoTeluguBusToursImg,
      fallbackUrl: '/images/promo-telugu-bus-tours.jpg',
      phone: '9948924786',
      badge: 'Bus Tours',
      link: '/tour-packages',
    },
  ],
} as const;

