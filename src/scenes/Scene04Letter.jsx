import React from 'react';
import ParallaxEnvironment from '../components/effects/ParallaxEnvironment';
import CinematicButton from '../components/ui/CinematicButton';
import MagicalEnvelope from '../components/ui/MagicalEnvelope';
import bgLetter from '../assets/scenery/letter_envelope.jpg';
import { ArrowLeft, Mail } from 'lucide-react';

export default function Scene04Letter({ nextScene, prevScene, isTransitioning }) {
  return (
    <ParallaxEnvironment background={bgLetter}>
      <div className="w-full max-w-5xl mx-auto flex flex-col justify-between h-full py-5 md:py-8 z-30 select-none relative">
        
        {/* Top Header Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel text-xs font-display tracking-widest text-[#ffd700] mb-1.5 border border-amber-300/30">
            <Mail className="w-3.5 h-3.5" /> Special Delivery
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            Why You're Special to Me
          </h2>
          <p className="text-xs md:text-sm text-amber-100/90 font-light drop-shadow">
            Written beneath the sunset lanterns, sealed with care, and delivered from the heart.
          </p>
        </div>

        {/* Center Dynamic Stage: 3D "Z-Index Sandwich" Envelope */}
        <div className="my-auto flex flex-col items-center justify-center relative w-full px-3">
          <MagicalEnvelope onComplete={nextScene} />
        </div>

        {/* Bottom Scene Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-2">
          <button
            onClick={prevScene}
            disabled={isTransitioning}
            className="glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-display text-xs sm:text-sm tracking-wider text-parchment/80 hover:text-white hover:border-[#ffd700]/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> The Memory Tree
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
