import React from 'react';
import { AgeStageId, CategoryId } from '../types';
import { AGE_STAGES, CATEGORIES } from '../data/stages';
import { Baby, Sparkles, Filter, Check } from 'lucide-react';

interface AgeFilterBarProps {
  selectedStage: AgeStageId | 'all';
  onSelectStage: (stage: AgeStageId | 'all') => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFilteredCount: number;
}

export const AgeFilterBar: React.FC<AgeFilterBarProps> = ({
  selectedStage,
  onSelectStage,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
}) => {
  return (
    <div className="bg-[#FFF6E9] border-y border-[#1F2A44]/10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Step 1: Age & Height First - Brand Guideline Core Rule */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F2A44]/60">
                Primary Filter · Step 1
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2A44]">
                Shop by age and height
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/70">
              Clear sizing in cm so clothing and gear fits right the first time.
            </p>
          </div>

          {/* Age Pills row (Horizontal scroll on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => onSelectStage('all')}
              className={`shrink-0 px-4 py-2 text-sm font-bold rounded-full transition-all cursor-pointer min-h-[44px] flex items-center gap-2 ${
                selectedStage === 'all'
                  ? 'bg-[#1F2A44] text-[#FFF6E9]'
                  : 'bg-white text-[#1F2A44] border border-[#1F2A44]/15 hover:border-[#1F2A44]/30'
              }`}
            >
              <span>All Ages</span>
              <span className="text-xs opacity-70">Pregnancy–14y</span>
            </button>

            {AGE_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => onSelectStage(stage.id)}
                  className={`shrink-0 px-4 py-2 rounded-full transition-all cursor-pointer min-h-[44px] flex flex-col justify-center text-left ${
                    isSelected
                      ? 'bg-[#1F2A44] text-[#FFF6E9]'
                      : 'bg-white text-[#1F2A44] border border-[#1F2A44]/15 hover:border-[#1F2A44]/30'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold leading-tight">
                    {stage.label}
                  </span>
                  <span className={`text-[11px] leading-tight ${isSelected ? 'text-[#F5B301]' : 'text-[#1F2A44]/65'}`}>
                    {stage.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Category Filter Bar */}
        <div className="pt-2 border-t border-[#1F2A44]/8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F2A44]/60">
                Step 2 · Category
              </span>
              <span className="text-xs text-[#1F2A44]/50">·</span>
              <span className="text-xs font-semibold text-[#1F2A44]/80 tabular-nums">
                {totalFilteredCount} item{totalFilteredCount === 1 ? '' : 's'} available
              </span>
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search products, materials..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white text-[#1F2A44] text-xs sm:text-sm px-4 py-2 pl-9 rounded-full border border-[#1F2A44]/15 focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none transition-colors"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-2.5 text-[#1F2A44]/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2 text-xs text-[#1F2A44]/50 hover:text-[#1F2A44] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer min-h-[38px] ${
                    isSelected
                      ? 'bg-[#F5B301] text-[#1F2A44]'
                      : 'bg-[#FFF6E9] text-[#1F2A44]/80 hover:bg-white hover:text-[#1F2A44]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
