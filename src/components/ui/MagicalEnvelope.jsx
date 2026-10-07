import React, { useState } from 'react';
import '../../styles/Envelope.css';
import { soundEngine } from '../core/AudioController';
import { Sparkles, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const REASONS = [
  {
    title: "Namma Bond Eppavum Special 🌻",
    subtitle: "Enakku Kidaicha Family",
    body: "Blood relation illa naalum, nee enakku eppavume family dhaan. Eppo nee oru ordinary person-la irundhu en sister maadhiri aana nu enakke therila, but having you in my life is one of the most comforting blessings.",
    footer: "Blood illa... Bond irukku. 💛"
  },
  {
    title: "Un Kitta Mattum Dhaan Free-ah Pesa Mudiyum ✨",
    subtitle: "My Safe Place to Be Me",
    body: "No filters, no pretending. Random mokka jokes-la irundhu deep life conversations varaikkum, I can share anything with you without any hesitation or fear of being judged.",
    footer: "Unkitta pesinaale manasu calm aayidum."
  },
  {
    title: "You Care Without Expecting Anything 🌸",
    subtitle: "Thangamana Manasu",
    body: "In a world where people usually connect only when they need something, un kindness romba pure. Chinna chinna vishayathukkum nee kaatra care and warmth is so rare.",
    footer: "Never lose that gentle, golden heart."
  },
  {
    title: "Un Laughter-la Oru Magic Irukku 🎈",
    subtitle: "Instant Mood Booster",
    body: "Enna dhaan tension-aa irundhaalum, un teasing and siripu pathaale moththa stress-um fly aayidum. You have this beautiful gift to bring warmth and sunshine wherever you go.",
    footer: "Stay the same bright soul, always."
  },
  {
    title: "I'll Always Have Your Back 🛡️",
    subtitle: "Sister-ku Oru Annan",
    body: "Life-la enna dhaan changes vandhaalum, evlo per vandhu ponalum, always remember: you have a brother standing strong right beside you. To cheer your wins and protect your peace.",
    footer: "Eppavume un kooda naaney iruppen. 🤍"
  }
];

export default function MagicalEnvelope({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    soundEngine.playSparkleSound();
    setIsOpen(true);
  };

  const handleNext = () => {
    if (isSwapping) return;

    if (currentIndex === REASONS.length - 1) {
      soundEngine.playSparkleSound();
      if (onComplete) {
        onComplete();
      }
      return;
    }

    soundEngine.playSparkleSound();
    setIsSwapping(true);
    // 1. Slide card back into the envelope
    setIsOpen(false);

    // 2. Wait for it to hide inside, swap reason text, then slide back out
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsOpen(true);
      setIsSwapping(false);
    }, 620);
  };

  const handlePrev = () => {
    if (isSwapping || currentIndex === 0) return;

    soundEngine.playSparkleSound();
    setIsSwapping(true);
    setIsOpen(false);

    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setIsOpen(true);
      setIsSwapping(false);
    }, 620);
  };

  const handleClose = () => {
    soundEngine.playSparkleSound();
    setIsOpen(false);
  };

  return (
    <div className="envelope-scene-container select-none">
      
      {/* Instructions when sealed */}
      {!isOpen && (
        <div className="text-center mb-2 animate-bounce">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel text-xs font-display tracking-widest text-[#ffd700] border border-amber-300/40 shadow-[0_0_15px_rgba(255,215,0,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Tap The Wax Seal To Unfold
          </span>
        </div>
      )}

      {/* The 3D Master Envelope Wrapper */}
      <div className={`envelope-wrapper ${isOpen ? 'is-open' : ''}`}>
        
        {/* Layer 1 (Z-index 10): Back of envelope */}
        <div className="env-back" />

        {/* Layer 2 (Z-index 20): The Card that slides up */}
        <div className="env-card">
          <div className="card-content">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4>{REASONS[currentIndex].subtitle}</h4>
                <span className="text-[11px] font-display text-amber-800/60 tracking-wider">
                  {currentIndex + 1} of {REASONS.length}
                </span>
              </div>
              <h3>{REASONS[currentIndex].title}</h3>
            </div>

            <p>{REASONS[currentIndex].body}</p>

            <span className="card-footer">
              {REASONS[currentIndex].footer}
            </span>
          </div>
        </div>

        {/* Layer 3 (Z-index 30): Front Pocket Folds */}
        <div className="env-front-pocket" />

        {/* Layer 4 (Z-index 40): Top Flap (Hinged at top) */}
        <div 
          className="env-top-flap" 
          onClick={handleOpen} 
          title="Click to unseal envelope"
        />
        
        {/* Glowing wax seal on the flap */}
        <div 
          className="env-seal" 
          onClick={handleOpen}
          title="Unseal letter"
        >
          💛
        </div>

      </div>

      {/* Interactive Controls below Envelope */}
      {isOpen && (
        <div className="envelope-controls animate-[fadeIn_0.5s_ease-out]">
          
          {/* Card counter dots */}
          <div className="flex items-center gap-2 mb-1">
            {REASONS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? 'w-6 bg-[#ffd700] shadow-[0_0_10px_#ffd700]'
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            disabled={isSwapping}
            className="btn-envelope-action flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {currentIndex === REASONS.length - 1
                ? "Okay... enough emotions 😂 →"
                : "Next Reason →"}
            </span>
          </button>

          {/* Secondary controls */}
          <div className="flex items-center justify-between w-full px-2 text-xs text-amber-200/80">
            {currentIndex > 0 ? (
              <button
                onClick={handlePrev}
                disabled={isSwapping}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous Reason
              </button>
            ) : (
              <span />
            )}

            <button
              onClick={handleClose}
              disabled={isSwapping}
              className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-4 decoration-amber-300/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Fold into Envelope
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
