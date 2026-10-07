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
  const { title, date, excerpt, photo, caption, objectPosition } = memory;

  return (
    <div
      style={style}
      className={`absolute cursor-pointer transition-transform duration-300 z-20 ${animationClass} ${
        active ? 'scale-110 z-30' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      {/* Hanging twine string to tree branch */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-[1.5px] h-12 bg-gradient-to-b from-amber-200/60 via-amber-300/40 to-amber-600/70 pointer-events-none shadow-[0_0_4px_rgba(255,215,0,0.3)]" />

      {/* Realistic Wooden Clothespin at Top Center */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6.5 z-30 pointer-events-none drop-shadow-md">
        <div className="w-full h-full bg-gradient-to-b from-[#c69255] via-[#dfad76] to-[#a06a36] rounded-xs relative border border-[#7a4c1c]/70 shadow-sm flex flex-col items-center">
          {/* Metallic spring hinge clip */}
          <div className="absolute top-[38%] w-[115%] h-[2.5px] bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 rounded-full shadow-xs border-y border-slate-600/70" />
          {/* Bottom clamping shadow */}
          <div className="absolute bottom-0 w-[2px] h-1.5 bg-[#54320e]/80" />
        </div>
      </div>

      {/* Polaroid Frame */}
      <div
        className={`w-32 sm:w-40 md:w-48 p-2.5 sm:p-3 pb-5 sm:pb-7 rounded-md bg-[#faf7f2] text-slate-800 shadow-[0_12px_32px_rgba(0,0,0,0.7)] border border-amber-100/70 transform transition-all duration-300 ${
          active
            ? 'ring-2 ring-[#ffd700] shadow-[0_0_28px_rgba(255,215,0,0.65)]'
            : 'hover:shadow-[0_0_22px_rgba(255,215,0,0.45)]'
        }`}
      >
        {/* Photo Image Area */}
        <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-slate-900 shadow-inner group">
          {photo ? (
            <img
              src={photo}
              alt={title}
              style={{ objectPosition: objectPosition || 'center 15%' }}
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
        <div className="mt-2.5 text-center px-1">
          <p className="font-script text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-tight truncate">
            {caption || title}
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-display text-amber-800/80 uppercase tracking-wider mt-1">
            <Heart className="w-2.5 h-2.5 fill-amber-700/60 text-amber-700/60" />
            <span>Tap to open</span>
          </div>
        </div>
      </div>
    </div>
  );
}
