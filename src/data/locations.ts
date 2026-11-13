export interface LocationSuggestion {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  pincode?: string;
  coords?: [number, number];
  aliases?: string[];
  source?: 'local' | 'pincode' | 'osm';
}

export const POPULAR_LOCATIONS: LocationSuggestion[] = [
  // --- AMARAVATI & CRDA CORRIDOR ---
  {
    id: 'loc-velagapudi',
    label: 'Velagapudi Secretariat, Amaravati (522503)',
    title: 'Velagapudi Secretariat (APCRDA)',
    subtitle: 'Amaravati Capital Region, Guntur, AP',
    pincode: '522503',
    coords: [16.5263, 80.5117],
    aliases: ['secretariat', 'ap secretariat', 'thullur', 'mandadam', 'crda', 'amaravati'],
  },
  {
    id: 'loc-mangalagiri',
    label: 'Mangalagiri NRI Junction / AIIMS (522503)',
    title: 'Mangalagiri / NRI Medical / AIIMS',
    subtitle: 'NH-16 Service Road, Amaravati, AP',
    pincode: '522503',
    coords: [16.4307, 80.5679],
    aliases: ['mangalagiri', 'nri hospital', 'aiims', 'chinakakani', 'atmakur', 'kaza'],
  },
  {
    id: 'loc-tadepalli',
    label: 'Tadepalli / Undavalli Centre (522501)',
    title: 'Tadepalli / Undavalli / KL University',
    subtitle: 'Vaddeswaram, Amaravati Corridor, AP',
    pincode: '522501',
    coords: [16.4694, 80.6064],
    aliases: ['tadepalli', 'undavalli', 'vaddeswaram', 'klu', 'prakasam barrage'],
  },
  {
    id: 'loc-amaravati-temple',
    label: 'Amaralingeswara Temple / Dhyana Buddha (522020)',
    title: 'Amaravati Heritage Town / Amareswara Temple',
    subtitle: 'Palnadu District, AP',
    pincode: '522020',
    coords: [16.573, 80.3575],
    aliases: ['dhyana buddha', 'stupa', 'amareswara', 'pancharama', 'amaravathi'],
  },
  {
    id: 'loc-thullur',
    label: 'Thullur / SRM / VIT-AP Campus (522237)',
    title: 'Thullur / VIT-AP & SRM University',
    subtitle: 'Inavolu, Amaravati, AP',
    pincode: '522237',
    coords: [16.4945, 80.4992],
    aliases: ['vit ap', 'srm ap', 'inavolu', 'ainavolu', 'thullur', 'rayapudi', 'mandadam'],
  },

  // --- VIJAYAWADA & GANNAVARAM ---
  {
    id: 'loc-vja-benz',
    label: 'Benz Circle / MG Road, Vijayawada (520010)',
    title: 'Benz Circle / Labbipet / MG Road',
    subtitle: 'Vijayawada, NTR District, AP',
    pincode: '520010',
    coords: [16.4971, 80.6531],
    aliases: ['vja', 'bezawada', 'benz circle', 'mg road', 'labbipet', 'patamata'],
  },
  {
    id: 'loc-vja-station',
    label: 'Vijayawada Railway Station / PNBS (520001)',
    title: 'Vijayawada Jn Railway Station / Bus Stand',
    subtitle: 'Gandhi Nagar / Hanumanpet, Vijayawada, AP',
    pincode: '520001',
    coords: [16.5186, 80.6199],
    aliases: ['railway station', 'pnbs', 'governorpet', 'one town', 'surya rao pet', 'vijayawada'],
  },
  {
    id: 'loc-vja-kanaka-durga',
    label: 'Indrakeeladri Kanaka Durga Temple / Bhavanipuram (520012)',
    title: 'Kanaka Durga Temple / Bhavanipuram',
    subtitle: 'Vijayawada, NTR District, AP',
    pincode: '520012',
    coords: [16.5152, 80.6059],
    aliases: ['durgamma temple', 'indrakeeladri', 'bhavanipuram', 'gollapudi'],
  },
  {
    id: 'loc-vja-autonagar',
    label: 'Auto Nagar / Patamata, Vijayawada (520007)',
    title: 'Auto Nagar / Patamata / Enikepadu',
    subtitle: 'Vijayawada East, NTR District, AP',
    pincode: '520007',
    coords: [16.4961, 80.6789],
    aliases: ['autonagar', 'patamata', 'poranki', 'penamaluru', 'kanuru'],
  },
  {
    id: 'loc-vja-gunadala',
    label: 'Gunadala / Ramavarappadu Ring, Vijayawada (520004)',
    title: 'Gunadala / Ramavarappadu / Siddhartha Nagar',
    subtitle: 'Vijayawada, NTR District, AP',
    pincode: '520004',
    coords: [16.5262, 80.6656],
    aliases: ['gunadala', 'ramavarappadu', 'prasadampadu', 'madhura nagar', 'mogalrajpuram'],
  },
  {
    id: 'loc-vga-airport',
    label: 'Gannavaram Airport (VGA), Vijayawada (521102)',
    title: 'Vijayawada Airport (Gannavaram - VGA)',
    subtitle: 'NH-16 Gannavaram / Kesarapalli IT Park, AP',
    pincode: '521102',
    coords: [16.5304, 80.7968],
    aliases: ['vga', 'airport', 'gannavaram', 'kesarapalli', 'medha towers', 'nidamanuru'],
  },

  // --- GUNTUR & PALNADU / BAPATLA CORRIDOR ---
  {
    id: 'loc-gnt-brodipet',
    label: 'Brodipet / Arundelpeta, Guntur (522002)',
    title: 'Brodipet / Arundelpeta / Railway Station',
    subtitle: 'Guntur City Centre, AP',
    pincode: '522002',
    coords: [16.3067, 80.4365],
    aliases: ['gnt', 'guntur', 'brodipet', 'arundelpeta', 'bus stand', 'lodge centre'],
  },
  {
    id: 'loc-gnt-lakshmipuram',
    label: 'Lakshmipuram / Pattabhipuram, Guntur (522007)',
    title: 'Lakshmipuram / Vidyanagar / Pattabhipuram',
    subtitle: 'Guntur West, Guntur District, AP',
    pincode: '522007',
    coords: [16.3106, 80.4227],
    aliases: ['lakshmipuram', 'pattabhipuram', 'vidyanagar', 'gujjanagundla', 'gorantla'],
  },
  {
    id: 'loc-gnt-autonagar',
    label: 'Autonagar / Nallapadu / Chuttugunta, Guntur (522001)',
    title: 'Guntur Autonagar / Pedakakani',
    subtitle: 'Guntur East / NH-16, AP',
    pincode: '522001',
    coords: [16.2981, 80.4612],
    aliases: ['kothapet', 'lalapet', 'pedakakani', 'nallapadu'],
  },
  {
    id: 'loc-tenali',
    label: 'Tenali Railway Station / Gandhi Chowk (522201)',
    title: 'Tenali',
    subtitle: 'Guntur District, AP',
    pincode: '522201',
    coords: [16.2428, 80.6442],
    aliases: ['tenali', 'ponnur', 'duggirala'],
  },
  {
    id: 'loc-narasaraopet',
    label: 'Narasaraopet / Palnadu (522601)',
    title: 'Narasaraopet',
    subtitle: 'Palnadu District, AP',
    pincode: '522601',
    coords: [16.235, 80.049],
    aliases: ['nrt', 'narasaraopet', 'kotappakonda', 'chilakaluripet'],
  },
  {
    id: 'loc-chilakaluripet',
    label: 'Chilakaluripet (522616)',
    title: 'Chilakaluripet',
    subtitle: 'NH-16 Bypass, Palnadu, AP',
    pincode: '522616',
    coords: [16.0892, 80.1672],
    aliases: ['cpt', 'chilakaluripet'],
  },
  {
    id: 'loc-ongole',
    label: 'Ongole / Prakasam (523001)',
    title: 'Ongole',
    subtitle: 'Prakasam District, AP',
    pincode: '523001',
    coords: [15.5057, 80.0499],
    aliases: ['ongole', 'chirala', 'kandukur'],
  },
  {
    id: 'loc-nellore',
    label: 'Nellore / VR Nagar (524001)',
    title: 'Nellore',
    subtitle: 'SPSR Nellore District, AP',
    pincode: '524001',
    coords: [14.4426, 79.9865],
    aliases: ['nellore', 'nlr', 'gudur', 'kavali'],
  },

  // --- HYDERABAD & TELANGANA ---
  {
    id: 'loc-hyd-center',
    label: 'Hyderabad (Nampally / Abids / Koti) (500001)',
    title: 'Hyderabad City Centre (Nampally / Abids)',
    subtitle: 'Hyderabad, Telangana',
    pincode: '500001',
    coords: [17.385, 78.4867],
    aliases: ['hyd', 'hyderabad', 'nampally', 'abids', 'koti', 'charminar'],
  },
  {
    id: 'loc-hyd-rgia',
    label: 'Shamshabad RGIA Airport, Hyderabad (500409)',
    title: 'Hyderabad RGIA International Airport (Shamshabad)',
    subtitle: 'Shamshabad, Hyderabad, Telangana',
    pincode: '500409',
    coords: [17.2403, 78.4294],
    aliases: ['rgia', 'shamshabad', 'hyd airport', 'hyderabad airport', '501218'],
  },
  {
    id: 'loc-hyd-hitec',
    label: 'HITEC City / Madhapur, Hyderabad (500081)',
    title: 'HITEC City / Madhapur / Mindspace',
    subtitle: 'IT Corridor, Hyderabad, Telangana',
    pincode: '500081',
    coords: [17.4435, 78.3772],
    aliases: ['hitech city', 'hitec', 'madhapur', 'kondapur', 'jubilee enclave'],
  },
  {
    id: 'loc-hyd-gachibowli',
    label: 'Gachibowli / Financial District, Hyderabad (500032)',
    title: 'Gachibowli / Nanakramguda / Financial District',
    subtitle: 'West Hyderabad, Telangana',
    pincode: '500032',
    coords: [17.4401, 78.3489],
    aliases: ['gachibowli', 'financial district', 'wipro circle', 'dlf', 'iiit'],
  },
  {
    id: 'loc-hyd-kukatpally',
    label: 'Kukatpally / KPHB Colony, Hyderabad (500072)',
    title: 'Kukatpally / KPHB / JNTU',
    subtitle: 'Hyderabad North-West, Telangana',
    pincode: '500072',
    coords: [17.4948, 78.3996],
    aliases: ['kphb', 'kukatpally', 'jntu', 'miyapur'],
  },
  {
    id: 'loc-hyd-secunderabad',
    label: 'Secunderabad Railway Station / Paradise (500003)',
    title: 'Secunderabad Railway Station / Begumpet',
    subtitle: 'Secunderabad, Telangana',
    pincode: '500003',
    coords: [17.4344, 78.5013],
    aliases: ['secunderabad', 'paradise', 'begumpet', 'tarnaka', 'ameerpet'],
  },
  {
    id: 'loc-hyd-lbnagar',
    label: 'LB Nagar / Dilsukhnagar, Hyderabad (500074)',
    title: 'LB Nagar / Hayatnagar (NH-65 Entry)',
    subtitle: 'East Hyderabad, Telangana',
    pincode: '500074',
    coords: [17.3457, 78.5522],
    aliases: ['lb nagar', 'uppal', 'dilsukhnagar', 'vanasthalipuram', 'nh65'],
  },
  {
    id: 'loc-hyd-banjara',
    label: 'Banjara Hills / Jubilee Hills, Hyderabad (500034)',
    title: 'Banjara Hills / Jubilee Hills / Somajiguda',
    subtitle: 'Central Hyderabad, Telangana',
    pincode: '500034',
    coords: [17.4156, 78.4347],
    aliases: ['banjara hills', 'jubilee hills', 'aig', 'care hospital', 'yashoda', 'apollo'],
  },

  // --- PILGRIMAGE & MAJOR DESTINATIONS ---
  {
    id: 'loc-tirupati',
    label: 'Tirupati City / Railway Station (517501)',
    title: 'Tirupati (City / Alipiri / Station)',
    subtitle: 'Tirupati District, AP',
    pincode: '517501',
    coords: [13.6288, 79.4192],
    aliases: ['tirupati', 'tpty', 'alipiri', 'tiruchanur', 'padmavathi', 'renigunta'],
  },
  {
    id: 'loc-tirumala',
    label: 'Tirumala Balaji Hill Temple (517504)',
    title: 'Tirumala Sri Venkateswara Swamy Temple',
    subtitle: 'Tirumala Hills, AP',
    pincode: '517504',
    coords: [13.6833, 79.3472],
    aliases: ['tirumala', 'balaji', 'seven hills', 'ttd', 'darshan'],
  },
  {
    id: 'loc-srisailam',
    label: 'Srisailam Mallikarjuna Swamy Temple (518101)',
    title: 'Srisailam Jyotirlinga / Sunnipenta',
    subtitle: 'Nandyal District, Nallamala Hills, AP',
    pincode: '518101',
    coords: [16.0733, 78.8687],
    aliases: ['srisailam', 'mallikarjuna', 'bhramaramba', 'nallamala', 'sunnipenta'],
  },
  {
    id: 'loc-bhadrachalam',
    label: 'Bhadrachalam Sri Rama Temple (507111)',
    title: 'Bhadrachalam',
    subtitle: 'Bhadradri Kothagudem, Telangana',
    pincode: '507111',
    coords: [17.6688, 80.8936],
    aliases: ['bhadrachalam', 'bhadradri', 'parnasala'],
  },

  // --- GODAVARI & COASTAL / VISAKHAPATNAM ---
  {
    id: 'loc-eluru',
    label: 'Eluru City (534001)',
    title: 'Eluru',
    subtitle: 'Eluru District, AP',
    pincode: '534001',
    coords: [16.7107, 81.0952],
    aliases: ['eluru', 'dwaraka tirumala'],
  },
  {
    id: 'loc-bhimavaram',
    label: 'Bhimavaram (534201)',
    title: 'Bhimavaram',
    subtitle: 'West Godavari, AP',
    pincode: '534201',
    coords: [16.5449, 81.5212],
    aliases: ['bhimavaram', 'mavullamma'],
  },
  {
    id: 'loc-rajahmundry',
    label: 'Rajahmundry / Airport (RJA) (533101)',
    title: 'Rajahmundry (Rajamahendravaram)',
    subtitle: 'East Godavari, AP',
    pincode: '533101',
    coords: [17.0005, 81.804],
    aliases: ['rjy', 'rajahmundry', 'rajamahendravaram', 'rja', '533102'],
  },
  {
    id: 'loc-kakinada',
    label: 'Kakinada (533001)',
    title: 'Kakinada / Samalkot',
    subtitle: 'Kakinada District, AP',
    pincode: '533001',
    coords: [16.9891, 82.2475],
    aliases: ['kakinada', 'kkd', 'annavaram', 'pithapuram'],
  },
  {
    id: 'loc-vizag',
    label: 'Visakhapatnam (Jagadamba / One Town / Station) (530001)',
    title: 'Visakhapatnam Railway Station / Jagadamba Junction',
    subtitle: 'Visakhapatnam District, AP',
    pincode: '530001',
    coords: [17.7115, 83.2977],
    aliases: ['vizag', 'visakhapatnam', 'jagadamba', 'dabagardens', 'one town', 'vtz'],
  },
  {
    id: 'loc-vizag-dwarakanagar',
    label: 'Dwaraka Nagar / Akkayyapalem / New Colony, Vizag (530016)',
    title: 'Dwaraka Nagar / Akkayyapalem / RTC Complex',
    subtitle: 'Visakhapatnam Urban, AP',
    pincode: '530016',
    coords: [17.7329, 83.3021],
    aliases: ['dwaraka nagar', 'dwarakanagar', 'akkayyapalem', 'new colony', 'rtc complex', 'vizag', 'visakhapatnam'],
  },
  {
    id: 'loc-vizag-mvp',
    label: 'MVP Colony / Shivaji Park, Vizag (530017)',
    title: 'MVP Colony / Lawsons Bay',
    subtitle: 'Visakhapatnam, AP',
    pincode: '530017',
    coords: [17.7418, 83.3347],
    aliases: ['mvp', 'mvp colony', 'lawsons bay', 'vizag'],
  },
  {
    id: 'loc-vizag-rkbeach',
    label: 'RK Beach / Waltair Uplands, Vizag (530003)',
    title: 'RK Beach / Siripuram / Waltair Uplands',
    subtitle: 'Visakhapatnam, AP',
    pincode: '530003',
    coords: [17.7176, 83.3215],
    aliases: ['rk beach', 'siripuram', 'waltair', 'beach road', 'vizag'],
  },
  {
    id: 'loc-vizag-seethammadhara',
    label: 'Seethammadhara / Maddilapalem, Vizag (530013)',
    title: 'Seethammadhara / Maddilapalem',
    subtitle: 'NH-16 Corridor, Visakhapatnam, AP',
    pincode: '530013',
    coords: [17.7436, 83.3145],
    aliases: ['seethammadhara', 'maddilapalem', 'hb colony', 'vizag'],
  },
  {
    id: 'loc-vizag-gajuwaka',
    label: 'Gajuwaka / Auto Nagar, Vizag (530026)',
    title: 'Gajuwaka / Kurmannapalem',
    subtitle: 'Visakhapatnam South, AP',
    pincode: '530026',
    coords: [17.6905, 83.2102],
    aliases: ['gajuwaka', 'sheela nagar', 'kurmannapalem', 'vizag'],
  },
  {
    id: 'loc-vizag-rushikonda',
    label: 'Rushikonda / Madhurawada / IT Hill, Vizag (530045)',
    title: 'Rushikonda / Madhurawada / Gitam',
    subtitle: 'Visakhapatnam Coastal Corridor, AP',
    pincode: '530045',
    coords: [17.7819, 83.3852],
    aliases: ['rushikonda', 'madhurawada', 'gitam', 'pm palem', 'vizag'],
  },
  {
    id: 'loc-vizag-airport',
    label: 'Visakhapatnam Airport / NAD Junction (530009)',
    title: 'Visakhapatnam Airport (VTZ) / NAD Kotha Road',
    subtitle: 'NAD Kotha Road, Vizag, AP',
    pincode: '530009',
    coords: [17.7212, 83.2245],
    aliases: ['vtz', 'nad', 'simhachalam', 'vizag airport', 'visakhapatnam airport'],
  },
  {
    id: 'loc-vja-pinnacle',
    label: 'Governorpet / Eluru Road, Vijayawada (520002)',
    title: 'Governorpet / Besant Road / Eluru Road',
    subtitle: 'Vijayawada Central, NTR District, AP',
    pincode: '520002',
    coords: [16.5126, 80.6313],
    aliases: ['governorpet', 'besant road', 'eluru road', 'buckinghampet', 'vijayawada'],
  },
  {
    id: 'loc-vja-gandhinagar',
    label: 'Gandhi Nagar / Satyannarayanapuram, Vijayawada (520003)',
    title: 'Gandhi Nagar / Mutylampadu / SN Puram',
    subtitle: 'Vijayawada, NTR District, AP',
    pincode: '520003',
    coords: [16.5218, 80.6378],
    aliases: ['gandhi nagar', 'satyanarayanapuram', 'sn puram', 'vijayawada'],
  },
  {
    id: 'loc-vja-mogalrajpuram',
    label: 'Mogalrajpuram / Benz Circle East, Vijayawada (520008)',
    title: 'Mogalrajpuram / Tikkle Road',
    subtitle: 'Vijayawada, NTR District, AP',
    pincode: '520008',
    coords: [16.5045, 80.6512],
    aliases: ['mogalrajpuram', 'labbipet', 'vijayawada'],
  },
  {
    id: 'loc-vja-kanuru',
    label: 'Kanuru / Poranki / Yanamalakuduru, Vijayawada (520007)',
    title: 'Kanuru / Poranki (Bandar Road)',
    subtitle: 'Vijayawada East, AP',
    pincode: '520007',
    coords: [16.4892, 80.6924],
    aliases: ['kanuru', 'poranki', 'penamaluru'],
  },
  {
    id: 'loc-gnt-arundelpet',
    label: 'Kothapet / Nagarampalem, Guntur (522004)',
    title: 'Nagarampalem / Stambalagaruvu',
    subtitle: 'Guntur, AP',
    pincode: '522004',
    coords: [16.3145, 80.4432],
    aliases: ['nagarampalem', 'stambalagaruvu', 'guntur'],
  },
  {
    id: 'loc-gnt-gorantla',
    label: 'Gorantla / Inner Ring Road, Guntur (522034)',
    title: 'Gorantla / Inner Ring Road',
    subtitle: 'Guntur North, AP',
    pincode: '522034',
    coords: [16.3324, 80.4278],
    aliases: ['gorantla', 'ring road', 'guntur'],
  },
  {
    id: 'loc-hyd-begumpet',
    label: 'Begumpet / Ameerpet / Punjagutta, Hyderabad (500016)',
    title: 'Begumpet / Ameerpet / Somajiguda',
    subtitle: 'Central Hyderabad, Telangana',
    pincode: '500016',
    coords: [17.4375, 78.4482],
    aliases: ['begumpet', 'ameerpet', 'punjagutta', 'sr nagar'],
  },
  {
    id: 'loc-hyd-srnagar',
    label: 'SR Nagar / KPHB / Erragadda, Hyderabad (500038)',
    title: 'SR Nagar / Sanathnagar / ESI',
    subtitle: 'Hyderabad, Telangana',
    pincode: '500038',
    coords: [17.4436, 78.4411],
    aliases: ['sr nagar', 'sanathnagar', 'erragadda'],
  },
  {
    id: 'loc-hyd-kondapur',
    label: 'Kondapur / Gachibowli North, Hyderabad (500084)',
    title: 'Kondapur / Masjid Banda / Botanical Garden',
    subtitle: 'West Hyderabad, Telangana',
    pincode: '500084',
    coords: [17.4622, 78.3568],
    aliases: ['kondapur', 'hafeezpet', 'kothaguda'],
  },
  {
    id: 'loc-hyd-miyapur',
    label: 'Miyapur / Nizampet, Hyderabad (500049)',
    title: 'Miyapur Metro / Bachupally',
    subtitle: 'Hyderabad North-West, Telangana',
    pincode: '500049',
    coords: [17.4968, 78.3614],
    aliases: ['miyapur', 'nizampet', 'bachupally'],
  },

  // --- RAYALASEEMA / TELANGANA DISTRICTS ---
  {
    id: 'loc-khammam',
    label: 'Khammam (507001)',
    title: 'Khammam',
    subtitle: 'Khammam District, Telangana',
    pincode: '507001',
    coords: [17.2473, 80.1514],
    aliases: ['khammam', 'kmm'],
  },
  {
    id: 'loc-warangal',
    label: 'Warangal / Hanamkonda (506001)',
    title: 'Warangal / Hanamkonda / NIT',
    subtitle: 'Warangal, Telangana',
    pincode: '506001',
    coords: [17.9689, 79.5941],
    aliases: ['warangal', 'hanamkonda', 'kazipet'],
  },
  {
    id: 'loc-kurnool',
    label: 'Kurnool (518001)',
    title: 'Kurnool',
    subtitle: 'Kurnool District, AP',
    pincode: '518001',
    coords: [15.8281, 78.0373],
    aliases: ['kurnool', 'nandyal', 'mahanandi'],
  },

  // --- CHENNAI & BENGALURU ---
  {
    id: 'loc-chennai',
    label: 'Chennai (Greams Rd Apollo / Central) (600006)',
    title: 'Chennai (Apollo / T. Nagar / Central)',
    subtitle: 'Chennai, Tamil Nadu',
    pincode: '600006',
    coords: [13.0827, 80.2707],
    aliases: ['chennai', 'maa', 'apollo hospital', 't nagar', 'central', 'egmore'],
  },
  {
    id: 'loc-chennai-airport',
    label: 'Chennai International Airport (MAA) (600027)',
    title: 'Chennai Airport (Meenambakkam - MAA)',
    subtitle: 'Chennai, Tamil Nadu',
    pincode: '600027',
    coords: [12.9941, 80.1709],
    aliases: ['maa', 'chennai airport', 'guindy', 'porur'],
  },
  {
    id: 'loc-vellore',
    label: 'CMC Hospital Vellore (632004)',
    title: 'CMC Vellore / Katpadi',
    subtitle: 'Vellore, Tamil Nadu',
    pincode: '632004',
    coords: [12.9255, 79.1353],
    aliases: ['cmc', 'vellore', 'katpadi', 'golden temple'],
  },
  {
    id: 'loc-bangalore',
    label: 'Bengaluru (Majestic / Silk Board) (560001)',
    title: 'Bengaluru (City Centre / Indiranagar)',
    subtitle: 'Bengaluru, Karnataka',
    pincode: '560001',
    coords: [12.9716, 77.5946],
    aliases: ['blr', 'bangalore', 'bengaluru', 'whitefield', 'marathahalli', 'electronic city', 'koramangala'],
  },
  {
    id: 'loc-bangalore-airport',
    label: 'Bengaluru Kempegowda Airport (BLR) (560300)',
    title: 'Bengaluru Airport (Devanahalli - BLR)',
    subtitle: 'Bengaluru, Karnataka',
    pincode: '560300',
    coords: [13.1986, 77.7066],
    aliases: ['blr airport', 'kempegowda', 'devanahalli', 'hebbal'],
  },
];

