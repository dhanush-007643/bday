import React from 'react';

export default function CinematicButton({ children, onClick, disabled, icon, variant = 'gold', className = '' }) {
  const isSecondary = variant === 'secondary';

  const baseStyles = isSecondary
    ? `bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/95 border border-[#ffd700]/30 text-parchment hover:border-[#ffd700]/60 hover:text-white`
    : `bg-gradient-to-b from-[#b8860b] via-[#996515] to-[#704214] border border-[#ffd700] border-opacity-70 text-white`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative overflow-hidden
        px-8 py-3.5 rounded-xl cursor-pointer
        font-display text-base md:text-lg tracking-wider font-semibold
        shadow-[0_0_25px_rgba(255,215,0,0.25),inset_0_2px_4px_rgba(255,255,255,0.3)]
        transition-all duration-300 ease-out
        hover:shadow-[0_0_35px_rgba(255,215,0,0.5),inset_0_2px_6px_rgba(255,255,255,0.5)]
        hover:-translate-y-1 hover:brightness-110
        active:translate-y-0.5 active:shadow-[0_0_15px_rgba(255,215,0,0.3)]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        flex items-center justify-center gap-3 z-30
        backdrop-blur-sm
        ${baseStyles}
        ${className}
      `}
    >
      {/* Dynamic light streak reflection */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />

      {/* Subtle outer glow highlight ring */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-amber-400/20 via-yellow-200/40 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

      <span className="relative z-10 drop-shadow-md flex items-center gap-2">
        {children}
      </span>
      {icon && <span className="relative z-10 text-xl drop-shadow-md transition-transform duration-300 group-hover:scale-125">{icon}</span>}
    </button>
  );
}
