import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, ChevronLeft, BookOpen, ScrollText } from 'lucide-react';
import CinematicButton from './CinematicButton';
import { soundEngine } from '../core/AudioController';

const PAGES = [
  {
    pageNumber: 1,
    title: "Happy Birthday Rajamathaaaaa 👑😂",
    paragraphs: [
      `Hello Rajamathaaaaa 👑😂 epadi irukiga? And many many many many many many moreeeeeeeeee happy birthdayyyy birthday girl! 🎂🥳💛 May God bless you always, nalla sapidu, enjoy pannu, always happy-ah iru. Unakku pidichatha sei, yaarukkaagavum un azhagana character-ah change pannikaadha. Ena na, nee dhan na paatha oru good, kind-hearted and pure soul. Adha eppavume maathikaadha. 💛🌻`,
      `Next, idhu en birthday gift nu solla mudiyadhu... hmm birthday wish nu sollalam. Ella perum wish panra maari simple-ah wish pannaama, enoda kutty azhagana thangachikku konjam spl-ah wish pannanum nu aasapattEn. 😂💛 Oru anna-ah, enala mudinja alavukku unakku oru periya message panni, enna sollanum nu aasapattadhellam sollanum nu ninaichen. Insta-la illa WhatsApp-la simple-ah solli mudikka mudiyadhu. Adhanala dhaan indha website. 🌻 Unna pathi solla aarambichaa oru end-e kedaiyaadhu. Namma relationship, namma brother-sister bond-kum oru end nu onnum illa. Adhanala naan solla ninaikkura sila chinna vishayangala idhula solli irukken. I think unakku pidikkum nu ninaikkuren. Unakku idhu pidikkuma, naan sonnadhu unakku pidikkuma nu full-ah theriyala... aana enakku therinja Nisha-va vachu, enakku thonunadha vachu, enala mudinja alavukku idha pannirukken. 💛 Ethavathu kurai irundha sorry. Happy birthday my kutty thangachi! 🐼🌻💛`
    ]
  },
  {
    pageNumber: 2,
    title: "Sorry & Nandri 🥺💛",
    paragraphs: [
      `Next rendu vishyam naan sollanum — onu sorry, innonu thanks. Sorry naan unkitta neraya vaati sollirukken, but irundhaalum ippo thiruppiyum soldren... SOOOOORRRRRYYYYYYYY Rajamathaaaaa! 🥺💛 Sila time naan unna hurt panniruppen, adhuku sorry. Suppose indha website unakku satisfy aagala na sorry, un aasaiya neravetha mudiyala na sorry, oru anna-va naan sariyaa irukkala na sorry, lunch sapidaama irundha adhukkum sorry, un pecha kekama irundha adhukkum sorry. Very very very sorry. 🥺 Naan enime apdi pannaama irukka try panren. Oru anna iruppen... aana lunch mattum sapiduva nu promise panna mudiyuma nu theriyala 😂 but kandippa try panren! 😭😂`,
      `Thanks for being my **most beautiful, gorgeous, azhagana, arivana kutty thangachi**. 💛🌻 Enna unakke theriyum... 😌 And thanks for being the **angel in my life**. Nee en blood relation illa; aana en heart-ku romba close. Unexpected-ah en life-la vandha oru friend, aana konjam konjam-ah enakku oru angel-a aayitta, and ippo enakku nee en **thangachi**. 💛 Nee en life-la irukkura ella azhagana moments-layum irukka, andha moments-ah innum special-ah maathura. Naan evlo down-ah irundhaalum, sometimes depression-la irundhaalum, unna paakumbodhu enakku oru positive vibe varum, en mindset-e maari pogum. Nee eppavume enakku supportive-ah irundhu, motivate panni, enakku confidence kuduppa. Adhukku naan unakku **romba romba romba nandri**, my kutty thangachi. 🥺💛 Nee en life-ku vandhadhu oru coincidence-ah irundhaalum, ippo nee enakku kedacha **oru beautiful blessing**. 🌻🐼✨`
    ]
  },
  {
    pageNumber: 3,
    title: "En Life-la 3 Special Characters ❤️",
    paragraphs: [
      `Nee en kooda irukkum pothu, enakku irukkura evlo kashtama irundhaalum konjam konjam-ah marandhuruven. 💛 Life-la sila female characters dhaan romba romba special-ah irupaanga; avanga enakku evlo important nu words-la sollave mudiyadhu. Avangalukkaaga enna venaalum panna thonum. En life-la enakku **3 female characters** romba special — **enga Amma, Varsha Akka, and nee**. ❤️ Ungal moonu perum en life-la irukkura varaikkum, enakku oru periya strength irukku nu feel panren. Ungalukkaga ennaala mudinja alavukku eppavume support-ah iruppen, unga happiness-ku ennaala mudinja ellame pannuven. Nee enakku blood relation illa naalum, en heart-ku ivlo close-ah aayitta. Adhanala dhaan nee enakku just oru friend illa, **enoda kutty thangachi**. 🥺💛 Ungal moonu perum en life-la irukkuradhu enakku kidaicha periya blessing. 🌻✨`,
      `Enakku oru aasai irukku... unkitaiyum Varsha Akka kitaiyum naan idha sollanum nu romba naala ninaichen. Oru naal nee kalyanam panni oru azhagana paiyan kuzhandhaiya petukkanum, Varsha Akka kalyanam panni oru azhagana ponnu kuzhandhaiya petukkanum nu enakku aasai. 🥹❤️ Andha rendu kutty pasangalum en life-la vandha, avangaloda naan neraya neram spend pannanum, avangala veliya kootitu poganum, avanga kooda vilaiyadanum, avanga kooda enjoy pannanum, avanga valaruradha paakanum nu aasai. Un paiyan kooda naan time spend pannitu, Varsha Akka ponna kooda nalla enjoy pannitu, rendu peraiyum enoda kutty pasanga maari paathukanum nu aasai. 😂❤️ Oru naal namma ellarum serndhu veliya poi, pesi, sirichu, vilayadi, memories create pannanum. Idhu edhuvum expectation illa... enakku irukkura oru cute future dream mattum. 🥹🌻 Andha naal varuma varaadha nu theriyadhu, aana ippove ninaicha romba happy-ah irukku. Enakku romba special-ah irukkura rendu peroda future happiness-ah naan pakkathula irundhu enjoy pannanum nu aasai. 💛`,
      `Actually, naan yarukkum ivlo effort pottu, ivlo different-ah edhuvum panna maaten. Aana ungalukku mattum idhellam pannanum nu thonuchu. Neeum Varsha Akka-vum enakku romba pidichavanga, ennai value pannavanga. Enakku neraya pasanga friendship irundhaalum, female friendship nu varumbodhu ippadi oru bond en life-la irukkum nu naan nenachadhe illa. Aana neenga rendu perum dhaan ennai different-ah feel panna vechinga. Adhanala dhaan oru beautiful brother-sister relation form aachu. Adhuku naan ungalukku romba romba thanks sollanum. ❤️`
    ]
  },
  {
    pageNumber: 4,
    title: "How It All Started 🌻",
    paragraphs: [
      `Un kooda epadi friendship start aachu nu enakke nyabagam illa. Epadi nee enakku thangachi aana nu kooda enakku nyabagam illa. 😂 Adhe maari, namma bond ivlo strong-ah aagum nu naan eppavume yosichu paathadhu illa. It just happened. Konjam konjam-ah friendship, apram closeness, apram care, apram nee enakku kutty thangachi aayitta. 💛`,
      `Actually, en kitta innum neraya solla irukku. Aana adhellam words-la easy-ah solla mudiyadhu. Adhu just words illa; adhu feelings, emotions, memories. Adha explain panna mudiyama, feel mattum panna mudiyum. Naan un mela vechirukkura care-um, namma bond enakku evlo special nu irukkuradhum, indha oru message-la full-ah solla mudiyadhu. 🥺🌻`
    ]
  },
  {
    pageNumber: 5,
    title: "Happy Birthday Cutie! 🎂🐼🌻",
    paragraphs: [
      `Birthday-ku munadi unkitta seriya pesa mudiyala, because indha website-a complete panna busy-ah irundhen. 😂 Adhuku sorry kuttythangachi. Unakku theriyama idhellam pannitu irundhadhu un birthday-ku oru small surprise kudukkanum nu dhaan. 💛`,
      `So once again, HAPPY BIRTHDAY MY KUTTY THANGACHI! 🎂🐼🌻 Unakku oru beautiful life kidaikkanum, always happy-ah irukkanum, un dreams ellam achieve pannanum, un smile eppavume apdiye irukkanum. May God bless you with everything you deserve. ❤️✨`,
      `Ippo enough emotions... 😂\nNext — CAKE CUT PANUNGA! 🎂🥳💛`
    ]
  }
];

