import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  MapPin,
  X,
  Share2,
  MessageSquare
} from 'lucide-react';
import { ReservationData } from '../types/coffee';
import { CAFE_INFO } from '../data/coffeeData';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '05:00 PM',
    guests: 2,
    seatingArea: 'Cozy Hangout Booth',
    specialRequests: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const seatingOptions = [
    {
      id: 'Cozy Hangout Booth',
      name: 'Cozy Hangout Booth',
      desc: 'Plush cushioned sofa booth perfect for friends, dates & casual chill',
    },
    {
      id: 'Window Metro View Counter',
      name: 'Window Metro View Counter',
      desc: 'Overlooking Munshipulia Chouraha with natural daylight',
    },
    {
      id: 'Focus & Study Nook',
      name: 'Focus & Study Nook',
      desc: 'Dedicated charging sockets, ergonomic chairs & fast Wi-Fi',
    },
    {
      id: 'Barista Brew Bar',
      name: 'Barista Brew Bar',
      desc: 'Front-row seat to watch our live espresso & cold coffee making',
    },
  ];

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '08:00 PM',
    '09:30 PM',
    '10:15 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newReservation: ReservationData = {
        id: `KK-LKO-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConfirmedBooking(newReservation);
    }, 600);
  };

  const copyReservationCode = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(
      `Koffee Kick Lucknow Table Reservation #${confirmedBooking.id} for ${confirmedBooking.fullName} on ${confirmedBooking.date} at ${confirmedBooking.time} (${confirmedBooking.guests} guests, ${confirmedBooking.seatingArea}). Cafe: Mathur Market, Munshipulia.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="reserve" className="py-24 bg-[#0E0A08] text-[#F9F6F0] relative border-b border-[#241712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18110D] border border-[#2E1D16] text-[11px] uppercase tracking-wider text-[#C5A880] mb-2 font-mono">
            <MapPin className="w-3 h-3 text-[#C5A880]" />
            <span>Mathur Market · Munshipulia Chouraha, Lucknow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white">
            Table & Hangout <span className="italic font-serif text-[#C5A880]">Reservations</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#A8988C] font-light leading-relaxed">
            Visiting with friends or planning a study session? Reserve your table in advance so it’s ready when you arrive from the Munshipulia Metro.
          </p>
        </div>

        {/* Reservation Form Card */}
        <div className="max-w-3xl mx-auto bg-[#140E0B] rounded-3xl border border-[#2B1B14] p-6 sm:p-10 shadow-2xl relative">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-sm focus:border-[#C5A880] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 92143 71835"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-sm focus:border-[#C5A880] focus:outline-none transition"
                />
              </div>
            </div>

            {/* Row 2: Email & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="rahul@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-sm focus:border-[#C5A880] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-sm focus:border-[#C5A880] focus:outline-none transition"
                >
                  <option value={1}>1 Guest (Solo Study / Laptop)</option>
                  <option value={2}>2 Guests (Cozy Table)</option>
                  <option value={3}>3 Guests (Group Hangout)</option>
                  <option value={4}>4 Guests (Booth Seating)</option>
                  <option value={6}>6 Guests (Birthday / Friends Table)</option>
                  <option value={8}>8+ Guests (Celebration Platter Table)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Date & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" /> Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-sm focus:border-[#C5A880] focus:outline-none transition [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Arrival Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-sm focus:border-[#C5A880] focus:outline-none transition"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Seating Zone */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-2 font-mono">
                Select Preferred Cafe Corner
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, seatingArea: opt.id })}
                    className={`p-3 rounded-2xl border cursor-pointer transition ${
                      formData.seatingArea === opt.id
                        ? 'bg-[#2A1912] border-[#C5A880] shadow-md'
                        : 'bg-[#18110D] border-[#2A1B14] hover:border-[#3E281F]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{opt.name}</div>
                    <div className="text-[11px] text-[#A8988C] mt-0.5">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 5: Special Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1.5 font-mono">
                Special Request / Food Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Birthday celebration, want extra cheese fries ready on arrival, need corner table with charging point..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-xs focus:border-[#C5A880] focus:outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#A3835B] text-[#0A0807] font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-[#C5A880]/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Your Table...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Table at Koffee Kick</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative max-w-md w-full bg-[#140E0B] border border-[#C5A880]/50 rounded-3xl p-6 sm:p-7 shadow-2xl text-left"
            >
              <button
                onClick={() => setConfirmedBooking(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#20140F] text-[#8C7A6D] hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] mb-0.5">
                Table Reserved!
              </div>
              <h3 className="text-2xl font-serif text-white font-medium mb-1">
                We'll Have Your Table Ready
              </h3>
              <p className="text-xs text-[#A8988C] mb-5">
                Thank you, {confirmedBooking.fullName}! Your spot at Koffee Kick Munshipulia is reserved.
              </p>

              {/* Receipt Summary */}
              <div className="p-4 rounded-2xl bg-[#1A110D] border border-[#2E1D16] space-y-2.5 mb-5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8C7A6D]">Booking Ref</span>
                  <span className="font-mono font-bold text-[#C5A880] text-sm">
                    {confirmedBooking.id}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C7A6D]">Date & Time</span>
                  <span className="text-white font-medium">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C7A6D]">Party Size</span>
                  <span className="text-white font-medium">{confirmedBooking.guests} Guests</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C7A6D]">Seating Corner</span>
                  <span className="text-white font-medium">{confirmedBooking.seatingArea}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#23150F]">
                  <span className="text-[#8C7A6D]">Cafe Location</span>
                  <span className="text-white text-[11px]">Mathur Mkt, Munshipulia</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={copyReservationCode}
                  className="py-2.5 px-3 rounded-xl bg-[#20140F] border border-[#3E281F] text-xs font-medium text-white hover:border-[#C5A880] transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{copied ? 'Copied Details!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="py-2.5 px-3 rounded-xl bg-[#C5A880] text-[#0A0807] font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
