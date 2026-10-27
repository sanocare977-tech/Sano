import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ShortlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortlist: Product[];
  onRemoveFromShortlist: (productId: string) => void;
  onAddToCart: (product: Product, variant: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShortlistModal: React.FC<ShortlistModalProps> = ({
  isOpen,
  onClose,
  shortlist,
  onRemoveFromShortlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1F2A44]/10 bg-[#FFF6E9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E8604F]/15 flex items-center justify-center text-[#E8604F]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2A44]">
                Saved Shortlist ({shortlist.length})
              </h2>
              <p className="text-xs text-[#1F2A44]/70">
                Your saved items for baby and nursery, saved locally with zero login required.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-5 sm:p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {shortlist.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF6E9] mx-auto flex items-center justify-center text-[#1F2A44]/40">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#1F2A44]">
                Your shortlist is empty
              </p>
              <p className="text-xs text-[#1F2A44]/60 max-w-xs mx-auto">
                Tap the heart icon on any product to save it here while you plan your nursery.
              </p>
            </div>
          ) : (
            shortlist.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-[#1F2A44]/10 bg-[#FFF6E9]/40 flex items-center justify-between gap-3 text-xs"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border border-[#1F2A44]/10 shrink-0 bg-white"
                  />
                  <div className="min-w-0 flex-1">
                    <strong className="block font-bold text-[#1F2A44] text-sm truncate">
                      {item.name}
                    </strong>
                    <span className="text-[11px] font-semibold text-[#5DAA7A] block mt-0.5">
                      Rs. {item.priceNPR.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#1F2A44]/60 block truncate">
                      {item.shortDescription}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onAddToCart(item, item.variants[0]?.size || 'Standard')}
                    className="px-3 py-1.5 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/80 flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F5B301]" />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromShortlist(item.id)}
                    className="p-2 text-[#1F2A44]/40 hover:text-[#E8604F] transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1F2A44]/10 bg-white flex items-center justify-between">
          <span className="text-xs text-[#1F2A44]/65">
            Prices valid in NPR with transparent checkout.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