// Runtime cache mapping resolved place strings & PIN codes -> coordinates
const runtimeCoordsCache = new Map<string, { coords: [number, number]; label: string }>();

function normalizeKey(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function extractPincode(text: string): string | null {
  const match = text.match(/\b([1-9]\d{2})\s?(\d{3})\b/);
  return match ? `${match[1]}${match[2]}` : null;
}

export function registerLocationCoords(key: string, coords: [number, number], label?: string) {
  const norm = normalizeKey(key);
  if (!norm) return;
  runtimeCoordsCache.set(norm, { coords, label: label || key });
  const pin = extractPincode(key);
  if (pin && !runtimeCoordsCache.has(pin)) {
    runtimeCoordsCache.set(pin, { coords, label: label || key });
  }
}

export function findKnownLocationCoords(query: string): { coords: [number, number]; label: string } | null {
  const norm = normalizeKey(query);
  if (!norm) return null;

  const cached = runtimeCoordsCache.get(norm);
  if (cached) return cached;

  const pin = extractPincode(query);
  if (pin) {
    const cachedPin = runtimeCoordsCache.get(pin);
    if (cachedPin) return cachedPin;
    const byPin = POPULAR_LOCATIONS.find(
      (l) => l.pincode === pin || l.aliases?.some((a) => a === pin)
    );
    if (byPin?.coords) {
      return { coords: byPin.coords, label: byPin.title.split('(')[0].trim() };
    }
  }

  // 1. Exact label / title match first
  for (const loc of POPULAR_LOCATIONS) {
    if (!loc.coords) continue;
    const t = loc.title.toLowerCase();
    const l = loc.label.toLowerCase();
    if (l === norm || t === norm || norm.includes(t)) {
      return { coords: loc.coords, label: loc.title.split('(')[0].trim() };
    }
  }

  // 2. Partial match or alias match only for meaningful queries (3+ chars)
  if (norm.length >= 3) {
    for (const loc of POPULAR_LOCATIONS) {
      if (!loc.coords) continue;
      if (loc.label.toLowerCase().includes(norm)) {
        return { coords: loc.coords, label: loc.title.split('(')[0].trim() };
      }
      if (
        loc.aliases?.some((alias) => {
          const a = alias.toLowerCase();
          return norm === a || new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(norm);
        })
      ) {
        return { coords: loc.coords, label: loc.title.split('(')[0].trim() };
      }
    }
  }

  return null;
}

export function searchLocalLocations(query: string, maxResults = 8): LocationSuggestion[] {
  const q = normalizeKey(query);
  if (!q) {
    return POPULAR_LOCATIONS.slice(0, maxResults);
  }

  const collapsedDigits = q.replace(/\s+/g, '');
  const extractedPin = extractPincode(q);
  const tokens = q.split(' ').filter((t) => t.length >= 2);
  const scored: { item: LocationSuggestion; score: number }[] = [];

  for (const item of POPULAR_LOCATIONS) {
    let score = 0;
    const pin = (item.pincode || '').toLowerCase();
    const title = item.title.toLowerCase();
    const label = item.label.toLowerCase();
    const subtitle = item.subtitle.toLowerCase();
    const aliasText = (item.aliases || []).join(' ').toLowerCase();
    const haystack = `${pin} ${label} ${title} ${subtitle} ${aliasText}`;

    if (pin && (pin === q || pin === collapsedDigits || pin === extractedPin)) score += 100;
    else if (pin && (pin.startsWith(collapsedDigits) || pin.startsWith(q))) score += 75;
    else if (pin && pin.includes(collapsedDigits)) score += 45;

    if (title.startsWith(q)) score += 65;
    else if (title.includes(q)) score += 40;
    else if (label.includes(q)) score += 35;

    if (subtitle.includes(q)) score += 25;

    if (item.aliases?.some((a) => a.toLowerCase() === q)) score += 80;
    else if (item.aliases?.some((a) => a.toLowerCase().startsWith(q))) score += 50;
    else if (item.aliases?.some((a) => a.toLowerCase().includes(q))) score += 30;

    // Multi-token fallback (e.g. "vizag 530016" or "nri mangalagiri")
    if (score === 0 && tokens.length > 1 && tokens.every((tok) => haystack.includes(tok))) {
      score += 55;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults).map((s) => s.item);
}
