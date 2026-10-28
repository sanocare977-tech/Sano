import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Clock, Heart, Copy, Check, MessageSquare, Download, Share2 } from 'lucide-react';

export const PasniInvitationGenerator: React.FC = () => {
  const [childName, setChildName] = useState('Aarav Shrestha');
  const [parentNames, setParentNames] = useState('Anusha & Bikram Shrestha');
  const [eventDate, setEventDate] = useState('2026-11-15');
  const [eventTime, setEventTime] = useState('11:30 AM onwards');
  const [venueName, setVenueName] = useState('Imperial Banquet, Jhamsikhel, Lalitpur');
  const [rsvpPhone, setRsvpPhone] = useState('+977 9841234567');
  const [theme, setTheme] = useState<'royal-red' | 'dhaka-gold'>('royal-red');
  const [copied, setCopied] = useState(false);

  // Formatted event text for WhatsApp message
  const whatsappInviteText = `🚩 *Pasni (Rice Feeding Ceremony) Celebration Invite* 🚩\n\nNamaste! We warmly invite you and your family to join us as our little darling *${childName}* tastes his/her first auspicious solid food!\n\n🗓️ *Date*: ${eventDate}\n⏰ *Time*: ${eventTime}\n📍 *Venue*: ${venueName}\n\nHosted with love & blessings by ${parentNames}.\nRSVP: ${rsvpPhone}\n\n*Created via sano. Pasni Celebrations Hub*`;

  const handleCopyText = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(whatsappInviteText);
        setCopied(true);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      // Fallback for iframes or older browsers
      const textarea = document.createElement('textarea');
      textarea.value = whatsappInviteText;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (err) {
        console.warn('Failed to copy text', err);
      }
      document.body.removeChild(textarea);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappInviteText)}`;

  return (
    <div className="bg-white rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F2A44]/10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B301]/20 text-[#1F2A44] text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
          <span>Complimentary Family Tool</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44]">
          Digital Pasni Invitation Card Generator
        </h3>
        <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-1">
          Customize and share your baby’s auspicious Rice Feeding celebration card with family and friends across WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <span className="text-xs font-bold text-[#1F2A44] uppercase tracking-wider">
              Card Theme:
            </span>
            <button
              type="button"
              onClick={() => setTheme('royal-red')}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                theme === 'royal-red'
                  ? 'bg-[#E8604F] text-white border-[#E8604F]'
                  : 'bg-white text-[#1F2A44] border-[#1F2A44]/20'
              }`}
            >
              Royal Crimson Velvet
            </button>
            <button
              type="button"
              onClick={() => setTheme('dhaka-gold')}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                theme === 'dhaka-gold'
                  ? 'bg-[#F5B301] text-[#1F2A44] border-[#F5B301]'
                  : 'bg-white text-[#1F2A44] border-[#1F2A44]/20'
              }`}
            >
              Dhaka Marigold Gold
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1F2A44]/80 block mb-1">
              Child's Full Name:
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-[#FFF6E9]/40 border border-[#1F2A44]/20 rounded-xl px-3.5 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
              placeholder="e.g. Aarav Shrestha"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1F2A44]/80 block mb-1">
              Parents / Host Names:
            </label>
            <input
              type="text"
              value={parentNames}
              onChange={(e) => setParentNames(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-[#FFF6E9]/40 border border-[#1F2A44]/20 rounded-xl px-3.5 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
              placeholder="e.g. Anusha & Bikram Shrestha"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1F2A44]/80 block mb-1">
                Ceremony Date:
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold bg-[#FFF6E9]/40 border border-[#1F2A44]/20 rounded-xl px-3.5 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1F2A44]/80 block mb-1">
                Auspicious Time (मुहूर्त):
              </label>
              <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold bg-[#FFF6E9]/40 border border-[#1F2A44]/20 rounded-xl px-3.5 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                placeholder="e.g. 11:30 AM onwards"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1F2A44]/80 block mb-1">
              Celebration Venue:
            </label>
            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-[#FFF6E9]/40 border border-[#1F2A44]/20 rounded-xl px-3.5 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
              placeholder="e.g. Imperial Banquet, Jhamsikhel, Lalitpur"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1F2A44]/80 block mb-1">
              RSVP Contact Phone:
            </label>
            <input
              type="text"
              value={rsvpPhone}
              onChange={(e) => setRsvpPhone(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-[#FFF6E9]/40 border border-[#1F2A44]/20 rounded-xl px-3.5 py-2 text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
              placeholder="+977 98XXXXXXXX"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex-1 py-3 px-4 rounded-full border border-[#1F2A44] text-[#1F2A44] font-bold text-xs hover:bg-[#1F2A44]/5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-[#5DAA7A]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy WhatsApp Text'}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-full bg-[#5DAA7A] text-white font-bold text-xs hover:bg-[#5DAA7A]/90 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Live Card Preview */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 sm:p-8 text-center border-4 shadow-lg transition-all relative overflow-hidden ${
              theme === 'royal-red'
                ? 'bg-gradient-to-b from-[#8B1E1E] to-[#5C1414] text-[#FFF6E9] border-[#F5B301]'
                : 'bg-gradient-to-b from-[#FFF6E9] to-[#F7E7CD] text-[#1F2A44] border-[#E8604F]'
            }`}
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-[#F5B301] text-xs">❖</div>
            <div className="absolute top-2 right-2 text-[#F5B301] text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-[#F5B301] text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-[#F5B301] text-xs">❖</div>

            {/* Sacred Rice Feeding Header */}
            <div className="text-xl mb-1">🍚 🚩 🍚</div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#F5B301] mb-1">
              शुभ पास्नी (भातखुवाई) उत्सव
            </div>
            <h4
              className={`font-heading text-2xl sm:text-3xl font-bold mb-2 ${
                theme === 'royal-red' ? 'text-[#FFF6E9]' : 'text-[#E8604F]'
              }`}
            >
              {childName || 'Child’s Name'}
            </h4>
            <p className="text-[11px] opacity-80 mb-6 italic">
              is having their auspicious first taste of solid food!
            </p>

            {/* Event Details Box */}
            <div
              className={`rounded-2xl p-4 mb-6 space-y-2.5 text-xs text-left ${
                theme === 'royal-red' ? 'bg-black/20 text-[#FFF6E9]' : 'bg-white/80 text-[#1F2A44]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#F5B301] shrink-0" />
                <span className="font-semibold">{eventDate || 'Date to be confirmed'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F5B301] shrink-0" />
                <span className="font-semibold">{eventTime || '11:30 AM'}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5B301] shrink-0 mt-0.5" />
                <span className="font-semibold leading-tight">{venueName || 'Venue location'}</span>
              </div>
            </div>

            {/* Host signature */}
            <div className="text-xs space-y-0.5 border-t border-current/20 pt-4">
              <span className="text-[10px] uppercase tracking-wider opacity-70 block">
                Warmly Invited By
              </span>
              <p className="font-bold text-sm">{parentNames || 'Parents'}</p>
              <p className="text-[11px] opacity-80 pt-1">RSVP: {rsvpPhone}</p>
            </div>

            <div className="mt-4 pt-2 text-[9px] opacity-60 uppercase tracking-widest">
              sano. Cultural Celebrations Hub
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
