'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export type SoundName = 'click' | 'hover' | 'success' | 'error' | 'unlock' | 'warp' | 'type';

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

const TONES: Record<SoundName, { freq: number; duration: number; type: OscillatorType; slide?: number }> = {
  click: { freq: 520, duration: 0.06, type: 'triangle' },
  hover: { freq: 340, duration: 0.04, type: 'sine' },
  type: { freq: 900, duration: 0.02, type: 'square' },
  success: { freq: 660, duration: 0.22, type: 'sine', slide: 220 },
  error: { freq: 180, duration: 0.2, type: 'sawtooth', slide: -60 },
  unlock: { freq: 520, duration: 0.5, type: 'triangle', slide: 520 },
  warp: { freq: 120, duration: 0.9, type: 'sawtooth', slide: 780 }
};

/**
 * Efek suara disintesis dengan Web Audio API (tanpa file audio eksternal),
 * sehingga tidak ada aset yang perlu diunduh. Default: NONAKTIF.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const { value: enabled, setValue: setEnabled } = useLocalStorage('cosmos.sound', false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled || typeof window === 'undefined') return;
      try {
        if (!audioContextRef.current) {
          const AudioCtor =
            window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          if (!AudioCtor) return;
          audioContextRef.current = new AudioCtor();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') void ctx.resume();

        const tone = TONES[name];
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = tone.type;
        oscillator.frequency.setValueAtTime(tone.freq, ctx.currentTime);
        if (tone.slide) {
          oscillator.frequency.linearRampToValueAtTime(
            Math.max(tone.freq + tone.slide, 40),
            ctx.currentTime + tone.duration
          );
        }
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + tone.duration);
        oscillator.connect(gain).connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + tone.duration + 0.02);
      } catch (error) {
        console.warn('[Cosmos Academy] Audio tidak tersedia:', error);
      }
    },
    [enabled]
  );

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
    };
  }, []);

  const value = useMemo<SoundContextValue>(
    () => ({
      enabled,
      toggle: () => setEnabled((prev) => !prev),
      play
    }),
    [enabled, play, setEnabled]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return { enabled: false, toggle: () => {}, play: () => {} };
  }
  return ctx;
}