function formatLetterText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={index}
          className="font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function LetterModal({ isOpen, onClose }) {
  const [activePage, setActivePage] = useState(1);
  const [isFullView, setIsFullView] = useState(false);

  if (!isOpen) return null;

  const handleNextPage = () => {
    soundEngine.playSparkleSound();
    setActivePage((prev) => Math.min(prev + 1, PAGES.length));
  };

  const handlePrevPage = () => {
    soundEngine.playSparkleSound();
    setActivePage((prev) => Math.max(prev - 1, 1));
  };

  const handleClose = () => {
    soundEngine.playSparkleSound();
    setActivePage(1);
    setIsFullView(false);
    onClose();
  };

  const toggleViewMode = () => {
    soundEngine.playSparkleSound();
    setIsFullView(!isFullView);
  };

  const currentPageData = PAGES[activePage - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md animate-[fadeIn_0.35s_ease-out]">
      <div
        className="fairy-glass-letter animate-slide-up flex flex-col justify-between max-w-2xl w-full max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
          title="Close letter"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Visual Block */}
        <div className="border-b border-white/15 pb-3 mb-3 pr-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-amber-300 font-display">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> A Brother's Note
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] text-amber-200 transition-all cursor-pointer font-display"
              >
                {isFullView ? (
                  <>
                    <BookOpen className="w-3 h-3 text-amber-300" />
                    <span>Flip Pages</span>
                  </>
                ) : (
                  <>
                    <ScrollText className="w-3 h-3 text-amber-300" />
                    <span>Read All</span>
                  </>
                )}
              </button>

              {!isFullView && (
                <div className="flex items-center gap-1 text-xs text-amber-200/80 font-display">
                  {PAGES.map((p) => (
                    <span
                      key={p.pageNumber}
                      onClick={() => {
                        soundEngine.playSparkleSound();
                        setActivePage(p.pageNumber);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activePage === p.pageNumber
                          ? 'bg-amber-300 w-4 shadow-[0_0_8px_#ffd700]'
                          : 'bg-white/30 hover:bg-white/60 w-1.5'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-[10px] tracking-wider">
                    {activePage}/{PAGES.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-bold text-amber-200 mt-1.5 drop-shadow-[0_2px_12px_rgba(255,215,0,0.35)]">
            Hello Rajamathaaaaa 👑😂
          </h2>
          <p className="font-script text-base text-amber-100/90 mt-0.5">
            "Written beneath the sunset lanterns for my kutty thangachi"
          </p>
        </div>

        {/* Middle Visual Block */}
        <div className="h-[44vh] sm:h-[42vh] overflow-y-auto custom-letter-scrollbar pr-2 flex flex-col">
          {isFullView ? (
            <div className="space-y-4 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed py-1">
              {PAGES.map((page) =>
                page.paragraphs.map((para, idx) => (
                  <p key={`${page.pageNumber}-${idx}`} className="whitespace-pre-line leading-relaxed">
                    {formatLetterText(para)}
                  </p>
                ))
              )}
            </div>
          ) : (
            <div
              key={`modal-page-${activePage}`}
              className="animate-[fadeIn_0.35s_ease-out] space-y-3 font-body font-normal text-white/95 text-sm sm:text-base leading-relaxed py-1"
            >
              {currentPageData.paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line leading-relaxed">
                  {formatLetterText(para)}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Page Switcher */}
        {!isFullView && (
          <div className="flex items-center justify-between py-2 border-t border-white/10 mt-2">
            {activePage > 1 ? (
              <button
                onClick={handlePrevPage}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-display text-amber-200 transition-all hover:scale-105 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            {activePage < PAGES.length ? (
              <button
                onClick={handleNextPage}
                className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/30 text-xs font-display text-amber-200 transition-all hover:scale-105 cursor-pointer shadow-[0_0_12px_rgba(255,215,0,0.2)]"
              >
                <span>Read Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs text-amber-300/80 font-display">End of Letter 💛</span>
            )}
          </div>
        )}

        {/* Bottom Visual Block: Sign-off & Button */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
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
              — Your Anna ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
