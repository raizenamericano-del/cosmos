'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/ui/section-heading';
import { ContentBadge } from '@/components/ui/badge';
import { SpeciesAvatar } from '@/components/codex/species-avatar';
import { useAchievements } from '@/context/achievement-context';
import type { AlienSpecies, FictionalPlanet } from '@/lib/types';

export function WorldDossier({
  planet,
  inhabitants
}: {
  planet: FictionalPlanet;
  inhabitants: AlienSpecies[];
}) {
  const { unlock } = useAchievements();

  // Cari surga = beauty score ≥ 9
  useEffect(() => {
    if (planet.beautyScore >= 9) unlock('Paradise Seeker');
  }, [planet.beautyScore, unlock]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
        style={{
          background: `linear-gradient(140deg, ${planet.gradientFrom}26 0%, ${planet.gradientTo}1c 50%, rgba(7,10,20,0.96) 100%)`
        }}
      >
        <span
          aria-hidden
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${planet.gradientFrom}, ${planet.gradientTo} 60%, transparent 70%)`,
            opacity: 0.55
          }}
        />

        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <ContentBadge type="fiction" />
            <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              {planet.name}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.25em]" style={{ color: planet.themeColor }}>
              {planet.tagline}
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-300">{planet.description}</p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-rose-400/25 bg-rose-500/[0.07] p-4">
              <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-rose-100">
                <span>Danger level</span>
                <span>{planet.dangerLevel}/10</span>
              </p>
              <div className="mt-2">
                <ProgressBar value={planet.dangerLevel} max={10} tone="danger" />
              </div>
              <p className="mt-2 text-[11px] text-rose-100/80">
                {planet.dangerLevel >= 9
                  ? 'Zona larangan terbang. Izin khusus diperlukan.'
                  : planet.dangerLevel >= 7
                    ? 'Berisiko tinggi. Wajib pengawalan.'
                    : planet.dangerLevel >= 4
                      ? 'Perlu persiapan standar ekspedisi.'
                      : 'Ramah untuk kunjungan wisata antarbintang.'}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4">
              <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-emerald-100">
                <span>Beauty score</span>
                <span>{planet.beautyScore}/10</span>
              </p>
              <div className="mt-2">
                <ProgressBar value={planet.beautyScore} max={10} tone="cyan" />
              </div>
              <p className="mt-2 text-[11px] text-emerald-100/80">
                Dinilai oleh komite Atlas Dunia Fiksi berdasarkan keunikan lanskap, cahaya, dan atmosfer.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-strong rounded-3xl p-5">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">Atmosfer</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{planet.atmosphere}</p>
        </div>
        <div className="glass-strong rounded-3xl p-5">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Penghuni
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{planet.inhabitants}</p>
        </div>
        <div className="glass-strong rounded-3xl p-5">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Sumber daya
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {planet.resources.map((resource) => (
              <li key={resource} className="flex gap-2">
                <span style={{ color: planet.themeColor }}>◆</span>
                {resource}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {inhabitants.length > 0 && (
        <div className="glass-strong rounded-3xl p-6">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-fuchsia-200">
            Peradaban yang terkait dengan dunia ini
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inhabitants.map((species) => (
              <Link
                key={species.id}
                href={`/codex-alien/${species.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-fuchsia-300/40"
              >
                <SpeciesAvatar species={species} size={56} animated={false} />
                <span>
                  <span className="block font-heading text-sm text-white">{species.name}</span>
                  <span className="block text-[11px] text-slate-400">
                    Kardashev {species.kardashevLevel} · {species.status}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
