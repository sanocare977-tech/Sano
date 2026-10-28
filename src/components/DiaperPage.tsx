import React, { useState, useMemo } from 'react';
import { 
  DIAPER_PRODUCTS, 
  DIAPER_BRANDS, 
  DIAPER_TYPES, 
  DIAPER_SIZES,
  DiaperProduct 
} from '../data/diapers';
import { Product } from '../types';
import { 
  ShoppingBag, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Calculator, 
  CheckCircle2, 
  PackageCheck,
  Eye
} from 'lucide-react';

interface DiaperPageProps {
  onBackToHome: () => void;
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onViewProductDetails: (product: Product) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const DiaperPage: React.FC<DiaperPageProps> = ({
  onBackToHome,
  onAddToCart,
  onViewProductDetails,
  onOpenCart,
  cartCount,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [babyWeightInput, setBabyWeightInput] = useState<number | null>(null);
  const [addedItemMap, setAddedItemMap] = useState<{ [key: string]: boolean }>({});

  // Weight calculator helper
  const handleWeightSelect = (weightKg: number) => {
    setBabyWeightInput(weightKg);
    if (weightKg < 5) setSelectedSize('nb');
    else if (weightKg <= 8) setSelectedSize('s');
    else if (weightKg <= 11) setSelectedSize('m');
    else if (weightKg <= 14) setSelectedSize('l');
    else if (weightKg <= 17) setSelectedSize('xl');
    else if (weightKg <= 25) setSelectedSize('xxl');
    else setSelectedSize('youth');
  };

  const filteredDiapers = useMemo(() => {
    return DIAPER_PRODUCTS.filter((d) => {
      // Brand filter
      if (selectedBrand !== 'All Brands' && d.brand !== selectedBrand) {
        return false;
      }
      // Type filter
      if (selectedType !== 'all' && d.diaperType !== selectedType) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all') {
        const matchesSize = 
          (selectedSize === 'nb' && (d.weightRangeKg.includes('< 5') || d.name.includes('Newborn') || d.name.includes('NB'))) ||
          (selectedSize === 's' && (d.weightRangeKg.includes('4–8') || d.name.includes('Small'))) ||
          (selectedSize === 'm' && (d.weightRangeKg.includes('6–11') || d.name.includes('Medium'))) ||
          (selectedSize === 'l' && (d.weightRangeKg.includes('9–14') || d.weightRangeKg.includes('8–15') || d.name.includes('Large'))) ||
          (selectedSize === 'xl' && (d.weightRangeKg.includes('12–17') || d.name.includes('XL'))) ||
          (selectedSize === 'xxl' && (d.weightRangeKg.includes('15–25') || d.name.includes('XXL'))) ||
          (selectedSize === 'youth' && (d.weightRangeKg.includes('27–45') || d.name.includes('Youth') || d.diaperType === 'nighttime_older_kids'));
        
        if (!matchesSize && d.diaperType !== 'cloth') {
          return false;
        }
      }
      return true;
    });
  }, [selectedBrand, selectedType, selectedSize]);

  const handleQuickAdd = (product: DiaperProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants[0]?.size || `${product.weightRangeKg}`;
    onAddToCart(product, defaultVariant, 1);
    
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#1F2A44] pb-20">
      
      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-[#1F2A44]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2A44]/70">
            <button
              onClick={onBackToHome}
              className="hover:text-[#1F2A44] flex items-center gap-1 cursor-pointer font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sano. main store</span>
            </button>
            <span>/</span>
            <span className="text-[#1F2A44] font-bold">The Diaper Station</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#5DAA7A] font-bold hidden sm:inline flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              24–48h Valley Doorstep Delivery
            </span>
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F2A44] text-[#FFF6E9] text-xs font-bold cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner with Generated Imagery */}
      <section className="relative overflow-hidden py-8 sm:py-12 bg-[#FFF6E9] border-b border-[#1F2A44]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1F2A44]/80">
                <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
                <span>All Major Brands & Full Sizing Hub</span>
                <span className="text-[#1F2A44]/40">·</span>
                <span className="text-[#5DAA7A]">Newborn to 14 Years</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2A44] tracking-tight leading-tight">
                Never run out of diapers in <span className="text-[#E8604F]">Kathmandu</span>.
              </h1>

              <p className="text-sm sm:text-base text-[#1F2A44]/80 leading-relaxed max-w-xl">
                Every top brand, every size. From newborn delicate taped diapers to active toddler pull-up pants, organic bamboo eco-diapers, and discreet nighttime bedwetting pants up to age 14. Compulsory GPS pin checkout so riders bring cartons straight to your door.
              </p>

              {/* Core Promises */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#1F2A44]">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#1F2A44]/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5DAA7A]" />
                  Best Price Per Diaper Guaranteed
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#1F2A44]/15">
                  <PackageCheck className="w-3.5 h-3.5 text-[#F5B301]" />
                  Single Packs & Monthly Twin Savers
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#1F2A44]/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5DAA7A]" />
                  100% Genuine Certified Stocks
                </span>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#1F2A44]/15 aspect-[16/10] bg-white">
                <img
                  src="/src/assets/images/diaper_station_hero_1793081804891.jpg"
                  alt="Stocked organic and standard diapers neatly arranged in nursery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-[#1F2A44]/10 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1F2A44] block">Kathmandu Valley Diaper Rush Delivery</span>
                    <span className="text-[11px] text-[#1F2A44]/70">Order by 2 PM for same-day / next-morning arrival</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Weight & Fit Finder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1F2A44]/15 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1F2A44] text-[#F5B301] flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2A44]">
                  Quick Size Finder by Child’s Weight
                </h3>
                <p className="text-xs text-[#1F2A44]/70">
                  Tap your child's current weight in kg to instantly filter exact leak-proof sizes:
                </p>
              </div>
            </div>

            {selectedSize !== 'all' && (
              <button
                onClick={() => {
                  setSelectedSize('all');
                  setBabyWeightInput(null);
                }}
                className="text-xs font-bold text-[#1F2A44] hover:text-[#E8604F] underline cursor-pointer self-start sm:self-auto"
              >
                Clear Weight Filter
              </button>
            )}
          </div>

          {/* Weight Quick Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { kg: 3, label: '3 kg (Newborn)', size: 'nb' },
              { kg: 6, label: '6 kg (Small)', size: 's' },
              { kg: 9, label: '9 kg (Medium)', size: 'm' },
              { kg: 12, label: '12 kg (Large)', size: 'l' },
              { kg: 15, label: '15 kg (XL)', size: 'xl' },
              { kg: 20, label: '20 kg (XXL)', size: 'xxl' },
              { kg: 32, label: '32 kg (Youth 8–14y)', size: 'youth' }
            ].map((w) => {
              const isActive = selectedSize === w.size;
              return (
                <button
                  key={w.kg}
                  type="button"
                  onClick={() => handleWeightSelect(w.kg)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1F2A44] text-[#FFF6E9]'
                      : 'bg-[#FFF6E9] text-[#1F2A44] border border-[#1F2A44]/15 hover:border-[#1F2A44]/35'
                  }`}
                >
                  <span>{w.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Tabs by Style, Brand & Size */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Type / Style filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DIAPER_TYPES.map((t) => {
            const isSelected = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`shrink-0 px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer min-h-[40px] ${
                  isSelected
                    ? 'bg-[#1F2A44] text-[#FFF6E9]'
                    : 'bg-white text-[#1F2A44] border border-[#1F2A44]/15 hover:border-[#1F2A44]/35'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Brand bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#1F2A44]/60 shrink-0">Brand:</span>
          {DIAPER_BRANDS.map((b) => {
            const isSelected = selectedBrand === b;
            return (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F5B301] text-[#1F2A44] font-bold'
                    : 'bg-white text-[#1F2A44]/80 border border-[#1F2A44]/10 hover:border-[#1F2A44]/30'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>

        {/* Size chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#1F2A44]/60 shrink-0">Size:</span>
          {DIAPER_SIZES.map((s) => {
            const isSelected = selectedSize === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSize(s.id)}
                className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F2A44] text-[#FFF6E9] font-bold'
                    : 'bg-[#FFF6E9] text-[#1F2A44]/80 border border-[#1F2A44]/15 hover:bg-white'
                }`}
              >
                {s.label} ({s.weight})
              </button>
            );
          })}
        </div>

