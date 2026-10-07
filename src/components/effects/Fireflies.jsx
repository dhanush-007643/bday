import React, { useMemo } from 'react';

export default function Fireflies({ count = 35, className = '' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 8 + 6, // 6s to 14s
      delay: Math.random() * 5,
      blur: Math.random() > 0.5 ? '1px' : '0px',
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="firefly"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            filter: `blur(${p.blur}) drop-shadow(0 0 ${p.size * 2}px #ffd700)`,
            animation: `floatFirefly ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
