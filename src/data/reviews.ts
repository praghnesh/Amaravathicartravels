export interface Review {
  id: string;
  name: string;
  location: string;
  route: string;
  vehicle: string;
  rating: number;
  date: string;
  text: string;
  tag: 'Airport Transfer' | 'Pilgrimage' | 'Outstation' | 'Corporate';
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Srinivasa Rao K.',
    location: 'Vijayawada',
    route: 'Vijayawada → Tirupati Balaji (2 Days)',
    vehicle: 'Toyota Innova Crysta',
    rating: 5,
    date: '2 weeks ago',
    text: 'Booked an Innova Crysta from Amaravathi Car Travels for our parents’ Tirumala darshan. The driver Raju garu arrived 15 minutes early, drove effortlessly on the ghat road, and billed us strictly as per the agreed meter without any hidden demands.',
    tag: 'Pilgrimage',
  },
  {
    id: 'r2',
    name: 'Dr. Madhavi Latha',
    location: 'Guntur',
    route: 'Guntur → Gannavaram Airport (VGA)',
    vehicle: 'Maruti Swift Dzire',
    rating: 5,
    date: '1 month ago',
    text: 'I had a 5:30 AM early morning flight from Gannavaram. Most local apps cancel last minute, but Amaravathi Car Travels sent driver details the previous night and the car was crisp, clean, and right at my gate at 3:45 AM.',
    tag: 'Airport Transfer',
  },
  {
    id: 'r3',
    name: 'Praveen Kumar V.',
    location: 'Amaravati (Mangalagiri)',
    route: 'Amaravati → Hyderabad RGIA One-Way',
    vehicle: 'Toyota Etios',
    rating: 5,
    date: '3 weeks ago',
    text: 'Booked a direct One-Way Drop to Shamshabad Airport instead of paying round-trip fares elsewhere. Car smelled fresh, AC cooled fast in summer heat, and fast highway drive in 5 hours.',
    tag: 'Outstation',
  },
  {
    id: 'r4',
    name: 'Narasimha Murthy P.',
    location: 'Tenali',
    route: 'Tenali → Srisailam Nallamala Tour',
    vehicle: 'Force Tempo Traveller (17s)',
    rating: 5,
    date: '1 month ago',
    text: '16 family members traveled together for Kartika Masam Srisailam darshan. Pushback seats were super comfortable for elders, luggage fit neatly on top, and the chauffeur knew every ghat turn and good vegetarian tiffin spot.',
    tag: 'Pilgrimage',
  },
  {
    id: 'r5',
    name: 'Anitha Reddy',
    location: 'Vijayawada',
    route: 'Local 8Hr / 80Km Wedding Hospitality',
    vehicle: 'Maruti Ertiga & Swift Dzire',
    rating: 5,
    date: '2 months ago',
    text: 'Hired 3 cars for our sister’s wedding guest pickups between Benz Circle and Mangalagiri venue. Every chauffeur was in neat attire, polite with NRI relatives, and coordinated seamlessly over WhatsApp.',
    tag: 'Corporate',
  },
  {
    id: 'r6',
    name: 'Karthikeya Varma',
    location: 'Amaravati Secretariat',
    route: 'Vijayawada → Visakhapatnam Round Trip',
    vehicle: 'Toyota Innova Crysta',
    rating: 5,
    date: '3 weeks ago',
    text: 'Zero advance deposit needed to confirm, transparent GST invoice provided for my official reimbursement, and top-notch highway manners. Hands down the most reliable travels in the Amaravati–Vijayawada region.',
    tag: 'Corporate',
  },
];

