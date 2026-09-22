'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSound } from '@/context/sound-context';
import { ACHIEVEMENTS, getAchievement } from '@/lib/data/achievements';
import type { AchievementDefinition } from '@/lib/types';
import { StarConfetti } from '@/components/ui/star-confetti';

interface AchievementContextValue {
  unlocked: string[];
  unlock: (badgeName: string, options?: { silent?: boolean }) => void;
  isUnlocked: (badgeName: string) => boolean;
  progress: { unlocked: number; total: number; percent: number };
  resetProgress: () => void;
}

const AchievementContext = createContext<AchievementContextValue | null>(null);

/**
 * Sistem achievement.
 * - Progres selalu tersimpan di localStorage (mode tamu / mode demo).
 * - Bila pengguna login DAN database aktif, badge juga dikirim ke akun
 *   lewat POST /api/achievements agar tersimpan permanen.
 */
export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const { value: unlocked, setValue: setUnlocked } = useLocalStorage<string[]>('cosmos.achievements', []);
  const [queue, setQueue] = useState<AchievementDefinition[]>([]);
  const { data: session } = useSession();
  const { play } = useSound();

  // Muat achievement dari akun saat pengguna login.
  useEffect(() => {
    if (!session?.user?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch('/api/achievements', { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as { achievements?: { badgeName: string }[] };
        if (cancelled || !data.achievements) return;
        setUnlocked((prev) => {
          const merged = new Set(prev);
          data.achievements!.forEach((item) => merged.add(item.badgeName));
          return Array.from(merged);
        });
      } catch {
        /* offline / demo: abaikan */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id, setUnlocked]);

  const isUnlocked = useCallback(
    (badgeName: string) => unlocked.includes(badgeName),
    [unlocked]
  );

  const unlock = useCallback(
    (badgeName: string, options?: { silent?: boolean }) => {
      const definition = getAchievement(badgeName);
      if (!definition) return;

      let added = false;
      setUnlocked((prev) => {
        if (prev.includes(badgeName)) return prev;
        added = true;
        return [...prev, badgeName];
      });

      if (!added) return;

      play('unlock');
      if (!options?.silent) setQueue((prev) => [...prev, definition]);

      void fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badgeName })
      }).catch(() => {
        /* mode tamu: badge tetap tersimpan lokal */
      });
    },
    [play, setUnlocked]
  );

  const resetProgress = useCallback(() => setUnlocked([]), [setUnlocked]);

  const value = useMemo<AchievementContextValue>(
    () => ({
      unlocked,
      unlock,
      isUnlocked,
      progress: {
        unlocked: unlocked.length,
        total: ACHIEVEMENTS.length,
        percent: Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)
      },
      resetProgress
    }),
    [isUnlocked, resetProgress, unlock, unlocked]
  );

  const current = queue[0];

  return (
    <AchievementContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.badgeName}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-6 left-1/2 z-[95] w-[min(92vw,420px)] -translate-x-1/2"
            role="status"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={() => setQueue((prev) => prev.slice(1))}
              className="w-full text-left glass-strong rounded-2xl p-4 pr-10 relative overflow-hidden group"
            >
              <StarConfetti count={22} />
              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-aurora-gradient text-2xl shadow-glow">
                  {current.icon}
                </div>
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                    Achievement Terbuka
                  </p>
                  <p className="font-heading text-lg font-semibold text-white">{current.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{current.description}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-400">
                    {current.rarity} · {current.category}
                  </p>
                </div>
              </div>
              <span className="absolute right-4 top-4 text-xs text-slate-400 group-hover:text-white">
                ✕
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
}

export function useAchievements(): AchievementContextValue {
  const ctx = useContext(AchievementContext);
  if (!ctx) {
    return {
      unlocked: [],
      unlock: () => {},
      isUnlocked: () => false,
      progress: { unlocked: 0, total: ACHIEVEMENTS.length, percent: 0 },
      resetProgress: () => {}
    };
  }
  return ctx;
}
