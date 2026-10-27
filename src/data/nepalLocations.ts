export interface ValleyHub {
  name: string;
  district: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur';
  defaultLat: number;
  defaultLng: number;
  commonLandmarks: string[];
}

export const KATHMANDU_VALLEY_HUBS: ValleyHub[] = [
  {
    name: 'New Baneshwor / Old Baneshwor',
    district: 'Kathmandu',
    defaultLat: 27.6915,
    defaultLng: 85.3420,
    commonLandmarks: ['Near Eyeplex Mall', 'Opposite Parliament Building', 'Near Krishna Tower', 'Shankhamul Chowk']
  },
  {
    name: 'Jhamsikhel / Sanepa',
    district: 'Lalitpur',
    defaultLat: 27.6792,
    defaultLng: 85.3114,
    commonLandmarks: ['Near British School', 'Moksh Chowk', 'Near St. Mary’s School', 'Sanepa Bridge']
  },
  {
    name: 'Maharajgunj / Baluwatar',
    district: 'Kathmandu',
    defaultLat: 27.7348,
    defaultLng: 85.3312,
    commonLandmarks: ['Near Teaching Hospital', 'Bhatbhateni Maharajgunj', 'Near Russian Embassy', 'Police Headquarter Gate']
  },
  {
    name: 'Pulchowk / Jawalakhel / Kumaripati',
    district: 'Lalitpur',
    defaultLat: 27.6749,
    defaultLng: 85.3168,
    commonLandmarks: ['Opposite Labim Mall', 'Jawalakhel Zoo Gate', 'Near Central Zoo', 'Kumaripati Chowk']
  },
  {
    name: 'Koteshwor / Tinkune / Sinamangal',
    district: 'Kathmandu',
    defaultLat: 27.6800,
    defaultLng: 85.3460,
    commonLandmarks: ['Near Koteshwor Chowk', 'Tinkune Park Gate', 'Opposite KMC Hospital', 'Jadibuti Checkpoint']
  },
  {
    name: 'Boudha / Jorpati / Chabahil',
    district: 'Kathmandu',
    defaultLat: 27.7215,
    defaultLng: 85.3620,
    commonLandmarks: ['Boudhanath Stupa Main Gate', 'Chabahil Chowk', 'Near Hyatt Regency', 'Beside Nepal Medical College']
  },
  {
    name: 'Thamel / Lazimpat / Panipokhari',
    district: 'Kathmandu',
    defaultLat: 27.7154,
    defaultLng: 85.3123,
    commonLandmarks: ['Near Garden of Dreams', 'Radisson Hotel Lazimpat', 'Opposite French Embassy', 'Chhetrapati Chowk']
  },
  {
    name: 'Kalanki / Kuleshwor / Balkhu',
    district: 'Kathmandu',
    defaultLat: 27.6937,
    defaultLng: 85.2818,
    commonLandmarks: ['Kalanki Underpass Chowk', 'Balkhu Fruit Market', 'Near Vayodha Hospital', 'Kuleshwor Awas']
  },
  {
    name: 'Suryabinayak / Thimi / Bhaktapur Durbar',
    district: 'Bhaktapur',
    defaultLat: 27.6710,
    defaultLng: 85.4298,
    commonLandmarks: ['Suryabinayak Chowk', 'Radhe Radhe Bhatbhateni', 'Thimi Shankhadhar Chowk', 'Near Sallaghari Ground']
  },
  {
    name: 'Satdobato / Imadol / Gwarko',
    district: 'Lalitpur',
    defaultLat: 27.6587,
    defaultLng: 85.3263,
    commonLandmarks: ['Satdobato Swimming Complex Gate', 'Gwarko Flyover', 'Near B&B Hospital', 'Imadol Krishna Mandir']
  }
];

export const MAJOR_NEPAL_CITIES = [
  'Kathmandu Valley (Kathmandu / Lalitpur / Bhaktapur)',
  'Pokhara (Kaski)',
  'Chitwan (Bharatpur / Narayangarh)',
  'Butwal / Bhairahawa (Rupandehi)',
  'Biratnagar (Morang)',
  'Dharan (Sunsari)',
  'Itahari (Sunsari)',
  'Nepalgunj (Banke)',
  'Hetauda (Makwanpur)',
  'Birgunj (Parsa)',
  'Dhangadhi (Kailali)',
  'Surkhet (Birendranagar)',
  'Other Nepal Location'
];

export const SANO_WHATSAPP_NUMBER = '9779800000000'; // Nepal country code +977
export const SANO_CONTACT_PHONE = '+977 980-000-0000';
export const SANO_STORE_LOCATION = 'Jhamsikhel, Lalitpur (Opening Late 2026)';
export const SANO_DISPATCH_HUB = 'Kathmandu Valley Central Fulfilment';
