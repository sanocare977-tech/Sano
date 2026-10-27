import React, { useState } from 'react';
import { BookOpen, ArrowRight, Sparkles, X, CheckCircle, Heart, Stethoscope, Clock, ShieldCheck } from 'lucide-react';
import { PARENTING_INSIGHTS, ParentingInsightArticle } from '../data/parentingInsights';
import { CategoryId } from '../types';

interface ParentingInsightsSectionProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const ParentingInsightsSection: React.FC<ParentingInsightsSectionProps> = ({
  onSelectCategory,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<ParentingInsightArticle | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Insights (0–14Y)' },
    { id: 'newborn', label: 'Newborn (0–3M)' },
    { id: 'infant', label: 'Infant (4–12M)' },
    { id: 'toddler', label: 'Toddler (1–3Y)' },
    { id: 'childhood', label: 'Childhood & Teen (4–14Y)' },
    { id: 'gifting', label: 'Hospital Visit & Gifting' }
  ];

  const filteredArticles = PARENTING_INSIGHTS.filter((art) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'newborn') return art.id === 'insight-01';
    if (activeFilter === 'infant') return art.id === 'insight-02';
    if (activeFilter === 'toddler') return art.id === 'insight-03';
    if (activeFilter === 'childhood') return ['insight-04', 'insight-05', 'insight-06'].includes(art.id);
    if (activeFilter === 'gifting') return art.id === 'insight-07';
    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2A44]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DAA7A]/15 text-[#1F2A44] text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#5DAA7A]" />
            <span>Pediatrician-Guided Knowledge</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl text-[#1F2A44] font-bold">
            Parenting Insights & Development (0–14 Years)
          </h2>
          <p className="text-sm text-[#1F2A44]/75 max-w-2xl mt-1">
            Practical, evidence-backed guides written in plain words for busy parents. Learn key physical, emotional, and nutritional milestones for each stage.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer shrink-0 ${
                activeFilter === opt.id
                  ? 'bg-[#1F2A44] text-[#FFF6E9]'
                  : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl border border-[#1F2A44]/15 p-5 flex flex-col justify-between hover:border-[#1F2A44]/40 transition-colors"
          >
            <div>
              {/* Badge & Read time */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${article.badgeColor}`}>
                  {article.stageTitle}
                </span>
                <span className="text-[11px] text-[#1F2A44]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readingTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-bold text-[#1F2A44] leading-snug mb-2">
                {article.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-[#1F2A44]/75 line-clamp-3 mb-4 leading-relaxed">
                {article.summary}
              </p>

              {/* Bullet Key Takeaways */}
              <div className="space-y-1.5 mb-5 bg-[#FFF6E9]/60 p-3 rounded-xl border border-[#1F2A44]/8 text-xs text-[#1F2A44]/85">
                <div className="font-bold text-[11px] text-[#1F2A44] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F5B301]" />
                  <span>Key Takeaways:</span>
                </div>
                {article.keyPoints.slice(0, 2).map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px]">
                    <span className="text-[#5DAA7A] font-bold">✓</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-xs font-bold text-[#1F2A44] hover:text-[#E8604F] transition-colors flex items-center gap-1 cursor-pointer py-1"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectCategory(article.linkedCategory)}
                className="px-3 py-1.5 text-[11px] font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/85 transition-colors cursor-pointer shrink-0"
              >
                {article.linkedCategoryLabel.replace('Shop ', '').replace('Explore ', '')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#1F2A44]/10 bg-[#FFF6E9] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${selectedArticle.badgeColor}`}>
                    {selectedArticle.stageTitle}
                  </span>
                  <span className="text-xs text-[#1F2A44]/60">
                    {selectedArticle.ageBracket}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2A44]">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto text-sm leading-relaxed">
              {/* Pediatrician Tip Highlight Callout */}
              <div className="p-3.5 rounded-xl bg-[#5DAA7A]/15 border border-[#5DAA7A]/30 flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-[#5DAA7A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs font-bold text-[#1F2A44]">
                    Pediatrician Practical Advice
                  </strong>
                  <p className="text-xs text-[#1F2A44]/85 mt-0.5">
                    {selectedArticle.pediatricianTip}
                  </p>
                </div>
              </div>

              {/* Full Content Paragraphs */}
              {selectedArticle.fullContent.map((para, index) => (
                <p key={index} className="text-[#1F2A44]/80">
                  {para}
                </p>
              ))}

              {/* Key Bullet Checklist */}
              <div className="p-4 rounded-xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-2">
                <div className="font-bold text-xs text-[#1F2A44] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5DAA7A]" />
                  <span>Important Checklist for Parents:</span>
                </div>
                {selectedArticle.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#1F2A44]/80">
                    <CheckCircle className="w-3.5 h-3.5 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer with Shopping Link */}
            <div className="p-4 sm:p-5 border-t border-[#1F2A44]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#1F2A44]/70">
                Ready to prepare for this developmental stage?
              </span>

              <button
                onClick={() => {
                  onSelectCategory(selectedArticle.linkedCategory);
                  setSelectedArticle(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{selectedArticle.linkedCategoryLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#F5B301]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
