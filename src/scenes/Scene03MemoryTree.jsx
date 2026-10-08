import React, { useState } from 'react';
import ParallaxEnvironment from '../components/effects/ParallaxEnvironment';
import CinematicButton from '../components/ui/CinematicButton';
import PolaroidCard from '../components/ui/PolaroidCard';
import bgMemoryTreeSunset from '../assets/scenery/memory_tree_sunset.jpg';
import { soundEngine } from '../components/core/AudioController';
import { ArrowLeft, Sparkles, X, Heart, Calendar } from 'lucide-react';

import photo1 from '../assets/photos/photo1.jpg';
import photo2 from '../assets/photos/photo2.jpg';
import photo3 from '../assets/photos/photo3.jpg';
import photo4 from '../assets/photos/photo4.jpg';
import photo5 from '../assets/photos/photo5.jpg';

const MEMORIES = [
  {
    id: 1,
    title: "Everyday Magic & Fun",
    date: "Memory I",
    caption: "Silly smiles & good times",
    photo: photo1,
    objectPosition: 'center 4%', // Perfectly shows their full hair, faces, and smiles without cropping
    excerpt: "Casual hangouts, spontaneous laughter, and turning everyday outings into memorable adventures.",
    fullNote: "So,idhu dhaan namma first edutha photo... namma rendu perum mattum thaniya edutha first photo. ❤️ Appo idhu ivlo special-aagum nu enakku konjam kooda idea illa. Summa random-ah edutha oru photo dhaan. 😂 Appo enakku theriyadhu, nee en life-la ivlo close-ah aagapora nu. Epdi friendship start aachu, epdi nee enakku thangachi aana nu kooda enakku nyabagam illa. Aana ippo indha photo-va paakumbodhu romba special-ah feel aagudhu. 🥹💛",
    desktopPos: { top: '21%', left: '8%', transform: 'rotate(-3deg)' },
    animationClass: 'swing-polaroid',
  },
  {
    id: 2,
    title: "Laughter in Full Bloom",
    date: "Memory II",
    caption: "Unstoppable smiles",
    photo: photo2,
    objectPosition: 'center 20%', // Frames their faces with the bougainvillea flowers
    excerpt: "Under the blooming bougainvillea, sharing inside jokes that only the two of us understand.",
    fullNote: "So, indha photo edhuku vandhuchu nu enakke theriyala... summa random-ah eduthadhu dhaan. 😂 Aana indha photo edukkuradhukku romba kashtapattom. Nee enna paathu siricha, naan unna paathu sirichen, rendu perum sirichite irundhom. 😂😂 Romba neram try panni, finally indha photo-va eduthom. Appo summa oru random photo maari dhaan irundhuchu... aana ippo paakumbodhu andha moment-e nenachu sirikka thonudhu.",
    desktopPos: { top: '26%', left: '26%', transform: 'rotate(2deg)' },
    animationClass: 'swing-polaroid-slow',
  },
  {
    id: 3,
    title: "Partners in Crime",
    date: "Memory III",
    caption: "Bunny ears & goofy vibes",
    photo: photo3,
    objectPosition: 'center 14%', // Keeps bunny ears & peace signs fully in frame
    excerpt: "Flashing peace signs, goofy poses, and unmatched sibling energy.",
    fullNote: "Actually, idhu oru cute photo. Namma rendu perum thaniya edutha proper-ah, azhagana photo. ❤️ Idhu enoda second favourite photo. Actually, un kooda serndhu edutha proper-ah irukkura first photos-la idhuvum onnu. Appo summa oru photo maari dhaan irundhuchu... aana ippo paakumbodhu romba special-ah feel aagudhu.",
    desktopPos: { top: '32%', left: '44%', transform: 'rotate(-2deg)' },
    animationClass: 'swing-polaroid-gentle',
  },
  {
    id: 4,
    title: "The Birthday Star",
    date: "Memory IV",
    caption: "Grace & glowing heart",
    photo: photo4,
    objectPosition: 'center 12%', // Beautifully frames her face, hair, and red roses bouquet
    excerpt: "Holding red roses with that quiet, radiant smile that brings joy to everyone around you.",
    fullNote: "Actually, indha photo-la nee romba azhaga irukka. ❤️",
    desktopPos: { top: '22%', left: '62%', transform: 'rotate(3deg)' },
    animationClass: 'swing-polaroid',
  },
  {
    id: 5,
    title: "Always In Your Corner",
    date: "Memory V",
    caption: "Side by side, forever",
    photo: photo5,
    objectPosition: 'center 14%', // Elegantly frames their faces and traditional attire
    excerpt: "Dressed in tradition, rooted in love, and standing tall through every chapter of life.",
    fullNote: "Aahh, ippo purinjiduchu 😄❤️ Nee sollradhu indha photo-va naan use panradhu, indha photo-la namma rendu perum proper-ah anna-thangachi maari theriyrom nu.",
    desktopPos: { top: '27%', left: '79%', transform: 'rotate(-3deg)' },
    animationClass: 'swing-polaroid-slow',
  },
];

