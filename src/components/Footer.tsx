import React, { useState } from 'react';
import { Coffee, ArrowRight, Check, MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#070504] text-[#F9F6F0] pt-16 pb-12 border-t border-[#1C120D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#1C120D]">
          
          {/* Brand Manifesto & Local Details */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1C120D] border border-[#C5A880]/50 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#C5A880]" />
              </div>
              <span className="text-xl font-serif font-semibold tracking-wider text-white">
                KOFFEE KICK
              </span>
            </div>

            <p className="text-xs text-[#A8988C] font-light leading-relaxed max-w-sm">
              Lucknow’s cozy hotspot for thick cold coffees, kulhad chai, crunchy burgers, and loaded grilled sandwiches — starting at just ₹99.
            </p>

            {/* Address & Hours List */}
            <div className="space-y-1.5 text-xs text-[#E8DFD8] pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>Open Daily: {CAFE_INFO.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <a href={`tel:${CAFE_INFO.phoneRaw}`} className="hover:text-[#C5A880] font-mono">
                  {CAFE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <a href={CAFE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] font-mono">
                  {CAFE_INFO.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Directory */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-mono uppercase tracking-widest text-[#C5A880] mb-3 text-[11px]">
                Menu & Food
              </div>
              <ul className="space-y-2 text-[#A8988C]">
                <li><a href="#menu" className="hover:text-white transition">Thick Cold Coffee (₹99)</a></li>
                <li><a href="#menu" className="hover:text-white transition">Masala Kulhad Chai</a></li>
                <li><a href="#menu" className="hover:text-white transition">Crunchy Burgers</a></li>
                <li><a href="#menu" className="hover:text-white transition">Grilled Sandwiches</a></li>
                <li><a href="#menu" className="hover:text-white transition">Peri-Peri Fries</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono uppercase tracking-widest text-[#C5A880] mb-3 text-[11px]">
                Experience
              </div>
              <ul className="space-y-2 text-[#A8988C]">
                <li><a href="#live-brew" className="hover:text-white transition">Live Brew Machine</a></li>
                <li><a href="#reserve" className="hover:text-white transition">Table Booking</a></li>
                <li><a href="#gallery" className="hover:text-white transition">Cafe Gallery</a></li>
                <li><a href="#reviews" className="hover:text-white transition">Patron Reviews</a></li>
                <li><a href="#contact" className="hover:text-white transition">Munshipulia Map</a></li>
              </ul>
            </div>
          </div>

          {/* Special Deals & Updates */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono uppercase tracking-widest text-[#C5A880] text-[11px]">
              Offers & Combos
            </div>
            <p className="text-xs text-[#A8988C] font-light">
              Get notified about student combo offers, cold coffee discounts, and evening chai deals at Koffee Kick.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#18110D] border border-emerald-700/60 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you! We’ll send special Lucknow cafe deals.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#140E0B] border border-[#2B1B14] text-xs text-white placeholder-[#8C7A6D] focus:border-[#C5A880] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#C5A880] text-[#0A0807] font-semibold text-xs hover:brightness-110 transition cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Social */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A6D] gap-3">
          <div>
            © {new Date().getFullYear()} Koffee Kick, Mathur Market, Munshipulia, Lucknow. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <a href={CAFE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@koffee.kicks05</span>
            </a>
            <span>·</span>
            <a href={`tel:${CAFE_INFO.phoneRaw}`} className="hover:text-[#C5A880]">
              {CAFE_INFO.phone}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
