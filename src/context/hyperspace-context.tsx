'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

interface HyperspaceContextValue {
  active: boolean;
  activate: (seconds?: number) => void;
  remaining: number;
}

const HyperspaceContext = createContext<HyperspaceContextValue>({
  active: false,
  activate: () => {},
  remaining: 0
});

/**
 * EASTER EGG: Konami Code (↑↑↓↓←→←→ B A) mengaktifkan mode Hyperspace
 * selama 10 detik — layar melengkung, warna bergeser, dan badge
 * "Hyperspace Rider" terbuka.
 */
export function HyperspaceProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const position = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { unlock } = useAchievements();
  const { play } = useSound();

  const activate = useCallback(
    (seconds = 10) => {
      setActive(true);
      setRemaining(seconds);
      play('warp');
      unlock('Hyperspace Rider');

      if (timerRef.current) clearInterval(timerRef.current);
      let left = seconds;
      timerRef.current = setInterval(() => {
        left -= 1;
        setRemaining(left);
        if (left <= 0) {
          setActive(false);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 1000);
    },
    [play, unlock]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typingInField =
        target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = KONAMI[position.current];

      if (typingInField && key !== expected) return;

      if (key === expected) {
        position.current += 1;
        if (position.current === KONAMI.length) {
          position.current = 0;
          activate(10);
        }
      } else {
        position.current = key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activate]);

  useEffect(() => {
    document.documentElement.classList.toggle('hyperspace-mode', active);
    return () => document.documentElement.classList.remove('hyperspace-mode');
  }, [active]);

  const value = useMemo(() => ({ active, activate, remaining }), [activate, active, remaining]);

  return (
    <HyperspaceContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,14,26,0.75)_75%)]" />
            <div className="absolute inset-0 opacity-70 [background:repeating-conic-gradient(from_0deg,rgba(139,92,246,0.35)_0deg_1deg,transparent_1deg_7deg)] animate-wormhole-spin" />
            <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-black/60 px-5 py-2 font-display text-xs uppercase tracking-[0.4em] text-cyan-200">
              Hyperspace {remaining}s
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </HyperspaceContext.Provider>
  );
}

export function useHyperspace() {
  return useContext(HyperspaceContext);
}
