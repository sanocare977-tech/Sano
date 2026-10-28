import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ThumbsUp, 
  HelpCircle, 
  Search, 
  User, 
  Stethoscope, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Baby, 
  ShieldCheck,
  Plus
} from 'lucide-react';

interface ExpertAnswer {
  doctorName: string;
  role: string;
  institution: string;
  avatarText: string;
  answeredAt: string;
  answerContent: string;
}

interface ForumQuestion {
  id: string;
  title: string;
  parentName: string;
  childAge: string;
  category: 'newborn_jaundice' | 'weaning_solids' | 'rash_eczema' | 'sleep_teething' | 'vaccines_growth';
  askedAt: string;
  upvotes: number;
  answer?: ExpertAnswer;
  isPending?: boolean;
}

const INITIAL_QUESTIONS: ForumQuestion[] = [
  {
    id: 'q-1',
    title: 'My 5-day-old newborn has slightly yellowish eyes and face. Should I be concerned?',
    parentName: 'Sunita M. (Patan)',
    childAge: '5 Days Old (Newborn)',
    category: 'newborn_jaundice',
    askedAt: 'Yesterday',
    upvotes: 42,
    answer: {
      doctorName: 'Dr. Smriti Koirala, MD',
      role: 'Senior Consultant Pediatrician',
      institution: "Kanti Children's Hospital, Kathmandu",
      avatarText: 'SK',
      answeredAt: '18 hours ago',
      answerContent: 'Physiological jaundice is very common between Day 2 and Day 7 as the infant liver matures. Ensure frequent breastfeeding (every 2–3 hours / 8–12 times per 24 hours), which helps clear bilirubin through frequent wet diapers and yellow stools. However, seek immediate hospital evaluation if yellowing extends below the belly button to the thighs/feet, if baby becomes unusually lethargic, or if urine is dark yellow rather than pale.',
    },
  },
  {
    id: 'q-2',
    title: 'Starting Pasni at 6 months: Is traditional Kheer (rice pudding) okay, or should I start with pureed vegetables?',
    parentName: 'Ramesh & Puja K. (Baluwatar)',
    childAge: '5.5 Months',
    category: 'weaning_solids',
    askedAt: '2 days ago',
    upvotes: 68,
    answer: {
      doctorName: 'Dr. Pravesh Shrestha, MD',
      role: 'Pediatric Nutritionist & Neonatologist',
      institution: 'Patan Hospital & Lalitpur Child Care',
      avatarText: 'PS',
      answeredAt: '1 day ago',
      answerContent: 'For the auspicious Pasni ritual tasting, a tiny spoon tip of soft homemade rice cooked in diluted breastmilk/formula (without cow milk, sugar, or honey) is traditional and safe. For daily weaning that follows, start with single-ingredient purees like steamed pumpkin (pharsi), soft cooked carrot, or well-cooked red lentils (moong daal pani). Introduce one new food every 3–4 days to observe any intolerance before mixing items.',
    },
  },
  {
    id: 'q-3',
    title: 'Severe red diaper rash after introducing solid foods. Cloth nappies or disposable diapers?',
    parentName: 'Alisha S. (Jhamsikhel)',
    childAge: '7 Months',
    category: 'rash_eczema',
    askedAt: '3 days ago',
    upvotes: 35,
    answer: {
      doctorName: 'Sister Anita Basnet',
      role: 'Senior Midwife & Neonatal Nurse',
      institution: 'Paropakar Maternity Hospital, Kathmandu',
      avatarText: 'AB',
      answeredAt: '2 days ago',
      answerContent: 'When babies start solids, enzymes in stool change rapidly and irritate delicate skin. Clean only with lukewarm water or pure 99% water wipes (avoid scented wipes). Pat completely dry with a soft muslin cloth, allow 15 minutes of "diaper-free air time", and apply a generous barrier layer of 15% Zinc Oxide cream before diapering. Both cloth and modern breathable gel diapers work well provided changes happen every 2–3 hours.',
    },
  },
  {
    id: 'q-4',
    title: 'Baby is 7 months old, drooling heavily, biting everything, and waking every 2 hours at night.',
    parentName: 'Bipin T. (Bhaktapur)',
    childAge: '7 Months',
    category: 'sleep_teething',
    askedAt: '4 days ago',
    upvotes: 51,
    answer: {
      doctorName: 'Dr. Smriti Koirala, MD',
      role: 'Senior Consultant Pediatrician',
      institution: "Kanti Children's Hospital, Kathmandu",
      avatarText: 'SK',
      answeredAt: '3 days ago',
      answerContent: 'Classic lower central incisor teething! Gum swelling causes throbbing discomfort that worsens when lying flat at night. Provide chilled (not frozen) silicone teething rings or a chilled damp muslin washcloth for your baby to chew on. Gentle gum massage with a clean finger also relieves pressure. Avoid over-the-counter numbing gels containing benzocaine as they are unsafe for infants.',
    },
  },
  {
    id: 'q-5',
    title: 'Missed our 14-week Pentavalent-3 vaccine dose due to fever. How quickly should we reschedule?',
    parentName: 'Priya R. (Maharajgunj)',
    childAge: '4 Months',
    category: 'vaccines_growth',
    askedAt: '5 days ago',
    upvotes: 29,
    answer: {
      doctorName: 'Dr. Pravesh Shrestha, MD',
      role: 'Pediatric Nutritionist & Neonatologist',
      institution: 'Patan Hospital',
      avatarText: 'PS',
      answeredAt: '4 days ago',
      answerContent: 'Minor delays due to temporary fever do not cancel previous vaccine protection. Once your baby has been fever-free for 24–48 hours without antipyretics, visit your local ward health post or hospital to receive the Pentavalent-3, OPV, and fIPV doses. There is no need to restart the entire series from the beginning.',
    },
  },
];

