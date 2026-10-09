import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Coffee,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { CartItem } from '../types/coffee';
import { CAFE_INFO } from '../data/coffeeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('10–15 mins');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  const subtotal = cartItems.reduce((acc, current) => {
    const extraPrice = current.extraShot ? 30 : 0;
    return acc + (current.item.price + extraPrice) * current.quantity;
  }, 0);

  const tax = Math.round(subtotal * 0.05); // 5% GST on cafe food & beverage
  const total = subtotal + tax;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed({
        orderNumber: `#KK-${Math.floor(1000 + Math.random() * 9000)}`,
        name: customerName || 'Valued Guest',
        phone: phone || '+91 92143 71835',
        pickupTime: pickupTime,
        total: total,
        itemCount: cartItems.reduce((s, i) => s + i.quantity, 0),
      });
      onClearCart();
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-[#120B08] border-l border-[#2E1D16] text-[#F9F6F0] flex flex-col justify-between shadow-2xl"
              >
                {/* Header */}
                <div className="p-5 border-b border-[#241712] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
                    <h3 className="text-base font-serif font-medium text-white">
                      Your Order Bag
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-[#1A110D] text-[#8C7A6D] hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Items List Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 rounded-3xl bg-[#1C120D] border border-[#2B1B14] flex items-center justify-center mx-auto text-[#8C7A6D] mb-4">
                        <Coffee className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium text-white">Your bag is empty</p>
                      <p className="text-xs text-[#8C7A6D] mt-1 max-w-xs mx-auto">
                        Explore our famous ₹99 cold coffee, sandwiches, and burgers to add fresh bites to your bag.
                      </p>
                    </div>
                  ) : (
                    cartItems.map((cartItem, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#18100C] border border-[#2B1B14] flex gap-3 items-start justify-between"
                      >
                        <div className="flex gap-3">
                          <img
                            src={cartItem.item.imageUrl}
                            alt={cartItem.item.name}
                            className="w-14 h-14 rounded-xl object-cover border border-[#3E281F]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-white">
                              {cartItem.item.name}
                            </div>
                            <div className="text-xs text-[#C5A880] mt-0.5 font-mono font-medium">
                              ₹{(cartItem.item.price + (cartItem.extraShot ? 30 : 0)) * cartItem.quantity}
                            </div>
                            {(cartItem.milkChoice || cartItem.temperature || cartItem.extraShot) && (
                              <div className="text-[10px] text-[#8C7A6D] mt-0.5 space-y-0.5">
                                {cartItem.temperature && <div>• {cartItem.temperature}</div>}
                                {cartItem.sweetness && <div>• {cartItem.sweetness}</div>}
                                {cartItem.extraShot && <div>• +Extra Shot/Cheese (+₹30)</div>}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateQuantity(idx, -1)}
                            className="p-1 rounded-lg bg-[#241712] text-[#A69588] hover:text-white transition cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-medium text-white px-1">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, 1)}
                            className="p-1 rounded-lg bg-[#241712] text-[#A69588] hover:text-white transition cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1 text-[#8C7A6D] hover:text-red-400 transition ml-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer & Order Placement */}
                {cartItems.length > 0 && (
                  <div className="p-5 border-t border-[#241712] bg-[#0E0705] space-y-3.5">
                    {/* Pickup Location Reminder */}
                    <div className="p-2.5 rounded-xl bg-[#1A110D] border border-[#2E1D16] text-[11px] text-[#C5A880] flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span className="truncate">Mathur Mkt, Munshipulia Chouraha, Lucknow</span>
                    </div>

                    {/* Pickup Timing */}
                    <div className="flex items-center justify-between text-xs text-[#A8988C]">
                      <span className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> Pickup Time:
                      </span>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="bg-[#1A110D] border border-[#2E1D16] text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
                      >
                        <option value="10–15 mins">Ready in 10–15 mins</option>
                        <option value="20–25 mins">Ready in 20–25 mins</option>
                        <option value="30 mins">Ready in 30 mins</option>
                      </select>
                    </div>

                    {/* Guest Name & Phone */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#1A110D] border border-[#2E1D16] text-xs text-white placeholder-[#8C7A6D] focus:border-[#C5A880] focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#1A110D] border border-[#2E1D16] text-xs text-white placeholder-[#8C7A6D] focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>

                    {/* Totals in Indian Rupees */}
                    <div className="space-y-1 text-xs text-[#A8988C] pt-1 border-t border-[#1C120D]">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-mono text-white">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Govt GST (5%)</span>
                        <span className="font-mono text-white">₹{tax}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-white pt-1">
                        <span>Grand Total</span>
                        <span className="font-mono text-[#C5A880]">₹{total}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteOrder}
                      disabled={isCheckingOut}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#A3835B] text-[#0A0807] font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-[#C5A880]/15 cursor-pointer disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <span>Transmitting Order to Barista...</span>
                      ) : (
                        <>
                          <span>Confirm Order · Pay ₹{total} on Pickup</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-sm w-full bg-[#140E0B] border border-[#C5A880]/50 rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] mb-0.5">
                Order Sent to Barista!
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-1">
                Freshly Brewing for You
              </h3>
              <p className="text-xs text-[#A8988C] mb-4">
                Thank you, {orderConfirmed.name}! Your order has been placed with the Koffee Kick team.
              </p>

              <div className="p-3.5 rounded-2xl bg-[#1A110D] border border-[#2B1B14] text-xs space-y-1.5 mb-4 text-left">
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Order Token</span>
                  <span className="font-mono font-bold text-[#C5A880]">
                    {orderConfirmed.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Pickup Time</span>
                  <span className="text-white font-medium">{orderConfirmed.pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Pay at Counter</span>
                  <span className="font-mono font-bold text-white">₹{orderConfirmed.total} (Cash / UPI)</span>
                </div>
                <div className="pt-1 text-[11px] text-[#A8988C] border-t border-[#241712]">
                  📍 Mathur Market, Munshipulia Chouraha, Lucknow
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/919214371835?text=Hello%20Koffee%20Kick%2C%20I%20have%20placed%20order%20${orderConfirmed.orderNumber}%20for%20Rs%20${orderConfirmed.total}%20under%20the%20name%20${encodeURIComponent(orderConfirmed.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-[#1F2E22] border border-emerald-600/50 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setOrderConfirmed(null);
                    onClose();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#C5A880] text-[#0A0807] font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
