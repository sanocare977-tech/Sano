import { CategoryId } from '../types';

export interface ParentingInsightArticle {
  id: string;
  stageTitle: string;
  ageBracket: string;
  title: string;
  readingTime: string;
  summary: string;
  badgeColor: string;
  keyPoints: string[];
  pediatricianTip: string;
  linkedCategory: CategoryId;
  linkedCategoryLabel: string;
  fullContent: string[];
}

export const PARENTING_INSIGHTS: ParentingInsightArticle[] = [
  {
    id: 'insight-01',
    stageTitle: 'Newborn (0–3 Months)',
    ageBracket: '0–3 Months (50–62 cm)',
    title: 'The Fourth Trimester: Umbilical Care, Skin-to-Skin & Feeding Cues',
    readingTime: '3 min read',
    summary: 'Why the first 12 weeks are an extension of the womb, how to care for the healing cord stump, and how simple front-wrap clothing prevents distress.',
    badgeColor: 'bg-[#F5B301]/20 text-[#1F2A44]',
    keyPoints: [
      'Keep the umbilical cord stump dry and fold down diapers beneath the navel.',
      'Front-wrap kimono bodysuits reduce sudden Moro startle reflex during changes.',
      'Skin-to-skin chest contact stabilizes newborn blood sugar, temperature, and maternal milk supply.'
    ],
    pediatricianTip: 'In Kathmandu winters, dress baby in one layer more than an adult feels comfortable in, using breathable natural cotton rather than synthetic fleece directly on the skin.',
    linkedCategory: 'hospital_bag',
    linkedCategoryLabel: 'Shop Hospital & Newborn Essentials',
    fullContent: [
      'The transition from womb to world is the most sensory-overwhelming phase of your baby’s entire life. Loud noises, room temperature fluctuations, and diaper adjustments can easily overstimulate a newborn.',
      'Keeping clothing simple and front-opening (like wrap-around kimonos) prevents you from having to pull tight collars over the fontanelle (soft spot). Pair this with loose swaddling with arms across chest to mimic the snug uterine wall.',
      'For the umbilical cord, modern medical advice from pediatricians across Patan and Teaching Hospital is "dry care" — keep it clean and dry with sponge baths until the stump detaches naturally around day 7–14.'
    ]
  },
  {
    id: 'insight-02',
    stageTitle: 'Infants (4–12 Months)',
    ageBracket: '4–12 Months (62–80 cm)',
    title: 'Weaning Milestones: Moving Beyond Milk to Solid Foods & First Chews',
    readingTime: '4 min read',
    summary: 'Signs of weaning readiness, introducing traditional foods like Jaulo and fruit purees, and why mess-free silicone tableware encourages motor confidence.',
    badgeColor: 'bg-[#5DAA7A]/20 text-[#1F2A44]',
    keyPoints: [
      'Look for the three key readiness cues: sitting up unassisted, loss of tongue-thrust reflex, and hand-to-mouth coordination.',
      'Suction bowls that lock to the high-chair tray encourage baby to self-feed with soft spoons without sudden floor spills.',
      'Introduce single-ingredient foods 3 days apart to monitor any allergic reactions.'
    ],
    pediatricianTip: 'Iron stores from birth start depleting around 6 months. Prioritize iron-rich pureed lentils (masoor/moong dal), steamed spinach puree, and fortified baby grains.',
    linkedCategory: 'feeding',
    linkedCategoryLabel: 'Shop Weaning Bowls & Feeding Gear',
    fullContent: [
      'Around the 6-month mark, babies naturally show curiosity when parents eat. This period is critical not just for caloric intake, but for jaw muscular development and tactile sensory exploration.',
      'Traditional Nepali weaning (Pasni) marks the introduction of cereals. When introducing first solids, patience is essential — a baby may taste a food 10 to 15 times before accepting the flavor.',
      'Using ergonomic, gum-friendly silicone spoons that double as teethers prevents bruising sore gums, while suction-base plates reduce parental cleanup fatigue.'
    ]
  },
  {
    id: 'insight-03',
    stageTitle: 'Toddlers (1–3 Years)',
    ageBracket: '1–3 Years (80–98 cm)',
    title: 'Tantrums as Communication & Recognizing Potty Training Readiness',
    readingTime: '4 min read',
    summary: 'Understanding the toddler brain: big emotions without adult words. Plus gentle, low-pressure signs that your child is ready to graduate from diapers.',
    badgeColor: 'bg-[#8FD0EA]/30 text-[#1F2A44]',
    keyPoints: [
      'Toddlers have an underdeveloped prefrontal cortex; tantrums are a stress overload, not intentional defiance.',
      'Potty readiness signals include staying dry for 2+ hours, hiding during bowel movements, and disliking wet diapers.',
      'Pant-style pull-up diapers provide the psychological bridge between baby diapers and big-kid underwear.'
    ],
    pediatricianTip: 'Never scold or punish accidents during potty training. Celebrate the effort and keep a comfortable, low-height potty chair accessible in the living area.',
    linkedCategory: 'diapering',
    linkedCategoryLabel: 'Shop Pant Diapers & Potty Training',
    fullContent: [
      'Between age one and three, children experience rapid neurological development. They desire independence ("I do it!") but lack the vocabulary to express complex frustration.',
      'Staying calm, naming the emotion ("You really wanted that biscuit; it feels hard to wait"), and offering binary choices (e.g., "Do you want to wear the blue dino shirt or yellow shirt?") helps restore child autonomy.',
      'When transitioning away from diapers, pull-up pants allow the child to pull them down independently, fostering pride and body awareness.'
    ]
  },
  {
    id: 'insight-04',
    stageTitle: 'Early Childhood (4–7 Years)',
    ageBracket: '4–7 Years (98–122 cm)',
    title: 'Independent Play, Gross Motor Agility & Emotional Resilience',
    readingTime: '3 min read',
    summary: 'How open-ended building blocks, outdoor running, and unstructured creative play lay neural foundations for future school focus.',
    badgeColor: 'bg-[#F5B301]/20 text-[#1F2A44]',
    keyPoints: [
      'Unstructured open-ended play develops executive function and self-regulation.',
      'Kids at this age need at least 60–90 minutes of active gross motor physical movement daily.',
      'Clothes should feature reinforced knees, elastic waistbands, and breathable fibers to endure vigorous playground exploration.'
    ],
    pediatricianTip: 'Limit recreational screen time to under 1 hour daily, and keep bedrooms completely screen-free to protect melatonin sleep cycles.',
    linkedCategory: 'play_learning',
    linkedCategoryLabel: 'Shop Montessori Toys & Learning Sets',
    fullContent: [
      'During ages 4 through 7, a child’s brain is pruning and strengthening neural pathways at an unprecedented speed. While academic readiness is important, cognitive research consistently proves that play is a child’s true work.',
      'Building with blocks and manipulating tactile materials strengthens finger dexterity needed for handwriting, while outdoor climbing builds core postural stability.',
      'Dressing children in stretchable, non-restrictive clothing gives them the physical freedom to explore nature without worrying about tears or stains.'
    ]
  },
  {
    id: 'insight-05',
    stageTitle: 'Middle Childhood (8–11 Years)',
    ageBracket: '8–11 Years (122–146 cm)',
    title: 'Spinal Health: Preventing Heavy Backpack Lumbar Strain & Study Posture',
    readingTime: '3 min read',
    summary: 'A backpack should never exceed 10–15% of a child’s body weight. Tips on choosing anatomical school bags, desk seating, and visual ergonomics.',
    badgeColor: 'bg-[#5DAA7A]/20 text-[#1F2A44]',
    keyPoints: [
      'Pack heavy textbooks closest to the child’s spine, not in the outer pockets.',
      'Always use both padded shoulder straps plus the chest stabilizer clip.',
      'Ensure the study desk allows feet to rest flat on the floor with 90° elbow angles.'
    ],
    pediatricianTip: 'If your child leans forward while walking or complains of shoulder aches after returning from school, weigh their loaded bag immediately.',
    linkedCategory: 'outdoor_safety',
    linkedCategoryLabel: 'Shop Ergonomic Backpacks & Gear',
    fullContent: [
      'Between 8 and 11 years, children experience rapid skeletal growth plates lengthening. Carrying oversized, unpadded bags causes abnormal compensatory spinal curvatures.',
      'Anatomically contoured backpacks with high-density EVA back pads redistribute downward gravitational pull from the weak neck muscles to the stronger pelvic bones.',
      'Pairing proper school gear with periodic stretch breaks every 30 minutes during homework keeps the lumbar spine healthy.'
    ]
  },
  {
    id: 'insight-06',
    stageTitle: 'Adolescents (12–14 Years)',
    ageBracket: '12–14 Years (146–164 cm)',
    title: 'Adolescent Skincare 101: T-Zone Breakouts, Gentle Cleansing & Self-Care',
    readingTime: '3 min read',
    summary: 'Hormonal surges activate sebaceous oil glands. Why harsh astringents make teenage acne worse, and how gentle pH-balanced routines create confidence.',
    badgeColor: 'bg-[#8FD0EA]/30 text-[#1F2A44]',
    keyPoints: [
      'Harsh alcohol-based scrubs strip the skin barrier, triggering the body to produce even more sebum oil.',
      'Encourage a simple 3-step routine: gentle low-dose salicylic/ceramide cleanser, lightweight hydrating gel, and daily sunscreen.',
      'Choose tagless, soft loopback organic clothing that prevents sweat chafing during after-school sports.'
    ],
    pediatricianTip: 'Adolescent skin is still thin and sensitive. Never pick or pop inflammatory blemishes to prevent lifelong hyperpigmentation scars.',
    linkedCategory: 'baby_care',
    linkedCategoryLabel: 'Shop Gentle Skincare & Essentials',
    fullContent: [
      'Puberty triggers hormonal changes that directly impact the skin’s acid mantle and sebaceous gland output. For teenagers, skin issues can deeply influence social self-esteem.',
      'The modern medical consensus is to avoid abrasive physical scrubs. Instead, gentle chemical exfoliants like encapsulated 0.5% salicylic acid paired with calming niacinamide and ceramides unclog pores while nourishing the skin barrier.',
      'Breathable, natural combed cotton apparel reduces body odor and sweat trapping, keeping active teens comfortable all day.'
    ]
  },
  {
    id: 'insight-07',
    stageTitle: 'Hospital Etiquette & Gifting',
    ageBracket: 'For Family, Visitors & Friends',
    title: 'Visiting a New Mom & Baby in Nepal: What to Gift & Hospital Courtesies',
    readingTime: '3 min read',
    summary: 'Practical advice for relatives and friends: why diapers and mom-care hampers beat loud toys, wash your hands first, and why short visits are the kindest blessing.',
    badgeColor: 'bg-[#E8604F]/15 text-[#1F2A44]',
    keyPoints: [
      'Keep visits under 15–20 minutes so mother and baby can nurse and rest.',
      'Never visit if you have a cold or cough, and always wash hands before touching baby hands.',
      'Curated hampers containing practical items (diapers, organic swaddles, mother healing balms) bring genuine relief to parents.'
    ],
    pediatricianTip: 'Resist kissing newborns on the face or hands. Their immune system is still naive, and respiratory viruses like RSV spread rapidly through saliva contact.',
    linkedCategory: 'gift_hampers',
    linkedCategoryLabel: 'Explore Hospital Visitor Gift Hampers',
    fullContent: [
      'Welcoming a new baby is an occasion filled with immense joy in Nepali culture. Yet, behind the smiles, the new mother is often recovering from physical trauma and navigating sleepless nights.',
      'When visiting hospital maternity wards at Norvic, Grande, Patan, or Mediciti, the most thoughtful visitors bring gifts that directly alleviate parental burden — such as pre-sterilized organic essentials, restorative teas, and diapers.',
      'Our Sano Curated Gift Hampers are assembled to eliminate visitor guesswork, featuring letterpress blessing cards and pre-packaged hospital-ready presentation.'
    ]
  }
];
