import React, { useState, useEffect } from 'react';
import { Sparkles, Baby, Check, Plus, Ruler, Trash2, ArrowRight } from 'lucide-react';
import { AgeStageId } from '../types';

export interface ChildProfile {
  id: string;
  name: string;
  gender: 'boy' | 'girl';
  dob: string; // YYYY-MM-DD
  heightCm: number;
  bracketId: string;
  heightLabel: string;
  stageId: AgeStageId;
}

// Sano Height Brackets Mapping
export const SANO_HEIGHT_BRACKETS = [
  { id: 'preemie', label: 'Preemie', minCm: 0, maxCm: 50, ageText: '0–1M', stageId: 'newborn' as AgeStageId },
  { id: 'newborn', label: 'Newborn', minCm: 50, maxCm: 56, ageText: '0–1M', stageId: 'newborn' as AgeStageId },
  { id: 'm0_3', label: '0–3M', minCm: 56, maxCm: 62, ageText: '0–3 Months', stageId: 'infant' as AgeStageId },
  { id: 'm3_6', label: '3–6M', minCm: 62, maxCm: 68, ageText: '3–6 Months', stageId: 'infant' as AgeStageId },
  { id: 'm6_9', label: '6–9M', minCm: 68, maxCm: 74, ageText: '6–9 Months', stageId: 'infant' as AgeStageId },
  { id: 'm9_12', label: '9–12M', minCm: 74, maxCm: 80, ageText: '9–12 Months', stageId: 'infant' as AgeStageId },
  { id: 'm12_18', label: '12–18M', minCm: 80, maxCm: 86, ageText: '12–18 Months', stageId: 'toddler' as AgeStageId },
  { id: 'm18_24', label: '18–24M', minCm: 86, maxCm: 92, ageText: '18–24 Months', stageId: 'toddler' as AgeStageId },
  { id: 'y2_3', label: '2–3Y', minCm: 92, maxCm: 98, ageText: '2–3 Years', stageId: 'toddler' as AgeStageId },
  { id: 'y3_4', label: '3–4Y', minCm: 98, maxCm: 104, ageText: '3–4 Years', stageId: 'early_child' as AgeStageId },
  { id: 'y4_6', label: '4–6Y', minCm: 104, maxCm: 116, ageText: '4–6 Years', stageId: 'early_child' as AgeStageId },
  { id: 'y6_8', label: '6–8Y', minCm: 116, maxCm: 128, ageText: '6–8 Years', stageId: 'middle_child' as AgeStageId },
  { id: 'y8_14', label: '8–14Y', minCm: 128, maxCm: 164, ageText: '8–14 Years', stageId: 'teen' as AgeStageId },
];

export const calculateSanoBracket = (cm: number) => {
  const match = SANO_HEIGHT_BRACKETS.find((b) => cm >= b.minCm && cm < b.maxCm);
  return match || SANO_HEIGHT_BRACKETS[SANO_HEIGHT_BRACKETS.length - 1];
};

interface SmartSizingEngineProps {
  onProfileFilterChange?: (profile: ChildProfile | null, isAutoFilterActive: boolean) => void;
  activeStage?: AgeStageId | 'all';
}

