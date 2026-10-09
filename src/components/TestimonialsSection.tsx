import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/coffeeData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0A0807] text-[#F9F6F0] relative border-b border-[#241712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-mono">
            <span>Lucknow Regulars & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white">
            Words From Our <span className="italic font-serif text-[#C5A880]">Patrons</span>
          </h2>
          <p className="mt-4 text-sm text-[#A8988C] font-light leading-relaxed">
            From daily Munshipulia metro commuters and Indira Nagar residents to college students who chill here after classes.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#140E0B] p-8 rounded-3xl border border-[#2B1B14] hover:border-[#C5A880]/40 transition duration-300 flex flex-col justify-between relative shadow-lg"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#261711]" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                  ))}
                </div>

                {/* Comment Body */}
                <p className="text-sm text-[#E0D7CE] font-light leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#23150F]">
                <div className="text-sm font-serif font-medium text-white">
                  {review.author}
                </div>
                <div className="text-xs text-[#8C7A6D] mt-0.5">
                  {review.role}
                </div>
                <div className="mt-2 text-[11px] font-mono text-[#C5A880]">
                  Favorite: {review.favoriteOrder}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
