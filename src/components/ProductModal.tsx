import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Check, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0]?.size || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] shadow-none my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-[#1F2A44]/15 text-[#1F2A44] flex items-center justify-center hover:bg-[#FFF6E9] cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-[#FFF6E9] overflow-hidden min-h-[320px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2A44]/65">
                <span>{product.ageStage.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5DAA7A] font-bold">In Stock & Verified</span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44] leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm font-semibold text-[#1F2A44]/60">Rs.</span>
                  <span className="font-heading text-3xl font-bold text-[#1F2A44] tabular-nums">
                    {product.priceNPR.toLocaleString()}
                  </span>
                  {product.originalPriceNPR && (
                    <span className="text-sm text-[#1F2A44]/40 line-through tabular-nums">
                      Rs. {product.originalPriceNPR.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#1F2A44]/80 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Variant / Size Selection with Age and Height in cm */}
              <div className="space-y-2 pt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70">
                  Select Size (Age & Height in cm):
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant === v.size;
                    return (
                      <button
                        key={v.size}
                        type="button"
                        onClick={() => setSelectedVariant(v.size)}
                        className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer min-h-[44px] ${
                          isSelected
                            ? 'bg-[#1F2A44] text-[#FFF6E9]'
                            : 'bg-[#FFF6E9] text-[#1F2A44] border border-[#1F2A44]/15 hover:border-[#1F2A44]/35'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Honest specs from brand guidelines */}
              <div className="space-y-2 pt-3 border-t border-[#1F2A44]/10 text-xs text-[#1F2A44]/80">
                <div className="flex items-start gap-2">
                  <strong className="text-[#1F2A44] shrink-0">Materials:</strong>
                  <span>{product.materials}</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="text-[#1F2A44] shrink-0">Care:</strong>
                  <span>{product.washCare}</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="text-[#1F2A44] shrink-0">Delivery:</strong>
                  <span>{product.deliveryTime}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Primary Add to Bag Action */}
            <div className="space-y-3 pt-4 border-t border-[#1F2A44]/10">
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center border border-[#1F2A44]/20 rounded-full bg-[#FFF6E9] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#1F2A44] hover:bg-[#EAE0D0] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#1F2A44] hover:bg-[#EAE0D0] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 text-sm sm:text-base font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px] ${
                    justAdded
                      ? 'bg-[#5DAA7A] text-white'
                      : 'bg-[#1F2A44] text-[#FFF6E9] hover:bg-[#1F2A44]/90 active:scale-95'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#F5B301]" />
                      <span>Add {quantity} to Bag · Rs. {(product.priceNPR * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sano Brand Guarantees */}
              <div className="flex items-center justify-between text-[11px] text-[#1F2A44]/65 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#5DAA7A]" />
                  24–48h Valley Delivery
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#1F2A44]" />
                  14-Day Hassle-Free Size Exchange
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
