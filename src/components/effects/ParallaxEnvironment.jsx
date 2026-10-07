import React, { useState, useEffect } from 'react';
import Fireflies from './Fireflies';

export default function ParallaxEnvironment({
  background,
  midground,
  foreground,
  panda,
  overlayColor = 'rgba(10, 20, 35, 0.25)',
  children,
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="scene-container select-none">
      {/* Layer 0: Base / Sky / Scenery (Brighter & vivid) */}
      {background && (
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url(${background})`,
            filter: 'brightness(1.12) contrast(1.04) saturate(1.08)',
            transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -8}px) scale(1.06)`,
          }}
        />
      )}

      {/* Ambient lighting tint (Soft luminous glow instead of dark multiply) */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 235, 180, 0.08) 0%, transparent 80%)',
        }}
      />

      {/* Layer 1: Midground (Trees/Environment) if provided */}
      {midground && (
        <div
          className="absolute inset-0 bg-cover bg-center z-10 scale-105 pointer-events-none transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url(${midground})`,
            transform: `translate(${mousePos.x * -22}px, ${mousePos.y * -14}px)`,
          }}
        />
      )}

      {/* Layer 2: Ambient Fireflies */}
      <Fireflies count={45} className="z-15" />

      {/* Layer 3: Realistic Panda if provided as separate layer */}
      {panda && (
        <div
          className="absolute bottom-8 left-10 w-80 md:w-96 h-80 md:h-96 bg-contain bg-no-repeat z-20 panda-breathe pointer-events-none transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url(${panda})`,
            transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -15}px)`,
          }}
        />
      )}

      {/* Layer 4: Content / Interactive UI */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center p-6 md:p-12">
        {children}
      </div>

      {/* Layer 5: Foreground Flowers/Sunflowers if provided */}
      {foreground && (
        <div
          className="absolute -bottom-10 -left-10 -right-10 h-64 bg-cover bg-top z-40 pointer-events-none drop-shadow-2xl transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url(${foreground})`,
            filter: 'blur(2px)',
            transform: `translate(${mousePos.x * -55}px, ${mousePos.y * -25}px)`,
          }}
        />
      )}

      {/* Ambient Soft Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_70%,rgba(0,0,0,0.22)_100%)] z-40" />
    </div>
  );
}
