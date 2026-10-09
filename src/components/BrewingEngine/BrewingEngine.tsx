import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  Gauge,
  Timer,
  Droplet,
  Coffee,
  Sparkles,
  ShoppingBag,
  Snowflake,
  Layers,
  ThermometerSnowflake,
  Sliders
} from 'lucide-react';
import { BEAN_PROFILES, CAFE_INFO } from '../../data/coffeeData';
import { BrewStep, BeanProfile, MenuItem } from '../../types/coffee';
import { coffeeAudio } from '../../utils/soundEffects';

interface BrewingEngineProps {
  onOrderBrew: (customBrew: Partial<MenuItem>) => void;
}

export const BrewingEngine: React.FC<BrewingEngineProps> = ({ onOrderBrew }) => {
  const [activeStep, setActiveStep] = useState<BrewStep>('grind');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedBean, setSelectedBean] = useState<BeanProfile>(BEAN_PROFILES[0]);
  const [drinkStyle, setDrinkStyle] = useState<'cold' | 'hot'>('cold');
  const [brewProgress, setBrewProgress] = useState<number>(25);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const timerRef = useRef<number | null>(null);

  const steps: { id: BrewStep; num: string; label: string; tagline: string }[] = [
    { id: 'grind', num: '01', label: 'Grind', tagline: 'Uniform Micrometric Burr Mill' },
    { id: 'saturate', num: '02', label: 'Saturate', tagline: 'Pre-Infusion & CO2 Bloom' },
    { id: 'extract', num: '03', label: 'Extract', tagline: 'Dual-Spout 9.2 Bar Pressure' },
    { id: 'sip', num: '04', label: 'Froth & Sip', tagline: 'Thick Cold Froth / Golden Crema' },
  ];

  // Sound triggers on step change
  useEffect(() => {
    if (!isMuted) {
      if (activeStep === 'grind') coffeeAudio.playGrind();
      else if (activeStep === 'saturate') coffeeAudio.playWaterPour();
      else if (activeStep === 'extract') coffeeAudio.playDrip();
      else if (activeStep === 'sip') coffeeAudio.playSteamHiss();
    }
  }, [activeStep, isMuted]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    coffeeAudio.setMuted(nextMuted);
    if (!nextMuted) {
      if (activeStep === 'grind') coffeeAudio.playGrind();
      else if (activeStep === 'saturate') coffeeAudio.playWaterPour();
      else if (activeStep === 'extract') coffeeAudio.playDrip();
      else if (activeStep === 'sip') coffeeAudio.playSteamHiss();
    }
  };

  // Auto-play sequencing
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalDuration = 4200 / speedMultiplier;
    timerRef.current = window.setInterval(() => {
      setActiveStep((prev) => {
        if (prev === 'grind') return 'saturate';
        if (prev === 'saturate') return 'extract';
        if (prev === 'extract') return 'sip';
        return 'grind';
      });
    }, intervalDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  useEffect(() => {
    if (activeStep === 'grind') setBrewProgress(25);
    else if (activeStep === 'saturate') setBrewProgress(55);
    else if (activeStep === 'extract') setBrewProgress(85);
    else if (activeStep === 'sip') setBrewProgress(100);
  }, [activeStep]);

  const handleStepJump = (step: BrewStep) => {
    setActiveStep(step);
    setIsPlaying(false);
  };

  const resetBrew = () => {
    setActiveStep('grind');
    setIsPlaying(true);
  };

  const handleOrderThisCup = () => {
    onOrderBrew({
      id: `live-${selectedBean.id}-${drinkStyle}`,
      name:
        drinkStyle === 'cold'
          ? `Koffee Kick · ${selectedBean.name} Thick Cold Coffee`
          : `Koffee Kick · ${selectedBean.name} Signature Espresso`,
      price: drinkStyle === 'cold' ? 99 : 99,
      description: `Freshly prepared live brew: ${selectedBean.flavorNotes.join(', ')}. Calibrated at Munshipulia bar.`,
      beanOrigin: selectedBean.origin,
      notes: selectedBean.flavorNotes,
      category: drinkStyle === 'cold' ? 'coldcoffee' : 'hotbrew',
      volume: drinkStyle === 'cold' ? '350ml' : '45ml',
      imageUrl:
        drinkStyle === 'cold'
          ? 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    });
  };

  return (
    <section id="live-brew" className="relative min-h-screen bg-[#0A0807] text-[#F9F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#2C1D16]/50">
      {/* Ambient Lighting & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[580px] bg-[#C5A880]/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#3E2723]/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18110D] border border-[#3E281F] text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-3 font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Koffee Kick · Munshipulia Bar Live Stream</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#F9F6F0] leading-[1.12]">
            The Live Brew <span className="italic font-serif text-[#C5A880]">Experience</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#C5A880]/85 font-light leading-relaxed max-w-2xl mx-auto">
            Watch the real-time extraction of our famous <strong className="text-white font-medium">₹99 Thick Cold Coffee</strong> & artisan espresso. From micrometric whole bean burr milling to 9.2-bar dual-spout extraction.
          </p>
        </div>

        {/* Step Navigation Bar [1. Grind] -> [2. Saturate] -> [3. Extract] -> [4. Sip] */}
        <div className="relative mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 bg-[#140E0B]/95 border border-[#2E1D16] rounded-2xl backdrop-blur-md shadow-xl">
            {steps.map((st) => {
              const isActive = activeStep === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => handleStepJump(st.id)}
                  className={`relative flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all duration-300 text-left group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2A1811] to-[#1C100B] border border-[#C5A880]/60 shadow-lg shadow-black/50 text-white'
                      : 'hover:bg-[#1A110D] text-[#A69588] hover:text-[#F9F6F0] border border-transparent'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                      isActive ? 'bg-[#C5A880] text-[#0A0807]' : 'bg-[#1C120D] text-[#8C7A6D] group-hover:text-[#C5A880]'
                    }`}
                  >
                    {st.num}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5 truncate">
                      <span>{st.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping shrink-0" />}
                    </div>
                    <div className="text-[10px] text-[#8C7A6D] truncate hidden sm:block">
                      {st.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bean Selector & Drink Style */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            
            {/* Drink Style Toggle (Cold Coffee vs Hot Espresso) */}
            <div className="p-4 bg-[#140E0B]/90 border border-[#2E1D16] rounded-2xl backdrop-blur-sm shadow-md">
              <div className="text-[11px] uppercase font-mono tracking-wider text-[#C5A880] mb-2 flex items-center justify-between">
                <span>Brewing Style</span>
                <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setDrinkStyle('cold')}
                  className={`py-2 px-2.5 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    drinkStyle === 'cold'
                      ? 'bg-gradient-to-r from-[#2F1D14] to-[#1C100B] border-[#C5A880] text-white shadow-md'
                      : 'border-[#281A13] text-[#A69588] hover:text-white'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Thick Cold (₹99)</span>
                </button>

                <button
                  onClick={() => setDrinkStyle('hot')}
                  className={`py-2 px-2.5 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    drinkStyle === 'hot'
                      ? 'bg-gradient-to-r from-[#2F1D14] to-[#1C100B] border-[#C5A880] text-white shadow-md'
                      : 'border-[#281A13] text-[#A69588] hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hot Brew (₹99)</span>
                </button>
              </div>
            </div>

            {/* Coffee Bean Roast Selector */}
            <div className="p-4 bg-[#140E0B]/90 border border-[#2E1D16] rounded-2xl backdrop-blur-sm shadow-md">
              <div className="text-[11px] uppercase font-mono tracking-wider text-[#C5A880] mb-2 flex items-center justify-between">
                <span>Select Roast Blend</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              </div>

              <div className="space-y-2">
                {BEAN_PROFILES.map((bean) => (
                  <button
                    key={bean.id}
                    onClick={() => setSelectedBean(bean)}
                    className={`w-full text-left p-3 rounded-xl transition-all border cursor-pointer ${
                      selectedBean.id === bean.id
                        ? 'bg-[#281811] border-[#C5A880]/60 text-white shadow-md'
                        : 'bg-[#18110D]/70 border-[#281A13] text-[#A69588] hover:border-[#4A3226] hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#F9F6F0] flex items-center justify-between">
                      <span className="truncate">{bean.name}</span>
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: bean.cremaColor }} />
                    </div>
                    <div className="text-[10px] text-[#A8988C] mt-0.5 font-mono">{bean.origin}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Flavor Notes */}
            <div className="p-4 bg-[#140E0B]/90 border border-[#2E1D16] rounded-2xl backdrop-blur-sm shadow-md">
              <div className="text-[11px] uppercase font-mono tracking-wider text-[#C5A880] mb-2">
                Flavor Bouquet
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {selectedBean.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#241712] text-[#E8DFD8] border border-[#3E2723]"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#A8988C] font-light leading-relaxed">
                {selectedBean.description}
              </p>
            </div>
          </div>

          {/* Center Column: The Central Realistic Machine & Glass Rig */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            
            {/* Main Machine Rig Enclosure */}
            <div className="relative w-full max-w-[440px] aspect-[4/5] bg-gradient-to-b from-[#1C1410] via-[#120B08] to-[#0A0706] border-2 border-[#4A3125]/80 rounded-[32px] p-6 shadow-2xl shadow-black flex flex-col items-center justify-between overflow-hidden">
              
              {/* Machine Metallic Trim Highlight & Brand Badge */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2E1E17] via-[#C5A880]/40 to-[#2E1E17]" />
              
              {/* Top Section: Glass Bean Hopper & Conical Burr Grinder */}
              <div className="w-full flex flex-col items-center relative z-20">
                
                {/* Transparent Acrylic Glass Hopper */}
                <div className="relative w-48 h-26 rounded-b-[28px] border-2 border-[#C5A880]/30 bg-gradient-to-b from-white/10 via-white/5 to-[#1E110A]/50 backdrop-blur-md overflow-hidden flex flex-col items-center justify-between shadow-inner p-1">
                  
                  {/* Glass Sheen Angle */}
                  <div className="absolute -top-10 -left-10 w-24 h-40 bg-white/10 rotate-45 pointer-events-none filter blur-sm" />
                  
                  <div className="w-full text-center pt-0.5 text-[9px] font-mono uppercase tracking-widest text-[#C5A880]/80">
                    Beans: {selectedBean.name.split('·')[0]}
                  </div>

                  {/* Dynamic Coffee Beans Physical Model */}
                  <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden px-4">
                    <AnimatePresence mode="wait">
                      {activeStep === 'grind' ? (
                        <motion.div
                          key="beans-tumbling"
                          animate={{ y: [0, 3, -2, 2, 0], x: [0, -1, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.28 }}
                          className="flex flex-wrap justify-center items-center gap-1.5 pt-1"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
                            <motion.div
                              key={idx}
                              animate={{
                                rotate: [0, 10, -12, 5, 0],
                                scale: [1, 0.95, 1.05, 1],
                              }}
                              transition={{ repeat: Infinity, duration: 0.35 + idx * 0.04 }}
                              className="w-4 h-5 rounded-[50%_50%_45%_45%] shadow-md relative shrink-0"
                              style={{
                                backgroundColor: selectedBean.colorHex,
                                border: '1px solid #5C3827',
                                boxShadow: 'inset -1px -2px 3px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)',
                              }}
                            >
                              {/* Realistic S-curved Coffee Bean Crevice */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-3.5 bg-[#0C0604] rounded-full rotate-6 shadow-sm" />
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <div className="flex flex-wrap justify-center items-center gap-1.5 pt-1 opacity-90">
                          {[1, 2, 3, 4, 5, 6, 7].map((idx) => (
                            <div
                              key={idx}
                              className="w-4 h-5 rounded-[50%_50%_45%_45%] relative shrink-0"
                              style={{
                                backgroundColor: selectedBean.colorHex,
                                border: '1px solid #5C3827',
                              }}
                            >
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-3.5 bg-[#0C0604] rounded-full rotate-6" />
                            </div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Conical Grinding Burr Teeth Chamber */}
                  <div className="w-32 h-3 bg-gradient-to-r from-[#20130C] via-[#482D1E] to-[#20130C] border-t border-[#7A543E] rounded-b-lg flex justify-around items-center px-2">
                    <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-ping" />
                    <span className="text-[8px] font-mono text-[#D4A373]">MICROMETRIC BURR</span>
                    <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-ping" />
                  </div>
                </div>

                {/* State 1: Fresh Ground Coffee Powder Falling Particle Stream */}
                {activeStep === 'grind' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 26 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-8 flex flex-col items-center justify-center my-0.5 overflow-hidden"
                  >
                    <div className="w-2.5 h-full bg-gradient-to-b from-[#3E2519] via-[#5C3824] to-[#2B170E] rounded-full animate-pulse shadow-md" />
                  </motion.div>
                )}

                {/* State 2: E61 Commercial Group-Head & Portafilter Basket */}
                <div className="relative w-52 mt-1 flex flex-col items-center">
                  
                  {/* Heavy Polished Chrome Group-Head */}
                  <div className="w-44 h-6 bg-gradient-to-r from-[#2A1C16] via-[#6B4B39] to-[#2A1C16] rounded-t-xl border border-[#8C624A]/60 flex items-center justify-between px-3 shadow-lg">
                    <div className="text-[9px] font-mono tracking-widest text-[#E8DFD8]">
                      E61 GROUP HEAD
                    </div>
                    <div className="text-[9px] font-mono text-[#C5A880]">
                      {drinkStyle === 'cold' ? '92.0°C EXTRACTION' : '93.5°C THERMAL'}
                    </div>
                  </div>

                  {/* Portafilter Basket with Expanding/Blooming Grounds */}
                  <div className="w-38 h-10 bg-[#160E0A] border-x-2 border-b-2 border-[#5C3A29] rounded-b-2xl relative overflow-hidden flex items-end justify-center shadow-inner">
                    {/* Coffee ground layer */}
                    <div
                      className={`w-full transition-all duration-700 ease-out flex items-center justify-center relative ${
                        activeStep === 'saturate'
                          ? 'h-8 bg-gradient-to-r from-[#1E110A] via-[#2E180E] to-[#1E110A]'
                          : activeStep === 'grind'
                          ? 'h-6 bg-[#3B2215]'
                          : 'h-7 bg-[#1A0F08]'
                      }`}
                    >
                      {/* Blooming CO2 Bubbles when saturating */}
                      {activeStep === 'saturate' && (
                        <div className="absolute inset-0 flex justify-around items-center px-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/80 animate-ping" />
                          <span className="w-2 h-2 rounded-full bg-[#E8DFD8] animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/80 animate-ping" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* State 2: Water Pour High-Pressure Stream Line */}
                  {activeStep === 'saturate' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 0.95, height: 32 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-3 w-1.5 bg-gradient-to-b from-cyan-100/90 via-white to-[#E8DFD8] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    />
                  )}
                </div>

                {/* State 3: Dual-Spout Portafilter Spouts & Flow Streams */}
                <div className="w-36 h-7 flex justify-between items-start relative px-8 mt-0.5">
                  {/* Left Spout */}
                  <div className="w-2.5 h-3.5 bg-gradient-to-b from-[#4A3022] to-[#20120B] rounded-b-md border-x border-[#6B4B38]" />
                  {/* Right Spout */}
                  <div className="w-2.5 h-3.5 bg-gradient-to-b from-[#4A3022] to-[#20120B] rounded-b-md border-x border-[#6B4B38]" />

                  {/* Flow Streams */}
                  {activeStep === 'extract' && (
                    <>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 50 }}
                        transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute left-9 top-3.5 w-1.5 bg-gradient-to-b from-[#2E170E] via-[#5C3822] to-[#996338] rounded-full shadow-sm"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 50 }}
                        transition={{ duration: 0.35, repeat: Infinity, repeatType: 'reverse', delay: 0.05 }}
                        className="absolute right-9 top-3.5 w-1.5 bg-gradient-to-b from-[#2E170E] via-[#5C3822] to-[#996338] rounded-full shadow-sm"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Section: Realistic Glass Tumbler / Cup */}
              <div className="relative w-full flex flex-col items-center mt-2 z-10">
                
                {/* Steaming Vapor Wafting (Hot Drink Mode) */}
                {drinkStyle === 'hot' && (activeStep === 'extract' || activeStep === 'sip') && (
                  <div className="absolute -top-16 flex justify-center gap-4 w-36 h-16 pointer-events-none">
                    <span className="w-1.5 h-12 bg-gradient-to-t from-white/35 to-transparent rounded-full animate-steam-1 filter blur-[1px]" />
                    <span className="w-2 h-14 bg-gradient-to-t from-white/45 to-transparent rounded-full animate-steam-2 filter blur-[1px]" />
                    <span className="w-1.5 h-11 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-steam-3 filter blur-[1px]" />
                  </div>
                )}

                {/* Double-Walled Glass Container */}
                <div className="relative w-44 h-36 border-2 border-white/25 rounded-b-[42px] bg-gradient-to-b from-white/12 via-white/5 to-white/10 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col justify-end p-1.5">
                  
                  {/* Realistic Glass Highlight Bevels */}
                  <div className="absolute top-1.5 left-3 right-3 h-[2px] bg-white/50 rounded-full" />
                  <div className="absolute left-1.5 top-3 bottom-3 w-1 bg-gradient-to-b from-white/50 via-white/15 to-transparent rounded-full" />
                  
                  {/* Cold Coffee Choco-Sauce Swirl Drizzle along Glass Wall */}
                  {drinkStyle === 'cold' && (
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                        <path d="M10,10 Q35,40 20,70 T15,95" stroke="#1A0D08" strokeWidth="4" fill="none" strokeDasharray="3 3" />
                        <path d="M85,10 Q65,45 80,75 T85,95" stroke="#1A0D08" strokeWidth="4" fill="none" strokeDasharray="3 3" />
                      </svg>
                    </div>
                  )}

                  {/* Liquid Filling Block (Dynamic Escalating Height) */}
                  <div
                    className="w-full rounded-b-[38px] relative overflow-hidden transition-all duration-1000 ease-out"
                    style={{
                      height:
                        activeStep === 'grind'
                          ? '0%'
                          : activeStep === 'saturate'
                          ? '14%'
                          : activeStep === 'extract'
                          ? '68%'
                          : '92%',
                      background:
                        drinkStyle === 'cold'
                          ? 'linear-gradient(to top, #1A0D07 0%, #3B2014 30%, #5E3622 65%, #C89968 95%, #EAD6C0 100%)'
                          : `linear-gradient(to top, #140804 0%, ${selectedBean.colorHex} 60%, ${selectedBean.cremaColor} 100%)`,
                    }}
                  >
                    {/* Surface Meniscus & Wave Ripple */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-puddle filter blur-[0.5px]" />

                    {/* Cold Mode: Floating Crystal Ice Cubes */}
                    {drinkStyle === 'cold' && activeStep === 'sip' && (
                      <div className="absolute top-1.5 inset-x-0 flex justify-center gap-2 z-20">
                        <div className="w-5 h-4 rounded-md bg-white/40 border border-white/60 rotate-12 backdrop-blur-sm shadow-sm" />
                        <div className="w-5 h-4 rounded-md bg-white/35 border border-white/60 -rotate-6 backdrop-blur-sm shadow-sm" />
                      </div>
                    )}

                    {/* State 4: Micro-Foam / Thick Crema Layer with Blur & Rotation */}
                    {activeStep === 'sip' && (
                      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden">
                        <div
                          className="w-full h-full rounded-full animate-crema opacity-95 filter blur-[1.5px] flex items-center justify-center"
                          style={{
                            background:
                              drinkStyle === 'cold'
                                ? 'radial-gradient(ellipse at center, #F4E8D8 0%, #D4B088 50%, #7E4A28 100%)'
                                : `radial-gradient(ellipse at center, ${selectedBean.cremaColor} 0%, #9B6C3F 60%, #4E2C17 100%)`,
                          }}
                        >
                          {/* Rosetta Latte Art for Hot Mode */}
                          {drinkStyle === 'hot' && (
                            <svg className="w-8 h-8 opacity-80" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 2C12 2 8 6 8 10C8 13.5 10 16 12 22C14 16 16 13.5 16 10C16 6 12 2 12 2Z"
                                fill="#FFFFFF"
                              />
                              <path
                                d="M12 8C10 8 6 11 6 13.5C6 16 9 17 12 17C15 17 18 16 18 13.5C18 11 14 8 12 8Z"
                                fill="#FFF9F2"
                                opacity="0.85"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Base Plate / Saucer */}
                <div className="w-56 h-3.5 bg-gradient-to-r from-[#20140F] via-[#482E20] to-[#20140F] rounded-full border-t border-[#7A543E]/60 shadow-xl mt-1.5" />
              </div>

              {/* Bottom Rig Live Indicator */}
              <div className="w-full flex items-center justify-between pt-2.5 border-t border-[#2B1B14] text-[11px] font-mono text-[#A8988C]">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  {activeStep === 'grind' && '01: Burr Milling (200μm)'}
                  {activeStep === 'saturate' && '02: Saturation & CO2 Bloom'}
                  {activeStep === 'extract' && '03: 9.2 Bar Hydraulic Drizzle'}
                  {activeStep === 'sip' && (drinkStyle === 'cold' ? '04: Thick Cold Froth Ready' : '04: Silky Golden Crema')}
                </span>
                <span className="text-[#C5A880] font-semibold">{brewProgress}% Brewed</span>
              </div>
            </div>

            {/* Playback Controls & Settings */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#211611] border border-[#3E281F] text-xs font-medium text-white hover:bg-[#2C1E18] transition cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#C5A880]" /> : <Play className="w-3.5 h-3.5 text-[#C5A880]" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={resetBrew}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#18100C] border border-[#2B1912] text-xs font-medium text-[#A69588] hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
                className="px-3 py-2 rounded-xl bg-[#18100C] border border-[#2B1912] text-xs font-mono text-[#C5A880] hover:text-white transition cursor-pointer"
              >
                {speedMultiplier}x Speed
              </button>

              <button
                onClick={toggleMute}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  !isMuted
                    ? 'bg-[#C5A880]/20 border-[#C5A880] text-[#C5A880]'
                    : 'bg-[#18100C] border-[#2B1912] text-[#8C7A6D] hover:text-white'
                }`}
                title={isMuted ? 'Simulate Real Cafe Sounds' : 'Mute Sound'}
              >
                {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Column: Live Calibrated Gauges & Order This Brew CTA */}
          <div className="lg:col-span-3 space-y-4 order-3">
            
            {/* Live Calibrated Telemetry Dashboard */}
            <div className="p-4 bg-[#140E0B]/90 border border-[#2E1D16] rounded-2xl backdrop-blur-sm shadow-md">
              <div className="text-[11px] uppercase tracking-wider text-[#C5A880] mb-3 font-mono flex items-center justify-between">
                <span>Barista Telemetry</span>
                <Gauge className="w-4 h-4 text-[#C5A880]" />
              </div>

              <div className="space-y-3.5">
                {/* 1. Extraction Temperature */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A8988C] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" /> Temperature
                    </span>
                    <span className="font-mono text-white">
                      {drinkStyle === 'cold' ? '4.0°C Chilled' : '93.5°C Steam'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#20140F] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        drinkStyle === 'cold'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400 w-[45%]'
                          : 'bg-gradient-to-r from-amber-500 to-orange-400 w-[94%]'
                      }`}
                    />
                  </div>
                </div>

                {/* 2. Extraction Hydraulic Pressure */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A8988C] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#C5A880]" /> Pump Pressure
                    </span>
                    <span className="font-mono text-white">
                      {activeStep === 'extract' ? '9.2 Bars' : activeStep === 'saturate' ? '2.8 Bars' : '0.0 Bars'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#20140F] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A880] to-orange-400 transition-all duration-500"
                      style={{
                        width: activeStep === 'extract' ? '92%' : activeStep === 'saturate' ? '30%' : '5%',
                      }}
                    />
                  </div>
                </div>

                {/* 3. Extraction Shot Duration */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A8988C] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-emerald-400" /> Shot Timer
                    </span>
                    <span className="font-mono text-white">
                      {activeStep === 'grind' ? '04s' : activeStep === 'saturate' ? '12s' : activeStep === 'extract' ? '27s' : 'Complete'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#20140F] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{
                        width: activeStep === 'grind' ? '20%' : activeStep === 'saturate' ? '50%' : activeStep === 'extract' ? '88%' : '100%',
                      }}
                    />
                  </div>
                </div>

                {/* 4. Yield Volume */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A8988C] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-cyan-400" /> Finished Yield
                    </span>
                    <span className="font-mono text-white">
                      {drinkStyle === 'cold' ? '350ml Glass' : '45ml Double Shot'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#20140F] rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400/80 w-[85%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Order Card */}
            <div className="p-4 bg-gradient-to-br from-[#241611] to-[#120B08] border border-[#C5A880]/40 rounded-2xl shadow-xl">
              <div className="text-[10px] uppercase tracking-wider text-[#C5A880] font-mono mb-1">
                Munshipulia Cafe Counter
              </div>
              <h3 className="text-base font-serif text-white font-medium mb-1">
                Order This Recipe (₹99)
              </h3>
              <p className="text-[11px] text-[#A8988C] font-light leading-relaxed mb-3">
                Send this exact live formulation to the Koffee Kick bar for fresh pickup or table delivery.
              </p>

              <button
                onClick={handleOrderThisCup}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#A3835B] text-[#0A0807] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#C5A880]/20 hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · ₹99</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
