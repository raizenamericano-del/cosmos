'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ContentBadge, Chip, StatusPill } from '@/components/ui/badge';
import { SpeciesAvatar } from '@/components/codex/species-avatar';
import type { AlienSpecies, KardashevLevel, SpeciesStatus } from '@/lib/types';
import { truncate } from '@/lib/utils';

const STATUS_TONE: Record<SpeciesStatus, 'good' | 'warn' | 'bad' | 'mystery'> = {
  damai: 'good',
  netral: 'warn',
  berbahaya: 'bad',
  misterius: 'mystery'
};

export function SpeciesGallery({ species }: { species: AlienSpecies[] }) {
  const [status, setStatus] = useState<'semua' | SpeciesStatus>('semua');
  const [level, setLevel] = useState<'semua' | KardashevLevel>('semua');

  const filtered = useMemo(
    () =>
      species.filter((item) => {
        const matchStatus = status === 'semua' || item.status === status;
        const matchLevel = level === 'semua' || item.kardashevLevel === level;
        return matchStatus && matchLevel;
      }),
    [level, species, status]
  );

  return (
    <div>
      <div className="glass-strong flex flex-wrap items-center gap-4 rounded-3xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Status</span>
          <Chip active={status === 'semua'} onClick={() => setStatus('semua')}>
            Semua
          </Chip>
          {(['damai', 'netral', 'berbahaya', 'misterius'] as SpeciesStatus[]).map((item) => (
            <Chip key={item} active={status === item} onClick={() => setStatus(item)}>
              {item}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            Level Kardashev
          </span>
          <Chip active={level === 'semua'} onClick={() => setLevel('semua')}>
            Semua
          </Chip>
          {(['I', 'II', 'III'] as KardashevLevel[]).map((item) => (
            <Chip key={item} active={level === item} onClick={() => setLevel(item)}>
              Tipe {item}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <Link href={`/codex-alien/${item.slug}`} className="block h-full">
              <article
                className="holo-grid group relative h-full overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${item.accentColor}44`,
                  background: `linear-gradient(165deg, ${item.accentColor}14 0%, rgba(7,10,20,0.92) 62%)`
                }}
              >
                {/* Efek hologram */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hologram-scan"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.07] [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.4)_0px,rgba(255,255,255,0.4)_1px,transparent_1px,transparent_4px)]"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <ContentBadge type="fiction" size="sm" />
                    <h3 className="mt-3 font-display text-xl text-white">{item.name}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">
                      Asal: {item.homePlanet}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <SpeciesAvatar species={item} size={78} />
                  </div>
                </div>

                <div className="relative mt-4 flex flex-wrap gap-2">
                  <StatusPill label={item.status} tone={STATUS_TONE[item.status]} />
                  <StatusPill label={`Kardashev ${item.kardashevLevel}`} tone="neutral" />
                </div>

                <p className="relative mt-4 text-xs leading-relaxed text-slate-300">
                  {truncate(item.lore, 168)}
                </p>

                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {item.abilities.slice(0, 2).map((ability) => (
                    <span
                      key={ability}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-slate-300"
                    >
                      {ability.split(' — ')[0]}
                    </span>
                  ))}
                </div>

                <span
                  className="relative mt-5 inline-block text-xs"
                  style={{ color: item.accentColor }}
                >
                  Buka berkas lengkap →
                </span>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="glass mt-6 rounded-3xl p-10 text-center text-sm text-slate-400">
          Tidak ada peradaban yang cocok dengan filter tersebut.
        </p>
      )}
    </div>
  );
}