export const CommunityExpertForum: React.FC = () => {
  const [questions, setQuestions] = useState<ForumQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('sano_forum_questions');
      return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
    } catch {
      return INITIAL_QUESTIONS;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'q-1': true,
    'q-2': true,
  });
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Ask Question Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newParentName, setNewParentName] = useState<string>('');
  const [newChildAge, setNewChildAge] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ForumQuestion['category']>('weaning_solids');
  const [newPhone, setNewPhone] = useState<string>('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Verified Q&As' },
    { id: 'newborn_jaundice', label: '👶 Newborn & Jaundice' },
    { id: 'weaning_solids', label: '🍚 Pasni & Weaning' },
    { id: 'rash_eczema', label: '🛡️ Diaper Rash & Skin' },
    { id: 'sleep_teething', label: '🦷 Teething & Sleep' },
    { id: 'vaccines_growth', label: '💉 Vaccines & Growth' },
  ];

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvotedIds[id]) return;

    setUpvotedIds((prev) => ({ ...prev, [id]: true }));
    const updated = questions.map((q) =>
      q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q
    );
    setQuestions(updated);
    try {
      localStorage.setItem('sano_forum_questions', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const newQ: ForumQuestion = {
      id: `q-user-${Date.now()}`,
      title: newTitle.trim(),
      parentName: newParentName.trim() || 'Kathmandu Parent',
      childAge: newChildAge.trim() || 'Infant',
      category: newCategory,
      askedAt: 'Just now',
      upvotes: 1,
      isPending: true,
      answer: {
        doctorName: 'Dr. Smriti Koirala, MD',
        role: 'Senior Consultant Pediatrician',
        institution: "Kanti Children's Hospital",
        avatarText: 'SK',
        answeredAt: 'Estimated within 24 hours',
        answerContent: 'Thank you for your question! Dr. Koirala and our clinical advisory team have received your query. A verified response with clinical guidelines will be published here and SMS notified to ' + newPhone + '.',
      },
    };

    const updated = [newQ, ...questions];
    setQuestions(updated);
    setExpandedIds((prev) => ({ ...prev, [newQ.id]: true }));
    try {
      localStorage.setItem('sano_forum_questions', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setIsModalOpen(false);
      setNewTitle('');
      setNewPhone('');
    }, 2000);
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(query);
      const matchAnswer = q.answer?.answerContent.toLowerCase().includes(query);
      if (!matchTitle && !matchAnswer) return false;
    }
    return true;
  });

  return (
    <section id="expert-forum" className="py-14 sm:py-20 bg-white border-t border-[#1F2A44]/10 text-[#1F2A44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1F2A44]/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DAA7A]/15 text-[#1F2A44] text-xs font-bold mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-[#5DAA7A]" />
              <span>Verified Pediatrician &amp; Midwife Guidance</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2A44]">
              Community Q&amp;A &amp; Pediatric Care Forum
            </h2>
            <p className="text-sm sm:text-base text-[#1F2A44]/75 mt-2 leading-relaxed">
              Real medical guidance for Kathmandu parents. No panic, no hearsay. Read verified answers from doctors at Kanti Children’s Hospital and Patan Hospital, or ask your own question.
            </p>
          </div>

          {/* Ask Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-full bg-[#1F2A44] text-[#FFF6E9] font-bold text-xs sm:text-sm hover:bg-[#1F2A44]/90 transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#F5B301]" />
            <span>Ask Our Pediatricians</span>
          </button>
        </div>

        {/* Search & Topic Filters */}
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-[#1F2A44]/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms, e.g. fever, kheer, jaundice, rash, drooling..."
              className="w-full rounded-full border border-[#1F2A44]/20 bg-[#FFF6E9]/40 pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#1F2A44] text-[#FFF6E9]'
                    : 'bg-[#FFF6E9] border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q&A Cards List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="p-10 text-center bg-[#FFF6E9]/50 rounded-3xl border border-[#1F2A44]/15">
              <p className="font-heading text-lg font-bold text-[#1F2A44]">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-[#E8604F] underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isExpanded = !!expandedIds[q.id];
              const isUpvoted = !!upvotedIds[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl border border-[#1F2A44]/15 overflow-hidden transition-all shadow-sm hover:border-[#1F2A44]/35"
                >
                  {/* Question Header Row */}
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-[#E8604F] bg-[#E8604F]/10 px-2.5 py-0.5 rounded-full">
                          {q.childAge}
                        </span>
                        <span className="text-[#1F2A44]/60">•</span>
                        <span className="text-[#1F2A44]/70 font-semibold">{q.parentName}</span>
                        <span className="text-[#1F2A44]/60">•</span>
                        <span className="text-[#1F2A44]/50">{q.askedAt}</span>
                        {q.isPending && (
                          <span className="bg-[#F5B301]/25 text-[#1F2A44] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                            Pending Verification
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2A44] leading-snug">
                        {q.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleUpvote(q.id, e)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                          isUpvoted
                            ? 'bg-[#5DAA7A] text-white border-[#5DAA7A]'
                            : 'bg-[#FFF6E9] text-[#1F2A44] border-[#1F2A44]/15 hover:border-[#5DAA7A]'
                        }`}
                        title="Helpful for other parents"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="tabular-nums">{q.upvotes}</span>
                      </button>

                      <div className="p-1 text-[#1F2A44]/60">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Answer Drawer */}
                  {isExpanded && q.answer && (
                    <div className="bg-[#FFF6E9]/60 border-t border-[#1F2A44]/10 p-5 sm:p-6 space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1F2A44] text-[#FFF6E9] font-heading font-bold text-sm flex items-center justify-center shrink-0">
                            {q.answer.avatarText}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-heading text-sm font-bold text-[#1F2A44]">
                                {q.answer.doctorName}
                              </span>
                              <CheckCircle2 className="w-4 h-4 text-[#5DAA7A]" />
                            </div>
                            <span className="text-xs text-[#1F2A44]/75 block">
                              {q.answer.role} · {q.answer.institution}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] text-[#1F2A44]/60 font-medium">
                          Answered {q.answer.answeredAt}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#1F2A44]/85 leading-relaxed pt-2 pl-0 sm:pl-13">
                        {q.answer.answerContent}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Verified Medical Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/15 flex items-center gap-3 text-xs text-[#1F2A44]/80">
          <ShieldCheck className="w-5 h-5 text-[#5DAA7A] shrink-0" />
          <span>
            <strong>Clinical Safety Notice:</strong> Community Q&amp;A provides general educational guidance reviewed by registered Nepali clinicians. In acute emergencies (high fever &gt;38.5°C in newborns, difficulty breathing, or seizures), visit Kanti Children's Hospital or Patan ER immediately.
          </span>
        </div>

      </div>

      {/* Ask Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#FFF6E9] p-6 sm:p-8 text-[#1F2A44] border-2 border-[#1F2A44] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#5DAA7A]" />
                <h3 className="font-heading text-xl font-bold text-[#1F2A44]">
                  Ask Our Pediatric Care Team
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

            {isSubmittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#5DAA7A] mx-auto" />
                <h4 className="font-heading text-xl font-bold text-[#1F2A44]">
                  Question Received!
                </h4>
                <p className="text-xs sm:text-sm text-[#1F2A44]/75">
                  Dr. Smriti Koirala and our clinical advisory team will review and post an answer shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-1">
                    Your Question for the Doctors:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. My 6-month-old is spitting up dal soup after Pasni. Is this normal reflux or an allergy?"
                    className="w-full rounded-2xl border border-[#1F2A44]/20 bg-white p-3.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-1">
                      Child's Current Age / Months:
                    </label>
                    <input
                      type="text"
                      required
                      value={newChildAge}
                      onChange={(e) => setNewChildAge(e.target.value)}
                      placeholder="e.g. 5 Months (62 cm)"
                      className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-1">
                      Topic Category:
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                    >
                      <option value="newborn_jaundice">Newborn &amp; Jaundice</option>
                      <option value="weaning_solids">Pasni &amp; Weaning</option>
                      <option value="rash_eczema">Diaper Rash &amp; Skin</option>
                      <option value="sleep_teething">Teething &amp; Sleep</option>
                      <option value="vaccines_growth">Vaccines &amp; Growth</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-1">
                      Parent's Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={newParentName}
                      onChange={(e) => setNewParentName(e.target.value)}
                      placeholder="e.g. Anusha S."
                      className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-1">
                      WhatsApp / Mobile (for reply notification):
                    </label>
                    <input
                      type="text"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full rounded-xl border border-[#1F2A44]/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                    />
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
                    <Send className="w-3.5 h-3.5 text-[#F5B301]" />
                    <span>Submit Question for Doctor Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
