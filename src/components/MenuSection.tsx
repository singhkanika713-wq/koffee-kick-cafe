import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Coffee, Sparkles, Check, X, SlidersHorizontal, Flame, Snowflake, ShieldCheck } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem } from '../types/coffee';

interface MenuSectionProps {
  onAddToCart: (
    item: MenuItem,
    options?: { milk?: string; sweetness?: string; temp?: 'Hot' | 'Iced'; extraShot?: boolean }
  ) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  // Customization state inside modal
  const [customMilk, setCustomMilk] = useState<string>('Standard Full-Cream Milk');
  const [customSweetness, setCustomSweetness] = useState<string>('Normal Sweetness');
  const [customTemp, setCustomTemp] = useState<'Hot' | 'Iced'>('Iced');
  const [extraCheeseOrShot, setExtraCheeseOrShot] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Delights (₹99+)' },
    { id: 'coldcoffee', label: 'Thick Cold Coffee' },
    { id: 'hotbrew', label: 'Hot Brews & Chai' },
    { id: 'burgers', label: 'Artisan Burgers' },
    { id: 'sandwiches', label: 'Grilled Sandwiches' },
    { id: 'snacks', label: 'Fries & Shakes' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const openCustomizeModal = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setCustomMilk('Standard Full-Cream Milk');
    setCustomSweetness('Normal Sweetness');
    setCustomTemp(item.category === 'hotbrew' ? 'Hot' : 'Iced');
    setExtraCheeseOrShot(false);
  };

  const handleConfirmCustomization = () => {
    if (!selectedItemForModal) return;
    onAddToCart(selectedItemForModal, {
      milk: selectedItemForModal.category.includes('coffee') || selectedItemForModal.category === 'hotbrew' ? customMilk : undefined,
      sweetness: selectedItemForModal.category.includes('coffee') ? customSweetness : undefined,
      temp: customTemp,
      extraShot: extraCheeseOrShot,
    });
    setSelectedItemForModal(null);
  };

  return (
    <section id="menu" className="py-24 bg-[#0E0A08] text-[#F9F6F0] relative border-b border-[#241712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-mono">
              <span>Munshipulia Chouraha, Lucknow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white">
              The Cafe <span className="italic font-serif text-[#C5A880]">Menu</span>
            </h2>
          </div>
          <div className="mt-3 md:mt-0 text-xs sm:text-sm text-[#A8988C] max-w-md font-light leading-relaxed">
            Famous for our signature ₹99 thick cold coffee, kulhad masala chai, crunchy burgers, and loaded cheese grilled sandwiches.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C5A880] text-[#0A0807] font-semibold shadow-md shadow-[#C5A880]/20'
                  : 'bg-[#18110D] text-[#A69588] hover:text-[#F9F6F0] border border-[#2B1B14] hover:border-[#42291F]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Minimalist Cards Grid with Magnetic Lift (+3% lift feeling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative bg-[#140E0B] rounded-2xl border border-[#2B1B14] hover:border-[#C5A880]/40 overflow-hidden shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Product Photo */}
              <div className="relative w-full h-52 overflow-hidden bg-[#241712]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140E0B] via-transparent to-transparent opacity-80" />
                
                {/* Price Pill in Indian Rupees */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0A0807]/90 backdrop-blur-md border border-[#3E281F] text-xs font-mono font-bold text-[#C5A880] shadow-md">
                  ₹{item.price}
                </div>

                {/* Veg Indicator & Popular Tags */}
                <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                  {item.isVeg && (
                    <span className="w-5 h-5 rounded-md bg-[#0A0807]/90 border border-emerald-500/80 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                  )}
                  {item.popular && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#C5A880] text-[#0A0807] font-bold shadow">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              {/* Item Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {item.beanOrigin && (
                    <div className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase mb-1">
                      {item.beanOrigin}
                    </div>
                  )}
                  <h3 className="text-lg font-serif font-medium text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#A8988C] font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Flavor / Ingredient Notes */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.notes.map((note) => (
                      <span
                        key={note}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#1F140F] text-[#D1C7BD] border border-[#2E1D16]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Controls */}
                <div className="mt-5 pt-4 border-t border-[#23150F] flex items-center justify-between">
                  <div className="text-[11px] font-mono text-[#8C7A6D]">
                    {item.volume}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openCustomizeModal(item)}
                      className="p-2 rounded-xl bg-[#1C120D] border border-[#2E1D16] text-[#A69588] hover:text-white hover:border-[#C5A880] transition text-xs flex items-center gap-1 cursor-pointer"
                      title="Customize Item"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3.5 py-2 rounded-xl bg-[#251711] border border-[#3E281F] text-white hover:bg-[#C5A880] hover:text-[#0A0807] hover:border-[#C5A880] transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add · ₹{item.price}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Item Customization Modal */}
      <AnimatePresence>
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#140E0B] border border-[#3E281F] rounded-3xl p-6 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#20140F] text-[#8C7A6D] hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Preparation</span>
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-1">
                {selectedItemForModal.name}
              </h3>
              <p className="text-xs text-[#A8988C] mb-5">
                ₹{selectedItemForModal.price} · Freshly made at Koffee Kick Lucknow
              </p>

              {/* Temperature Preference */}
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-2 font-mono">
                  Serving Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Iced', 'Hot'] as const).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setCustomTemp(temp)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        customTemp === temp
                          ? 'bg-[#C5A880] text-[#0A0807] border-[#C5A880] font-semibold'
                          : 'bg-[#1A110D] border-[#2A1B14] text-[#A69588] hover:text-white'
                      }`}
                    >
                      {temp === 'Iced' ? (
                        <>
                          <Snowflake className="w-3.5 h-3.5" />
                          <span>Chilled with Ice</span>
                        </>
                      ) : (
                        <>
                          <Flame className="w-3.5 h-3.5" />
                          <span>Hot & Steaming</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness Profile */}
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-wider text-[#C5A880] mb-2 font-mono">
                  Sweetness
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Normal Sweet', 'Less Sugar', 'Sugar-Free'].map((sweet) => (
                    <button
                      key={sweet}
                      type="button"
                      onClick={() => setCustomSweetness(sweet)}
                      className={`py-2 px-2 rounded-xl border text-[11px] text-center font-medium transition cursor-pointer ${
                        customSweetness === sweet
                          ? 'bg-[#2A1912] border-[#C5A880] text-white'
                          : 'bg-[#1A110D] border-[#2A1B14] text-[#A69588] hover:text-white'
                      }`}
                    >
                      {sweet}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Extra Shot / Extra Cheese */}
              <div className="mb-6">
                <label
                  onClick={() => setExtraCheeseOrShot(!extraCheeseOrShot)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1A110D] border border-[#2A1B14] cursor-pointer hover:border-[#3E281F]"
                >
                  <input
                    type="checkbox"
                    checked={extraCheeseOrShot}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-[#C5A880] bg-[#0A0807] border-[#3E281F]"
                  />
                  <div className="text-xs">
                    <span className="text-white font-medium">
                      {selectedItemForModal.category.includes('coffee')
                        ? 'Extra Dark Espresso Shot'
                        : 'Extra Melted Cheese Slice'}
                    </span>
                    <span className="text-[#C5A880] ml-1">(+₹30)</span>
                  </div>
                </label>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmCustomization}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#A3835B] text-[#0A0807] font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  Add Customized Item · ₹
                  {selectedItemForModal.price + (extraCheeseOrShot ? 30 : 0)}
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
