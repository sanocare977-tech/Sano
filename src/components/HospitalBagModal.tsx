import React from 'react';
import { X, Sparkles, Check, ShoppingBag, Plus } from 'lucide-react';
import { HOSPITAL_BAG_CHECKLIST, PRODUCTS } from '../data/products';
import { Product } from '../types';

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
  if (!isOpen) return null;

  const handleAddAllEssentials = () => {
    HOSPITAL_BAG_CHECKLIST.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.includedProductId);
      if (prod && prod.variants[0]) {
        onAddProduct(prod, prod.variants[0].size);
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1F2A44]/10 bg-[#FFF6E9] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#1F2A44]">
                Hospital Bag Checklist
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F5B301] text-[#1F2A44]">
                Maternity to Day 3
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Tested by pediatric nurses and mothers across Kathmandu hospitals (Norvic, Grande, Teaching, Mediciti).
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {HOSPITAL_BAG_CHECKLIST.map((chk, index) => {
            const product = PRODUCTS.find((p) => p.id === chk.includedProductId);
            return (
              <div
                key={chk.item}
                className="p-3.5 rounded-xl border border-[#1F2A44]/10 bg-[#FFF6E9]/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1F2A44] text-[#FFF6E9] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <strong className="block font-bold text-[#1F2A44] text-sm">
                      {chk.item}
                    </strong>
                    <span className="text-[#1F2A44]/70 block mt-0.5">
                      {chk.reason}
                    </span>
                    {product && (
                      <span className="text-[11px] font-semibold text-[#5DAA7A] mt-1 block">
                        Rs. {product.priceNPR.toLocaleString()} · In stock
                      </span>
                    )}
                  </div>
                </div>

                {product && (
                  <button
                    onClick={() => {
                      onAddProduct(product, product.variants[0]?.size || 'Standard');
                    }}
                    className="shrink-0 px-3 py-1.5 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/80 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5B301]" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="p-4 sm:p-5 border-t border-[#1F2A44]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#1F2A44]/70 text-center sm:text-left">
            Need all 5 essentials ready for your delivery day?
          </span>

          <button
            onClick={handleAddAllEssentials}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
            <span>Add All 5 Items to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
