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
import bannerSleeperBusImg from './images/banner-sleeper-bus.jpg';
import bannerUrbania16Img from './images/banner-urbania-16.jpg';
import bannerLuxuryBusImg from './images/banner-luxury-bus.jpg';
import bannerLuxuryCarsImg from './images/banner-luxury-cars.jpg';
import bannerOnewayCabsImg from './images/banner-oneway-cabs.jpg';
import bannerHydVjaImg from './images/banner-hyd-vja.jpg';
import bannerTeluguVjaHydImg from './images/banner-telugu-vja-hyd.jpg';
import bannerTeluguBusToursImg from './images/banner-telugu-bus-tours.jpg';

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
      id: 'banner-sleeper-bus',
      title: 'Amaravathi Luxury Sleeper Bus',
      subtitle: 'Luxury Sleeper Beds • Pushback Seats • Safe & Secure Travel',
      image: bannerSleeperBusImg,
      phone: '9393591444',
      badge: 'Luxury Sleeper',
      link: '/outstation-cabs',
    },
    {
      id: 'banner-urbania-16',
      title: 'Force Urbania — 16 Seater VIP Coach',
      subtitle: 'Spacious 16 Seater • AC Coach • Push Back Seats',
      image: bannerUrbania16Img,
      phone: '9393591444',
      badge: 'VIP Urbania',
      link: '/fleet',
    },
    {
      id: 'banner-luxury-cars',
      title: 'Amaravathi Vijayawada Luxury Cars',
      subtitle: 'Innova Crysta, Mercedes-Benz, BMW • 24x7 Service',
      image: bannerLuxuryCarsImg,
      phone: '9393591444',
      badge: 'Luxury Cars',
      link: '/fleet',
    },
    {
      id: 'banner-oneway-cabs',
      title: 'Vijayawada One Way Cabs',
      subtitle: 'One Way & Round Trips • Airport Transfers • Tour Packages',
      image: bannerOnewayCabsImg,
      phone: '9393591444',
      badge: 'One Way Drops',
      link: '/outstation-cabs',
    },
    {
      id: 'banner-hyd-vja',
      title: 'Hyderabad to Vijayawada One Way Cabs',
      subtitle: 'Comfortable Ride • On-Time Pickup • Affordable Fare',
      image: bannerHydVjaImg,
      phone: '9393591444',
      badge: 'Hyd ↔ Vja',
      link: '/outstation-cabs',
    },
    {
      id: 'banner-luxury-bus',
      title: 'Amaravathi Vijayawada Luxury Bus',
      subtitle: 'Premium Comfort • AC Coach • Push Back Seats',
      image: bannerLuxuryBusImg,
      phone: '9393591444',
      badge: 'Luxury AC Bus',
      link: '/outstation-cabs',
    },
    {
      id: 'banner-telugu-vja-hyd',
      title: 'విజయవాడ టు హైదరాబాద్ వన్ వే క్యాబ్ సర్వీస్',
      subtitle: 'సౌకర్యవంతమైన ప్రయాణం • ఆన్ టైమ్ పికప్ • సరసమైన ధరలు',
      image: bannerTeluguVjaHydImg,
      phone: '9948924786',
      badge: 'విజయవాడ ↔ హైదరాబాద్',
      link: '/outstation-cabs',
    },
    {
      id: 'banner-telugu-bus-tours',
      title: 'అమరావతి బస్సు టూర్స్ అండ్ ట్రావెల్స్',
      subtitle: 'Temple Tours • Family Tours • Hill Stations • Pilgrimage',
      image: bannerTeluguBusToursImg,
      phone: '9948924786',
      badge: 'Bus Tours',
      link: '/tour-packages',
    },
  ],
} as const;

