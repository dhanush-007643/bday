import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import ThreeCakeScene from '../components/effects/ThreeCakeScene';
import bgCake from '../assets/scenery/birthday_cake.jpg';
import { useApp } from '../components/core/AppProvider';
import { soundEngine, globalMusicControl } from '../components/core/AudioController';
import { Sparkles, ArrowLeft, RotateCcw, Wind } from 'lucide-react';

export default function Scene05Celebration({ nextScene, prevScene, isTransitioning }) {
  const { candlesBlown, setCandlesBlown } = useApp();

  // State machine: 'wishing' -> 'blowing' -> 'dark' -> 'celebration' -> 'finished'
  const [sequenceState, setSequenceState] = useState(candlesBlown ? 'finished' : 'wishing');

  // On Mount: Smoothly drop background music to 25% (audio ducking creates anticipation)
  useEffect(() => {
    if (!candlesBlown) {
      globalMusicControl.fadeVolume(0.25, 1000);
    }
    return () => {
      // Cleanup: ensure music smoothly returns to 100% when leaving scene
      globalMusicControl.fadeVolume(1.0, 1000);
    };
  }, [candlesBlown]);

  const triggerGoldenBurst = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    // Center radiant burst
    confetti({
      particleCount: 100,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#FFD700', '#FFAA00', '#FFF8DC', '#FFFFFF'],
    });

    // Continuous twin golden streams from corners
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#FFD700', '#FFAA00', '#FFFFFF', '#FFE57F'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#FFD700', '#FFAA00', '#FFFFFF', '#FFE57F'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleBlowCandles = () => {
    if (sequenceState !== 'wishing') return;

    // 1. Start Blowing & play wind audio
    setSequenceState('blowing');
    soundEngine.playWindBreeze();

    // 2. Flames extinguish & smoke rises (sync with blow sound at 800ms)
    setTimeout(() => {
      setCandlesBlown(true);
      setSequenceState('dark');

      // 3. The 1-second quiet pause (anticipation / held breath)
      setTimeout(() => {
        // Trigger Golden Particle Burst
        triggerGoldenBurst();

        // 4. Celebration state: Text appears, music triumphantly swells back to 100%
        setSequenceState('celebration');
        globalMusicControl.fadeVolume(1.0, 2000);
        soundEngine.playSparkleSound();

        // 5. Wait 2.5 seconds to sequentially reveal the final buttons
        setTimeout(() => {
          setSequenceState('finished');
        }, 2500);
      }, 1000); // 1-second quiet pause
    }, 800);
  };

  const handleRelight = () => {
    soundEngine.playSparkleSound();
    setCandlesBlown(false);
    setSequenceState('wishing');
    globalMusicControl.fadeVolume(0.25, 1000); // Duck volume back down for the next wish
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none state-${sequenceState}`}>
      {/* 1. Custom Magical Fairy-Tale Scenery Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none z-0 scale-102"
        style={{
          backgroundImage: `url(${bgCake})`,
          filter: 'brightness(1.18) contrast(1.04) saturate(1.1)',
        }}
      />

      {/* 2. Soft Edge Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_70%,rgba(0,0,0,0.22)_100%)] pointer-events-none z-1" />

      {/* 3. True 3D WebGL Interactive Cake (Canvas) */}
      <div className="three-js-canvas-wrapper pointer-events-none">
        <ThreeCakeScene isBlown={candlesBlown} />
      </div>

      {/* 4. SIDE Interactive UI Overlay Card */}
      <div className="absolute bottom-8 inset-x-4 md:bottom-auto md:inset-x-auto md:right-8 lg:right-14 md:top-1/2 md:-translate-y-1/2 z-30 flex flex-col items-center pointer-events-none">
        <div className="w-full max-w-sm lg:max-w-md pointer-events-auto transition-all duration-500">
          
          {/* Phase 1 & 2 & 3: Make a wish / Blowing / Dark pause */}
          {(sequenceState === 'wishing' || sequenceState === 'blowing' || sequenceState === 'dark') && (
            <div className={`glass-panel-translucent p-6 md:p-8 rounded-3xl border border-amber-300/35 text-center shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-md w-full transition-all duration-700 ${
              sequenceState === 'dark' ? 'opacity-40 scale-98' : 'opacity-100 scale-100'
            }`}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/30 text-xs font-display text-[#ffd700] mb-3">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-yellow-300" /> Happy Birthday Nisha
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[#ffd700] mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Make a wish...
              </h2>
              <p className="text-amber-100/80 italic text-sm mb-6">
                {sequenceState === 'wishing' && 'Close your eyes and think of something truly beautiful.'}
                {sequenceState === 'blowing' && 'Blowing the glowing candles...'}
                {sequenceState === 'dark' && 'A quiet wish in the heart... ✨'}
              </p>

              <button
                id="btn-blow"
                onClick={handleBlowCandles}
                disabled={sequenceState !== 'wishing' || isTransitioning}
                className={`w-full py-3.5 px-6 rounded-full font-display font-bold text-base md:text-lg tracking-wider transition-all duration-300 ${
                  sequenceState === 'wishing'
                    ? 'text-slate-950 bg-gradient-to-r from-[#b8860b] via-[#ffd700] to-[#b8860b] hover:from-[#daa520] hover:to-[#ffd700] border border-[#ffd700] shadow-[0_0_25px_rgba(218,165,32,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:-translate-y-0.5 cursor-pointer uppercase'
                    : 'text-amber-200/80 bg-slate-900/60 border border-amber-400/30 cursor-wait animate-pulse'
                }`}
              >
                {sequenceState === 'wishing' ? (
                  'Blow The Candles 🕯️'
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Wind className="w-5 h-5 animate-pulse" /> Making Your Wish...
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Phase 4 & 5: Celebration & Sequential Button Reveals */}
          {(sequenceState === 'celebration' || sequenceState === 'finished') && (
            <div className="glass-panel-translucent p-6 md:p-8 rounded-3xl border border-[#ffd700]/35 text-center shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-md w-full animate-[fadeIn_0.8s_ease-out]">
              <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 border border-[#ffd700] flex items-center justify-center text-[#ffd700] mx-auto mb-3 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                <Sparkles className="w-6 h-6 animate-spin text-[#ffd700]" />
              </div>

              {/* Emotional Sister Wish Quote */}
              <h2 className="text-lg md:text-2xl font-display text-yellow-300 mb-3 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                "Nee wish pannadhu vida innum better things un life-la nadakkanum. ✨"
              </h2>

              <p className="text-sm md:text-base text-amber-100 font-medium mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Always happy-ah iru, Panda. 🐼🌻💛
              </p>

              {/* Phase 5 Action Buttons (Smoothly revealed after 2.5s) */}
              <div className={`flex flex-col gap-3 transition-all duration-1000 transform ${
                sequenceState === 'finished' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}>
                <button
                  onClick={handleRelight}
                  className="w-full py-3 px-5 rounded-full font-display text-xs md:text-sm font-semibold tracking-wider text-amber-200 border border-amber-300/40 bg-slate-900/70 hover:bg-slate-800/90 hover:border-amber-300/70 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" /> Relight Candles 🕯️
                </button>

                <button
                  onClick={nextScene}
                  disabled={isTransitioning}
                  className="w-full py-3.5 px-6 rounded-full font-display font-bold text-xs md:text-sm tracking-wider text-[#ffd700] border border-[#ffd700]/70 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 hover:from-amber-900/80 hover:to-slate-900 hover:border-[#ffd700] shadow-[0_0_25px_rgba(255,215,0,0.35)] hover:scale-102 transition-all cursor-pointer"
                >
                  Ready for one final surprise? →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 5. Corner Navigation Buttons */}
      <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={prevScene}
          disabled={isTransitioning}
          className="glass-panel px-4 py-2 rounded-xl font-display text-xs md:text-sm tracking-wider text-amber-100/80 hover:text-white hover:border-[#ffd700]/50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Brother's Letter
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-30 pointer-events-auto md:hidden">
        <button
          onClick={nextScene}
          disabled={isTransitioning}
          className="glass-panel px-4 py-2 rounded-xl font-display text-xs md:text-sm tracking-wider text-amber-100/80 hover:text-white hover:border-[#ffd700]/50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          Starlit Lullaby →
        </button>
      </div>
    </div>
  );
}
