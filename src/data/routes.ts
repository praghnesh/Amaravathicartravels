export interface HubLocation {
  id: string;
  name: string;
  shortName: string;
  coords: [number, number]; // [lat, lng]
  region: string;
}

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  fromCoords: [number, number];
  toCoords: [number, number];
  distanceKm: number;
  durationText: string;
  highway: string;
  oneWayAvailable: boolean;
  sedanOneWayFare: number;
  sedanRoundTripPerKm: number;
  highlights: string;
}

export const HUB_LOCATIONS: HubLocation[] = [
  { id: 'amaravati', name: 'Amaravati (Secretariat / Thullur)', shortName: 'Amaravati', coords: [16.5131, 80.5165], region: 'Capital Region' },
  { id: 'vijayawada', name: 'Vijayawada (Benz Circle / PNBS)', shortName: 'Vijayawada', coords: [16.5062, 80.648], region: 'NTR District' },
  { id: 'guntur', name: 'Guntur (Lakshmipuram / Arundelpet)', shortName: 'Guntur', coords: [16.3067, 80.4365], region: 'Guntur District' },
  { id: 'mangalagiri', name: 'Mangalagiri / Tadepalli', shortName: 'Mangalagiri', coords: [16.4307, 80.5679], region: 'CRDA Corridor' },
  { id: 'tenali', name: 'Tenali', shortName: 'Tenali', coords: [16.2428, 80.6442], region: 'Guntur District' },
  { id: 'gannavaram', name: 'Vijayawada Airport (Gannavaram - VGA)', shortName: 'VGA Airport', coords: [16.5304, 80.7968], region: 'Airport Hub' },
  { id: 'hyderabad', name: 'Hyderabad / RGIA Airport', shortName: 'Hyderabad', coords: [17.385, 78.4867], region: 'Telangana' },
  { id: 'tirupati', name: 'Tirupati / Tirumala', shortName: 'Tirupati', coords: [13.6288, 79.4192], region: 'Pilgrimage' },
  { id: 'srisailam', name: 'Srisailam Mallikarjuna Temple', shortName: 'Srisailam', coords: [16.0733, 78.8687], region: 'Pilgrimage' },
  { id: 'visakhapatnam', name: 'Visakhapatnam (Vizag)', shortName: 'Visakhapatnam', coords: [17.6868, 83.2185], region: 'Coastal AP' },
  { id: 'bhadrachalam', name: 'Bhadrachalam Temple', shortName: 'Bhadrachalam', coords: [17.6688, 80.8936], region: 'Pilgrimage' },
  { id: 'chennai', name: 'Chennai', shortName: 'Chennai', coords: [13.0827, 80.2707], region: 'Tamil Nadu' },
  { id: 'bangalore', name: 'Bengaluru (Bangalore)', shortName: 'Bangalore', coords: [12.9716, 77.5946], region: 'Karnataka' },
  { id: 'rajahmundry', name: 'Rajahmundry', shortName: 'Rajahmundry', coords: [17.0005, 81.804], region: 'East Godavari' },
];

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: 'amaravati-hyderabad',
    from: 'Amaravati / Vijayawada',
    to: 'Hyderabad (City & RGIA)',
    fromCoords: [16.5062, 80.648],
    toCoords: [17.385, 78.4867],
    distanceKm: 275,
    durationText: '5 hrs 15 mins',
    highway: 'NH-65 Express',
    oneWayAvailable: true,
    sedanOneWayFare: 6000,
    sedanRoundTripPerKm: 12,
    highlights: 'Expressway pickup from Vijayawada, Amaravati & Guntur to Shamshabad Airport / HITEC City',
  },
  {
    id: 'guntur-vga',
    from: 'Guntur / Amaravati',
    to: 'Gannavaram Airport (VGA)',
    fromCoords: [16.3067, 80.4365],
    toCoords: [16.5304, 80.7968],
    distanceKm: 54,
    durationText: '1 hr 15 mins',
    highway: 'NH-16 Bypass',
    oneWayAvailable: true,
    sedanOneWayFare: 800,
    sedanRoundTripPerKm: 12,
    highlights: 'Flight-tracked pickups with 60 mins complimentary waiting & luggage support',
  },
  {
    id: 'amaravati-tirupati',
    from: 'Amaravati / Vijayawada / Guntur',
    to: 'Tirupati & Tirumala',
    fromCoords: [16.5062, 80.648],
    toCoords: [13.6288, 79.4192],
    distanceKm: 410,
    durationText: '7 hrs 30 mins',
    highway: 'NH-16 / Naidupeta',
    oneWayAvailable: true,
    sedanOneWayFare: 8700,
    sedanRoundTripPerKm: 12,
    highlights: 'Experienced Tirumala ghat drivers, flexible darshan waiting & family packages',
  },
  {
    id: 'guntur-srisailam',
    from: 'Guntur / Amaravati',
    to: 'Srisailam Mallikarjuna',
    fromCoords: [16.3067, 80.4365],
    toCoords: [16.0733, 78.8687],
    distanceKm: 235,
    durationText: '5 hrs 10 mins',
    highway: 'Via Vinukonda & Nallamala Ghat',
    oneWayAvailable: true,
    sedanOneWayFare: 5200,
    sedanRoundTripPerKm: 12,
    highlights: 'Scenic Nallamala tiger reserve route with Sakshi Ganapati & Dam darshan',
  },
  {
    id: 'vijayawada-vizag',
    from: 'Vijayawada / Amaravati',
    to: 'Visakhapatnam (Vizag)',
    fromCoords: [16.5062, 80.648],
    toCoords: [17.6868, 83.2185],
    distanceKm: 350,
    durationText: '6 hrs 45 mins',
    highway: 'NH-16 Coastal Corridor',
    oneWayAvailable: true,
    sedanOneWayFare: 7500,
    sedanRoundTripPerKm: 12,
    highlights: 'Smooth coastal highway cabs via Eluru, Rajahmundry & Anakapalli',
  },
  {
    id: 'vijayawada-chennai',
    from: 'Amaravati / Vijayawada / Guntur',
    to: 'Chennai',
    fromCoords: [16.3067, 80.4365],
    toCoords: [13.0827, 80.2707],
    distanceKm: 455,
    durationText: '8 hrs 00 mins',
    highway: 'NH-16 Grand Trunk',
    oneWayAvailable: true,
    sedanOneWayFare: 9600,
    sedanRoundTripPerKm: 12,
    highlights: 'Hospital visits (Apollo/CMC nearby) & Chennai Airport international drops',
  },
];

// Haversine approximate road factor helper when offline / instant estimate
export function estimateRoadDistanceKm(from: [number, number], to: [number, number]): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(to[0] - from[0]);
  const dLon = toRad(to[1] - from[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from[0])) * Math.cos(toRad(to[0])) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straight = R * c;
  // Indian highway detour multiplier ~ 1.24x
  return Math.max(15, Math.round(straight * 1.24));
}

