import { MEDIA } from '../assets/media';

export interface RouteVehicleTariff {
  vehicleId: 'sedan' | 'suv' | 'innova' | 'crysta';
  name: string;
  categoryLabel: string;
  seating: string;
  luggage: string;
  price: number;
  image: string;
  badge?: string;
  features: string[];
}

export interface RoutePackage {
  id: string;
  origin: string;
  destination: string;
  title: string;
  distance: string;
  duration: string;
  highway: string;
  popularPickupPoints: string[];
  tariffs: RouteVehicleTariff[];
}

const COMMON_TARIFFS: RouteVehicleTariff[] = [
  {
    vehicleId: 'sedan',
    name: 'Prime Sedan (Dzire / Etios)',
    categoryLabel: 'Sedan (4+1)',
    seating: '4+1 Seater',
    luggage: '3 Bags',
    price: 5000,
    image: MEDIA.fleetSedan,
    badge: 'Most Popular',
    features: ['Chilled AC', 'Fastag Express Tolls', 'Doorstep Pickup', 'No Hidden Charges'],
  },
  {
    vehicleId: 'suv',
    name: 'Maruti Ertiga SUV',
    categoryLabel: 'SUV (6+1)',
    seating: '6+1 Seater',
    luggage: '4 Bags',
    price: 6000,
    image: MEDIA.fleetMpv,
    badge: 'Family Favorite',
    features: ['Roof AC Vents', 'Foldable 3rd Row', 'Reclining Seats', 'Extra Boot Space'],
  },
  {
    vehicleId: 'innova',
    name: 'Toyota Innova',
    categoryLabel: 'Highway MUV (7+1)',
    seating: '7+1 Seater',
    luggage: '5 Bags + Carrier',
    price: 8000,
    image: MEDIA.fleetInnova,
    badge: 'Comfort Cruiser',
    features: ['Tri-Row AC', 'Captain Seats Option', 'Roof Luggage Carrier', 'Smooth Highway Ride'],
  },
  {
    vehicleId: 'crysta',
    name: 'Toyota Innova Crysta',
    categoryLabel: 'Luxury Captain (7+1)',
    seating: '7+1 Seater',
    luggage: '6 Bags',
    price: 8500,
    image: MEDIA.fleetCrysta,
    badge: 'VIP Executive',
    features: ['Leather Captain Recliners', 'Ambient Lighting', 'Premium Suspension', 'Uniformed Chauffeur'],
  },
];

export const ROUTE_PACKAGES: RoutePackage[] = [
  {
    id: 'hyd-to-vja',
    origin: 'Hyderabad',
    destination: 'Vijayawada',
    title: 'Hyderabad → Vijayawada (One Way)',
    distance: '~275 Kms',
    duration: '4.5 – 5 Hours',
    highway: 'NH-65 Express Corridor',
    popularPickupPoints: ['RGIA Shamshabad Airport', 'Gachibowli', 'Hitec City', 'Secunderabad', 'LB Nagar'],
    tariffs: COMMON_TARIFFS,
  },
  {
    id: 'vja-to-hyd',
    origin: 'Vijayawada',
    destination: 'Hyderabad',
    title: 'Vijayawada → Hyderabad (One Way)',
    distance: '~275 Kms',
    duration: '4.5 – 5 Hours',
    highway: 'NH-65 Express Corridor',
    popularPickupPoints: ['Benz Circle', 'PNBS Bus Station', 'Vijayawada Railway Station', 'Gannavaram', 'Tadepalli'],
    tariffs: COMMON_TARIFFS,
  },
  {
    id: 'hyd-to-gnt',
    origin: 'Hyderabad',
    destination: 'Guntur',
    title: 'Hyderabad → Guntur (One Way)',
    distance: '~290 Kms',
    duration: '5 – 5.5 Hours',
    highway: 'NH-65 / Narketpally Highway',
    popularPickupPoints: ['RGIA Airport', 'Miyapur', 'Kukatpally', 'Ameerpet', 'Dilsukhnagar / LB Nagar'],
    tariffs: COMMON_TARIFFS,
  },
  {
    id: 'gnt-to-hyd',
    origin: 'Guntur',
    destination: 'Hyderabad',
    title: 'Guntur → Hyderabad (One Way)',
    distance: '~290 Kms',
    duration: '5 – 5.5 Hours',
    highway: 'NH-65 / Narketpally Highway',
    popularPickupPoints: ['Lakshmipuram', 'Arundelpet Main Road', 'Guntur Bus Stand', 'Nara Kodur', 'Chuttugunta'],
    tariffs: COMMON_TARIFFS,
  },
];
