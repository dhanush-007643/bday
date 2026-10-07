import React, { useState, useEffect } from 'react';
import Fireflies from '../components/effects/Fireflies';
import CinematicButton from '../components/ui/CinematicButton';
import bgSignpost from '../assets/scenery/welcome_signpost.jpg';
import { Sparkles, Compass } from 'lucide-react';

export default function Scene01Loading({ nextScene, isTransitioning }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsReady(true), 300);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="scene-container select-none">
      {/* Background scenery */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.7] blur-[3px] scale-105 transition-all duration-1000"
        style={{ backgroundImage: `url(${bgSignpost})` }}
      />
      
      {/* Deep twilight overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1526]/80 via-[#0b132b]/80 to-[#070b16]/95" />

      {/* Floating fireflies */}
      <Fireflies count={50} />

      {/* Center Cinematic Card */}
      <div className="relative z-30 max-w-xl mx-auto text-center px-6 flex flex-col items-center">
        {/* Glowing emblem */}
        <div className="w-20 h-20 rounded-full glass-panel border border-[#ffd700]/50 shadow-[0_0_35px_rgba(255,215,0,0.4)] flex items-center justify-center mb-6 animate-pulse">
          <Compass className="w-10 h-10 text-[#ffd700] animate-[spin_12s_linear_infinite]" />
        </div>

        <p className="text-sm md:text-base font-display uppercase tracking-[0.4em] text-amber-300/80 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ffd700]" /> An Interactive Story For Nisha
        </p>

        <h1 className="text-4xl md:text-6xl text-gold-shimmer font-display font-bold mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
          Where Sunflowers Bloom
        </h1>

        <p className="text-base md:text-lg font-body text-gray-300 max-w-md mx-auto mb-8 font-light italic">
          "A quiet sanctuary painted with memories, gentle lanterns, and golden skies."
        </p>

        {/* Progress Bar or Start Button */}
        {!isReady ? (
          <div className="w-72 md:w-80 flex flex-col items-center">
            <div className="w-full bg-slate-950/80 rounded-full h-2.5 border border-[#ffd700]/30 overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.15)] mb-3">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-[#ffd700] to-yellow-200 transition-all duration-150 ease-out shadow-[0_0_12px_#ffd700]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-display tracking-widest text-amber-200/70">
              Gathering fireflies & starlight... {progress}%
            </span>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.8s_ease-out]">
            <CinematicButton
              onClick={nextScene}
              disabled={isTransitioning}
              icon="✨"
            >
              Begin Journey
            </CinematicButton>
          </div>
        )}
      </div>

      {/* Atmospheric vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] z-40" />
    </div>
  );
}
