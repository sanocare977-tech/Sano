import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Plus, 
  HeartHandshake, 
  Baby, 
  Activity,
  ShieldCheck,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export type HospitalBagCategory = 'before_delivery' | 'after_delivery' | 'for_newborn';

export interface EssentialProductRecommendation {
  id: string;
  name: string;
  category: HospitalBagCategory;
  categoryLabel: 'Before Delivery (Labour)' | 'For Mother (After Delivery)' | 'For Newborn';
  priceNPR: number;
  originalPriceNPR?: number;
  image: string;
  shortDescription: string;
  whyEssential: string;
  nurseTip: string;
  defaultSize: string;
  badge?: string;
}

export const HOSPITAL_BAG_ESSENTIALS_DATA: EssentialProductRecommendation[] = [
  // ==========================================
  // 1. Before Delivery (Labour)
  // ==========================================
  {
    id: 'hb-bd-01',
    name: 'Labour & Delivery Bamboo Snap Hospital Gown',
    category: 'before_delivery',
    categoryLabel: 'Before Delivery (Labour)',
    priceNPR: 2250,
    originalPriceNPR: 2650,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    shortDescription: 'Silky-soft organic bamboo gown with full snap-down back for epidural placement and front shoulder snaps for instant skin-to-skin bonding.',
    whyEssential: 'Preserves mother dignity in labour while giving obstetricians and nurses immediate medical access without awkward hospital tie-gowns.',
    nurseTip: 'Hospital-provided gowns are rough and untie easily; this keeps you warm, covered, and comfortable while pacing during contractions.',
    defaultSize: 'Free Size (M/L Stretch)',
    badge: 'Labor Ward Essential'
  },
  {
    id: 'hb-bd-02',
    name: 'Labour Grippy Acupressure Non-Skid Warm Socks & Squeeze Ball',
    category: 'before_delivery',
    categoryLabel: 'Before Delivery (Labour)',
    priceNPR: 650,
    originalPriceNPR: 800,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: 'Cushioned terry cotton socks with anti-slip silicone floor treads plus ergonomic foam contraction stress ball.',
    whyEssential: 'Kathmandu hospital ward floor tiles are cold and slippery; squeeze ball helps manage peak contraction intensity during early active labor.',
    nurseTip: 'Pacing during contractions shortens labor; slip treads prevent slipping on polished ward floors.',
    defaultSize: 'Free Size',
    badge: 'Slip Protection'
  },
  {
    id: 'hb-bd-03',
    name: 'Pure Organic Himalayan Rosewater & Lip Hydration Labor Mist',
    category: 'before_delivery',
    categoryLabel: 'Before Delivery (Labour)',
    priceNPR: 850,
    originalPriceNPR: 950,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: '100% Steam-distilled rosewater face cooling spray paired with organic beeswax honey lip balm.',
    whyEssential: 'Delivery room oxygen and air-conditioning severely dry out lips and mouth during hours of heavy breathing.',
    nurseTip: 'Have your birth partner spritz your face and neck between intense contractions for instant refreshing calm.',
    defaultSize: '100ml Mist + 15g Balm',
    badge: 'Calming Aromatherapy'
  },
  {
    id: 'hb-bd-04',
    name: 'Maternity Labor Electrolyte & Coconut Hydration Chews (10 Pack)',
    category: 'before_delivery',
    categoryLabel: 'Before Delivery (Labour)',
    priceNPR: 750,
    originalPriceNPR: 900,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: 'Doctor-formulated chewable electrolytes for clean stamina and gentle gastric comfort without bloating during labor pacing.',
    whyEssential: 'Most hospitals restrict heavy solid foods during active labor; quick hydration chews keep energy from crashing.',
    nurseTip: 'Safe to dissolve slowly between contractions when water feels too heavy.',
    defaultSize: 'Pack of 10 Chews',
    badge: 'Sustained Energy'
  },

  // ==========================================
  // 2. For Mother (After Delivery)
  // ==========================================
  {
    id: 'hb-ad-01',
    name: 'Postpartum High-Waist Seamless Recovery Briefs (Pack of 4)',
    category: 'after_delivery',
    categoryLabel: 'For Mother (After Delivery)',
    priceNPR: 1650,
    originalPriceNPR: 1950,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    shortDescription: 'Ultra-stretch micro-mesh disposable/washable underwear designed with zero waistband pressure, ideal for both C-section incision and vaginal birth recovery.',
    whyEssential: 'Holds bulky maternity pads firmly in place without pressing on tender stitches or surgical incisions.',
    nurseTip: 'Pack at least 4 pairs in your bag. Regular underwear elastics sit right on C-section scars.',
    defaultSize: 'Expandable Free Size',
    badge: 'C-Section Safe'
  },
  {
    id: 'hb-ad-02',
    name: 'Ergonomic Angled Upside-Down Peri Cleansing Bottle',
    category: 'after_delivery',
    categoryLabel: 'For Mother (After Delivery)',
    priceNPR: 950,
    originalPriceNPR: 1200,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: 'Angled narrow-neck nozzle with continuous gentle water spray designed specifically for postpartum perineal hygiene without bending.',
    whyEssential: 'Using dry toilet paper after delivery causes burning and tear irritation; warm water stream cleans painlessly.',
    nurseTip: 'Fill with lukewarm water and use simultaneously while peeing to soothe post-birth stinging.',
    defaultSize: '300ml Hospital Size',
    badge: '#1 Obstetrician Rec'
  },
  {
    id: 'hb-ad-03',
    name: 'Organic Plant-Based Lanolin-Free Nipple Healing Balm',
    category: 'after_delivery',
    categoryLabel: 'For Mother (After Delivery)',
    priceNPR: 1100,
    originalPriceNPR: 1350,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: '100% USDA Certified Organic botanical balm with calendula and shea butter. 100% baby-safe, zero need to wipe off before nursing.',
    whyEssential: 'Early breastfeeding trial and latch friction cause painful cracked nipples within the first 24–48 hours.',
    nurseTip: 'Apply immediately after colostrum feedings. No wash-off needed before baby nurses again.',
    defaultSize: '60 ml Tin',
    badge: '100% Edible Safe'
  },
  {
    id: 'hb-ad-04',
    name: 'Ultra-Absorbent Bamboo Postpartum Maternity Pads (Pack of 12)',
    category: 'after_delivery',
    categoryLabel: 'For Mother (After Delivery)',
    priceNPR: 850,
    originalPriceNPR: 980,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: 'Extra-long 380mm organic bamboo maternity pads with leak-guard wings, hypoallergenic top sheet, and herbal cooling sensation.',
    whyEssential: 'Normal menstrual pads cannot handle heavy post-birth lochia flow and often irritate perineal tears.',
    nurseTip: 'Nurses recommend changing every 3 hours to prevent bacterial infections and monitor post-birth bleeding.',
    defaultSize: '12 Heavy-Flow Pads',
    badge: '380mm Extra Length'
  },

  // ==========================================
  // 3. For Newborn
  // ==========================================
  {
    id: 'hb-fn-01',
    name: 'Pure Organic Cotton Kimono Wrap Bodysuit (Pack of 2)',
    category: 'for_newborn',
    categoryLabel: 'For Newborn',
    priceNPR: 1450,
    originalPriceNPR: 1750,
    image: '/assets/aistudio/10_bf02129f.png',
    shortDescription: 'Side-snap wrap style kimono romper in unbleached GOTS-certified organic cotton with fold-over scratch mittens.',
    whyEssential: 'Never goes over the newborn’s fragile head or tugs on the fresh umbilical cord stump.',
    nurseTip: 'Hospital staff request side-snap clothes because they can examine baby’s chest without undressing them completely.',
    defaultSize: 'Newborn (50–56 cm)',
    badge: 'Umbilical Cord Safe'
  },
  {
    id: 'hb-fn-02',
    name: 'Himalayan 4-Layer Bamboo Muslin Swaddle Blankets (Set of 2)',
    category: 'for_newborn',
    categoryLabel: 'For Newborn',
    priceNPR: 1250,
    originalPriceNPR: 1550,
    image: '/assets/aistudio/8_0377a488.png',
    shortDescription: 'Generously sized (120 × 120 cm) ultra-breathable muslin swaddles with feather-light warmth and soft thermal drape.',
    whyEssential: 'Prevents the infant startle (Moro) reflex and helps newborn regulate body temperature outside the womb.',
    nurseTip: 'Also doubles as a clean nursing cover in the hospital ward, stroller shade, or burp blanket.',
    defaultSize: '120 × 120 cm (Set of 2)',
    badge: 'Gentle Swaddling'
  },
  {
    id: 'hb-fn-03',
    name: 'Soft Newborn Organic Beanie Knot Hat & Mittens Set',
    category: 'for_newborn',
    categoryLabel: 'For Newborn',
    priceNPR: 450,
    originalPriceNPR: 550,
    image: '/assets/aistudio/7_416501e2.png',
    shortDescription: 'Ultra-stretch ribbed organic cotton knot hat with adjustable knot to fit preemie to full-term heads plus gentle elasticated scratch mittens.',
    whyEssential: 'Newborns lose up to 50% of body heat through their heads in the first 24 hours of life; mittens stop accidental face scratches.',
    nurseTip: 'Keep hat on baby immediately after post-birth wiping while doing skin-to-skin kangaroo care.',
    defaultSize: 'Newborn 0–1M',
    badge: 'Thermal Protection'
  },
  {
    id: 'hb-fn-04',
    name: 'Meconium-Safe 99% Pure Water Wipes & Newborn Diaper Caddy',
    category: 'for_newborn',
    categoryLabel: 'For Newborn',
    priceNPR: 1350,
    originalPriceNPR: 1600,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    shortDescription: 'Compact nursery organizer caddy stocked with 24 Newborn tape diapers, 2 packs of pure water wipes, and zinc barrier rash balm.',
    whyEssential: 'Cleans sticky newborn first meconium stools gently without perfume, alcohol, or sting on sensitive skin.',
    nurseTip: 'Keep this right on your hospital bedside table for effortless midnight diaper changes.',
    defaultSize: 'Newborn Kit (<5 kg)',
    badge: 'Meconium Cleanser'
  }
];

