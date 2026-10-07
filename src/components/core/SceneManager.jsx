import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScene from '../../scenes/Scene01Loading';
import WelcomeScene from '../../scenes/Scene02Welcome';
import MemoryTreeScene from '../../scenes/Scene03MemoryTree';
import SpecialCardsScene from '../../scenes/Scene04SpecialCards';
import BrotherLetterScene from '../../scenes/Scene05BrotherLetter';
import CelebrationScene from '../../scenes/Scene05Celebration';
import StarryNightScene from '../../scenes/Scene06StarryNight';
import AudioController from './AudioController';
import MouseGlow from '../effects/MouseGlow';
import { useApp } from './AppProvider';
import '../../styles/global.css';

const SCENES = [
  { id: 0, title: "Prologue", component: LoadingScene, bg: null },
  { id: 1, title: "Welcome", component: WelcomeScene, bg: "/assets/scenery/welcome_signpost.jpg" },
  { id: 2, title: "Memory Tree", component: MemoryTreeScene, bg: "/assets/scenery/memory_tree_sunset.jpg" },
  { id: 3, title: "Why You're Special", component: SpecialCardsScene, bg: "/assets/scenery/letter_envelope.jpg" },
  { id: 4, title: "Brother's Letter", component: BrotherLetterScene, bg: "/assets/scenery/memory_tree_sunset.jpg" },
  { id: 5, title: "Celebration", component: CelebrationScene, bg: "/assets/scenery/birthday_cake.jpg" },
  { id: 6, title: "Starry Sanctuary", component: StarryNightScene, bg: "/assets/scenery/starry_night.jpg" },
];

export default function SceneManager() {
  const { currentSceneId, isTransitioning, navigateTo, nextScene, prevScene } = useApp();

  const CurrentSceneComponent = SCENES[currentSceneId]?.component || SCENES[0].component;

  // Phase 5: Image Optimization - Preload the next scene's background
  const nextSceneIndex = Math.min(currentSceneId + 1, SCENES.length - 1);
  const nextBgToPreload = SCENES[nextSceneIndex]?.bg;

  return (
    <div className="game-viewport select-none relative w-full h-full overflow-hidden text-white">
      {/* Background Preloader for Next Scene (Phase 5) */}
      {nextBgToPreload && (
        <link rel="preload" as="image" href={nextBgToPreload} />
      )}

      {/* Interactive Cursor Glow */}
      <MouseGlow />

      {/* Persistent Ambient Sound Engine & Mute Button */}
      <AudioController />

      {/* Story Chapter Navigation Dots (Top Left) */}
      {currentSceneId > 0 && (
        <div className="fixed top-6 left-6 z-50 flex items-center gap-2 glass-panel px-3.5 py-2 rounded-full border border-amber-300/20">
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => navigateTo(idx)}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSceneId === idx
                  ? 'w-6 bg-[#ffd700] shadow-[0_0_10px_#ffd700]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={scene.title}
            />
          ))}
          <span className="text-[11px] font-display text-amber-200/90 ml-2 hidden sm:inline">
            {SCENES[currentSceneId].title}
          </span>
        </div>
      )}

      {/* Phase 3: Framer Motion Game Engine Viewport Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneId}
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Suspense fallback={<div className="loading-fallback flex items-center justify-center h-full text-gold-shimmer font-display text-xl">Entering next memory...</div>}>
            <CurrentSceneComponent 
              nextScene={(targetIdx) => typeof targetIdx === 'number' ? navigateTo(targetIdx) : nextScene()} 
              prevScene={prevScene} 
              currentChapter={currentSceneId + 1}
              isTransitioning={isTransitioning} 
            />
          </Suspense>
        </motion.div>
      </AnimatePresence>
      
      {/* Global Ambient Overlays */}
      <div className="global-vignette pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_70%,rgba(0,0,0,0.2)_100%)] z-40" />
    </div>
  );
}
