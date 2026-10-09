import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Calendar, Menu, X, Phone, Instagram, MapPin } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Live Brew', href: '#live-brew' },
    { label: 'Menu (₹99+)', href: '#menu' },
    { label: 'Our Story', href: '#origins' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Reserve Table', href: '#reserve' },
    { label: 'Find Us', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0807]/95 backdrop-blur-md border-b border-[#2C1D16]/80 py-2.5 shadow-2xl shadow-black/50'
            : 'bg-[#0A0807]/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Monogram & Details */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#381F14] to-[#120B08] border border-[#C5A880]/60 flex items-center justify-center shadow-lg group-hover:border-[#C5A880] transition-colors">
              <Coffee className="w-5 h-5 text-[#C5A880] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-serif font-semibold tracking-wider text-[#F9F6F0] flex items-center gap-1.5">
                <span>KOFFEE KICK</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              </div>
              <div className="text-[10px] tracking-wider uppercase text-[#C5A880] font-mono flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#C5A880]" />
                <span>Munshipulia, Lucknow</span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.15em] text-[#C5B4A5] hover:text-[#C5A880] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Island: Phone + Instagram + Cart + Table CTA */}
          <div className="flex items-center gap-2.5">
            {/* Direct Call / Contact Link */}
            <a
              href={`tel:${CAFE_INFO.phoneRaw}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A110D] border border-[#2E1D16] text-[11px] text-[#E8DFD8] hover:text-white hover:border-[#C5A880] transition"
              title="Call Koffee Kick"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              <span className="font-mono">{CAFE_INFO.phone}</span>
            </a>

            {/* Instagram Link */}
            <a
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#1C120D] border border-[#3E281F] text-[#C5A880] hover:text-white hover:border-[#C5A880] transition"
              title="Visit Instagram @koffee.kicks05"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-[#1C120D] border border-[#3E281F] text-[#F9F6F0] hover:border-[#C5A880] hover:text-[#C5A880] transition cursor-pointer"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C5A880] text-[#0A0807] font-mono font-bold text-[10px] flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#A3835B] text-[#0A0807] font-semibold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition cursor-pointer shadow-md shadow-[#C5A880]/15"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#1C120D] border border-[#3E281F] text-[#F9F6F0] lg:hidden hover:border-[#C5A880] transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Sheet */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#100A08] border-b border-[#2C1D16] px-6 py-6 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top-3">
            <div className="p-3 rounded-xl bg-[#18110D] border border-[#2E1D16] text-xs space-y-1 mb-2">
              <div className="text-white font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Munshipulia Chouraha, Indira Nagar, Lucknow</span>
              </div>
              <div className="text-[#A8988C] text-[11px] font-mono">
                Open Daily: 9:00 AM – 11:00 PM · Walk from Metro
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-sm text-[#E8DFD8] hover:bg-[#1E130E] hover:text-[#C5A880] font-medium transition"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#241712] flex flex-col gap-2.5">
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="w-full py-2.5 rounded-xl bg-[#1E130E] border border-[#3E281F] text-white font-mono text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call: {CAFE_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl bg-[#C5A880] text-[#0A0807] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table / Workspace</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-2.5 rounded-xl bg-[#18100C] border border-[#2E1D16] text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                <span>View Order Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
