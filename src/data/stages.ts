import { AgeStage, Category } from '../types';

export const AGE_HEIGHT_BRACKETS = [
  { id: 'preemie', label: 'Preemie', ageRange: '< 0M', heightRange: '< 50 cm', minHeight: 0, maxHeight: 50 },
  { id: 'newborn', label: 'Newborn', ageRange: '0–1M', heightRange: '50–56 cm', minHeight: 50, maxHeight: 56 },
  { id: '0_3m', label: '0–3 Months', ageRange: '0–3M', heightRange: '56–62 cm', minHeight: 56, maxHeight: 62 },
  { id: '3_6m', label: '3–6 Months', ageRange: '3–6M', heightRange: '62–68 cm', minHeight: 62, maxHeight: 68 },
  { id: '6_9m', label: '6–9 Months', ageRange: '6–9M', heightRange: '68–74 cm', minHeight: 68, maxHeight: 74 },
  { id: '9_12m', label: '9–12 Months', ageRange: '9–12M', heightRange: '74–80 cm', minHeight: 74, maxHeight: 80 },
  { id: '12_18m', label: '12–18 Months', ageRange: '12–18M', heightRange: '80–86 cm', minHeight: 80, maxHeight: 86 },
  { id: '18_24m', label: '18–24 Months', ageRange: '18–24M', heightRange: '86–92 cm', minHeight: 86, maxHeight: 92 },
  { id: '2_3y', label: '2–3 Years', ageRange: '2–3Y', heightRange: '92–98 cm', minHeight: 92, maxHeight: 98 },
  { id: '3_4y', label: '3–4 Years', ageRange: '3–4Y', heightRange: '98–104 cm', minHeight: 98, maxHeight: 104 },
  { id: '4_6y', label: '4–6 Years', ageRange: '4–6Y', heightRange: '104–116 cm', minHeight: 104, maxHeight: 116 },
  { id: '6_8y', label: '6–8 Years', ageRange: '6–8Y', heightRange: '116–128 cm', minHeight: 116, maxHeight: 128 },
  { id: '8_14y', label: '8–14 Years', ageRange: '8–14Y', heightRange: '128–164 cm', minHeight: 128, maxHeight: 164 },
];

export const AGE_STAGES: AgeStage[] = [
  {
    id: 'pregnancy',
    label: 'Pregnancy & Newborn',
    ageRange: 'Maternity',
    heightRange: 'Trimester 1–3 & Birth',
    description: 'Support, nursing pillows, belly care, and hospital bag essentials.',
    badge: 'Moms & Newborn'
  },
  {
    id: 'newborn',
    label: '0–6 Months',
    ageRange: '0–6 Months',
    heightRange: '50–68 cm',
    description: 'Ultra-soft organic cotton onesies, swaddles, and gentle skin care.',
    badge: '50–68 cm'
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
    heightRange: '98–122 cm',
    description: 'Pre-school sets, rain boots, STEM building kits, and gentle hair care.',
    badge: '98–122 cm'
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
    name: 'All Departments',
    iconName: 'Sparkles',
    description: 'Complete catalog from pregnancy to 14 years.',
    brandScope: 'both'
  },
  {
    id: 'apparel',
    name: 'Boy & Girl Fashion',
    iconName: 'Shirt',
    description: 'Rompers, sets, dresses, t-shirts with age & height indexed sizing.',
    brandScope: 'sano'
  },
  {
    id: 'hospital_bag',
    name: 'Hospital Delivery Bag',
    iconName: 'Briefcase',
    description: 'Labour & delivery, postpartum recovery, and newborn baby essentials.',
    brandScope: 'both'
  },
  {
    id: 'gift_hampers',
    name: 'Gifts & Hampers (उपहार)',
    iconName: 'Gift',
    description: 'Curated sets for Grandparents, Relatives, Colleagues & Baby Showers.',
    brandScope: 'both'
  },
  {
    id: 'diapering',
    name: 'Diapers & Wipes',
    iconName: 'Layers',
    description: 'Pants, tape diapers, biodegradable water wipes, rash balms.',
    brandScope: 'sano_care'
  },
  {
    id: 'feeding',
    name: 'Feeding & Nursing',
    iconName: 'Utensils',
    description: 'Anti-colic bottles, food-grade silicone sets, spill-proof cups.',
    brandScope: 'sano_care'
  },
  {
    id: 'baby_care',
    name: 'Bath & Skincare',
    iconName: 'ShieldCheck',
    description: 'Gentle washes, cold-pressed oils, barrier creams, and massage lotions.',
    brandScope: 'sano_care'
  },
  {
    id: 'maternity_care',
    name: 'Moms & Maternity',
    iconName: 'HeartHandshake',
    description: 'Support cushions, nursing care, belly butter, recovery wear.',
    brandScope: 'sano_care'
  },
  {
    id: 'sleep_nursery',
    name: 'Nursery & Sleep',
    iconName: 'Moon',
    description: 'Breathable swaddles, bamboo sleepsuits, organic cotton cot bedding.',
    brandScope: 'sano'
  },
  {
    id: 'play_learning',
    name: 'Toys & Learning',
    iconName: 'Puzzle',
    description: 'Montessori wooden toys, rattles, STEM games, activity cubes.',
    brandScope: 'sano'
  },
  {
    id: 'outdoor_safety',
    name: 'Gear & Safety',
    iconName: 'Compass',
    description: 'Ergonomic baby carriers, compact strollers, and car travel gear.',
    brandScope: 'sano'
  }
];