      </section>

      {/* Diapers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-[#1F2A44]/70">
            Showing {filteredDiapers.length} pack{filteredDiapers.length === 1 ? '' : 's'} available
          </span>

          <span className="text-xs text-[#5DAA7A] font-bold">
            All prices in Nepalese Rupees (Rs.)
          </span>
        </div>

        {filteredDiapers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#1F2A44]/15 space-y-4 max-w-md mx-auto">
            <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
              No diapers found matching these filters
            </h3>
            <p className="text-xs text-[#1F2A44]/70">
              Try switching to "All Brands" or "All Sizes" to view our complete stock.
            </p>
            <button
              onClick={() => {
                setSelectedBrand('All Brands');
                setSelectedType('all');
                setSelectedSize('all');
                setBabyWeightInput(null);
              }}
              className="px-5 py-2 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 cursor-pointer"
            >
              Reset Diaper Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDiapers.map((product) => {
              const isAdded = !!addedItemMap[product.id];
              return (
                <div
                  key={product.id}
                  onClick={() => onViewProductDetails(product)}
                  className="group relative flex flex-col bg-white rounded-2xl border border-[#1F2A44]/12 overflow-hidden transition-all hover:border-[#1F2A44]/35 cursor-pointer text-[#1F2A44]"
                >
                  {/* Image with Aspect Ratio & Minimum Height */}
                  <div className="relative aspect-square w-full min-h-[160px] sm:min-h-[220px] bg-[#FFF6E9] overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={400}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Brand Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9]">
                        {product.brand}
                      </span>
                      {product.bestseller && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F5B301] text-[#1F2A44]">
                          Top Seller
                        </span>
                      )}
                    </div>

                    {/* Price per diaper badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#1F2A44]/10 text-[11px] font-bold text-[#1F2A44] shadow-xs">
                      Rs. {product.pricePerPieceNPR.toFixed(1)} / diaper
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Weight & Type metadata */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2A44]/65">
                        <span className="text-[#E8604F] font-bold">{product.weightRangeKg}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.piecesPerPack} Pants/Pack</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.absorptionHours}h Lock</span>
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2A44] line-clamp-2 leading-snug group-hover:text-[#E8604F] transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#1F2A44]/75 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Key features bullets */}
                    <div className="pt-1 flex flex-wrap gap-1 text-[11px]">
                      {product.features.map((feat) => (
                        <span
                          key={feat}
                          className="bg-[#FFF6E9] text-[#1F2A44]/80 px-2 py-0.5 rounded-full font-medium"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Bottom row: Price & Buy */}
                    <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-[#1F2A44]/60 font-semibold">Rs.</span>
                          <span className="font-heading text-lg sm:text-xl font-bold text-[#1F2A44] tabular-nums">
                            {product.priceNPR.toLocaleString()}
                          </span>
                        </div>
                        {product.originalPriceNPR && (
                          <span className="text-[11px] text-[#1F2A44]/40 line-through tabular-nums">
                            Rs. {product.originalPriceNPR.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer min-h-[44px] ${
                          isAdded
                            ? 'bg-[#5DAA7A] text-white'
                            : 'bg-[#1F2A44] text-[#FFF6E9] hover:bg-[#1F2A44]/90 active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
                            <span>Add Pack</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Monthly Saver Subscription & Twin Bundle Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1F2A44] text-[#FFF6E9] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-[#F5B301] uppercase tracking-wider">
              Kathmandu Monthly Diaper Restock
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Order 2 or more Jumbo packs together
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF6E9]/80 leading-relaxed">
              Never get stuck without diapers at 10 PM. Order any 2 packs and enjoy <strong>FREE Kathmandu Valley delivery</strong> straight to your doorway with our verified GPS rider pin.
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="px-6 py-3 text-xs sm:text-sm font-bold bg-[#F5B301] text-[#1F2A44] rounded-full hover:bg-[#F5B301]/90 cursor-pointer shrink-0 min-h-[44px]"
          >
            View Bag & WhatsApp Checkout
          </button>
        </div>
      </section>

    </div>
  );
};
