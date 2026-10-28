import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, Gift, Award } from 'lucide-react';
import { Product } from '../types';

interface BundleOption {
  id: string;
  title: string;
  subtitle: string;
  category: 'outfit' | 'utensils' | 'frame';
  price: number;
  mrp: number;
  image: string;
  ageBracket: string;
  heightLabel: string;
  options?: string[];
  specs: string[];
}

const BUNDLE_ITEMS: BundleOption[] = [
  {
    id: 'pasni-outfit-1',
    title: 'Embroidered Royal Velvet & Dhaka Pasni Ceremony Set',
    subtitle: 'Includes matching handwoven Palpali Dhaka Topi / Headband, Kurta/Cholo, and soft padded booties',
    category: 'outfit',
    price: 2450,
    mrp: 3200,
    image: '/assets/aistudio/101_610b9107.jpg',
    ageBracket: '5–6 Months',
    heightLabel: '56–68 cm',
    options: ['Boy (Red & Gold Zari Velvet + Dhaka Topi)', 'Girl (Crimson Gunyo Cholo + Silk Headband)'],
    specs: ['Scratch-free 100% combed cotton lining', 'Nickel-free snaps for quick diaper changes', 'Authentic Nepali Dhaka accents']
  },
  {
    id: 'pasni-utensil-1',
    title: 'Pure Brass Handcrafted 5-Piece Rice Feeding Thali Set',
    subtitle: 'Traditional consecrated plate, katora bowl, solid brass spoon, drinking glass, and auspicious ceremonial bell',
    category: 'utensils',
    price: 1850,
    mrp: 2200,
    image: '/src/assets/images/product_silicone_bowl_feeding_1793082161750.jpg',
    ageBracket: 'First Solids',
    heightLabel: 'Pure Kansa/Brass',
    specs: ['Auspicious metal for baby’s first solid rice (Kheer)', 'Smooth hand-buffed edges safe for infant gums', 'Heirloom quality keeps for generations']
  },
  {
    id: 'pasni-frame-1',
    title: 'Personalized Wooden Pasni Milestone Memory Frame',
    subtitle: 'Hand-engraved baby name, lunar ceremony date, birth weight, and 5x7 inch photo aperture',
    category: 'frame',
    price: 950,
    mrp: 1300,
    image: '/src/assets/images/product_wooden_puzzle_montessori_1793082162657.jpg',
    ageBracket: 'Keepsake',
    heightLabel: 'Solid Pine Wood',
    specs: ['Laser-engraved custom name & ceremony date', 'UV glass protection against fading', 'Table stand & brass wall hanger included']
  },
];

interface PasniBundleBuilderProps {
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onOpenCart?: () => void;
}

