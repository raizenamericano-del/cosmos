'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '@/lib/data/achievements';
import { Chip } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/section-heading';
import { useAchievements } from '@/context/achievement-context';
import { cn } from '@/lib/utils';

const CATEGORIES = ['semua', 'edukasi', 'fiksi', 'rahasia'] as const;
const RARITY_STYLE: Record<string, string> = {
  umum: 'border-slate-400/30 bg-slate-400/10 text-slate-200',
  langka: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
  legendaris: 'border-amber-300/50 bg-amber-300/10 text-amber-200'
};

export function AchievementGrid() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('semua');
  const [selected, setSelected] = useState<string | null>(null);
  const { unlocked, isUnlocked, progress, unlock, resetProgress } = useAchievements();

  const filtered = useMemo(
    () =>
      ACHIEVEMENTS.filter(
        (achievement) => filter === 'semua' || achievement.category === filter
      ),
    [filter]
  );

  const selectedAchievement = ACHIEVEMENTS.find(
    (achievement) => achievement.badgeName === selected
  );

  return (
    <div>
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Koleksi badge
            </p>
            <p className="mt-1 font-heading text-lg text-white">
              {progress.unlocked} / {progress.total} terbuka
            </p>
          </div>
          <div className="w-full max-w-sm">
            <ProgressBar value={progress.unlocked} max={progress.total} tone="gold" showLabel />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => (
            <Chip key={category} active={filter === category} onClick={() => setFilter(category)}>
              {category === 'semua' ? 'Semua' : category}
            </Chip>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            onClick={() => {
              if (window.confirm('Reset progres achievement di perangkat ini? (Database tidak diubah)')) {
                resetProgress();
              }
            }}
          >
            Reset lokal
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((achievement, index) => {
          const owned = isUnlocked(achievement.badgeName);
          return (
            <motion.button
              key={achievement.badgeName}
              type="button"
              onClick={() => setSelected(achievement.badgeName)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                'relative overflow-hidden rounded-2xl border p-5 text-left transition-transform duration-300 hover:-translate-y-1',
                owned
                  ? 'border-amber-300/40 bg-amber-300/[0.07]'
                  : 'border-white/10 bg-white/[0.02] opacity-70'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={cn('text-3xl', !owned && 'grayscale')}>{achievement.icon}</span>
                <span
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-widest',
                    RARITY_STYLE[achievement.rarity]
                  )}
                >
                  {achievement.rarity}
                </span>
              </div>
              <p className="mt-3 font-heading text-sm text-white">{achievement.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                {achievement.description}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-500">
                {owned ? '✅ terbuka' : '🔒 belum terbuka'}
              </p>
            </motion.button>
          );
        })}
      </div>

      {selectedAchievement && (
        <div
          className="fixed inset-0 z-[92] grid place-items-center bg-cosmos-void/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong w-full max-w-md rounded-3xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-aurora-gradient text-3xl">
                {selectedAchievement.icon}
              </span>
              <div>
                <p className="font-display text-lg text-white">{selectedAchievement.title}</p>
                <p className="text-[11px] uppercase tracking-widest text-slate-400">
                  {selectedAchievement.badgeName}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {selectedAchievement.description}
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-300">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Cara membuka</p>
              <p className="mt-2">{selectedAchievement.hint}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {!isUnlocked(selectedAchievement.badgeName) && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => unlock(selectedAchievement.badgeName)}
                >
                  Tandai terbuka (uji coba)
                </Button>
              )}
              <Button size="sm" onClick={() => setSelected(null)}>
                Tutup
              </Button>
            </div>

            <p className="mt-3 text-[10px] text-slate-500">
              {unlocked.length} badge tersimpan di perangkat ini
              {unlocked.length > 0 ? ' (dan tersinkron ke akun bila login).' : '.'}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
