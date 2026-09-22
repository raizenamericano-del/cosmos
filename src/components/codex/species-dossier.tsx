'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpeciesAvatar } from '@/components/codex/species-avatar';
import { ContentBadge, StatusPill } from '@/components/ui/badge';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import type { AlienSpecies, FictionalPlanet } from '@/lib/types';

const STATUS_TONE: Record<string, 'good' | 'warn' | 'bad' | 'mystery'> = {
  damai: 'good',
  netral: 'warn',
  berbahaya: 'bad',
  misterius: 'mystery'
};

export function SpeciesDossier({
  species,
  homePlanet
}: {
  species: AlienSpecies;
  homePlanet: FictionalPlanet | null;
}) {
  const { unlock } = useAchievements();
  const { play } = useSound();

  // Membuka arsip spesies = kontak pertama 😉
  useEffect(() => {
    unlock('First Contact');
    play('success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [species.slug]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
      {/* Kartu hologram */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border p-6"
        style={{
          borderColor: `${species.accentColor}55`,
          background: `linear-gradient(170deg, ${species.accentColor}1f 0%, rgba(7,10,20,0.95) 65%)`
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hologram-scan opacity-80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.45)_0px,rgba(255,255,255,0.45)_1px,transparent_1px,transparent_4px)]"
        />

        <div className="relative flex flex-col items-center text-center">
          <ContentBadge type="fiction" size="sm" />
          <div className="mt-4">
            <SpeciesAvatar species={species} size={168} />
          </div>
          <h1 className="mt-4 font-display text-2xl text-white">{species.name}</h1>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <StatusPill label={species.status} tone={STATUS_TONE[species.status] ?? 'neutral'} />
            <StatusPill label={`Kardashev ${species.kardashevLevel}`} tone="neutral" />
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-widest text-slate-400">Planet asal</p>
          <p className="font-heading text-sm text-white">{species.homePlanet}</p>
          {homePlanet && (
            <Link
              href={`/atlas-dunia/${homePlanet.slug}`}
              className="mt-2 text-[11px] underline decoration-dotted"
              style={{ color: species.accentColor }}
            >
              Buka dossier planetnya →
            </Link>
          )}
        </div>
      </motion.div>

      {/* Detail */}
      <div className="space-y-5">
        <div className="glass-strong rounded-3xl p-6">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-fuchsia-200">
            Lore peradaban
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{species.lore}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="glass-strong rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Kemampuan unik
            </p>
            <ul className="mt-4 space-y-3">
              {species.abilities.map((ability) => {
                const [name, description] = ability.split(' — ');
                return (
                  <li key={ability} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="font-heading text-sm" style={{ color: species.accentColor }}>
                      {name}
                    </p>
                    {description && (
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{description}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="glass-strong rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Penampilan
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{species.appearance}</p>

            <div className="mt-5 rounded-2xl border border-fuchsia-400/25 bg-fuchsia-400/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-widest text-fuchsia-100">
                Skala Kardashev {species.kardashevLevel}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-200">
                {species.kardashevLevel === 'I'
                  ? 'Tipe I: menguasai seluruh energi planet asalnya (≈10¹⁶ watt).'
                  : species.kardashevLevel === 'II'
                    ? 'Tipe II: menguasai seluruh energi bintang induknya (≈10²⁶ watt) — mis. dengan Dyson swarm.'
                    : 'Tipe III: menguasai energi seluruh galaksi (≈10³⁶ watt).'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
