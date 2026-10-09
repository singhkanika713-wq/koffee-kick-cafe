import React from 'react';
import { Compass, Flame, ShieldCheck, Wifi, Award, Leaf, MapPin, Clock, Instagram } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="origins" className="py-24 bg-[#0A0807] text-[#F9F6F0] relative overflow-hidden border-b border-[#241712]">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-mono">
            <span>Lucknow's Favorite Cozy Hangout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white leading-tight">
            The Story Behind <span className="italic font-serif text-[#C5A880]">Koffee Kick</span>
          </h2>
          <p className="mt-4 text-base text-[#A8988C] font-light leading-relaxed">
            Nestled in Mathur Market right by Munshipulia Chouraha, Indira Nagar, Koffee Kick was born out of a simple passion: to make delicious, thick, high-quality cold coffee, authentic chai, and mouth-watering bites affordable for everyone in Lucknow — with favorites starting around ₹99.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1: Thick Cold Coffee & Brews */}
          <div className="bg-[#140E0B] p-6 rounded-3xl border border-[#2B1B14] hover:border-[#C5A880]/40 transition duration-300 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#23150F] border border-[#3E281F] flex items-center justify-center text-[#C5A880] mb-5">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase mb-1">
                Starting ₹99
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                The Legendary Cold Coffee
              </h3>
              <p className="text-xs text-[#A8988C] font-light leading-relaxed mb-4">
                Thick, velvety, and frothy. Made using rich roasted Arabica-Robusta beans blended with creamy chilled milk and generous chocolate sauce swirls.
              </p>
            </div>
            <div className="pt-3.5 border-t border-[#23150F] flex items-center justify-between text-[11px] font-mono text-[#8C7A6D]">
              <span>Chikmagalur Blend</span>
              <span className="text-[#C5A880]">Crowd Favorite</span>
            </div>
          </div>

          {/* Pillar 2: Fresh Burgers & Grilled Sandwiches */}
          <div className="bg-[#140E0B] p-6 rounded-3xl border border-[#2B1B14] hover:border-[#C5A880]/40 transition duration-300 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#23150F] border border-[#3E281F] flex items-center justify-center text-[#C5A880] mb-5">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase mb-1">
                Made to Order
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                Crispy Bites & Loaded Cheese
              </h3>
              <p className="text-xs text-[#A8988C] font-light leading-relaxed mb-4">
                Freshly toasted jumbo bread filled with spiced potato masala, sweet corn, paneer tikka, and gooey mozzarella cheese pulls.
              </p>
            </div>
            <div className="pt-3.5 border-t border-[#23150F] flex items-center justify-between text-[11px] font-mono text-[#8C7A6D]">
              <span>100% Pure Veg</span>
              <span className="text-[#C5A880]">₹99 Onwards</span>
            </div>
          </div>

          {/* Pillar 3: Metro Proximity & Cozy Hangout */}
          <div className="bg-[#140E0B] p-6 rounded-3xl border border-[#2B1B14] hover:border-[#C5A880]/40 transition duration-300 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#23150F] border border-[#3E281F] flex items-center justify-center text-[#C5A880] mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase mb-1">
                Munshipulia Metro Station
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                Cozy, Chill & Accessible
              </h3>
              <p className="text-xs text-[#A8988C] font-light leading-relaxed mb-4">
                Just a 2-minute stroll from the metro station. Comfy seating, fast Wi-Fi, aesthetic warm lights, and soft lo-fi tunes for study dates and conversations.
              </p>
            </div>
            <div className="pt-3.5 border-t border-[#23150F] flex items-center justify-between text-[11px] font-mono text-[#8C7A6D]">
              <span>Indira Nagar, LKO</span>
              <span className="text-[#C5A880]">9 AM – 11 PM</span>
            </div>
          </div>
        </div>

        {/* Cafe Atmosphere Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#17100C] to-[#120B08] border border-[#2E1D16]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              The Munshipulia Vibe
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-3">
              Your Daily Retreat in Indira Nagar
            </h3>
            <p className="text-xs sm:text-sm text-[#A8988C] font-light leading-relaxed mb-6">
              Whether you’re stepping off the metro after work, finishing coaching classes, or catching up with friends over a Kulhad Chai and Peri-Peri Burger, Koffee Kick welcomes you with sincere Lucknow hospitality and pocket-friendly cafe luxury.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#241712] text-[#C5A880] border border-[#3E281F]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-medium">Mathur Market</div>
                  <div className="text-[#8C7A6D] text-[11px]">Sector 13, Indira Nagar</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#241712] text-[#C5A880] border border-[#3E281F]">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-medium">9:00 AM – 11:00 PM</div>
                  <div className="text-[#8C7A6D] text-[11px]">Open 7 Days a Week</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#241712] text-[#C5A880] border border-[#3E281F]">
                  <Wifi className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-medium">Free Fast Wi-Fi</div>
                  <div className="text-[#8C7A6D] text-[11px]">Work & Study Friendly</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#241712] text-[#C5A880] border border-[#3E281F]">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-medium">@koffee.kicks05</div>
                  <div className="text-[#8C7A6D] text-[11px]">Follow on Instagram</div>
                </div>
              </div>
            </div>

            <a
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#241712] border border-[#3E281F] text-xs font-mono text-[#C5A880] hover:text-white hover:border-[#C5A880] transition"
            >
              <Instagram className="w-4 h-4" />
              <span>Connect on Instagram @koffee.kicks05</span>
            </a>
          </div>

          {/* Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-[#3E281F] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
              alt="Koffee Kick Lucknow Cafe Interior"
              className="w-full h-80 object-cover brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-[#0A0807]/90 backdrop-blur-md border border-[#3E281F]">
              <div className="text-xs font-mono text-[#C5A880] mb-0.5">Koffee Kick Flagship</div>
              <div className="text-xs text-white font-medium">
                Munshipulia Chouraha · Where Lucknow Meets for Coffee
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
