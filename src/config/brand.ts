import { MEDIA } from '../assets/media';

export const BRAND = {
  name: 'Amaravathi Car Travels',
  shortName: 'AMARAVATHI',
  subtitle: 'Car Travels & Cabs',
  tagline: 'Comfort • Safety • Reliability',
  hubTagline: 'Amaravati • Vijayawada • Guntur',
  foundedYear: 2014,
  yearsExperience: '12+',
  happyTravelers: '18,000+',
  verifiedCars: '50+',
  rating: '4.9 / 5',
  phoneDisplay: '+91 93935 91444',
  phoneRaw: '+919393591444',
  secondaryPhoneDisplay: '+91 93935 91444',
  secondaryPhoneRaw: '+919393591444',
  whatsappNumber: '919393591444',
  email: 'bookings@amaravathicartravels.in',
  website: 'https://amaravathicartravels.in',
  logo: MEDIA.logo,
  heroBg: MEDIA.heroBg,
  headOffice: {
    title: 'Amaravati & Mangalagiri Head Office',
    address: 'Plot 14, NH-16 Service Road, Near NRI Medical College Junction, Mangalagiri - Amaravati, Andhra Pradesh 522503',
    hours: 'Open 24 Hours / 7 Days a Week',
  },
  branchOffices: [
    {
      city: 'Vijayawada Hub',
      area: 'Benz Circle & Pandit Nehru Bus Station, Vijayawada - 520010',
      dispatchTime: '10-15 Min Pickup',
    },
    {
      city: 'Guntur Hub',
      area: 'Lakshmipuram & Arundelpet Main Road, Guntur - 522002',
      dispatchTime: '10-15 Min Pickup',
    },
    {
      city: 'Amaravati Capital Hub',
      area: 'Seed Access Road, Thullur & Velagapudi Secretariat Zone - 522237',
      dispatchTime: '15 Min Pickup',
    },
  ],
  serviceCities: [
    'Amaravati',
    'Vijayawada',
    'Guntur',
    'Mangalagiri',
    'Tenali',
    'Gannavaram Airport (VGA)',
    'Tadepalli',
    'Narasaraopet',
    'Eluru',
    'Hyderabad',
    'Tirupati',
    'Srisailam',
    'Visakhapatnam',
    'Chennai',
    'Bangalore',
  ],
  social: {
    instagram: 'https://instagram.com',
    instagramHandle: '@amaravathicartravels',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    youtubeHandle: '@AmaravathiCarTravels',
    whatsappChannel: 'https://whatsapp.com/channel/',
  },
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
