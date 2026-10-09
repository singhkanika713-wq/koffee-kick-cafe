import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, Check, Instagram, MessageSquare } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const ContactSection: React.FC = () => {
  const [msgSent, setMsgSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setMsgSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setMsgSent(false);
    }, 3500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0807] text-[#F9F6F0] relative border-b border-[#241712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-mono">
              <span>Munshipulia Chouraha, Indira Nagar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white">
              Location & <span className="italic font-serif text-[#C5A880]">Hours</span>
            </h2>
          </div>
          <div className="mt-3 md:mt-0 text-xs sm:text-sm text-[#A8988C] max-w-md font-light leading-relaxed">
            Conveniently located in Mathur Market, Sector 13. Just a 2-minute walk from Munshipulia Metro Station with easy parking.
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stylized Lucknow Munshipulia Map & Operational Hours */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Dark Styled Map Canvas Mockup */}
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-[#2E1D16] bg-[#120C09] shadow-2xl flex items-center justify-center p-6">
              {/* Map grid styling */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(#C5A880 1px, transparent 1px), linear-gradient(to right, #241712 1px, transparent 1px), linear-gradient(to bottom, #241712 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Street vectors depicting Munshipulia Chouraha junction */}
              <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#4A3125" strokeWidth="18" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#4A3125" strokeWidth="18" />
                <circle cx="50%" cy="50%" r="55" stroke="#C5A880" strokeWidth="2" fill="#20130D" />
                <circle cx="50%" cy="50%" r="85" stroke="#C5A880" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4" />
                <text x="52%" y="42%" fill="#C5A880" fontSize="11" fontFamily="monospace">Munshipulia Chouraha</text>
                <text x="52%" y="59%" fill="#A8988C" fontSize="10" fontFamily="monospace">Mathur Market · Sector 13</text>
              </svg>

              {/* Pin Center Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 animate-ping absolute inset-0" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C5A880] to-[#8C643A] text-[#0A0807] flex items-center justify-center shadow-2xl shadow-black border-2 border-[#F9F6F0]">
                    <MapPin className="w-7 h-7 fill-[#0A0807] text-[#0A0807]" />
                  </div>
                </div>

                {/* Floating Map Label Tag */}
                <div className="mt-3.5 px-4 py-2.5 rounded-xl bg-[#0A0807]/95 border border-[#C5A880]/50 backdrop-blur-md shadow-2xl text-center">
                  <div className="text-xs font-serif font-semibold text-white">
                    KOFFEE KICK
                  </div>
                  <div className="text-[11px] font-mono text-[#C5A880]">
                    Mathur Market, Sector 13, Indira Nagar
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    ● 2-Min Walk from Munshipulia Metro
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=Mathur+Market+Sector+13+Munshipulia+Chouraha+Indira+Nagar+Lucknow`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#20140F]/95 border border-[#3E281F] text-xs font-mono text-white hover:text-[#C5A880] hover:border-[#C5A880] transition flex items-center gap-2 shadow-lg backdrop-blur-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Navigate on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#140E0B] border border-[#2B1B14]">
                <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#C5A880] mb-2">
                  <Clock className="w-4 h-4" /> Operational Hours
                </div>
                <div className="space-y-1.5 text-xs text-[#A8988C]">
                  <div className="flex justify-between">
                    <span>Monday – Sunday:</span>
                    <span className="text-white font-mono font-medium">{CAFE_INFO.timing}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium pt-1">
                    ● Open Daily for Dine-In & Quick Takeaway
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#140E0B] border border-[#2B1B14]">
                <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#C5A880] mb-2">
                  <Phone className="w-4 h-4" /> Phone & WhatsApp
                </div>
                <div className="space-y-1 text-xs">
                  <div>
                    <a
                      href={`tel:${CAFE_INFO.phoneRaw}`}
                      className="text-white font-mono hover:text-[#C5A880] font-medium"
                    >
                      {CAFE_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <a
                      href={CAFE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat directly on WhatsApp</span>
                    </a>
                  </div>
                  <div className="pt-1">
                    <a
                      href={CAFE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C5A880] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Instagram className="w-3 h-3" />
                      <span>{CAFE_INFO.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message & Pre-Order Note */}
          <div className="lg:col-span-5 bg-[#140E0B] p-6 sm:p-7 rounded-3xl border border-[#2B1B14] shadow-2xl">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] mb-1">
              Connect With Us
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mb-1.5">
              Say Hello to Koffee Kick
            </h3>
            <p className="text-xs text-[#A8988C] font-light leading-relaxed mb-5">
              Have a bulk party order, college meetup, or feedback? Send us a quick note or reach out on WhatsApp.
            </p>

            {msgSent ? (
              <div className="p-6 rounded-2xl bg-[#1C1410] border border-[#C5A880]/50 text-center space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-700/50 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <div className="text-sm font-serif text-white">Message Dispatched!</div>
                <p className="text-xs text-[#A8988C]">
                  Thank you! Our Munshipulia cafe team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3.5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1 font-mono">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Gupta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-xs focus:border-[#C5A880] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1 font-mono">
                    Phone Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-xs focus:border-[#C5A880] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-1 font-mono">
                    Message or Special Order
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Party order for 10 cold coffees, table reservation for evening..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A110D] border border-[#2B1B14] text-white text-xs focus:border-[#C5A880] focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#C5A880] text-[#0A0807] font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#C5A880]/10"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Note</span>
                  </button>

                  <a
                    href={CAFE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#1F2E22] border border-emerald-600/50 text-emerald-400 font-semibold text-xs tracking-wider hover:bg-[#273B2B] transition flex items-center justify-center gap-1.5 text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
