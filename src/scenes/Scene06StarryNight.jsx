import React, { useState } from 'react';
import ParallaxEnvironment from '../components/effects/ParallaxEnvironment';
import CinematicButton from '../components/ui/CinematicButton';
import bgNight from '../assets/scenery/starry_night.jpg';
import { soundEngine } from '../components/core/AudioController';
import { Moon, Star, Sparkles, Heart } from 'lucide-react';

const BLESSINGS = [
  "May your heart always feel light and cherished.",
  "May laughter find you in the most unexpected moments.",
  "May your path be lined with peace, warmth, and faithful companions.",
  "May every star in the sky watch over you tonight.",
];

export default function Scene06StarryNight({ nextScene, prevScene, isTransitioning }) {
  const [activeBlessing, setActiveBlessing] = useState(0);

  const cycleBlessing = (idx) => {
    soundEngine.playSparkleSound();
    setActiveBlessing(idx);
  };

  return (
    <ParallaxEnvironment background={bgNight} overlayColor="transparent">
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-between h-full py-6 md:py-10 z-30 select-none">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs md:text-sm font-display tracking-widest text-[#ffd700] mb-2 border border-amber-300/30">
            <Moon className="w-3.5 h-3.5 fill-[#ffd700]" /> Under The Luminous Moon
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            Peaceful Dreams, Nisha
          </h2>
          <p className="text-sm md:text-base text-parchment/90 font-light mt-1.5 drop-shadow">
            The world rests, the lanterns glow, and panda sleeps peacefully knowing you are celebrated.
          </p>
        </div>

        {/* Starlit Blessing Carousel - Positioned cleanly on the SIDE (Right on Desktop) */}
        <div className="my-auto w-full flex justify-center md:justify-end px-4 md:px-8 pointer-events-none">
          <div className="flex flex-col items-center max-w-md w-full text-center pointer-events-auto">
            
            {/* Interactive Star Constellation Tokens */}
            <div className="flex items-center justify-center gap-3 mb-5">
              {BLESSINGS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => cycleBlessing(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    activeBlessing === i
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 scale-125 shadow-[0_0_20px_#ffd700]'
                      : 'glass-panel text-amber-200 hover:text-white hover:border-[#ffd700]/50'
                  }`}
                  title={`Starlight Blessing ${i + 1}`}
                >
                  <Star className={`w-4 h-4 ${activeBlessing === i ? 'fill-slate-950' : ''}`} />
                </button>
              ))}
            </div>

            {/* Translucent Blessing Glass Card */}
            <div className="glass-panel-translucent p-6 md:p-8 rounded-3xl border border-[#ffd700]/35 shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-md w-full animate-[fadeIn_0.5s_ease-out]">
              <div className="text-xs uppercase tracking-widest text-[#ffd700] font-display mb-3 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Starlight Blessing {activeBlessing + 1}
              </div>
              
              <p className="font-body text-base md:text-xl text-white font-light leading-relaxed italic mb-6">
                "{BLESSINGS[activeBlessing]}"
              </p>

              <div className="flex items-center justify-center gap-2 text-rose-300 text-sm font-display">
                <Heart className="w-4 h-4 fill-rose-400" /> Always here for you
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between px-6 pt-2">
          <button
            onClick={prevScene}
            disabled={isTransitioning}
            className="glass-panel px-5 py-2.5 rounded-xl font-display text-sm tracking-wider text-parchment/80 hover:text-white hover:border-[#ffd700]/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            ← Birthday Cake
          </button>

          <CinematicButton
            onClick={() => nextScene(0)}
            disabled={isTransitioning}
            icon="↺"
          >
            Replay Story
          </CinematicButton>
        </div>

      </div>
    </ParallaxEnvironment>
  );
}
