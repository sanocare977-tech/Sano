import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product, variant: string) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onViewDetails,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0]?.size || ''
  );
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="clickable-card group relative flex flex-col bg-white rounded-2xl border border-[#1F2A44]/12 overflow-hidden transition-all hover:border-[#1F2A44]/30 cursor-pointer text-[#1F2A44] min-h-[48px] min-w-[48px]"
    >
      {/* Product Image Area with Enforced Minimum Aspect Ratio & Fixed Minimum Height */}
      <div className="relative aspect-square w-full min-h-[160px] sm:min-h-[220px] bg-[#FFF6E9] overflow-hidden shrink-0">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-[#FFF6E9] flex items-center justify-center pointer-events-none" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-[#F5B301]/60 animate-ping" />
          </div>
        )}

        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={400}
            height={400}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-103 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#FFF6E9] text-[#1F2A44]/60">
            <span className="font-heading text-xl font-bold text-[#1F2A44]/40 lowercase">sano.</span>
            <span className="text-xs mt-1 text-[#1F2A44]/50 line-clamp-2">{product.name}</span>
          </div>
        )}

        {/* Quiet text kicker badges - Anti-slop: max 1 quiet tag, minimum 14px readable text */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          {product.bestseller && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F5B301] text-[#1F2A44] shadow-2xs">
              Parent Favorite
            </span>
          )}
          {product.featured && !product.bestseller && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1F2A44] text-[#FFF6E9] shadow-2xs">
              Essential
            </span>
          )}
        </div>

        {/* Quick View Floating Button - visible with touch-friendly 48px target on mobile, hover on desktop */}
        <div className="absolute bottom-3 right-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[48px] min-w-[48px] text-xs font-bold bg-[#1F2A44]/90 text-[#FFF6E9] rounded-full backdrop-blur-xs shadow-sm">
            <Eye className="w-4 h-4 text-[#F5B301]" />
            Details
          </span>
        </div>
      </div>

      {/* Card Content with Responsive Text Scaling */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-1.5">
          {/* Metadata: Clean unboxed text with dot separator - minimum 14px base */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2A44]/75">
            <span>{product.ageStage === 'pregnancy' ? 'Maternity' : product.deliveryTime.split(' in ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{product.materials.split(',')[0]}</span>
          </div>

          {/* Product Name (Responsive Scaling Title - minimum 16px, scales gracefully) */}
          <h3 className="font-heading text-product-title sm:text-lg font-bold text-[#1F2A44] line-clamp-2 leading-snug group-hover:text-[#E8604F] transition-colors">
            {product.name}
          </h3>

          {/* Product Short Description - minimum 14px base */}
          <p className="text-xs text-[#1F2A44]/80 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Size Selection Chips - Upgraded to minimum 48px touch-friendly hit areas */}
        <div className="space-y-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-xs font-semibold text-[#1F2A44]/80">
            <span>Size:</span>
            <span className="text-xs text-[#5DAA7A] font-bold">Sano Fit</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {product.variants.map((v) => {
              const isSelected = selectedVariant === v.size;
              return (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedVariant(v.size)}
                  className={`min-h-[48px] min-w-[48px] px-2.5 sm:px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center border active:scale-95 ${
                    isSelected
                      ? 'bg-[#1F2A44] text-[#FFF6E9] border-[#1F2A44] shadow-xs'
                      : 'bg-[#FFF6E9] text-[#1F2A44] border-[#1F2A44]/15 hover:bg-[#EAE0D0] hover:border-[#1F2A44]/30'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Size ${v.size}`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Price & Add to Bag with Responsive Text Scaling & min 48px touch targets */}
        <div className="pt-3 border-t border-[#1F2A44]/10 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm text-[#1F2A44]/70 font-bold">Rs.</span>
              <span className="font-heading text-product-price sm:text-xl font-bold text-[#1F2A44] tabular-nums">
                {product.priceNPR.toLocaleString()}
              </span>
            </div>
            {product.originalPriceNPR && (
              <span className="text-xs text-[#1F2A44]/50 line-through tabular-nums block font-medium">
                Rs. {product.originalPriceNPR.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-3 text-xs sm:text-sm font-bold rounded-xl sm:rounded-full transition-all cursor-pointer min-h-[48px] shrink-0 shadow-xs active:scale-95 ${
              addedAnimation
                ? 'bg-[#5DAA7A] text-white'
                : 'bg-[#1F2A44] text-[#FFF6E9] hover:bg-[#1F2A44]/90 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
