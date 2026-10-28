import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Baby,
  Check,
  Plus,
  Ruler,
  Trash2,
  ArrowRight,
  TrendingUp,
  Calendar,
  Share2,
  Info,
  X,
  ChevronDown,
  Activity,
  Heart
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { AgeStageId } from '../types';

export interface GrowthEntry {
  id: string;
  date: string; // YYYY-MM-DD
  heightCm: number;
  ageMonths?: number;
  note?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  gender: 'boy' | 'girl';
  dob: string; // YYYY-MM-DD
  heightCm: number;
  bracketId: string;
  heightLabel: string;
  stageId: AgeStageId;
  growthHistory: GrowthEntry[];
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

// WHO Child Growth Standards (Length/Height-for-age benchmarks)
const WHO_BOYS_HEIGHT_TABLE: { [month: number]: { median: number; p15: number; p85: number } } = {
  0: { median: 49.9, p15: 47.5, p85: 52.3 },
  1: { median: 54.7, p15: 52.3, p85: 57.2 },
  2: { median: 58.4, p15: 56.0, p85: 60.9 },
  3: { median: 61.4, p15: 59.0, p85: 63.9 },
  4: { median: 63.9, p15: 61.4, p85: 66.4 },
  5: { median: 65.9, p15: 63.3, p85: 68.5 },
  6: { median: 67.6, p15: 65.0, p85: 70.3 },
  7: { median: 69.2, p15: 66.5, p85: 71.9 },
  8: { median: 70.6, p15: 67.9, p85: 73.4 },
  9: { median: 72.0, p15: 69.2, p85: 74.8 },
  10: { median: 73.3, p15: 70.4, p85: 76.2 },
  11: { median: 74.5, p15: 71.6, p85: 77.5 },
  12: { median: 75.7, p15: 72.8, p85: 78.9 },
  15: { median: 79.1, p15: 76.0, p85: 82.4 },
  18: { median: 82.3, p15: 79.1, p85: 85.8 },
  21: { median: 85.1, p15: 81.7, p85: 88.8 },
  24: { median: 87.8, p15: 84.3, p85: 91.7 },
  36: { median: 96.1, p15: 92.1, p85: 100.3 },
  48: { median: 103.3, p15: 98.9, p85: 107.9 },
  60: { median: 110.0, p15: 105.1, p85: 115.0 },
};

const WHO_GIRLS_HEIGHT_TABLE: { [month: number]: { median: number; p15: number; p85: number } } = {
  0: { median: 49.1, p15: 46.8, p85: 51.5 },
  1: { median: 53.7, p15: 51.3, p85: 56.1 },
  2: { median: 57.1, p15: 54.6, p85: 59.5 },
  3: { median: 59.8, p15: 57.3, p85: 62.3 },
  4: { median: 62.1, p15: 59.5, p85: 64.7 },
  5: { median: 64.0, p15: 61.4, p85: 66.7 },
  6: { median: 65.7, p15: 63.0, p85: 68.5 },
  7: { median: 67.3, p15: 64.5, p85: 70.1 },
  8: { median: 68.7, p15: 65.8, p85: 71.6 },
  9: { median: 70.1, p15: 67.1, p85: 73.1 },
  10: { median: 71.5, p15: 68.4, p85: 74.5 },
  11: { median: 72.8, p15: 69.6, p85: 75.9 },
  12: { median: 74.0, p15: 70.8, p85: 77.2 },
  15: { median: 77.5, p15: 74.1, p85: 80.9 },
  18: { median: 80.7, p15: 77.2, p85: 84.3 },
  21: { median: 83.7, p15: 80.0, p85: 87.4 },
  24: { median: 86.4, p15: 82.6, p85: 90.3 },
  36: { median: 95.1, p15: 90.8, p85: 99.4 },
  48: { median: 102.7, p15: 98.0, p85: 107.4 },
  60: { median: 109.4, p15: 104.3, p85: 114.5 },
};

// Calculate age in fractional months between two dates
export const calculateAgeMonths = (dobStr: string, dateStr: string): number => {
  const birth = new Date(dobStr);
  const target = new Date(dateStr);
  const diffTime = target.getTime() - birth.getTime();
  const days = Math.max(0, diffTime / (1000 * 60 * 60 * 24));
  return Math.round((days / 30.4375) * 10) / 10;
};

// Interpolate WHO standard height for given month
export const getWHOStandard = (months: number, gender: 'boy' | 'girl') => {
  const table = gender === 'boy' ? WHO_BOYS_HEIGHT_TABLE : WHO_GIRLS_HEIGHT_TABLE;
  const sortedMonths = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);

