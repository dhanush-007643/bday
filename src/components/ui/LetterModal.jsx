import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import CinematicButton from './CinematicButton';
import { soundEngine } from '../core/AudioController';

export default function LetterModal({ isOpen, onClose, title = "Hey Nisha, 💛" }) {
  const [activePage, setActivePage] = useState(1);

  if (!isOpen) return null;

  const handleNextPage = () => {
    soundEngine.playSparkleSound();
    setActivePage(2);
  };

  const handlePrevPage = () => {
    soundEngine.playSparkleSound();
    setActivePage(1);
  };

  const handleClose = () => {
    soundEngine.playSparkleSound();
    setActivePage(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.4s_ease-out]">
      <div
        className="fairy-glass-letter animate-slide-up flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title="Fold letter"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Visual Block */}
        <div className="border-b border-white/15 pb-3 mb-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-amber-300 font-display">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> A Brother's Note
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-amber-200 mt-1 drop-shadow-[0_2px_12px_rgba(255,215,0,0.35)]">
            {title}
          </h2>
          <p className="font-script text-lg sm:text-xl text-amber-100/90 mt-0.5">
            "Written beneath the sunset lanterns"
          </p>
        </div>

        {/* Middle Visual Block: Tamil-English Message with pagination */}
        <div className="min-h-[190px] sm:min-h-[175px] flex flex-col justify-center">
          {activePage === 1 ? (
            <div key="modal-page-1" className="animate-page-fade space-y-3 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed">
              <p className="italic text-amber-200/95 font-medium">
                "Eppo nee just enakku therinja oru person-la irundhu en sister maadhiri aana nu enakke therila..."
              </p>
              <p>
                From random jokes and teasing each other to sharing thoughts without hesitation, having you in my life is one of the most comforting blessings I never saw coming.
              </p>
              <p>
                In a world that rushes so fast, you became someone I genuinely cherish, trust, and care for like real family.
              </p>
            </div>
          ) : (
            <div key="modal-page-2" className="animate-page-fade space-y-3 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed">
              <p>
                No matter where life takes us or how crazy things get, always remember you have a brother standing by your side—ready to cheer for your wins, listen when you need an ear, and protect your peace.
              </p>
              <p>
                Never lose that gentle, kind, and radiant heart of yours. May this upcoming year bring you endless laughter, peace, and every sweet wish you secretly dream of.
              </p>
            </div>
          )}
        </div>

        {/* Page Switcher (Strictly No Scrolling) */}
        <div className="flex items-center justify-between py-2 border-t border-white/10 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-amber-200/80 font-display">
            <span
              onClick={() => setActivePage(1)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activePage === 1 ? 'bg-amber-300 w-5 shadow-[0_0_8px_#ffd700]' : 'bg-white/30'
              }`}
            />
            <span
              onClick={() => setActivePage(2)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activePage === 2 ? 'bg-amber-300 w-5 shadow-[0_0_8px_#ffd700]' : 'bg-white/30'
              }`}
            />
            <span className="ml-1 text-[11px] tracking-wider">Page {activePage} of 2</span>
          </div>

          {activePage === 1 ? (
            <button
              onClick={handleNextPage}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-display text-amber-200 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Read Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handlePrevPage}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-display text-amber-200 transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>

        {/* Bottom Visual Block: Sign-off & Button */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <CinematicButton
            onClick={handleClose}
            icon="💛"
            className="w-full sm:w-auto"
          >
            Keep in Heart
          </CinematicButton>

          <div className="text-center sm:text-right">
            <p className="text-[11px] uppercase tracking-widest text-amber-300/80 font-display">
              With lots of love & care,
            </p>
            <p className="font-script text-2xl sm:text-3xl text-amber-200 drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
              — Your Brother ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
