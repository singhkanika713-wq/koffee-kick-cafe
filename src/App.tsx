/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BrewingEngine } from './components/BrewingEngine/BrewingEngine';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MenuItem, CartItem } from './types/coffee';
import { Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (
    item: MenuItem,
    options?: { milk?: string; sweetness?: string; temp?: 'Hot' | 'Iced'; extraShot?: boolean }
  ) => {
    setCartItems((prev) => {
      // Find matching item with exact options
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          ci.milkChoice === options?.milk &&
          ci.temperature === options?.temp &&
          ci.extraShot === options?.extraShot
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            item,
            quantity: 1,
            milkChoice: options?.milk,
            sweetness: options?.sweetness,
            temperature: options?.temp,
            extraShot: options?.extraShot,
          },
        ];
      }
    });

    showToast(`Added "${item.name}" to your order bag`);
  };

  const handleOrderCustomBrew = (customBrew: Partial<MenuItem>) => {
    const fullItem: MenuItem = {
      id: customBrew.id || 'custom-live-brew',
      name: customBrew.name || 'Koffee Kick · Classic Thick Cold Coffee',
      price: customBrew.price || 99,
      description: customBrew.description || 'Freshly brewed live signature drink dialed in at Munshipulia bar.',
      category: customBrew.category || 'coldcoffee',
      beanOrigin: customBrew.beanOrigin || 'Chikmagalur Blend',
      notes: customBrew.notes || ['Thick Froth', 'Roasted Hazelnut', 'Chocolate Swirl'],
      volume: customBrew.volume || '350ml',
      imageUrl:
        customBrew.imageUrl ||
        'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    };

    handleAddToCart(fullItem, {
      temp: fullItem.name.includes('Cold') ? 'Iced' : 'Hot',
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reserve');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0807] text-[#F9F6F0] selection:bg-[#C5A880]/30 selection:text-white">
      {/* Sticky Luxury Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservation}
      />

      {/* Hero & Layer 2: The Interactive Brewing Engine */}
      <BrewingEngine onOrderBrew={handleOrderCustomBrew} />

      {/* Dynamic Full Menu Section */}
      <MenuSection onAddToCart={handleAddToCart} />

      {/* Artisanal Origins & Roastery Sanctuary */}
      <AboutSection />

      {/* Visual Atmosphere & Craft Gallery */}
      <GallerySection />

      {/* Connoisseur Testimonials & Ratings */}
      <TestimonialsSection />

      {/* Guaranteed Table & Workspace Reservation */}
      <ReservationSection />

      {/* Location, Stylized Architectural Map & Hours */}
      <ContactSection />

      {/* Editorial Roastery Footer */}
      <Footer />

      {/* Slide-out Order Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive Floating Quick Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1C120D]/95 border border-[#C5A880]/60 shadow-2xl backdrop-blur-md text-xs text-white"
          >
            <div className="w-6 h-6 rounded-lg bg-[#C5A880] text-[#0A0807] flex items-center justify-center font-bold">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 font-mono text-[#C5A880] hover:underline font-semibold"
            >
              View Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