  if (months <= sortedMonths[0]) return table[sortedMonths[0]];
  if (months >= sortedMonths[sortedMonths.length - 1]) return table[sortedMonths[sortedMonths.length - 1]];

  let lower = sortedMonths[0];
  let upper = sortedMonths[sortedMonths.length - 1];

  for (let i = 0; i < sortedMonths.length - 1; i++) {
    if (months >= sortedMonths[i] && months <= sortedMonths[i + 1]) {
      lower = sortedMonths[i];
      upper = sortedMonths[i + 1];
      break;
    }
  }

  const ratio = (months - lower) / (upper - lower || 1);
  const lowerVal = table[lower];
  const upperVal = table[upper];

  return {
    median: Math.round((lowerVal.median + (upperVal.median - lowerVal.median) * ratio) * 10) / 10,
    p15: Math.round((lowerVal.p15 + (upperVal.p15 - lowerVal.p15) * ratio) * 10) / 10,
    p85: Math.round((lowerVal.p85 + (upperVal.p85 - lowerVal.p85) * ratio) * 10) / 10,
  };
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
  
  // Tab navigation state: 'calculator' or 'growth_trend'
  const [activeTab, setActiveTab] = useState<'calculator' | 'growth_trend'>('calculator');

  // Form State for Child Profile
  const [formName, setFormName] = useState('Aarav');
  const [formGender, setFormGender] = useState<'boy' | 'girl'>('boy');
  const [formDob, setFormDob] = useState('2026-05-15');
  const [formHeightCm, setFormHeightCm] = useState<number>(65);