export default function Scene03MemoryTree({ nextScene, prevScene, currentChapter = 3, isTransitioning }) {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const handleSelect = (mem) => {
    soundEngine.playSparkleSound();
    setSelectedMemory(mem);
  };

  const handleCloseModal = () => {
    soundEngine.playSparkleSound();
    setSelectedMemory(null);
  };

  return (
    <ParallaxEnvironment background={bgMemoryTreeSunset}>
      {/* Container enforcing Layer 0 to 4 architecture */}
      <div className="w-full h-full relative select-none flex flex-col justify-between py-5 md:py-8 px-4 sm:px-8">

        {/* Layer 3: UI Header Overlay */}
        <div className="relative z-30 text-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel text-xs font-display tracking-widest text-[#ffd700] mb-1.5 border border-amber-300/30">
            <Sparkles className="w-3.5 h-3.5" /> Chapter {currentChapter} • Memory Tree
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            Lanterns of Memory
          </h2>
          <p className="text-xs sm:text-sm text-parchment/90 font-light drop-shadow max-w-lg mx-auto">
            Touch each hanging polaroid along the branches to illuminate a cherished chapter of our journey.
          </p>
        </div>

        {/* Layer 2: The Polaroids (Desktop: Mapped onto Tree Branches; Mobile: Responsive Reel) */}
        {/* Desktop View (>= 1024px) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-auto z-20">
          {MEMORIES.map((mem, idx) => (
            <PolaroidCard
              key={mem.id}
              memory={mem}
              index={idx}
              style={mem.desktopPos}
              animationClass={mem.animationClass}
              active={selectedMemory?.id === mem.id}
              onClick={() => handleSelect(mem)}
            />
          ))}
        </div>

        {/* Tablet & Mobile View (< 1024px) */}
        <div className="lg:hidden relative z-20 my-auto w-full overflow-x-auto custom-parchment-scroll py-6 px-2">
          <div className="flex items-center gap-4 sm:gap-6 min-w-max mx-auto px-4 justify-center">
            {MEMORIES.map((mem, idx) => (
              <div
                key={mem.id}
                onClick={() => handleSelect(mem)}
                className={`relative cursor-pointer transition-transform duration-300 ${mem.animationClass} ${selectedMemory?.id === mem.id ? 'scale-105' : 'hover:scale-102'
                  }`}
              >
                {/* Clothespin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-b from-[#c69255] to-[#a06a36] rounded-xs shadow z-30 border border-[#7a4c1c]/60" />
                <div className="w-36 sm:w-44 p-2 pb-4 rounded-md bg-[#faf7f2] text-slate-800 shadow-xl border border-amber-200/50">
                  <div className="aspect-square bg-slate-900 rounded-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={mem.photo}
                      alt={mem.title}
                      style={{ objectPosition: mem.objectPosition || 'center 15%' }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-script text-base text-slate-900 font-bold text-center mt-2 truncate">
                    {mem.caption}
                  </p>
                  <p className="text-[10px] font-display text-amber-900/70 text-center uppercase tracking-wider">
                    {mem.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3: Cinematic Memory Viewer Modal */}
        {selectedMemory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
            onClick={handleCloseModal}
          >
            <div
              className="fairy-glass-letter max-w-lg w-full animate-slide-up relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
                title="Close Memory"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Memory Photo Preview in Modal */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-amber-300/30 shadow-2xl bg-black/40">
                <img
                  src={selectedMemory.photo}
                  alt={selectedMemory.title}
                  style={{ objectPosition: selectedMemory.objectPosition || 'center 15%' }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-xs font-display text-amber-200 tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-amber-300/30">
                  {selectedMemory.date}
                </span>
              </div>

              {/* Memory Modal Header */}
              <div className="border-b border-white/15 pb-3 mb-3">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-amber-200">
                  {selectedMemory.title}
                </h3>
                <p className="font-script text-lg text-amber-100/90 mt-0.5">
                  "{selectedMemory.caption}"
                </p>
              </div>

              {/* Memory Note Body */}
              <div className="space-y-3 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed py-1">
                <p className="italic text-amber-200/90">
                  {selectedMemory.excerpt}
                </p>
                <p className="leading-relaxed">
                  "{selectedMemory.fullNote}"
                </p>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs text-amber-200/70 font-display flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> Nisha's Memory Tree
                </span>

                <button
                  onClick={handleCloseModal}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-display font-bold text-xs tracking-wider shadow hover:scale-105 transition-transform cursor-pointer"
                >
                  Return to Tree
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Layer 3: Bottom Navigation Bar */}
        <div className="relative z-30 flex items-center justify-between px-2 sm:px-6 pointer-events-auto">
          <button
            onClick={prevScene}
            disabled={isTransitioning}
            className="glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-display text-xs sm:text-sm tracking-wider text-parchment/80 hover:text-white hover:border-[#ffd700]/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Welcome
          </button>

          <CinematicButton
            onClick={nextScene}
            disabled={isTransitioning}
            icon="💌"
          >
            Read Special Letter
          </CinematicButton>
        </div>

      </div>
    </ParallaxEnvironment>
  );
}