interface HospitalBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product, variant: string) => void;
}

export const HospitalBagModal: React.FC<HospitalBagModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | HospitalBagCategory>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const categories = [
    { 
      id: 'all', 
      label: 'All 3 Categories', 
      icon: Sparkles,
      count: HOSPITAL_BAG_ESSENTIALS_DATA.length,
      desc: 'Complete overview of Kathmandu hospital essentials.'
    },
    { 
      id: 'before_delivery', 
      label: 'Before Delivery (Labour)', 
      icon: Activity,
      count: HOSPITAL_BAG_ESSENTIALS_DATA.filter(i => i.category === 'before_delivery').length,
      desc: 'Comfort gown, non-skid socks, hydration mist & chews for labor pacing.'
    },
    { 
      id: 'after_delivery', 
      label: 'For Mother (After Delivery)', 
      icon: HeartHandshake,
      count: HOSPITAL_BAG_ESSENTIALS_DATA.filter(i => i.category === 'after_delivery').length,
      desc: 'Seamless recovery briefs, peri wash bottle, nursing balm & pads for healing.'
    },
    { 
      id: 'for_newborn', 
      label: 'For Newborn', 
      icon: Baby,
      count: HOSPITAL_BAG_ESSENTIALS_DATA.filter(i => i.category === 'for_newborn').length,
      desc: 'Wrap kimono, muslin swaddles, knot hat & water wipes for baby’s first 72 hours.'
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? HOSPITAL_BAG_ESSENTIALS_DATA
    : HOSPITAL_BAG_ESSENTIALS_DATA.filter((item) => item.category === activeCategory);

  const handleAddItem = (item: EssentialProductRecommendation) => {
    // Find or create matching product representation for cart
    const existing = PRODUCTS.find((p) => p.id === item.id);
    const prod: Product = existing || {
      id: item.id,
      name: item.name,
      category: 'hospital_bag',
      ageStage: item.category === 'for_newborn' ? 'newborn' : 'pregnancy',
      priceNPR: item.priceNPR,
      originalPriceNPR: item.originalPriceNPR,
      image: item.image,
      fallbackGradient: 'from-[#FFF6E9] to-[#EAE0D0]',
      shortDescription: item.shortDescription,
      materials: item.badge || 'Hospital Ward Tested',
      washCare: item.nurseTip,
      deliveryTime: 'Same-day urgent hospital dispatch available in Kathmandu.',
      variants: [{ size: item.defaultSize, inStock: true, stockCount: 25 }],
      highlights: [item.whyEssential, item.nurseTip]
    };

    onAddProduct(prod, item.defaultSize);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const handleAddAllInView = () => {
    filteredItems.forEach((item) => {
      handleAddItem(item);
    });
  };

  // Group items by category for clear presentation
  const groupedByCategory = {
    before_delivery: HOSPITAL_BAG_ESSENTIALS_DATA.filter(i => i.category === 'before_delivery'),
    after_delivery: HOSPITAL_BAG_ESSENTIALS_DATA.filter(i => i.category === 'after_delivery'),
    for_newborn: HOSPITAL_BAG_ESSENTIALS_DATA.filter(i => i.category === 'for_newborn'),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#1F2A44]/10 bg-[#FFF6E9] flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44]">
                Hospital Bag Checklist
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F5B301] text-[#1F2A44]">
                3 Distinct Stages
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75 max-w-2xl leading-relaxed">
              Curated by certified maternity nurses in Kathmandu. Everything required for mother and baby, with zero hospital excess.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/10 active:scale-95 cursor-pointer shrink-0 ml-2 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Categories Tab Strip with Badges */}
        <div className="px-5 sm:px-6 pt-3 pb-3 bg-[#FFF6E9]/50 border-b border-[#1F2A44]/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 min-h-[48px] min-w-[48px] active:scale-95 ${
                  isActive
                    ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                    : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5B301]' : 'text-[#1F2A44]/70'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-[#F5B301] text-[#1F2A44]' : 'bg-[#1F2A44]/10 text-[#1F2A44]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-8 flex-1">
          {/* Render by Category Sections when 'all' is selected, or filtered items */}
          {activeCategory === 'all' ? (
            <>
              {/* Category 1: Before Delivery (Labour) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#1F2A44] text-[#F5B301] flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                        Before Delivery (Labour)
                      </h3>
                      <p className="text-[11px] text-[#1F2A44]/65">
                        Essential items to keep mom relaxed, warm, and medically accessible during active contractions.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#5DAA7A] bg-[#5DAA7A]/10 px-2.5 py-1 rounded-full">
                    {groupedByCategory.before_delivery.length} Essentials
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedByCategory.before_delivery.map((item) => renderProductCard(item))}
                </div>
              </div>

              {/* Category 2: For Mother (After Delivery) */}
              <div className="space-y-4 pt-4 border-t border-[#1F2A44]/10">
                <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#1F2A44] text-[#F5B301] flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                        For Mother (After Delivery)
                      </h3>
                      <p className="text-[11px] text-[#1F2A44]/65">
                        Postpartum healing, soothing perineal comfort, C-section gentle support, and nursing initiation.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#5DAA7A] bg-[#5DAA7A]/10 px-2.5 py-1 rounded-full">
                    {groupedByCategory.after_delivery.length} Essentials
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedByCategory.after_delivery.map((item) => renderProductCard(item))}
                </div>
              </div>

              {/* Category 3: For Newborn */}
              <div className="space-y-4 pt-4 border-t border-[#1F2A44]/10">
                <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#1F2A44] text-[#F5B301] flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                        For Newborn
                      </h3>
                      <p className="text-[11px] text-[#1F2A44]/65">
                        Gentle kimono wraps, 4-layer muslin swaddles, knot beanies, and sensitive skin meconium care.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#5DAA7A] bg-[#5DAA7A]/10 px-2.5 py-1 rounded-full">
                    {groupedByCategory.for_newborn.length} Essentials
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedByCategory.for_newborn.map((item) => renderProductCard(item))}
                </div>
              </div>
            </>
          ) : (
            /* Single Category Filter View */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/10 text-xs text-[#1F2A44]/80 flex items-center justify-between">
                <span>
                  Showing all certified recommendations for <strong>{categories.find(c => c.id === activeCategory)?.label}</strong>
                </span>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="font-bold text-[#1F2A44] hover:underline cursor-pointer"
                >
                  View All 3 Categories →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => renderProductCard(item))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#1F2A44]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#1F2A44]/75 text-center sm:text-left flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F5B301] shrink-0" />
            <span>
              <strong>Kathmandu Ward Dispatch:</strong> 3-Hour urgent delivery available directly to hospital maternity desks.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-[#1F2A44] border border-[#1F2A44]/20 rounded-full hover:bg-[#1F2A44]/5 active:scale-95 transition-all cursor-pointer min-h-[48px] min-w-[48px]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleAddAllInView}
              className="flex-1 sm:flex-initial px-6 py-3 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-transform min-h-[48px] min-w-[48px]"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
              <span>
                {activeCategory === 'all' 
                  ? `Add All (${HOSPITAL_BAG_ESSENTIALS_DATA.length}) Essentials` 
                  : `Add This Stage (${filteredItems.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function renderProductCard(item: EssentialProductRecommendation) {
    const isAdded = addedItems[item.id];
    return (
      <div
        key={item.id}
        className="clickable-card min-h-[48px] min-w-[48px] p-4 rounded-2xl border border-[#1F2A44]/12 bg-[#FFF6E9]/40 hover:border-[#F5B301] transition-all flex flex-col justify-between"
      >
        <div>
          {/* Top image & pricing row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-[#1F2A44]/10 shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/category_baby_care_1793079670129.jpg';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9]">
                    {item.badge}
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5B301]/20 text-[#1F2A44]">
                  Size: {item.defaultSize}
                </span>
              </div>

              <h4 className="font-heading text-sm font-bold text-[#1F2A44] leading-tight line-clamp-2">
                {item.name}
              </h4>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading font-bold text-sm text-[#1F2A44]">
                  Rs. {item.priceNPR.toLocaleString()}
                </span>
                {item.originalPriceNPR && (
                  <span className="text-[11px] text-[#1F2A44]/50 line-through">
                    Rs. {item.originalPriceNPR.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-[#1F2A44]/80 leading-relaxed mb-3">
            {item.shortDescription}
          </p>

          {/* Clinical Rationale Box */}
          <div className="p-2.5 rounded-xl bg-white border border-[#1F2A44]/8 text-[11px] space-y-1.5 mb-3">
            <div className="flex items-start gap-1.5 text-[#1F2A44]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5DAA7A] shrink-0 mt-0.5" />
              <span><strong>Why Essential:</strong> {item.whyEssential}</span>
            </div>
            <div className="flex items-start gap-1.5 text-[#1F2A44]/75 italic">
              <Info className="w-3 h-3 text-[#F5B301] shrink-0 mt-0.5" />
              <span><strong>Nurse Tip:</strong> {item.nurseTip}</span>
            </div>
          </div>
        </div>

        {/* Bottom Card Action */}
        <div className="pt-2 border-t border-[#1F2A44]/10 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#5DAA7A] flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>Hospital Ready</span>
          </span>

          <button
            type="button"
            onClick={() => handleAddItem(item)}
            className={`px-5 py-2.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 ${
              isAdded
                ? 'bg-[#5DAA7A] text-white'
                : 'bg-[#1F2A44] text-[#FFF6E9] hover:bg-[#1F2A44]/85'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-[#F5B301]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }
};
