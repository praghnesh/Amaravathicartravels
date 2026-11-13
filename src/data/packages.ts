import { MEDIA } from '../assets/media';

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distance: string;
  startingFare: number;
  category: 'Pilgrimage' | 'Heritage' | 'Hill & Beach' | 'Temple Circuit';
  image: string;
  badge: string;
  highlights: string[];
  itinerary: { day: string; title: string; details: string }[];
  inclusions: string[];
  exclusions: string[];
  coords: [number, number];
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'tirupati-balaji-package',
    title: 'Tirupati & Tirumala Balaji Darshan',
    subtitle: 'Complete family spiritual tour with ghat-experienced chauffeur',
    duration: '2 Days / 1 Night',
    distance: '~840 Kms Round Trip',
    startingFare: 11500,
    category: 'Pilgrimage',
    image: MEDIA.destTirupati,
    badge: 'Most Booked Pilgrimage',
    highlights: ['Tirumala Sri Venkateswara Swamy', 'Padmavathi Ammavari Temple', 'Sri Kalahasti', 'Kanipakam Vinayaka'],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Amaravati / Vijayawada / Guntur → Tirupati → Tirumala',
        details: 'Early morning doorstep pickup, comfortable NH-16 drive via Ongole & Nellore, Alipiri ghat ascent to Tirumala, Darshan drop & evening Padmavathi Temple visit.',
      },
      {
        day: 'Day 2',
        title: 'Sri Kalahasti Rahu-Ketu Puja → Return Journey',
        details: 'Morning darshan at Kapila Theertham & Sri Kalahasti Temple, lunch stopover on highway, and safe doorstep drop back home by night.',
      },
    ],
    inclusions: ['Sanitized AC Vehicle & Fuel', 'Driver Batta & Night Allowance', 'Ghat-Road Certified Chauffeur', 'Flexible Darshan Waiting'],
    exclusions: ['AP Toll Gates & Fastag', 'Tirumala Entry / Parking Fees', 'Darshan Tickets & Accommodation'],
    coords: [13.6288, 79.4192],
  },
  {
    id: 'srisailam-nallamala-package',
    title: 'Srisailam Jyotirlinga & Nallamala Ghat',
    subtitle: 'Scenic forest ghat trip to Mallikarjuna Swamy & Bhramaramba Devi',
    duration: '1–2 Days Custom',
    distance: '~480 Kms Round Trip',
    startingFare: 6999,
    category: 'Pilgrimage',
    image: MEDIA.destSrisailam,
    badge: 'Ghat Expert Drivers',
    highlights: ['Mallikarjuna Jyotirlinga', 'Sakshi Ganapati', 'Srisailam Dam Viewpoint', 'Pathala Ganga Ropeway'],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Doorstep Pickup → Dornala → Nallamala Ghat → Srisailam',
        details: 'Depart at 5:00 AM via Narasaraopet & Vinukonda, enjoy scenic Nallamala forest ghat drive, stop at Sakshi Ganapati, Dam viewpoint, and proceed for Darshan.',
      },
      {
        day: 'Day 2 (Optional)',
        title: 'Morning Abhishekam & Sikharam → Return',
        details: 'Morning temple darshan, Paladhara Panchadhara, Hatakeswaram & Sikharam Darshan before relaxing drive back to Amaravati / Guntur / Vijayawada.',
      },
    ],
    inclusions: ['AC Vehicle & Fuel', 'Driver Batta Included', 'Forest Entry Timing Coordination', 'Doorstep Pickup & Drop'],
    exclusions: ['Forest Checkpost Fee & Parking', 'Tolls as per actuals', 'Meals & Hotel Stay'],
    coords: [16.0733, 78.8687],
  },
  {
    id: 'amaravati-heritage-darshan',
    title: 'Amaravati Capital & Pancharama Heritage Tour',
    subtitle: 'Explore Amaralingeswara Temple, Dhyana Buddha & Kanaka Durga',
    duration: '1 Day (12 Hours)',
    distance: '~140 Kms Local Circle',
    startingFare: 3200,
    category: 'Heritage',
    image: MEDIA.destAmaravati,
    badge: 'Local Signature Tour',
    highlights: ['Amaravati Amareswara Swamy', '125ft Dhyana Buddha & Stupa', 'Undavalli Caves', 'Kanaka Durga & Mangalagiri'],
    itinerary: [
      {
        day: 'Morning',
        title: 'Kanaka Durga Temple → Undavalli Caves → Mangalagiri',
        details: 'Begin at Indrakeeladri Kanaka Durga Temple, drive along Prakasam Barrage to ancient 4th-century Undavalli rock-cut caves & Panakala Narasimha Swamy.',
      },
      {
        day: 'Afternoon & Evening',
        title: 'Amaravati Maha Stupa → Dhyana Buddha → Amareswara Swamy',
        details: 'Cruise along the Krishna riverbank to Amaravati Museum, Dhyana Buddha Statue, and sacred Amareswara Pancharama Kshetra for evening aarti.',
      },
    ],
    inclusions: ['12-Hour AC Chauffeur Cab', 'Fuel & Driver Batta 100% Included', 'Local Heritage Guide Coordination', 'Doorstep Hotel/Station Pickup'],
    exclusions: ['Monument Entry Tickets', 'Toll/Parking if applicable'],
    coords: [16.573, 80.3575],
  },
  {
    id: 'vizag-araku-escape',
    title: 'Visakhapatnam & Araku Valley Coastal Retreat',
    subtitle: 'Beaches, Submarine Museum, Borra Caves & Coffee Plantations',
    duration: '3 Days / 2 Nights',
    distance: '~950 Kms Round Trip',
    startingFare: 14500,
    category: 'Hill & Beach',
    image: MEDIA.destVizag,
    badge: 'Family Holiday Hit',
    highlights: ['RK Beach & INS Kurusura', 'Kailasagiri Hilltop', 'Borra Limestone Caves', 'Araku Tribal Museum & Coffee'],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Drive to Visakhapatnam → Coastal Sightseeing',
        details: 'Morning start along NH-16 coastal highway, reach Vizag by afternoon, visit Kailasagiri ropeway, Submarine Museum, and sunset at Rushikonda / RK Beach.',
      },
      {
        day: 'Day 2',
        title: 'Araku Valley Day Excursion via Borra Caves',
        details: 'Ascend Eastern Ghats via Ananthagiri coffee estates, Galikonda viewpoint, Borra Caves, Padmapuram Gardens & Araku Valley Tribal Museum.',
      },
      {
        day: 'Day 3',
        title: 'Simhachalam Temple Darshan → Return Drive',
        details: 'Morning Varaha Lakshmi Narasimha Swamy darshan at Simhachalam, lunch in Rajahmundry, and evening return drop.',
      },
    ],
    inclusions: ['AC Sedan / MPV / Crysta', 'Driver Allowance & Night Halts', 'Sightseeing Transfers'],
    exclusions: ['NH-16 Tolls & Parking', 'Entry Tickets & Meals', 'Hotel Accommodation'],
    coords: [17.6868, 83.2185],
  },
];
