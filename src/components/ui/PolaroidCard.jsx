import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function PolaroidCard({
  memory,
  index,
  style,
  animationClass = 'swing-polaroid',
  onClick,
  active,
}) {
  const { title, date, excerpt, photo, caption } = memory;

  return (
    <div
      style={style}
      className={`absolute cursor-pointer transition-transform duration-300 z-20 ${animationClass} ${
        active ? 'scale-110 z-30' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      {/* Wooden Peg / Clothespin at Top Center */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3.5 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-xs shadow-md border border-amber-950/70 z-30">
        <div className="w-full h-1 bg-amber-600/50 mt-2 border-t border-b border-amber-950/40" />
      </div>

      {/* Hanging string / vine hint */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-amber-400/50 via-amber-200/40 to-transparent pointer-events-none" />

      {/* Polaroid Frame */}
      <div
        className={`w-28 sm:w-36 md:w-44 p-2 sm:p-2.5 pb-4 sm:pb-6 rounded-md bg-[#faf7f2] text-slate-800 shadow-[0_12px_30px_rgba(0,0,0,0.65)] border border-amber-100/60 transform transition-all duration-300 ${
          active
            ? 'ring-2 ring-[#ffd700] shadow-[0_0_25px_rgba(255,215,0,0.6)]'
            : 'hover:shadow-[0_0_20px_rgba(255,215,0,0.45)]'
        }`}
      >
        {/* Photo Image Area */}
        <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-slate-900 shadow-inner group">
          {photo ? (
            <img
              src={photo}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-amber-950/80 via-slate-900 to-amber-900/60 flex flex-col items-center justify-center p-2 text-center">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-200 mb-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-display uppercase tracking-widest text-amber-200/90 font-medium">
                {date}
              </span>
            </div>
          )}

          {/* Golden Ambient Glint on Hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Polaroid Handwritten Caption */}
        <div className="mt-2 text-center px-1">
          <p className="font-script text-base sm:text-lg text-slate-900 font-bold leading-tight truncate">
            {caption || title}
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] font-display text-amber-800/80 uppercase tracking-wider mt-0.5">
            <Heart className="w-2.5 h-2.5 fill-amber-700/60 text-amber-700/60" />
            <span>Tap to open</span>
          </div>
        </div>
      </div>
    </div>
  );
}