export const PasniBundleBuilder: React.FC<PasniBundleBuilderProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedOutfitVariant, setSelectedOutfitVariant] = useState<string>(
    'Boy (Red & Gold Zari Velvet + Dhaka Topi)'
  );
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    'pasni-outfit-1': true,
    'pasni-utensil-1': true,
    'pasni-frame-1': true,
  });
  const [babyCustomName, setBabyCustomName] = useState<string>('Aarav');
  const [ceremonyDate, setCeremonyDate] = useState<string>('2026-11-15');
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const activeCount = Object.values(selectedItems).filter(Boolean).length;

  const rawTotal = BUNDLE_ITEMS.reduce((sum, item) => {
    return selectedItems[item.id] ? sum + item.price : sum;
  }, 0);

  const rawMrp = BUNDLE_ITEMS.reduce((sum, item) => {
    return selectedItems[item.id] ? sum + item.mrp : sum;
  }, 0);

  // 10% additional bundle discount if all 3 items selected
  const bundleDiscount = activeCount === 3 ? Math.round(rawTotal * 0.1) : 0;
  const finalTotal = rawTotal - bundleDiscount;
  const totalSavings = (rawMrp - rawTotal) + bundleDiscount;

  const handleAddBundleToCart = () => {
    BUNDLE_ITEMS.forEach((item) => {
      if (selectedItems[item.id]) {
        const variantLabel =
          item.id === 'pasni-outfit-1'
            ? `${selectedOutfitVariant} (56–68 cm)`
            : item.id === 'pasni-frame-1'
            ? `Engraved: ${babyCustomName} (${ceremonyDate})`
            : '5-Piece Set';

        const mockProd: Product = {
          id: item.id,
          name: item.title,
          category: 'gift_hampers',
          ageStage: 'infant',
          priceNPR: item.price,
          originalPriceNPR: item.mrp,
          image: item.image,
          fallbackGradient: 'from-[#FFF6E9] to-[#EADECB]',
          shortDescription: item.subtitle,
          materials: item.specs.join(', '),
          washCare: 'Handle with care. Dry clean outfit.',
          deliveryTime: 'Arrives in 24–48h across Kathmandu Valley.',
          variants: [{ size: variantLabel, inStock: true, stockCount: 10 }],
          highlights: item.specs,
        };

        onAddToCart(mockProd, variantLabel, 1);
      }
    });

    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 3000);
    if (onOpenCart) {
      setTimeout(() => onOpenCart(), 500);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1F2A44]/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8604F]/15 text-[#E8604F] text-xs font-bold mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Nepali Pasni (Rice Feeding) Celebration Hub</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44]">
            3-in-1 Ceremony Bundle Builder
          </h3>
          <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-1">
            Build your child’s traditional Rice Feeding package: Cultural Outfit, Pure Brass Thali, and Custom Keepsake Frame.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-[#FFF6E9] px-4 py-2 rounded-full border border-[#F5B301]/40 text-xs font-bold text-[#1F2A44]">
          <Award className="w-4 h-4 text-[#F5B301]" />
          <span>Sizing: 5–6M (56–68 cm) Guaranteed Fit</span>
        </div>
      </div>

      {/* Item Selector Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        {BUNDLE_ITEMS.map((item) => {
          const isSelected = !!selectedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#1F2A44] bg-[#FFF6E9]/40 shadow-sm'
                  : 'border-[#1F2A44]/15 bg-white opacity-70 hover:opacity-100'
              }`}
            >
              {/* Checkbox badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-[#1F2A44]/20 text-[#1F2A44]">
                  {item.category === 'outfit' ? '1. Ceremony Outfit' : item.category === 'utensils' ? '2. Silver/Brass Thali' : '3. Engraved Keepsake'}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#1F2A44] text-[#FFF6E9]' : 'border-2 border-[#1F2A44]/30'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-heading text-lg font-bold text-[#1F2A44] leading-snug">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-[#1F2A44]/75 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Sub-options for outfit */}
                {item.id === 'pasni-outfit-1' && (
                  <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                    <label className="text-[11px] font-bold text-[#1F2A44]/80 block mb-1">
                      Choose Ceremony Attire:
                    </label>
                    <select
                      value={selectedOutfitVariant}
                      onChange={(e) => setSelectedOutfitVariant(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-[#1F2A44]/20 rounded-xl px-3 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                    >
                      {item.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sub-inputs for custom frame */}
                {item.id === 'pasni-frame-1' && (
                  <div className="pt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="text-[11px] font-bold text-[#1F2A44]/80 block mb-0.5">
                        Baby Name for Engraving:
                      </label>
                      <input
                        type="text"
                        value={babyCustomName}
                        onChange={(e) => setBabyCustomName(e.target.value)}
                        placeholder="e.g. Aarav Shrestha"
                        className="w-full text-xs font-semibold bg-white border border-[#1F2A44]/20 rounded-xl px-3 py-1.5 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                      />
                    </div>
                  </div>
                )}

                {/* Specs list */}
                <ul className="pt-2 space-y-1">
                  {item.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[11px] text-[#1F2A44]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5DAA7A] shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Tag */}
              <div className="mt-5 pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-lg font-bold text-[#1F2A44]">
                      Rs. {item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#1F2A44]/50 line-through">
                      Rs. {item.mrp.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#5DAA7A] font-bold">
                    Save Rs. {(item.mrp - item.price).toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#1F2A44]">
                  {item.heightLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary & Checkout Banner */}
      <div className="rounded-2xl bg-[#1F2A44] text-[#FFF6E9] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#F5B301]">
            <Sparkles className="w-4 h-4" />
            <span>
              {activeCount === 3
                ? '★ Triple Celebration Bundle Applied (Extra 10% OFF)'
                : `${activeCount} of 3 items selected`}
            </span>
          </div>
          <div className="flex items-baseline gap-3 justify-center sm:justify-start">
            <span className="font-heading text-3xl font-bold text-[#FFF6E9]">
              Rs. {finalTotal.toLocaleString()}
            </span>
            {totalSavings > 0 && (
              <span className="text-xs font-bold text-[#5DAA7A] bg-[#5DAA7A]/20 px-2.5 py-0.5 rounded-full">
                Total Saved: Rs. {totalSavings.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-xs text-[#FFF6E9]/75">
            Includes free luxury gift box packaging & 24–48h priority Kathmandu delivery.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            disabled={activeCount === 0}
            onClick={handleAddBundleToCart}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeCount > 0
                ? 'bg-[#F5B301] text-[#1F2A44] hover:bg-[#F5B301]/90 shadow-md active:scale-95'
                : 'bg-white/20 text-white/40 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isAddedSuccess ? '✓ Added to Cart!' : `Add ${activeCount} Item${activeCount === 1 ? '' : 's'} to Bag`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
