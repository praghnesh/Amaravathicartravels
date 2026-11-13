export interface FAQItem {
  id: string;
  category: 'Booking' | 'Pricing' | 'Airport' | 'Outstation';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'Booking',
    question: 'How do I book a cab with Amaravathi Car Travels?',
    answer:
      'You can book in under 30 seconds using our website Instant Dispatch form, via direct WhatsApp chat, or by calling our 24/7 helpline. Once confirmed, you receive your driver’s name, phone number, and vehicle registration number well ahead of pickup.',
  },
  {
    id: 'f2',
    category: 'Booking',
    question: 'Do I need to pay an advance deposit to confirm my car?',
    answer:
      'No! For standard local, airport, and outstation rides in Amaravati, Vijayawada, and Guntur, we require zero advance deposit. You can pay directly via UPI, Cash, or Card after your ride.',
  },
  {
    id: 'f3',
    category: 'Pricing',
    question: 'Is Driver Batta included in local hourly rental packages?',
    answer:
      'Yes, Driver Batta (allowance) is 100% included in all 4-hour (40km), 8-hour (80km), and 12-hour (120km) local packages. Only toll gates, parking fees, and night driving allowance (10 PM – 6 AM) apply if incurred.',
  },
  {
    id: 'f4',
    category: 'Outstation',
    question: 'How does your One-Way Outstation Drop pricing work?',
    answer:
      'For One-Way drops along corridors like Amaravati/Vijayawada/Guntur ↔ Hyderabad, Tirupati, Vizag, and Chennai, Sedans (Swift Dzire & Toyota Etios) are billed at ₹20/km + ₹500 Driver Batta and SUVs (Ertiga, Innova & Innova Crysta) at ₹30/km + ₹500 Driver Batta. Group coaches (Tempo Traveller, Force Urbania & Mini Bus) are available exclusively for Round Trip journeys.',
  },
  {
    id: 'f5',
    category: 'Airport',
    question: 'What happens if my flight to Gannavaram (VGA) or Hyderabad (RGIA) is delayed?',
    answer:
      'We track your flight status in real time using your flight number. Our chauffeur adjusts the arrival window automatically and includes up to 60 minutes of complimentary airport waiting time with zero extra surge charges.',
  },
  {
    id: 'f6',
    category: 'Pricing',
    question: 'How are toll gates, interstate permits, and GST bills handled?',
    answer:
      'FASTag tolls, airport parking receipts, and interstate entry taxes (for Telangana, Tamil Nadu, or Karnataka trips) are transparent and billed strictly at actuals with receipts. Proper GST invoices are readily available for corporate and official trips.',
  },
  {
    id: 'f7',
    category: 'Outstation',
    question: 'Are your drivers experienced in Tirumala and Srisailam ghat roads?',
    answer:
      'Yes. All outstation chauffeurs assigned to Tirumala, Srisailam Nallamala forest, and Araku Valley tours are specially vetted hill-and-ghat drivers with years of safe driving record and local temple timing familiarity.',
  },
];

