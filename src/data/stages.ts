import { AgeStage, Category } from '../types';

export const AGE_STAGES: AgeStage[] = [
  {
    id: 'pregnancy',
    label: 'Pregnancy',
    ageRange: 'Maternity',
    heightRange: 'Trimester 1–3 & Postpartum',
    description: 'Support, nursing pillows, belly care, and hospital bag essentials.',
    badge: 'Moms & Newborn'
  },
  {
    id: 'newborn',
    label: '0–6 Months',
    ageRange: '0–6 Months',
    heightRange: '56–68 cm',
    description: 'Ultra-soft organic cotton onesies, swaddles, and gentle skin care.',
    badge: '56–68 cm'
  },
  {
    id: 'infant',
    label: '6–12 Months',
    ageRange: '6–12 Months',
    heightRange: '68–80 cm',
    description: 'Weaning bibs, crawl-safe knee rompers, and tactile sensory toys.',
    badge: '68–80 cm'
  },
  {
    id: 'toddler',
    label: '1–3 Years',
    ageRange: '1–3 Years',
    heightRange: '80–98 cm',
    description: 'Everyday durable playwear, first shoes, suction tableware, and step stools.',
    badge: '80–98 cm'
  },
  {
    id: 'early_child',
    label: '4–7 Years',
    ageRange: '4–7 Years',
    heightRange: '104–122 cm',
    description: 'Pre-school sets, rain boots, STEM building kits, and gentle hair care.',
    badge: '104–122 cm'
  },
  {
    id: 'middle_child',
    label: '8–11 Years',
    ageRange: '8–11 Years',
    heightRange: '122–146 cm',
    description: 'Ergonomic school packs, breathable activewear, reading lamps, and puzzles.',
    badge: '122–146 cm'
  },
  {
    id: 'teen',
    label: '12–14 Years',
    ageRange: '12–14 Years',
    heightRange: '146–164 cm',
    description: 'Comfort casuals, sensitive skincare, study gear, and cozy sleepwear.',
    badge: '146–164 cm'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Essentials',
    iconName: 'Sparkles',
    description: 'Handpicked, tested products across all age stages.'
  },
  {
    id: 'maternity_care',
    name: 'Pregnancy & Postpartum',
    iconName: 'HeartHandshake',
    description: 'Support cushions, nursing care, belly butter, and hospital bags.'
  },
  {
    id: 'baby_care',
    name: 'Care & Daily Hygiene',
    iconName: 'ShieldCheck',
    description: 'Gentle wipes, hypoallergenic oils, nasal aspirators, and organic washcloths.'
  },
  {
    id: 'apparel',
    name: 'Clothing & Daily Wear',
    iconName: 'Shirt',
    description: 'Breathable combed cottons with height-indexed sizing.'
  },
  {
    id: 'feeding',
    name: 'Feeding & Nutrition',
    iconName: 'Utensils',
    description: 'Anti-colic bottles, food-grade silicone sets, spill-proof cups.'
  },
  {
    id: 'sleep_nursery',
    name: 'Sleep & Nursery',
    iconName: 'Moon',
    description: 'Breathable sleep sacks, organic cotton cot sheets, and white noise.'
  },
  {
    id: 'play_learning',
    name: 'Play, STEM & Books',
    iconName: 'Puzzle',
    description: 'Open-ended wooden toys, tactile Montessori sets, and thoughtful reads.'
  },
  {
    id: 'outdoor_safety',
    name: 'Gear, Travel & Safety',
    iconName: 'Compass',
    description: 'Ergonomic baby carriers, compact strollers, and protective pads.'
  }
];