export const SmartSizingEngine: React.FC<SmartSizingEngineProps> = ({
  onProfileFilterChange,
  activeStage,
}) => {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [isAutoFilterActive, setIsAutoFilterActive] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState<boolean>(false);

  // New Profile Form State
  const [formName, setFormName] = useState('Aarav');
  const [formGender, setFormGender] = useState<'boy' | 'girl'>('boy');
  const [formDob, setFormDob] = useState('2026-05-15');
  const [formHeightCm, setFormHeightCm] = useState<number>(65);

  // Load profiles from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sano_child_profiles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProfiles(parsed);
          setActiveProfileId(parsed[0].id);
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved child profiles', e);
      }
    }

    // Default initial profile (65 cm, 3-6M)
    const bracket = calculateSanoBracket(65);
    const defaultProfile: ChildProfile = {
      id: 'default-1',
      name: 'Aarav',
      gender: 'boy',
      dob: '2026-05-15',
      heightCm: 65,
      bracketId: bracket.id,
      heightLabel: `${bracket.minCm}–${bracket.maxCm} cm (${bracket.label})`,
      stageId: bracket.stageId,
    };
    setProfiles([defaultProfile]);
    setActiveProfileId(defaultProfile.id);
    try {
      localStorage.setItem('sano_child_profiles', JSON.stringify([defaultProfile]));
    } catch {
      // Ignore storage error
    }
  }, []);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || null;

  // Notify parent component when profile or auto-filter status changes
  useEffect(() => {
    if (onProfileFilterChange) {
      onProfileFilterChange(activeProfile, isAutoFilterActive);
    }
  }, [activeProfile, isAutoFilterActive]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const bracket = calculateSanoBracket(formHeightCm);
    const newProfile: ChildProfile = {
      id: `child-${Date.now()}`,
      name: formName.trim() || 'Little One',
      gender: formGender,
      dob: formDob,
      heightCm: formHeightCm,
      bracketId: bracket.id,
      heightLabel: `${bracket.minCm}–${bracket.maxCm} cm (${bracket.label})`,
      stageId: bracket.stageId,
    };

    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setActiveProfileId(newProfile.id);
    try {
      localStorage.setItem('sano_child_profiles', JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
    setIsModalOpen(false);
  };

  const handleDeleteProfile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (profiles.length <= 1) return;
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    if (activeProfileId === id) {
      setActiveProfileId(updated[0].id);
    }
    try {
      localStorage.setItem('sano_child_profiles', JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
  };

  const previewBracket = calculateSanoBracket(formHeightCm);

  return (
    <div className="w-full bg-[#1F2A44] text-[#FFF6E9] py-2.5 px-4 sm:px-6 lg:px-8 border-b-2 border-[#F5B301] shadow-inner">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left Indicator & Smart Sizing Explanation */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#5DAA7A] animate-pulse" />
          <span className="font-bold text-[#F5B301] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>Smart Sizing Engine</span>
          </span>
          <span className="hidden md:inline text-white/50">•</span>
          <span className="text-[#FFF6E9]/80 hidden md:inline text-xs">
            "Shop by Age &amp; Height First": Zero sizing confusion across Kathmandu Valley.
          </span>
        </div>

        {/* Center/Right Profile Selector */}
        {activeProfile ? (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* Active Child Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                title="Click to switch child or view sizing"
              >
                <Baby className="w-4 h-4 text-[#F5B301]" />
                <span className="font-bold text-[#FFF6E9]">{activeProfile.name}</span>
                <span className="text-white/60 text-[11px]">
                  ({activeProfile.gender === 'boy' ? 'Boy 👦' : 'Girl 👧'})
                </span>
                <span className="text-[#F5B301] font-bold">•</span>
                <span className="font-bold text-[#8FD0EA] flex items-center gap-1">
                  {activeProfile.heightCm} cm
                </span>
                <span className="rounded-full bg-[#F5B301] px-2 py-0.5 text-[10px] font-bold text-[#1F2A44] ml-0.5">
                  {activeProfile.heightLabel}
                </span>
              </button>

              {/* Multi-child dropdown switcher */}
              {isSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#FFF6E9] p-3 text-[#1F2A44] border-2 border-[#1F2A44] shadow-2xl z-50 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 px-1 border-b border-[#1F2A44]/10 pb-1">
                    Your Child Profiles
                  </div>
                  {profiles.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveProfileId(p.id);
                        setIsSwitcherOpen(false);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        p.id === activeProfile.id
                          ? 'bg-[#1F2A44] text-[#FFF6E9]'
                          : 'hover:bg-black/5 text-[#1F2A44]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold truncate">{p.name}</span>
                        <span className="text-[10px] opacity-75">
                          {p.heightCm} cm · {p.bracketId}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {p.id === activeProfile.id && <Check className="w-3.5 h-3.5 text-[#F5B301]" />}
                        {profiles.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteProfile(p.id, e)}
                            className="p-1 hover:text-[#E8604F] transition-colors"
                            title="Delete profile"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSwitcherOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full mt-1 py-1.5 text-center text-xs font-bold text-[#E8604F] hover:underline flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Another Child</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auto-Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoFilterActive(!isAutoFilterActive)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-bold transition-all text-[11px] cursor-pointer ${
                isAutoFilterActive
                  ? 'bg-[#5DAA7A] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              title="Toggle automatic catalog filtering based on child height"
            >
              <Check className="w-3 h-3" />
              <span>
                {isAutoFilterActive ? 'Filter Catalog: ON' : 'Filter Catalog: OFF'}
              </span>
            </button>

            {/* Add / Edit Profile Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-[#F5B301] px-3 py-1.5 font-bold text-[#1F2A44] hover:bg-[#F5B301]/90 transition-all text-[11px] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Edit / Add Child</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-[#F5B301] px-4 py-1.5 font-bold text-[#1F2A44] hover:bg-[#F5B301]/90 transition-all text-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Set Child DOB &amp; Height</span>
          </button>
        )}
      </div>

      {/* Add / Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#FFF6E9] p-6 text-[#1F2A44] border-2 border-[#1F2A44] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5B301]" />
                <h3 className="font-heading text-lg font-bold text-[#E8604F]">
                  Add Child Sizing Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-[#1F2A44]/60 hover:text-[#1F2A44] cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                  Child's Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Aarav / Ananya"
                  className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#1F2A44] focus:border-[#F5B301] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                    Gender
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'boy' | 'girl')}
                    className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-3 py-2.5 text-xs font-bold text-[#1F2A44] focus:border-[#F5B301] focus:outline-none"
                  >
                    <option value="boy">Boy 👦</option>
                    <option value="girl">Girl 👧</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={formDob}
                    onChange={(e) => setFormDob(e.target.value)}
                    className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-3 py-2.5 text-xs font-bold text-[#1F2A44] focus:border-[#F5B301] focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#1F2A44]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70">
                    Current Height in Centimeters
                  </label>
                  <span className="font-heading font-bold text-[#E8604F] text-base">
                    {formHeightCm} cm
                  </span>
                </div>
                
                <input
                  type="range"
                  min="45"
                  max="165"
                  value={formHeightCm}
                  onChange={(e) => setFormHeightCm(Number(e.target.value))}
                  className="w-full accent-[#F5B301] cursor-pointer"
                />

                <div className="pt-2 border-t border-[#1F2A44]/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#1F2A44]/70">Sano Sizing Bracket:</span>
                  <span className="font-bold text-[#1F2A44] bg-[#F5B301]/25 px-2.5 py-0.5 rounded-full">
                    {previewBracket.minCm}–{previewBracket.maxCm} cm ({previewBracket.label})
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1F2A44]/10 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-[#1F2A44]/20 text-[#1F2A44] text-xs font-bold hover:bg-black/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#1F2A44] py-2.5 text-xs font-bold text-[#FFF6E9] hover:bg-[#1F2A44]/90 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Save Sizing Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5B301]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
