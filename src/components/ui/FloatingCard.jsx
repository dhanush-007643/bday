import React from 'react';
import { Sparkles } from 'lucide-react';

export default function FloatingCard({ title, date, excerpt, icon, onClick, active, number }) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer
        glass-panel rounded-2xl p-5 md:p-6
        transition-all duration-500 ease-out
        transform hover:-translate-y-2 hover:scale-105
        ${active ? 'border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.5)] scale-105 bg-slate-900/80' : 'hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.25)]'}
      `}
    >
      {/* Lantern suspension string visual */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-[#ffd700]/70 to-[#b8860b]/40 pointer-events-none" />

      {/* Floating lantern glow orb */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 flex items-center justify-center text-slate-950 font-display font-bold shadow-[0_0_12px_#ffd700] group-hover:rotate-12 transition-transform duration-300">
          {number}
        </div>
        <span className="text-xs uppercase tracking-widest text-[#ffd700]/80 font-display flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#ffd700]" /> {date}
        </span>
      </div>

      <h3 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-[#ffd700] transition-colors mb-2">
        {title}
      </h3>

      <p className="font-body text-sm text-gray-300 line-clamp-3 leading-relaxed">
        {excerpt}
      </p>

      {/* Subtle indicator */}
      <div className="mt-4 pt-3 border-t border-amber-300/10 flex items-center justify-between text-xs text-amber-200/80 font-display">
        <span>Touch to illuminate</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
}
