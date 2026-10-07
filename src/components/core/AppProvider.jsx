import React, { createContext, useContext, useState } from 'react';
import { soundEngine } from './AudioController';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentSceneId, setCurrentSceneId] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishes, setWishes] = useState([
    "Endless laughter and quiet warm days",
    "Adventures full of light, blooming sunflowers, and gentle peace",
    "May every tomorrow be kinder than yesterday"
  ]);
  const [unlockedMemories, setUnlockedMemories] = useState([0]);
  const [activeLetter, setActiveLetter] = useState(null);

  const navigateTo = (sceneIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    soundEngine.playSparkleSound();
    setCurrentSceneId(sceneIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1400);
  };

  const nextScene = () => navigateTo(currentSceneId + 1);
  const prevScene = () => navigateTo(currentSceneId - 1);

  const addWish = (wishText) => {
    if (!wishText.trim()) return;
    setWishes((prev) => [wishText.trim(), ...prev]);
    soundEngine.playSparkleSound();
  };

  const unlockMemory = (id) => {
    if (!unlockedMemories.includes(id)) {
      setUnlockedMemories((prev) => [...prev, id]);
      soundEngine.playSparkleSound();
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentSceneId,
        setCurrentSceneId,
        isTransitioning,
        navigateTo,
        nextScene,
        prevScene,
        candlesBlown,
        setCandlesBlown,
        wishes,
        addWish,
        unlockedMemories,
        unlockMemory,
        activeLetter,
        setActiveLetter,
        soundEngine,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
