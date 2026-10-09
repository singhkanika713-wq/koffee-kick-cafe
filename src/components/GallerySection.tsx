import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Image as ImageIcon } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/coffeeData';
import { GalleryImage } from '../types/coffee';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const categories = ['all', 'Signature Brews', 'Cafe Vibe', 'Food & Bites', 'Desi Warmth', 'Barista Craft'];

  const filteredImages =
    selectedCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-[#0D0907] text-[#F9F6F0] relative border-b border-[#241712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-mono">
              <span>Cozy Lucknow Ambiance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white">
              The Cafe <span className="italic font-serif text-[#C5A880]">Gallery</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#A8988C] max-w-md font-light leading-relaxed">
            Glimpse into our warm Munshipulia cafe, thick frothy cold coffees, sizzling grilled sandwiches, and welcoming student hangout corners.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C5A880] text-[#0A0807] font-semibold'
                  : 'bg-[#18110D] text-[#A69588] hover:text-white border border-[#2B1B14]'
              }`}
            >
              {cat === 'all' ? 'All Captures' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveImage(img)}
              className="group relative h-80 rounded-2xl overflow-hidden bg-[#18110D] border border-[#2B1B14] hover:border-[#C5A880]/50 cursor-pointer shadow-lg"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Badge */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Caption Card */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] px-2 py-0.5 rounded bg-[#20140F]/80 backdrop-blur-sm border border-[#3E281F]">
                  {img.category}
                </span>
                <h4 className="text-base font-serif font-medium text-white mt-2 group-hover:text-[#C5A880] transition-colors">
                  {img.title}
                </h4>
                <p className="text-xs text-[#A8988C] mt-1 line-clamp-1 font-light">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-[#140E0B] rounded-3xl overflow-hidden border border-[#3E281F] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:text-[#C5A880] transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              <div className="p-6 bg-[#140E0B]">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-1">
                  {activeImage.category}
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-2">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-[#A8988C] font-light leading-relaxed">
                  {activeImage.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
