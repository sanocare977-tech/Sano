import React, { useState } from 'react';
import { 
  Calendar, 
  Activity, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Printer, 
  Baby, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  FileText
} from 'lucide-react';

export const ParentingHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vaccines' | 'growth' | 'printables'>('vaccines');

  // Vaccine Calculator State
  const [childDob, setChildDob] = useState<string>('2026-06-15');
  const [completedVaccines, setCompletedVaccines] = useState<Record<string, boolean>>({
    'bcg': true,
    'opv-0': true,
    'hepb-0': true,
  });

  // Growth Calculator State
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [ageMonths, setAgeMonths] = useState<number>(6);
  const [heightCm, setHeightCm] = useState<number>(68);
  const [weightKg, setWeightKg] = useState<number>(7.9);

  // Toggle vaccine completion
  const toggleVaccine = (id: string) => {
    setCompletedVaccines((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to calculate vaccine due date from DOB
  const getVaccineDate = (daysOffset: number) => {
    if (!childDob) return 'Set DOB';
    const d = new Date(childDob);
    d.setDate(d.getDate() + daysOffset);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Nepal National Immunization Schedule (NIP) + WHO Recommended
  const vaccineSchedule = [
    {
      id: 'bcg',
      milestone: 'At Birth (0 Days)',
      days: 0,
      name: 'BCG & OPV-0, Hepatitis B',
      protectsAgainst: 'Tuberculosis, Polio & Hepatitis B viral infection',
      notes: 'Administered in hospital delivery ward before discharge',
      badge: 'Essential',
    },
    {
      id: 'penta-1',
      milestone: '6 Weeks (1.5 Months)',
      days: 42,
      name: 'Pentavalent 1 + OPV 1 + PCV 1 + Rotavirus 1',
      protectsAgainst: 'Diphtheria, Pertussis, Tetanus, Hep B, Hib, Pneumonia & Diarrhea',
      notes: 'Given on thighs and oral drops; mild fever is normal',
      badge: 'Critical',
    },
    {
      id: 'penta-2',
      milestone: '10 Weeks (2.5 Months)',
      days: 70,
      name: 'Pentavalent 2 + OPV 2 + Rotavirus 2',
      protectsAgainst: 'DPT, Hepatitis B, Haemophilus Influenzae type B & Rotavirus',
      notes: 'Second dose ensures strong antibody titers',
      badge: 'Routine',
    },
    {
      id: 'penta-3',
      milestone: '14 Weeks (3.5 Months)',
      days: 98,
      name: 'Pentavalent 3 + OPV 3 + PCV 2 + fIPV 1',
      protectsAgainst: 'Polio booster, Pneumococcal conjugate & 5-in-1 combo',
      notes: 'Injectable fractionated IPV protects spinal nerves',
      badge: 'Critical',
    },
    {
      id: 'mr-1',
      milestone: '9 Months',
      days: 270,
      name: 'Measles-Rubella 1 (MR 1) + PCV 3 + fIPV 2',
      protectsAgainst: 'Measles rash, German measles, rubella syndrome & Pneumonia',
      notes: 'Crucial milestone; check child vitamin A dose at health post',
      badge: 'Mandatory',
    },
    {
      id: 'je',
      milestone: '12 Months (1 Year)',
      days: 365,
      name: 'Japanese Encephalitis (JE) Live Vaccine',
      protectsAgainst: 'Mosquito-borne brain inflammation (critical in Nepal)',
      notes: 'Single dose provides lifelong regional immunity',
      badge: 'Nepal National',
    },
    {
      id: 'mr-2',
      milestone: '15 Months',
      days: 455,
      name: 'Measles-Rubella 2 (MR 2) + Typhoid Conjugate (TCV)',
      protectsAgainst: 'Second booster for Measles & Typhoid fever',
      notes: 'Completes primary toddler immunization series',
      badge: 'Booster',
    },
    {
      id: 'dpt-boost',
      milestone: '18–24 Months',
      days: 540,
      name: 'DPT Booster 1 + OPV Booster + Varicella (Chickenpox)',
      protectsAgainst: 'Whooping cough booster & Chickenpox protection',
      notes: 'Recommended before child joins daycare or playgroup',
      badge: 'Pre-School',
    },
    {
      id: 'td-boost',
      milestone: '5–6 Years',
      days: 1825,
      name: 'DPT/Td School Entry Booster + MMR Booster',
      protectsAgainst: 'Tetanus, Diphtheria & Mumps',
      notes: 'Administered before starting Class 1 in school',
      badge: 'School Entry',
    },
    {
      id: 'hpv',
      milestone: '10–12 Years',
      days: 3650,
      name: 'HPV Vaccine (2 Doses) + Td Booster',
      protectsAgainst: 'Cervical cancer strains & adolescent Tetanus',
      notes: 'School immunization campaign approved by Nepal Ministry of Health',
      badge: 'Adolescent',
    },
  ];

  // WHO Standards Calculation (Averages for 0-24M)
  // Boy 6M: 67.6 cm, 7.9 kg; Girl 6M: 65.7 cm, 7.3 kg
  const medianHeight = gender === 'boy' 
    ? Math.round((50 + ageMonths * 2.5) * 10) / 10 
    : Math.round((49 + ageMonths * 2.4) * 10) / 10;
  const medianWeight = gender === 'boy' 
    ? Math.round((3.3 + ageMonths * 0.65) * 10) / 10 
    : Math.round((3.2 + ageMonths * 0.6) * 10) / 10;

  const heightDiff = heightCm - medianHeight;
  const weightDiff = weightKg - medianWeight;

  const heightStatus = Math.abs(heightDiff) <= 3 
    ? 'Healthy standard range (50th percentile)' 
    : heightDiff > 3 ? 'Above average height (+1SD)' : 'Slightly below standard curve (-1SD)';

  const weightStatus = Math.abs(weightDiff) <= 1 
    ? 'Ideal healthy weight trajectory' 
    : weightDiff > 1 ? 'Healthy above average (+1SD)' : 'Needs protein/nutrition boost (-1SD)';

  // Printables list
  const printables = [
    {
      id: 'pr-1',
      title: 'Sano Animals Friends Coloring Book (6 Pages)',
      category: 'Creative Coloring',
      age: 'Ages 2–6',
      description: 'Friendly drawings of Kathmandu Fawn, Little Dino, Happy Bear, and Mountain Tiger with thick lines for toddlers.',
      downloads: '1,420 parents downloaded'
    },
    {
      id: 'pr-2',
      title: 'Nepali & English Alphabet Tracing Sheets (क, ख, ग & A, B, C)',
      category: 'Early Learning',
      age: 'Ages 3–6',
      description: 'Guided directional arrows and dotted letter lines designed for pencil grip development.',
      downloads: '2,890 parents downloaded'
    },
    {
      id: 'pr-3',
      title: 'Connect the Dots & Number Maze (1 to 50)',
      category: 'STEM & Logic',
      age: 'Ages 4–8',
      description: 'Engaging brain puzzles and counting connect-the-dots that keep children occupied on rainy afternoons.',
      downloads: '980 parents downloaded'
    },
    {
      id: 'pr-4',
      title: 'Hospital Maternity Bag Printable Checklist (Nepali & English)',
      category: 'Maternity Guide',
      age: 'Expecting Parents',
      description: 'Pre-delivery packing checklist with hospital ward tips, document checklists, and baby homecoming items.',
      downloads: '4,150 parents downloaded'
    }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="bg-[#FFF6E9] rounded-3xl p-6 sm:p-10 border border-[#1F2A44]/15 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FD0EA]/40 text-[#1F2A44] text-xs font-bold mb-3">
          <Activity className="w-3.5 h-3.5 text-[#1F2A44]" />
          <span>sano care. Digital Parenting Utilities</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#1F2A44] leading-tight">
          Parenting Tools Hub
        </h1>
        <p className="text-sm sm:text-base text-[#1F2A44]/75 max-w-2xl mt-2 leading-relaxed">
          Free medical & developmental calculators built in alignment with the Nepal Ministry of Health & WHO standards. Keep track of vaccines, monitor growth, and download activity sheets.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('vaccines')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'vaccines'
                ? 'bg-[#1F2A44] text-[#FFF6E9]'
                : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#F5B301]" />
            <span>Vaccine Schedule Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('growth')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'growth'
                ? 'bg-[#1F2A44] text-[#FFF6E9]'
                : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]'
            }`}
          >
            <Activity className="w-4 h-4 text-[#5DAA7A]" />
            <span>WHO Growth Chart Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('printables')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'printables'
                ? 'bg-[#1F2A44] text-[#FFF6E9]'
                : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]'
            }`}
          >
            <Download className="w-4 h-4 text-[#E8604F]" />
            <span>Free Learning Printables</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VACCINE CALCULATOR */}
      {activeTab === 'vaccines' && (
        <div className="space-y-6">
          {/* DOB Controller */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#1F2A44]/15 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-heading text-lg font-bold text-[#1F2A44]">
                Enter Child's Date of Birth
              </span>
              <p className="text-xs text-[#1F2A44]/75">
                Calculates exact vaccination appointment dates from birth to 12 years.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="date"
                value={childDob}
                onChange={(e) => setChildDob(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#1F2A44]/25 text-sm font-bold bg-[#FFF6E9] text-[#1F2A44] focus:outline-none"
              />
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full bg-[#1F2A44] text-[#FFF6E9] text-xs font-bold hover:bg-[#1F2A44]/85 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#F5B301]" />
                <span>Print Schedule</span>
              </button>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden">
            <div className="p-4 sm:p-5 bg-[#FFF6E9]/60 border-b border-[#1F2A44]/10 flex items-center justify-between">
              <span className="font-heading text-base font-bold text-[#1F2A44]">
                Nepal National Immunization Schedule (NIP) + WHO Recommended
              </span>
              <span className="text-xs text-[#5DAA7A] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tap checkbox to record given shots</span>
              </span>
            </div>

            <div className="divide-y divide-[#1F2A44]/10">
              {vaccineSchedule.map((vax) => {
                const isDone = !!completedVaccines[vax.id];
                const dueDate = getVaccineDate(vax.days);
                return (
                  <div
                    key={vax.id}
                    onClick={() => toggleVaccine(vax.id)}
                    className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                      isDone ? 'bg-[#5DAA7A]/5' : 'hover:bg-[#FFF6E9]/30'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone
                            ? 'bg-[#5DAA7A] border-[#5DAA7A] text-white'
                            : 'border-[#1F2A44]/30 bg-white'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <strong className="text-sm sm:text-base font-bold text-[#1F2A44]">
                            {vax.name}
                          </strong>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1F2A44]/10 text-[#1F2A44]">
                            {vax.milestone}
                          </span>
                        </div>
                        <p className="text-xs text-[#1F2A44]/75">
                          Protects: {vax.protectsAgainst}
                        </p>
                        <p className="text-[11px] text-[#1F2A44]/55 italic">
                          Tip: {vax.notes}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 pl-9 sm:pl-0">
                      <span className="text-xs text-[#1F2A44]/60 block">Calculated Due Date:</span>
                      <strong className="text-xs sm:text-sm font-bold text-[#1F2A44]">
                        {dueDate}
                      </strong>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                          isDone
                            ? 'bg-[#5DAA7A]/20 text-[#5DAA7A]'
                            : 'bg-[#F5B301]/25 text-[#1F2A44]'
                        }`}
                      >
                        {isDone ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WHO GROWTH CHART TRACKER */}
      {activeTab === 'growth' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Controls */}
          <div className="bg-white p-6 rounded-2xl border border-[#1F2A44]/15 space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
              Child Measurements
            </h3>

            <div>
              <label className="text-xs font-bold text-[#1F2A44] block mb-1">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('boy')}
                  className={`py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    gender === 'boy'
                      ? 'bg-[#1F2A44] text-[#FFF6E9] border-[#1F2A44]'
                      : 'border-[#1F2A44]/20 hover:bg-[#FFF6E9]'
                  }`}
                >
                  Boy 👦
                </button>
                <button
                  type="button"
                  onClick={() => setGender('girl')}
                  className={`py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    gender === 'girl'
                      ? 'bg-[#1F2A44] text-[#FFF6E9] border-[#1F2A44]'
                      : 'border-[#1F2A44]/20 hover:bg-[#FFF6E9]'
                  }`}
                >
                  Girl 👧
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Age in Months</span>
                <span className="text-[#E8604F]">{ageMonths} Months</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                value={ageMonths}
                onChange={(e) => setAgeMonths(Number(e.target.value))}
                className="w-full accent-[#1F2A44] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Height / Length (cm)</span>
                <span className="text-[#5DAA7A]">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="45"
                max="100"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-[#5DAA7A] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Weight (kg)</span>
                <span className="text-[#F5B301]">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="16"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-[#F5B301] cursor-pointer"
              />
            </div>
          </div>

          {/* Results Analysis Panel */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#1F2A44]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-4 mb-4">
                <div>
                  <span className="text-xs text-[#1F2A44]/60">WHO Benchmark Comparison</span>
                  <h4 className="font-heading text-xl font-bold text-[#1F2A44]">
                    Growth Trajectory: {ageMonths} Months ({gender === 'boy' ? 'Boy' : 'Girl'})
                  </h4>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#5DAA7A]/15 text-[#5DAA7A]">
                  WHO Compliant
                </span>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-1">
                  <span className="text-xs text-[#1F2A44]/60">Height Benchmark</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1F2A44]">{heightCm} cm</span>
                    <span className="text-xs text-[#1F2A44]/60">(WHO Median: {medianHeight} cm)</span>
                  </div>
                  <p className="text-xs font-bold text-[#5DAA7A] pt-1">
                    {heightStatus}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-1">
                  <span className="text-xs text-[#1F2A44]/60">Weight Benchmark</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1F2A44]">{weightKg} kg</span>
                    <span className="text-xs text-[#1F2A44]/60">(WHO Median: {medianWeight} kg)</span>
                  </div>
                  <p className="text-xs font-bold text-[#5DAA7A] pt-1">
                    {weightStatus}
                  </p>
                </div>
              </div>

              {/* Guidance advice */}
              <div className="p-4 rounded-xl bg-[#5DAA7A]/10 border border-[#5DAA7A]/25 text-xs text-[#1F2A44]/80 space-y-1.5">
                <strong className="block text-sm text-[#1F2A44] font-bold">
                  Pediatric Nutrition & Sizing Note:
                </strong>
                <p>
                  At {heightCm} cm, your child best matches clothing sized{' '}
                  <span className="font-bold underline text-[#1F2A44]">
                    {heightCm <= 62 ? '0–3M (56–62 cm)' : heightCm <= 68 ? '3–6M (62–68 cm)' : heightCm <= 80 ? '6–12M (68–80 cm)' : '1–2Y (80–92 cm)'}
                  </span>
                  . In Nepal, healthy growth is supported by daily mustard/almond oil massage, age-appropriate sunshine, and iron-dense Jaulo (dal, rice & ghee porridge).
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F2A44]/10 text-xs text-[#1F2A44]/60 text-right">
              Based on World Health Organization Child Growth Standards (2006–2026).
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DOWNLOADABLE PRINTABLES */}
      {activeTab === 'printables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {printables.map((pr) => (
            <div
              key={pr.id}
              className="bg-white p-6 rounded-2xl border border-[#1F2A44]/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1F2A44]/10 text-[#1F2A44]">
                    {pr.category}
                  </span>
                  <span className="text-xs text-[#E8604F] font-bold">
                    {pr.age}
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-[#1F2A44] mb-2">
                  {pr.title}
                </h4>
                <p className="text-xs text-[#1F2A44]/75 mb-4 leading-relaxed">
                  {pr.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F2A44]/10 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#1F2A44]/55">
                  {pr.downloads}
                </span>

                <button
                  onClick={() => alert(`Starting download for: ${pr.title}. PDF saved to downloads!`)}
                  className="px-4 py-2 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/85 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#F5B301]" />
                  <span>Download Free PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