  // Form State for New Growth Entry
  const [logDate, setLogDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [logHeightCm, setLogHeightCm] = useState<number>(65);
  const [logNote, setLogNote] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Load profiles from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sano_child_profiles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure growthHistory exists on loaded profiles
          const sanitized = parsed.map((p: any) => {
            if (!p.growthHistory || !Array.isArray(p.growthHistory) || p.growthHistory.length === 0) {
              const birthAge = calculateAgeMonths(p.dob, p.dob);
              return {
                ...p,
                growthHistory: [
                  {
                    id: `gh-birth-${p.id}`,
                    date: p.dob,
                    heightCm: p.gender === 'boy' ? 50.0 : 49.1,
                    ageMonths: birthAge,
                    note: 'Birth measurement',
                  },
                  {
                    id: `gh-curr-${p.id}`,
                    date: new Date().toISOString().split('T')[0],
                    heightCm: p.heightCm || 65,
                    ageMonths: calculateAgeMonths(p.dob, new Date().toISOString().split('T')[0]),
                    note: 'Recent Sano Sizing check',
                  },
                ],
              };
            }
            return p;
          });
          setProfiles(sanitized);
          setActiveProfileId(sanitized[0].id);
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved child profiles', e);
      }
    }

    // Default initial profile for Aarav (65 cm, 3-6M infant with historical points)
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
      growthHistory: [
        {
          id: 'g-1',
          date: '2026-05-15',
          heightCm: 50.5,
          ageMonths: 0,
          note: 'Birth measurement at Norvic Hospital, Kathmandu',
        },
        {
          id: 'g-2',
          date: '2026-07-15',
          heightCm: 57.2,
          ageMonths: 2,
          note: '2-Month Immunization checkup',
        },
        {
          id: 'g-3',
          date: '2026-09-15',
          heightCm: 62.1,
          ageMonths: 4,
          note: '4-Month Wellness pediatric visit',
        },
        {
          id: 'g-4',
          date: '2026-10-25',
          heightCm: 65.0,
          ageMonths: 5.3,
          note: 'Pasni (Rice Feeding) preparation checkup',
        },
      ],
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

  // Sync active profile height into log form when active profile changes
  useEffect(() => {
    if (activeProfile) {
      setLogHeightCm(activeProfile.heightCm);
      setFormName(activeProfile.name);
      setFormGender(activeProfile.gender);
      setFormDob(activeProfile.dob);
      setFormHeightCm(activeProfile.heightCm);
    }
  }, [activeProfile?.id]);

  // Notify parent component when profile or auto-filter status changes
  useEffect(() => {
    if (onProfileFilterChange) {
      onProfileFilterChange(activeProfile, isAutoFilterActive);
    }
  }, [activeProfile, isAutoFilterActive]);

  const saveUpdatedProfiles = (updated: ChildProfile[]) => {
    setProfiles(updated);
    try {
      localStorage.setItem('sano_child_profiles', JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const bracket = calculateSanoBracket(formHeightCm);

    // If editing existing profile with same ID, preserve and update
    let updated: ChildProfile[];
    const existingIndex = profiles.findIndex((p) => p.id === activeProfileId);

    if (existingIndex > -1 && profiles[existingIndex].name === formName) {
      const existing = profiles[existingIndex];
      const newHistory = [...existing.growthHistory];
      const today = new Date().toISOString().split('T')[0];
      
      // Update or add today's entry
      const existingTodayIndex = newHistory.findIndex((h) => h.date === today);
      if (existingTodayIndex > -1) {
        newHistory[existingTodayIndex].heightCm = formHeightCm;
      } else {
        newHistory.push({
          id: `gh-${Date.now()}`,
          date: today,
          heightCm: formHeightCm,
          ageMonths: calculateAgeMonths(formDob, today),
          note: 'Updated from Sano Sizing Calculator',
        });
      }

      const updatedProfile: ChildProfile = {
        ...existing,
        name: formName.trim() || 'Little One',
        gender: formGender,
        dob: formDob,
        heightCm: formHeightCm,
        bracketId: bracket.id,
        heightLabel: `${bracket.minCm}–${bracket.maxCm} cm (${bracket.label})`,
        stageId: bracket.stageId,
        growthHistory: newHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      };

      updated = [...profiles];
      updated[existingIndex] = updatedProfile;
    } else {
      // Create fresh profile
      const newProfile: ChildProfile = {
        id: `child-${Date.now()}`,
        name: formName.trim() || 'Little One',
        gender: formGender,
        dob: formDob,
        heightCm: formHeightCm,
        bracketId: bracket.id,
        heightLabel: `${bracket.minCm}–${bracket.maxCm} cm (${bracket.label})`,
        stageId: bracket.stageId,
        growthHistory: [
          {
            id: `gh-birth-${Date.now()}`,
            date: formDob,
            heightCm: formGender === 'boy' ? 50.0 : 49.1,
            ageMonths: 0,
            note: 'Birth baseline measurement',
          },
          {
            id: `gh-entry-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            heightCm: formHeightCm,
            ageMonths: calculateAgeMonths(formDob, new Date().toISOString().split('T')[0]),
            note: 'Initial Sano profile measurement',
          },
        ],
      };
      updated = [...profiles, newProfile];
      setActiveProfileId(newProfile.id);
    }

    saveUpdatedProfiles(updated);
    setIsModalOpen(false);
  };

  const handleDeleteProfile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (profiles.length <= 1) return;
    const updated = profiles.filter((p) => p.id !== id);
    saveUpdatedProfiles(updated);
    if (activeProfileId === id) {
      setActiveProfileId(updated[0].id);
    }
  };

  // Add a new historical height measurement in the Growth Trend tab
  const handleAddGrowthEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProfile) return;

    const ageMonths = calculateAgeMonths(activeProfile.dob, logDate);
    const newEntry: GrowthEntry = {
      id: `gh-${Date.now()}`,
      date: logDate,
      heightCm: Number(logHeightCm),
      ageMonths,
      note: logNote.trim() || 'Routine height check',
    };

    const newHistory = [...activeProfile.growthHistory, newEntry].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Latest chronological entry defines current height and bracket
    const latestEntry = newHistory[newHistory.length - 1];
    const latestHeight = latestEntry.heightCm;
    const newBracket = calculateSanoBracket(latestHeight);

    const updatedProfile: ChildProfile = {
      ...activeProfile,
      heightCm: latestHeight,
      bracketId: newBracket.id,
      heightLabel: `${newBracket.minCm}–${newBracket.maxCm} cm (${newBracket.label})`,
      stageId: newBracket.stageId,
      growthHistory: newHistory,
    };

    const updatedProfiles = profiles.map((p) => (p.id === activeProfile.id ? updatedProfile : p));
    saveUpdatedProfiles(updatedProfiles);
    setLogNote('');
  };

  const handleDeleteGrowthEntry = (entryId: string) => {
    if (!activeProfile || activeProfile.growthHistory.length <= 1) return;

    const filteredHistory = activeProfile.growthHistory.filter((h) => h.id !== entryId);
    const latestEntry = filteredHistory[filteredHistory.length - 1];
    const latestHeight = latestEntry.heightCm;
    const newBracket = calculateSanoBracket(latestHeight);

    const updatedProfile: ChildProfile = {
      ...activeProfile,
      heightCm: latestHeight,
      bracketId: newBracket.id,
      heightLabel: `${newBracket.minCm}–${newBracket.maxCm} cm (${newBracket.label})`,
      stageId: newBracket.stageId,
      growthHistory: filteredHistory,
    };

    const updatedProfiles = profiles.map((p) => (p.id === activeProfile.id ? updatedProfile : p));
    saveUpdatedProfiles(updatedProfiles);
  };

  // Prepare chart data for Recharts by merging child measurements with WHO guidelines
  const chartData = useMemo(() => {
    if (!activeProfile) return [];

    const sortedHistory = [...activeProfile.growthHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedHistory.map((entry) => {
      const ageMo = entry.ageMonths !== undefined ? entry.ageMonths : calculateAgeMonths(activeProfile.dob, entry.date);
      const who = getWHOStandard(ageMo, activeProfile.gender);

      const dateObj = new Date(entry.date);
      const formattedLabel = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'short' })}`;

      return {
        id: entry.id,
        rawDate: entry.date,
        displayLabel: `${formattedLabel} (${ageMo}M)`,
        ageMonths: ageMo,
        measuredHeight: entry.heightCm,
        whoMedian: who.median,
        whoP15: who.p15,
        whoP85: who.p85,
        note: entry.note,
      };
    });
  }, [activeProfile]);

  // Statistics calculation
  const stats = useMemo(() => {
    if (!activeProfile || activeProfile.growthHistory.length === 0) {
      return {
        firstHeight: 50,
        currentHeight: 65,
        totalGain: 15,
        monthlyVelocity: 2.5,
        currentAgeMonths: 5,
        percentileLabel: '50th percentile (Healthy Standard)',
        deltaFromWho: 0,
      };
    }

    const sorted = [...activeProfile.growthHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    const currentAgeMonths = calculateAgeMonths(activeProfile.dob, last.date);
    const who = getWHOStandard(currentAgeMonths, activeProfile.gender);
    const totalGain = Math.round((last.heightCm - first.heightCm) * 10) / 10;
    const elapsedMonths = Math.max(0.5, currentAgeMonths);
    const monthlyVelocity = Math.round((totalGain / elapsedMonths) * 10) / 10;
    const deltaFromWho = Math.round((last.heightCm - who.median) * 10) / 10;

    let percentileLabel = '~50th percentile (Median)';
    if (deltaFromWho >= 3) {
      percentileLabel = '~85th–90th percentile (Tall)';
    } else if (deltaFromWho > 1) {
      percentileLabel = '~65th percentile (Above Average)';
    } else if (deltaFromWho >= -1 && deltaFromWho <= 1) {
      percentileLabel = '~50th percentile (WHO Standard Median)';
    } else if (deltaFromWho > -3) {
      percentileLabel = '~35th percentile (Lean / Healthy)';
    } else {
      percentileLabel = '~15th percentile (Track with Doctor)';
    }

    return {
      firstHeight: first.heightCm,
      currentHeight: last.heightCm,
      totalGain,
      monthlyVelocity,
      currentAgeMonths,
      percentileLabel,
      deltaFromWho,
    };
  }, [activeProfile]);

  // Handle WhatsApp Growth Summary Share
  const handleShareSummary = () => {
    if (!activeProfile) return;
    const text = `📊 *${activeProfile.name}'s Growth Report (sano. Nepal)*\n\n• Current Height: *${activeProfile.heightCm} cm* (${activeProfile.heightLabel})\n• Age: *${stats.currentAgeMonths} months*\n• Total Growth: *+${stats.totalGain} cm* since birth\n• WHO Status: *${stats.percentileLabel}*\n• Monthly Velocity: *~${stats.monthlyVelocity} cm/month*\n\nTracked with Sano Smart Sizing & Growth Engine 🇳🇵`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  const previewBracket = calculateSanoBracket(formHeightCm);

  return (
    <div className="w-full bg-[#1F2A44] text-[#FFF6E9] py-2.5 px-4 sm:px-6 lg:px-8 border-b-2 border-[#F5B301] shadow-inner select-none">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left Indicator & Smart Sizing Explanation */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#5DAA7A] animate-pulse" />
          <span className="font-bold text-[#F5B301] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>Smart Sizing &amp; Growth Engine</span>
          </span>
          <span className="hidden md:inline text-white/50">•</span>
          <span className="text-[#FFF6E9]/80 hidden md:inline text-xs">
            Personalized sizing + WHO pediatric height tracker for Kathmandu parents.
          </span>
        </div>

        {/* Center/Right Profile Selector & Growth Quick Actions */}
        {activeProfile ? (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            
            {/* Active Child Dropdown Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2.5 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer text-left min-h-[48px] min-w-[48px] active:scale-95"
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
                  {activeProfile.bracketId}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60 ml-0.5" />
              </button>

              {/* Multi-child dropdown switcher */}
              {isSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#FFF6E9] p-3 text-[#1F2A44] border-2 border-[#1F2A44] shadow-2xl z-50 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 px-1 border-b border-[#1F2A44]/10 pb-1.5">
                    <span>Your Child Profiles</span>
                    <span className="text-[#E8604F] text-[10px]">{profiles.length} registered</span>
                  </div>
                  {profiles.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveProfileId(p.id);
                        setIsSwitcherOpen(false);
                      }}
                      className={`clickable-card min-h-[48px] flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                        p.id === activeProfile.id
                          ? 'bg-[#1F2A44] text-[#FFF6E9]'
                          : 'hover:bg-black/5 text-[#1F2A44]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold truncate">{p.name}</span>
                        <span className="text-[10px] opacity-75">
                          {p.heightCm} cm · {p.heightLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {p.id === activeProfile.id && <Check className="w-3.5 h-3.5 text-[#F5B301]" />}
                        {profiles.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteProfile(p.id, e)}
                            className="w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full hover:bg-red-50 hover:text-[#E8604F] transition-colors"
                            title="Delete profile"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-1 border-t border-[#1F2A44]/10 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSwitcherOpen(false);
                        setActiveTab('calculator');
                        setIsModalOpen(true);
                      }}
                      className="w-full py-2.5 text-center text-xs font-bold text-[#1F2A44] hover:bg-black/5 rounded-lg flex items-center justify-center gap-1.5 min-h-[48px] min-w-[48px]"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#F5B301]" />
                      <span>Add Another Child</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Growth Trend Quick Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('growth_trend');
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 rounded-full bg-[#E8604F] px-4 py-2.5 font-bold text-white hover:bg-[#E8604F]/90 transition-all text-xs cursor-pointer shadow-sm min-h-[48px] min-w-[48px] active:scale-95"
              title="View child height growth chart vs WHO curve"
            >
              <TrendingUp className="w-4 h-4 text-[#F5B301]" />
              <span>Growth Trend</span>
              <span className="hidden sm:inline bg-black/20 px-2 py-0.5 rounded-full text-[10px] text-white/90">
                +{stats.totalGain} cm
              </span>
            </button>

            {/* Auto-Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoFilterActive(!isAutoFilterActive)}
              className={`flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 font-bold transition-all text-xs cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 ${
                isAutoFilterActive
                  ? 'bg-[#5DAA7A] text-white shadow-xs'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              title="Toggle automatic catalog filtering based on child height"
            >
              <Check className="w-3.5 h-3.5" />
              <span>
                {isAutoFilterActive ? 'Filter Catalog: ON' : 'Filter Catalog: OFF'}
              </span>
            </button>

            {/* Edit Profile / Calculator Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('calculator');
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 rounded-full bg-[#F5B301] px-4 py-2.5 font-bold text-[#1F2A44] hover:bg-[#F5B301]/90 transition-all text-xs cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 shadow-xs"
            >
              <Ruler className="w-4 h-4" />
              <span>Sizing Calc</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setActiveTab('calculator');
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-full bg-[#F5B301] px-5 py-2.5 font-bold text-[#1F2A44] hover:bg-[#F5B301]/90 transition-all text-xs sm:text-sm cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Set Child DOB &amp; Height</span>
          </button>
        )}
      </div>

      {/* COMPREHENSIVE SIZING & GROWTH MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 sm:p-5 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FFF6E9] text-[#1F2A44] border-2 border-[#1F2A44] shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#1F2A44] text-[#FFF6E9] p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#F5B301]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5B301] text-[#1F2A44] flex items-center justify-center font-bold">
                  {activeTab === 'growth_trend' ? <TrendingUp className="w-4 h-4" /> : <Ruler className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-[#FFF6E9] flex items-center gap-2">
                    <span>{activeProfile ? `${activeProfile.name}'s Profile` : 'Child Profile & Growth'}</span>
                    {activeProfile && (
                      <span className="text-xs bg-[#F5B301] text-[#1F2A44] px-2 py-0.5 rounded-full font-bold">
                        {activeProfile.heightCm} cm
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-[#FFF6E9]/75">
                    Smart sizing brackets &amp; WHO standard child height trajectory
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-all active:scale-95"
                title="Close"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB NAVIGATION BAR (min 48px touch targets) */}
            <div className="bg-white/70 border-b border-[#1F2A44]/15 px-4 pt-2 flex gap-2 text-xs font-bold overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`min-h-[48px] min-w-[48px] px-4 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer active:scale-95 ${
                  activeTab === 'calculator'
                    ? 'border-[#E8604F] text-[#E8604F]'
                    : 'border-transparent text-[#1F2A44]/60 hover:text-[#1F2A44]'
                }`}
              >
                <Ruler className="w-4 h-4" />
                <span>Size Calculator &amp; Wardrobe Fit</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('growth_trend')}
                className={`min-h-[48px] min-w-[48px] px-4 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer active:scale-95 ${
                  activeTab === 'growth_trend'
                    ? 'border-[#E8604F] text-[#E8604F]'
                    : 'border-transparent text-[#1F2A44]/60 hover:text-[#1F2A44]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Growth Trend &amp; WHO Curves</span>
                <span className="bg-[#5DAA7A] text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  Recharts
                </span>
              </button>
            </div>

            {/* MODAL BODY (SCROLLABLE) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs">
              
              {/* TAB 1: SIZING CALCULATOR */}
              {activeTab === 'calculator' && (
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="bg-white p-4 rounded-2xl border border-[#1F2A44]/15 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2">
                      <span className="font-bold text-[#1F2A44] flex items-center gap-1.5">
                        <Baby className="w-4 h-4 text-[#F5B301]" />
                        Child Details
                      </span>
                      <span className="text-[11px] text-[#1F2A44]/60">Used to filter apparel &amp; diapers</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                          Child's Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Aarav"
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/40 px-3 py-2 text-xs font-bold text-[#1F2A44] focus:border-[#F5B301] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                          Gender
                        </label>
                        <select
                          value={formGender}
                          onChange={(e) => setFormGender(e.target.value as 'boy' | 'girl')}
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/40 px-3 py-2 text-xs font-bold text-[#1F2A44] focus:border-[#F5B301] focus:outline-none"
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
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/40 px-3 py-2 text-xs font-bold text-[#1F2A44] focus:border-[#F5B301] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Height Slider Card */}
                  <div className="bg-white p-5 rounded-2xl border border-[#1F2A44]/15 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/70">
                          Current Height (Centimeters)
                        </label>
                        <span className="text-[11px] text-[#1F2A44]/60">
                          Slide to match your little one's current standing/reclined length
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#FFF6E9] px-3.5 py-1.5 rounded-xl border border-[#1F2A44]/20">
                        <span className="font-heading font-extrabold text-[#E8604F] text-xl">
                          {formHeightCm}
                        </span>
                        <span className="font-bold text-[#1F2A44]/70 text-xs">cm</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="45"
                      max="165"
                      step="1"
                      value={formHeightCm}
                      onChange={(e) => setFormHeightCm(Number(e.target.value))}
                      className="w-full accent-[#F5B301] cursor-pointer h-2 bg-gray-200 rounded-lg"
                    />

                    {/* Quick Bracket Preview */}
                    <div className="p-3 rounded-xl bg-[#FFF6E9] border border-[#1F2A44]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#5DAA7A] text-white flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-[#1F2A44]">
                            Recommended Sano Sizing Bracket:
                          </div>
                          <div className="text-[11px] text-[#1F2A44]/70">
                            Fits {previewBracket.ageText} ({previewBracket.minCm}–{previewBracket.maxCm} cm)
                          </div>
                        </div>
                      </div>

                      <span className="font-extrabold text-sm text-[#1F2A44] bg-[#F5B301] px-3 py-1 rounded-full text-center shrink-0">
                        {previewBracket.label}
                      </span>
                    </div>

                    {/* Sano Kathmandu Wardrobe Guidance */}
                    <div className="text-[11px] text-[#1F2A44]/75 bg-blue-50/70 p-3 rounded-xl border border-blue-200/60 flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Kathmandu Weather Sizing Tip:</strong> If your child is between 66–68 cm during autumn/winter, consider sizing up to <strong>6–9M</strong> to allow comfortable inner thermal and cotton layering.
                      </span>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1F2A44]/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-3 rounded-full border border-[#1F2A44]/20 text-[#1F2A44] font-bold hover:bg-black/5 active:scale-95 transition-all cursor-pointer min-h-[48px] min-w-[48px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-[#1F2A44] px-6 py-3 font-bold text-[#FFF6E9] hover:bg-[#1F2A44]/90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] shadow-sm"
                    >
                      <span>Save Child &amp; Apply Filter</span>
                      <ArrowRight className="w-4 h-4 text-[#F5B301]" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: GROWTH TREND & WHO TRAJECTORY (RECHARTS) */}
              {activeTab === 'growth_trend' && activeProfile && (
                <div className="space-y-6">
                  
                  {/* Child Selector in Growth Tab */}
                  {profiles.length > 1 && (
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                      <span className="font-bold text-[#1F2A44]/70 text-xs shrink-0">Select Child:</span>
                      {profiles.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActiveProfileId(p.id)}
                          className={`px-4 py-2 rounded-full font-bold text-xs shrink-0 transition-all cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 ${
                            p.id === activeProfile.id
                              ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-xs'
                              : 'bg-white border border-[#1F2A44]/20 text-[#1F2A44] hover:bg-black/5'
                          }`}
                        >
                          {p.name} ({p.heightCm} cm)
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Key Stats Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-white p-3 rounded-2xl border border-[#1F2A44]/15 shadow-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/60">
                        Current Height
                      </div>
                      <div className="font-heading font-extrabold text-[#E8604F] text-lg mt-0.5">
                        {stats.currentHeight} <span className="text-xs font-bold text-[#1F2A44]">cm</span>
                      </div>
                      <div className="text-[10px] text-[#1F2A44]/70">
                        Age: ~{stats.currentAgeMonths} Months
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-[#1F2A44]/15 shadow-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/60">
                        Total Tracked Gain
                      </div>
                      <div className="font-heading font-extrabold text-[#5DAA7A] text-lg mt-0.5">
                        +{stats.totalGain} <span className="text-xs font-bold text-[#1F2A44]">cm</span>
                      </div>
                      <div className="text-[10px] text-[#1F2A44]/70">
                        From {stats.firstHeight} cm baseline
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-[#1F2A44]/15 shadow-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/60">
                        Growth Velocity
                      </div>
                      <div className="font-heading font-extrabold text-[#1F2A44] text-lg mt-0.5">
                        ~{stats.monthlyVelocity} <span className="text-xs font-bold text-[#1F2A44]/70">cm/mo</span>
                      </div>
                      <div className="text-[10px] text-[#5DAA7A] font-bold">
                        Healthy Progression
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-[#1F2A44]/15 shadow-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/60">
                        WHO Percentile
                      </div>
                      <div className="font-heading font-extrabold text-[#F5B301] text-base mt-0.5 truncate" title={stats.percentileLabel}>
                        {stats.percentileLabel.split('(')[0]}
                      </div>
                      <div className="text-[10px] text-[#1F2A44]/70 truncate">
                        {stats.deltaFromWho >= 0 ? `+${stats.deltaFromWho} cm vs Median` : `${stats.deltaFromWho} cm vs Median`}
                      </div>
                    </div>
                  </div>

                  {/* RECHARTS VISUALIZATION CONTAINER */}
                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#1F2A44]/15 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F2A44]/10 pb-3">
                      <div>
                        <h4 className="font-heading text-sm sm:text-base font-bold text-[#1F2A44] flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[#E8604F]" />
                          <span>{activeProfile.name}'s Height Trajectory vs. WHO Growth Standards</span>
                        </h4>
                        <p className="text-[11px] text-[#1F2A44]/60">
                          Monitors child height milestones against World Health Organization reference curves.
                        </p>
                      </div>

                      {/* Legend Chips */}
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E8604F]/10 text-[#E8604F]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E8604F]" />
                          {activeProfile.name}'s Measured Height
                        </span>
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1F2A44]/10 text-[#1F2A44]">
                          <span className="w-2.5 h-0.5 bg-[#1F2A44] border-t border-dashed" />
                          WHO 50th Percentile Median
                        </span>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="w-full h-[280px] sm:h-[300px] pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={chartData}
                          margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="measuredArea" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#E8604F" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="#E8604F" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="whoHealthyZone" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#5DAA7A" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#5DAA7A" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>

                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          
                          <XAxis
                            dataKey="displayLabel"
                            tick={{ fill: '#1F2A44', fontSize: 10, fontWeight: 600 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickLine={false}
                          />

                          <YAxis
                            unit="cm"
                            domain={['dataMin - 3', 'dataMax + 4']}
                            tick={{ fill: '#1F2A44', fontSize: 10, fontWeight: 600 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickLine={false}
                          />

                          <Tooltip
                            content={({ active, payload }) => {
                              if (!active || !payload || !payload.length) return null;
                              const data = payload[0].payload;
                              return (
                                <div className="rounded-2xl bg-[#1F2A44] p-3 text-[#FFF6E9] shadow-xl border border-[#F5B301] text-xs space-y-1.5 max-w-xs">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                                    <span className="font-bold text-[#F5B301]">{data.rawDate}</span>
                                    <span className="text-[10px] text-white/70">{data.ageMonths} Months</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-4">
                                      <span className="text-white/80">Measured Height:</span>
                                      <span className="font-bold text-[#E8604F] text-sm">
                                        {data.measuredHeight} cm
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 text-[11px]">
                                      <span className="text-white/70">WHO 50th Median:</span>
                                      <span className="font-bold text-white">{data.whoMedian} cm</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 text-[10px] text-[#5DAA7A]">
                                      <span>Healthy Range (P15-P85):</span>
                                      <span>{data.whoP15}–{data.whoP85} cm</span>
                                    </div>
                                  </div>
                                  {data.note && (
                                    <div className="pt-1 border-t border-white/10 text-[10px] text-[#FFF6E9]/80 italic">
                                      "{data.note}"
                                    </div>
                                  )}
                                </div>
                              );
                            }}
                          />

                          {/* WHO Healthy Corridor Area */}
                          <Area
                            type="monotone"
                            dataKey="whoP85"
                            stroke="#5DAA7A"
                            strokeWidth={1}
                            strokeDasharray="2 2"
                            fill="url(#whoHealthyZone)"
                            name="WHO Upper 85th"
                          />

                          {/* WHO Median Standard Line */}
                          <Line
                            type="monotone"
                            dataKey="whoMedian"
                            stroke="#1F2A44"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={false}
                            name="WHO 50th Median"
                          />

                          {/* Child Measured Height Curve */}
                          <Area
                            type="monotone"
                            dataKey="measuredHeight"
                            stroke="#E8604F"
                            strokeWidth={3}
                            fill="url(#measuredArea)"
                            dot={{
                              r: 5,
                              fill: '#E8604F',
                              stroke: '#FFF6E9',
                              strokeWidth: 2,
                            }}
                            activeDot={{
                              r: 7,
                              fill: '#F5B301',
                              stroke: '#1F2A44',
                              strokeWidth: 2,
                            }}
                            name="Measured Height"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[#1F2A44]/75 border-t border-[#1F2A44]/10">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-[#E8604F]" />
                        <span>WHO Child Growth Standards data benchmarked for healthy cognitive and physical development.</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleShareSummary}
                        className="flex items-center gap-1.5 text-[#1F2A44] font-bold bg-[#F5B301] hover:bg-[#F5B301]/90 px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>{copiedSummary ? 'Copied to Clipboard!' : 'Share Growth Summary'}</span>
                      </button>
                    </div>
                  </div>

                  {/* FORM: LOG NEW MEASUREMENT */}
                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#1F2A44]/15 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2">
                      <span className="font-bold text-[#1F2A44] flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-[#E8604F]" />
                        Record New Height Measurement
                      </span>
                      <span className="text-[11px] text-[#1F2A44]/60">
                        Updates chart &amp; Sano wardrobe sizing
                      </span>
                    </div>

                    <form onSubmit={handleAddGrowthEntry} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          value={logDate}
                          onChange={(e) => setLogDate(e.target.value)}
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/40 px-3 py-2 text-xs font-bold text-[#1F2A44] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                          Height in cm
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="40"
                          max="165"
                          required
                          value={logHeightCm}
                          onChange={(e) => setLogHeightCm(Number(e.target.value))}
                          placeholder="e.g. 66.5"
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/40 px-3 py-2 text-xs font-bold text-[#1F2A44] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F2A44]/70 mb-1">
                          Milestone Note / Clinic
                        </label>
                        <input
                          type="text"
                          value={logNote}
                          onChange={(e) => setLogNote(e.target.value)}
                          placeholder="e.g. 6M Checkup at Patan Clinic"
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/40 px-3 py-2 text-xs font-semibold text-[#1F2A44] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-[#E8604F] py-2 px-3 font-bold text-white hover:bg-[#E8604F]/90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* HISTORICAL LOG TABLE */}
                  <div className="bg-white p-4 rounded-3xl border border-[#1F2A44]/15 space-y-2">
                    <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2">
                      <span className="font-bold text-[#1F2A44]">
                        Recorded Milestones &amp; Checkpoints ({activeProfile.growthHistory.length})
                      </span>
                      <span className="text-[10px] text-[#1F2A44]/60">Chronological height log</span>
                    </div>

                    <div className="divide-y divide-[#1F2A44]/10 max-h-48 overflow-y-auto">
                      {chartData.map((item) => (
                        <div key={item.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="font-bold text-[#1F2A44]">{item.rawDate}</span>
                            <span className="text-[10px] bg-[#1F2A44]/10 px-2 py-0.5 rounded-full font-semibold">
                              {item.ageMonths}M
                            </span>
                            <span className="text-[11px] text-[#1F2A44]/70 truncate italic">
                              {item.note || 'Regular measurement'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-heading font-bold text-[#E8604F]">
                              {item.measuredHeight} cm
                            </span>
                            <span className="text-[10px] text-[#1F2A44]/60 hidden sm:inline">
                              (WHO: {item.whoMedian} cm)
                            </span>
                            {activeProfile.growthHistory.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteGrowthEntry(item.id)}
                                className="p-1 text-gray-400 hover:text-[#E8604F] transition-colors"
                                title="Delete entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-white/90 border-t border-[#1F2A44]/15 p-3.5 px-6 flex items-center justify-between text-xs">
              <span className="text-[#1F2A44]/70 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
                <span>All profile data persists in your browser localStorage.</span>
              </span>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-1.5 rounded-full bg-[#1F2A44] font-bold text-[#FFF6E9] hover:bg-[#1F2A44]/90 transition-all cursor-pointer"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
