import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack, Music, Sparkles, Upload } from 'lucide-react';

// Web Audio API ambient sound engine + Multi-Track Half-Song Playlist Player
class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.timer = null;
    this.notes = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
    ];
    this.step = 0;
    this.baseGain = 0.18;

    // Multi-track Playlist Engine
    this.audioElement = null;
    this.isCustomAudioReady = false;
    this.baseMusicVolume = 0.65;
    this.volumeMultiplier = 1.0;
    this.fadeInterval = null;

    // Half-song mode enabled by default (plays 50% of each song then advances)
    this.playMode = 'half'; // 'half' | 'full'
    this.isFadingToNext = false;

    // Default 3-track playlist sequence
    this.playlist = [
      { id: 1, title: 'Song 1', src: '/assets/audio/song1.mp3' },
      { id: 2, title: 'Song 2', src: '/assets/audio/song2.mp3' },
      { id: 3, title: 'Song 3', src: '/assets/audio/song3.mp3' },
    ];
    this.currentIndex = 0;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((cb) =>
      cb({
        isPlaying: this.isPlaying,
        isCustom: this.isCustomAudioReady,
        currentIndex: this.currentIndex,
        totalTracks: this.playlist.length,
        currentTrackTitle:
          this.playlist[this.currentIndex]?.title || 'Ambient Melody',
        playMode: this.playMode,
      })
    );
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.baseGain, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.audioElement) {
      this.initAudioElement();
    }
  }

  initAudioElement() {
    const audio = new Audio();
    audio.preload = 'auto';

    // If song plays till the end (in 'full' mode)
    audio.onended = () => {
      this.nextTrack(true);
    };

    // Half-song detection: monitor playback time and crossfade at 50%
    audio.ontimeupdate = () => {
      if (!this.isPlaying || !this.isCustomAudioReady) return;
      const duration = audio.duration;
      if (!duration || !isFinite(duration) || duration <= 0) return;

      if (this.playMode === 'half') {
        const halfTime = duration * 0.5;
        const fadeDuration = Math.min(2.0, halfTime * 0.15);
        const fadeStartTime = Math.max(0, halfTime - fadeDuration);

        // When approaching the halfway mark, start a smooth 2-second fade out
        if (audio.currentTime >= fadeStartTime && !this.isFadingToNext) {
          this.isFadingToNext = true;
          this.fadeVolume(0, fadeDuration * 1000);
        }

        // When reaching the exact halfway point, transition to next song!
        if (audio.currentTime >= halfTime) {
          this.nextTrack(true);
        }
      }
    };

    audio.oncanplay = () => {
      this.isCustomAudioReady = true;
      this.notify();

      if (this.isPlaying) {
        this.stopMelodyLoop();
        audio.play().catch(() => {});
      }
    };

    audio.onerror = () => {
      // If song1 doesn't exist, check if bgm.mp3 exists as a single fallback
      if (this.currentIndex === 0 && this.playlist[0].src === '/assets/audio/song1.mp3') {
        const fallbackAudio = new Audio();
        fallbackAudio.src = '/assets/audio/bgm.mp3';
        fallbackAudio.oncanplay = () => {
          this.playlist[0] = { id: 1, title: 'Song 1', src: '/assets/audio/bgm.mp3' };
          audio.src = '/assets/audio/bgm.mp3';
          this.isCustomAudioReady = true;
          this.notify();
          if (this.isPlaying) {
            this.stopMelodyLoop();
            audio.play().catch(() => {});
          }
        };
        fallbackAudio.onerror = () => {
          this.isCustomAudioReady = false;
          this.notify();
        };
        return;
      }
      this.isCustomAudioReady = false;
      this.notify();
    };

    this.audioElement = audio;
    this.loadCurrentTrack(false);
  }

  loadCurrentTrack(autoPlay = false) {
    if (!this.audioElement || this.playlist.length === 0) return;
    this.isFadingToNext = false;
    const track = this.playlist[this.currentIndex];
    this.audioElement.src = track.src;

    if (autoPlay || this.isPlaying) {
      this.stopMelodyLoop();
      this.isPlaying = true;
      // Soft start and fade in to target volume over 1s
      this.audioElement.volume = 0.05;
      this.audioElement
        .play()
        .then(() => {
          this.fadeVolume(1.0, 1000);
        })
        .catch(() => {
          this.startMelodyLoop();
        });
    } else {
      this.audioElement.volume = this.baseMusicVolume * this.volumeMultiplier;
    }
    this.notify();
  }

  nextTrack(autoPlay = true) {
    if (this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.loadCurrentTrack(autoPlay || this.isPlaying);
  }

  prevTrack(autoPlay = true) {
    if (this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadCurrentTrack(autoPlay || this.isPlaying);
  }

  setPlaylistFromFiles(fileList) {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    this.playlist = files.map((file, idx) => ({
      id: idx + 1,
      title: file.name.replace(/\.[^/.]+$/, ''),
      src: URL.createObjectURL(file),
    }));

    this.currentIndex = 0;
    this.isCustomAudioReady = true;
    this.loadCurrentTrack(true);
  }

  togglePlayMode() {
    this.playMode = this.playMode === 'half' ? 'full' : 'half';
    this.isFadingToNext = false;
    this.notify();
    return this.playMode;
  }

  fadeVolume(targetMultiplier, durationMs = 1000) {
    this.init();
    this.volumeMultiplier = Math.max(0, Math.min(1, targetMultiplier));

    // 1. Fade Master Gain for Web Audio synth & SFX
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      const targetGain = this.volumeMultiplier * this.baseGain;
      try {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(targetGain, now + Math.max(0.05, durationMs / 1000));
      } catch {
        this.masterGain.gain.value = targetGain;
      }
    }

    // 2. Smoothly ramp HTML5 Audio element volume
    if (this.audioElement) {
      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
      }

      const targetAudioVol = this.baseMusicVolume * this.volumeMultiplier;
      const startAudioVol = this.audioElement.volume;
      const startTime = performance.now();

      this.fadeInterval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        this.audioElement.volume = Math.max(0, Math.min(1, startAudioVol + (targetAudioVol - startAudioVol) * progress));

        if (progress >= 1) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }, 30);
    }
  }

  playChime(freq, duration = 2.5, timeOffset = 0) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  playSparkleSound() {
    this.init();
    if (!this.ctx) return;
    const chord = [523.25, 659.25, 783.99, 1046.5];
    chord.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.3);
    });
  }

  playWindBreeze() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.05;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.7);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(this.ctx.currentTime + 1.5);
  }

  startMelodyLoop() {
    this.isPlaying = true;
    const sequence = [0, 2, 4, 3, 2, 4, 5, 4, 2, 1, 0, 4, 2, 0];

    const tick = () => {
      if (!this.isPlaying || this.isCustomAudioReady) return;
      const noteIdx = sequence[this.step % sequence.length];
      const freq = this.notes[noteIdx];
      this.playChime(freq, 3.2);

      if (Math.random() > 0.4) {
        const harmonyIdx = (noteIdx + 2) % this.notes.length;
        this.playChime(this.notes[harmonyIdx], 2.8, 0.35);
      }

      this.step++;
      const nextDelay = 1400 + Math.random() * 800;
      this.timer = setTimeout(tick, nextDelay);
    };

    tick();
  }

  stopMelodyLoop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  play() {
    this.init();
    this.isPlaying = true;

    if (this.isCustomAudioReady && this.audioElement) {
      this.stopMelodyLoop();
      this.audioElement.volume = this.baseMusicVolume * this.volumeMultiplier;
      this.audioElement.play().catch(() => {
        this.startMelodyLoop();
      });
    } else {
      this.startMelodyLoop();
    }
    this.notify();
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopMelodyLoop();
    this.notify();
  }

  toggle() {
    this.init();
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const soundEngine = new AmbientSoundEngine();

export const globalMusicControl = {
  fadeVolume: (target, durationMs = 1000) => soundEngine.fadeVolume(target, durationMs),
  play: () => soundEngine.play(),
  pause: () => soundEngine.pause(),
  next: () => soundEngine.nextTrack(true),
  prev: () => soundEngine.prevTrack(true),
  toggleMode: () => soundEngine.togglePlayMode(),
  loadFiles: (fileList) => soundEngine.setPlaylistFromFiles(fileList),
};

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioState, setAudioState] = useState({
    isCustom: false,
    currentIndex: 0,
    totalTracks: 3,
    currentTrackTitle: 'Ambient Melody',
    playMode: 'half',
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setAudioState(state);
    });

    const handleFirstGesture = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        soundEngine.init();
        soundEngine.play();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [hasInteracted]);

  const toggleSound = (e) => {
    e.stopPropagation();
    setHasInteracted(true);
    soundEngine.toggle();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setHasInteracted(true);
    soundEngine.nextTrack(true);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setHasInteracted(true);
    soundEngine.prevTrack(true);
  };

  const handleToggleMode = (e) => {
    e.stopPropagation();
    soundEngine.togglePlayMode();
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      soundEngine.setPlaylistFromFiles(files);
      setHasInteracted(true);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-amber-300/30 shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md">
      {/* Hidden file input for uploading multiple songs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Half vs Full Mode Toggle Badge */}
      <button
        onClick={handleToggleMode}
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer border ${
          audioState.playMode === 'half'
            ? 'bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/50 shadow-[0_0_8px_rgba(255,215,0,0.3)]'
            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
        }`}
        title={`Click to switch mode. Current: ${
          audioState.playMode === 'half'
            ? 'Half Song Mode (plays 50% then switches)'
            : 'Full Song Mode'
        }`}
      >
        {audioState.playMode === 'half' ? '½ Song' : 'Full'}
      </button>

      {/* Previous Track Button */}
      <button
        onClick={handlePrev}
        className="p-1 rounded-full text-amber-200/70 hover:text-[#ffd700] hover:bg-white/10 transition-all cursor-pointer"
        title="Previous song"
      >
        <SkipBack className="w-3.5 h-3.5" />
      </button>

      {/* Play / Mute Main Toggle */}
      <button
        onClick={toggleSound}
        className="px-2 py-1 rounded-full flex items-center gap-2 text-xs md:text-sm font-display tracking-wider text-[#ffd700] hover:text-white transition-all cursor-pointer"
        title={isPlaying ? `Pause (${audioState.currentTrackTitle})` : 'Play Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse text-[#ffd700]" />
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[#ffd700] h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[#ffd700] h-1.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[#ffd700] h-2.5 animate-[pulse_0.5s_ease-in-out_infinite]" />
            </div>
            <span className="truncate max-w-[100px] md:max-w-[130px] text-xs font-semibold">
              {audioState.isCustom
                ? `${audioState.currentTrackTitle} (${audioState.currentIndex + 1}/${audioState.totalTracks})`
                : 'Melody On'}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-xs">Play Music</span>
          </>
        )}
      </button>

      {/* Next Track Button */}
      <button
        onClick={handleNext}
        className="p-1 rounded-full text-amber-200/70 hover:text-[#ffd700] hover:bg-white/10 transition-all cursor-pointer"
        title="Next song"
      >
        <SkipForward className="w-3.5 h-3.5" />
      </button>

      {/* Upload 3 Audio Files Quick Picker */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        className="p-1 rounded-full text-amber-200/50 hover:text-[#ffd700] hover:bg-white/10 transition-all cursor-pointer border-l border-white/15 pl-2 ml-0.5"
        title="Select song files from your device"
      >
        <Upload className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
