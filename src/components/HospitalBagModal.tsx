import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, Plus, HeartHandshake, Baby, Activity } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'all' | 'labour_delivery' | 'after_delivery' | 'for_baby'>('all');

  if (!isOpen) return null;

  const tabs = [
    { id: 'all', label: 'All 3 Categories', icon: Sparkles },
    { id: 'labour_delivery', label: '1. In Labour (Before Delivery)', icon: Activity },
    { id: 'after_delivery', label: '2. For Mother (After Delivery)', icon: HeartHandshake },
    { id: 'for_baby', label: '3. For Newborn Baby', icon: Baby },
  ];

  const filteredChecklist = HOSPITAL_BAG_CHECKLIST.filter((item) => {
    if (activeTab === 'all') return true;
    return item.phase === activeTab;
  });

  const handleAddPhaseEssentials = (phase?: string) => {
    const itemsToAdd = HOSPITAL_BAG_CHECKLIST.filter((i) => !phase || phase === 'all' || i.phase === phase);
    itemsToAdd.forEach((item) => {
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
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F5B301] text-[#1F2A44]">
                3 Core Phases
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Structured into 3 essential categories tested with pediatric & maternity wards across Kathmandu.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Categories Tab Strip */}
        <div className="px-5 pt-3 pb-2 bg-[#FFF6E9]/40 border-b border-[#1F2A44]/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#1F2A44] text-[#FFF6E9]'
                    : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5B301]' : 'text-[#1F2A44]/70'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 space-y-3 max-h-[55vh] overflow-y-auto">
          {filteredChecklist.map((chk, index) => {
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
                    <div className="flex items-center gap-2">
                      <strong className="font-bold text-[#1F2A44] text-sm">
                        {chk.item}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F2A44]/10 text-[#1F2A44]">
                        {chk.phase === 'labour_delivery' ? 'Labor Phase' : chk.phase === 'after_delivery' ? 'Mother Care' : 'Baby Care'}
                      </span>
                    </div>
                    <span className="text-[#1F2A44]/75 block mt-0.5">
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
            {activeTab === 'all' 
              ? 'Pack everything ready for delivery day?' 
              : `Add all items for ${tabs.find(t => t.id === activeTab)?.label}?`}
          </span>

          <button
            onClick={() => handleAddPhaseEssentials(activeTab === 'all' ? undefined : activeTab)}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
            <span>
              {activeTab === 'all' ? 'Add All Hospital Essentials' : 'Add This Phase to Bag'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
