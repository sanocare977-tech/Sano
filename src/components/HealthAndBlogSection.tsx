import React, { useState } from 'react';
import { BookOpen, Calendar, Activity, Sparkles, Heart, Baby, Stethoscope, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ParentingHub } from './ParentingHub';
import { ParentingInsightsSection } from './ParentingInsightsSection';
import { CategoryId } from '../types';

interface HealthAndBlogSectionProps {
  onSelectCategory?: (categoryId: CategoryId) => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const HealthAndBlogSection: React.FC<HealthAndBlogSectionProps> = ({
  onSelectCategory = () => {},
  onNavigateToSection,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'vaccines' | 'growth' | 'articles'>('guide');

  return (
    <section id="health-blog" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2A44]/10">
      {/* Blog & Health Hub Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FD0EA]/25 text-[#1F2A44] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#8FD0EA]" />
            <span>🩵 sano care. Medical & Growth Hub</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B301]/25 text-[#1F2A44] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
            <span>🟡 sano play. Brain Toys</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DAA7A]/20 text-[#1F2A44] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#5DAA7A]" />
            <span>📍 Kathmandu Valley Delivery</span>
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E8604F] tracking-tight">
          Nurturing Healthy Moms & Smart Kids
        </h2>
        <p className="text-sm sm:text-lg text-[#1F2A44]/80 mt-3 leading-relaxed max-w-3xl mx-auto">
          A complete guide to maternal wellness, milestone immunization, WHO growth tracking, and age-matched educational play.
        </p>

        {/* Tab Navigator */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>Maternal & Child Guide</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vaccines')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'vaccines'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#5DAA7A]" />
            <span>Vaccination Tracker (NIP + WHO)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('growth')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'growth'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#8FD0EA]" />
            <span>WHO Growth Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#E8604F]" />
            <span>Pediatric Milestone Articles</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'guide' && (
        <div className="space-y-8">
          {/* Section 1: Mother & Child Health Across Milestones */}
          <div className="bg-white rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-8 lg:p-10 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8604F]/10 text-[#E8604F] text-xs font-bold mb-2">
                <Heart className="w-3.5 h-3.5" />
                <span>Section 1: Mother & Child Health Across Milestones</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44]">
                Evidence-Grounded Care for Expectant Mothers & Growing Kids
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Subsection A: Maternal & Postpartum Care */}
              <div className="rounded-2xl bg-[#FFF6E9]/60 p-6 border border-[#1F2A44]/10 space-y-4">
                <span className="text-xs font-bold text-[#E8604F] uppercase tracking-wider block">
                  Subsection A
                </span>
                <h4 className="font-heading text-xl font-bold text-[#1F2A44]">
                  Essential Maternity & Postpartum Care
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1F2A44]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span><strong>Physical wellness for moms-to-be:</strong> Gentle botanical belly stretch-mark oils (rosehip & sweet almond), lumbar ergonomics, and breathable pelvic support bands.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span><strong>Postpartum perineal & incision healing:</strong> Ergonomic angled peri wash bottles, calendula nipple balms, and seamless non-binding recovery briefs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span><strong>Mental health & sleep hygiene:</strong> Recognizing postpartum blues vs PPD, establishing nursery rhythms, and emotional partner check-ins.</span>
                  </li>
                </ul>
              </div>

              {/* Subsection B: Stage-Based Child Health (0–12Y) */}
              <div className="rounded-2xl bg-[#FFF6E9]/60 p-6 border border-[#1F2A44]/10 space-y-4">
                <span className="text-xs font-bold text-[#5DAA7A] uppercase tracking-wider block">
                  Subsection B
                </span>
                <h4 className="font-heading text-xl font-bold text-[#1F2A44]">
                  Stage-Based Child Health (0 to 12 Years)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1F2A44]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span><strong>Infant health essentials (0–1Y):</strong> Anti-colic borosilicate feeding bottles, teether sterilization, and zinc barrier diaper balms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span><strong>Toddler immune & gut wellness (1–3Y):</strong> Food-grade silicone suction weaning bowls, varied Nepali whole grains, and dental milk teeth hygiene.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                    <span><strong>Childhood & adolescent posture (4–12Y):</strong> Pediatrician-approved ergonomic spine-support backpacks and balanced outdoor natural light play.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Early Brain Development & Play */}
          <div className="bg-[#1F2A44] text-[#FFF6E9] rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B301]/20 text-[#F5B301] text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How to Make Your Kid Smart: The Neuroscience of Early Play</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold">
                  Open-Ended Wooden Toys vs Flashing Plastic Screens
                </h3>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-semibold text-[#FFF6E9]/90 shrink-0">
                Rule: "Shop by Age & Height (cm) First, Category Second"
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FFF6E9]/80 leading-relaxed max-w-3xl">
              Research consistently demonstrates that flashing battery-operated plastic toys induce passive visual absorption. In contrast, natural beechwood Montessori puzzles, balance boards, and sensory stacking blocks force active neural connections, hand-eye spatial calculation, and divergent thinking.
            </p>

            {/* Toy Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/10 text-[#F5B301] font-bold">
                    <th className="p-3 sm:p-4">Age & Height Stage</th>
                    <th className="p-3 sm:p-4">Cognitive Milestone</th>
                    <th className="p-3 sm:p-4">Recommended sano play. Toy</th>
                    <th className="p-3 sm:p-4">Why It Builds Neural Pathways</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/90">
                  <tr>
                    <td className="p-3 sm:p-4 font-bold">0–6M (50–68 cm)</td>
                    <td className="p-3 sm:p-4">High-contrast visual tracking & grasp reflex</td>
                    <td className="p-3 sm:p-4">Organic Cotton Sensory Rattle & High-Contrast Cards</td>
                    <td className="p-3 sm:p-4">Strengthens ocular muscle convergence and auditory localization</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-bold">6–12M (68–80 cm)</td>
                    <td className="p-3 sm:p-4">Object permanence & pincer grasp</td>
                    <td className="p-3 sm:p-4">Natural Beechwood Imbucare Coin Box & Soft Stacker</td>
                    <td className="p-3 sm:p-4">Teaches baby that objects still exist even when hidden from sight</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-bold">1–3Y (80–98 cm)</td>
                    <td className="p-3 sm:p-4">Spatial geometry, trial & error logic</td>
                    <td className="p-3 sm:p-4">5-in-1 Sensory Activity Cube & Wooden Shape Sorter</td>
                    <td className="p-3 sm:p-4">Promotes wrist pronation and problem-solving resilience</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-bold">4–8Y (104–134 cm)</td>
                    <td className="p-3 sm:p-4">Executive function, structural physics & focus</td>
                    <td className="p-3 sm:p-4">Solid Pine Architectural Building Planks (100-pc)</td>
                    <td className="p-3 sm:p-4">Requires patience, center-of-gravity calculation, and fine motor balance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#FFF6E9]/70">
                All educational toys use 100% sustainably harvested beechwood and water-based saliva-proof pigments.
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToSection) onNavigateToSection('products-catalog');
                }}
                className="px-5 py-2.5 rounded-full bg-[#F5B301] text-[#1F2A44] font-bold text-xs hover:bg-[#F5B301]/90 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Explore Brain Toys Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vaccine Tracker Tab */}
      {activeTab === 'vaccines' && (
        <div>
          <ParentingHub />
        </div>
      )}

      {/* Growth Calculator Tab */}
      {activeTab === 'growth' && (
        <div>
          <ParentingHub />
        </div>
      )}

      {/* Pediatric Milestone Articles Tab */}
      {activeTab === 'articles' && (
        <ParentingInsightsSection onSelectCategory={onSelectCategory} />
      )}
    </section>
  );
};
