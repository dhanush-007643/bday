import React, { useState } from 'react';
import ParallaxEnvironment from '../components/effects/ParallaxEnvironment';
import CinematicButton from '../components/ui/CinematicButton';
import bgSunset from '../assets/scenery/memory_tree_sunset.jpg';
import { soundEngine } from '../components/core/AudioController';
import { ArrowLeft, Mail, Sparkles, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

export default function Scene05BrotherLetter({ nextScene, prevScene, isTransitioning }) {
  const [activePage, setActivePage] = useState(1);

  const handleNextPage = () => {
    soundEngine.playSparkleSound();
    setActivePage(2);
  };

  const handlePrevPage = () => {
    soundEngine.playSparkleSound();
    setActivePage(1);
  };

  return (
    <ParallaxEnvironment background={bgSunset}>
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-between h-full py-5 md:py-8 z-30 select-none relative">
        
        {/* Top Header Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel text-xs font-display tracking-widest text-[#ffd700] mb-1.5 border border-amber-300/30">
            <Mail className="w-3.5 h-3.5" /> Special Delivery
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            A Letter From Your Brother
          </h2>
          <p className="text-xs md:text-sm text-amber-100/90 font-light drop-shadow">
            Words that stay with you long after the candles are blown.
          </p>
        </div>

        {/* Center Stage: Dedicated Translucent Parchment Letter */}
        <div className="my-auto flex flex-col items-center justify-center relative w-full px-3">
          <div className="glass-panel-translucent p-6 sm:p-8 md:p-10 rounded-3xl border border-[#ffd700]/35 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md w-full max-w-2xl flex flex-col justify-between animate-[fadeIn_0.5s_ease-out]">
            
            {/* Top Visual Block: Warm Greeting */}
            <div className="border-b border-amber-300/20 pb-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#ffd700] font-display">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> A Brother's Note
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-200/80 font-display">
                  <span
                    onClick={() => setActivePage(1)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activePage === 1 ? 'bg-amber-300 w-5 shadow-[0_0_8px_#ffd700]' : 'bg-white/30'
                    }`}
                  />
                  <span
                    onClick={() => setActivePage(2)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activePage === 2 ? 'bg-amber-300 w-5 shadow-[0_0_8px_#ffd700]' : 'bg-white/30'
                    }`}
                  />
                  <span className="ml-1 text-[11px] tracking-wider">Page {activePage} of 2</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-amber-200 mt-1.5 drop-shadow-[0_2px_12px_rgba(255,215,0,0.35)]">
                Hey Nisha, 💛
              </h3>
              <p className="font-script text-lg sm:text-xl text-amber-100/90 mt-0.5">
                "Written beneath the sunset lanterns"
              </p>
            </div>

            {/* Middle Visual Block: Letter Content */}
            <div className="min-h-[190px] sm:min-h-[175px] flex flex-col justify-center">
              {activePage === 1 ? (
                <div key="letter-p1" className="animate-[fadeIn_0.4s_ease-out] space-y-3 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed">
                  <p className="italic text-amber-200/95 font-medium text-base sm:text-lg">
                    "Eppo nee just enakku therinja oru person-la irundhu en sister maadhiri aana nu enakke therila..."
                  </p>
                  <p>
                    From random jokes and teasing each other to sharing thoughts without hesitation, having you in my life is one of the most comforting blessings I never saw coming.
                  </p>
                  <p>
                    In a world that rushes so fast, you became someone I genuinely cherish, trust, and care for like real family.
                  </p>
                </div>
              ) : (
                <div key="letter-p2" className="animate-[fadeIn_0.4s_ease-out] space-y-3 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed">
                  <p>
                    No matter where life takes us or how crazy things get, always remember you have a brother standing by your side—ready to cheer for your wins, listen when you need an ear, and protect your peace.
                  </p>
                  <p>
                    Never lose that gentle, kind, and radiant heart of yours. May this upcoming year bring you endless laughter, peace, and every sweet wish you secretly dream of.
                  </p>
                  <p className="text-amber-200/90 font-display text-xs tracking-wider">
                    ✦ Blood illa... aana bond eppavume unmai.
                  </p>
                </div>
              )}
            </div>

            {/* Page Navigation & Signature Footer */}
            <div className="pt-4 border-t border-amber-300/20 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              {activePage === 1 ? (
                <button
                  onClick={handleNextPage}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-xs font-display text-amber-200 transition-all hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                >
                  <span>Continue Reading</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handlePrevPage}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-display text-amber-200 transition-all hover:scale-105 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Page</span>
                </button>
              )}

              <div className="text-center sm:text-right">
                <p className="text-[11px] uppercase tracking-widest text-amber-300/80 font-display">
                  With lots of love & care,
                </p>
                <p className="font-script text-2xl sm:text-3xl text-amber-200 drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
                  — Your Brother ✨
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Scene Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-2">
          <button
            onClick={prevScene}
            disabled={isTransitioning}
            className="glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-display text-xs sm:text-sm tracking-wider text-parchment/80 hover:text-white hover:border-[#ffd700]/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Why You're Special
          </button>

          <CinematicButton
            onClick={nextScene}
            disabled={isTransitioning}
            icon="🎂"
          >
            Birthday Celebration
          </CinematicButton>
        </div>

      </div>
    </ParallaxEnvironment>
  );
}
