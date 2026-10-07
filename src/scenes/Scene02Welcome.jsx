import React, { useEffect, useState } from 'react';
import ParallaxEnvironment from '../components/effects/ParallaxEnvironment';
import CinematicButton from '../components/ui/CinematicButton';
import bgSignpost from '../assets/scenery/welcome_signpost.jpg';

export default function WelcomeScene({ nextScene, prevScene, isTransitioning }) {
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    // Delay UI appearance slightly for cinematic environment reveal
    const timer = setTimeout(() => setShowUI(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParallaxEnvironment background={bgSignpost}>
      <div
        className={`
        flex flex-col items-center lg:items-end text-center lg:text-right max-w-2xl w-full lg:ml-auto lg:mr-16 xl:mr-24
        transition-all duration-1000 transform
        ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      >
        {/* Subtle glass backdrop panel for maximum legibility while preserving background */}
        <div className="glass-panel p-6 md:p-10 rounded-3xl border border-amber-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <p className="text-lg md:text-2xl font-body font-light text-parchment drop-shadow-lg mb-6 tracking-wide leading-relaxed">
            Some people enter our lives unexpectedly...
            <br />
            <span className="text-amber-200/90 font-normal">And somehow...</span>
            <br />
            <span className="font-semibold text-white">They become family.</span>
          </p>

          <h1 className="text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#ffcc00] to-[#ffaa00] mb-4 drop-shadow-[0_5px_20px_rgba(0,0,0,0.9)] leading-tight font-display font-bold">
            Happy Birthday,
            <br />
            Nisha 💛
          </h1>

          <p className="text-base md:text-xl text-amber-100/90 italic mb-8 drop-shadow-md font-light">
            "I made a little world just for you."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4">
            <CinematicButton
              onClick={nextScene}
              disabled={isTransitioning}
              icon="✨"
            >
              Enter Your World
            </CinematicButton>
          </div>
        </div>
      </div>
    </ParallaxEnvironment>
  );
}
