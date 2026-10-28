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
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#FFF6E9] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            // Elegant CSS fallback matching guidelines
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Quiet text kicker badges - Anti-slop: max 1 quiet tag, no badge sandwiches */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          {product.bestseller && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F5B301] text-[#1F2A44]">
              Parent Favorite
            </span>
          )}
          {product.featured && !product.bestseller && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9]">
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

      {/* Card Content */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-1.5">
          {/* Metadata: Clean unboxed text with dot separator */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2A44]/65">
            <span>{product.ageStage === 'pregnancy' ? 'Maternity' : product.deliveryTime.split(' in ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{product.materials.split(',')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2A44] line-clamp-2 leading-snug group-hover:text-[#E8604F] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#1F2A44]/75 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Size Selection Chips - Upgraded to minimum 48px touch-friendly hit areas */}
        <div className="space-y-2 pt-1" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-xs font-semibold text-[#1F2A44]/70">
            <span>Select Size &amp; Height:</span>
            <span className="text-[11px] text-[#5DAA7A] font-bold">Standard Sano Fit</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const isSelected = selectedVariant === v.size;
              return (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedVariant(v.size)}
                  className={`min-h-[48px] min-w-[48px] px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center border active:scale-95 ${
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

        {/* Bottom Bar: Price & Add to Bag with min 48px touch targets */}
        <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-[#1F2A44]/60 font-semibold">Rs.</span>
              <span className="font-heading text-lg sm:text-xl font-bold text-[#1F2A44] tabular-nums">
                {product.priceNPR.toLocaleString()}
              </span>
            </div>
            {product.originalPriceNPR && (
              <span className="text-[11px] text-[#1F2A44]/40 line-through tabular-nums block">
                Rs. {product.originalPriceNPR.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer min-h-[48px] min-w-[120px] shrink-0 shadow-xs ${
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
