'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentBadge, Chip } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/section-heading';
import type { FictionalPlanet } from '@/lib/types';
import { truncate } from '@/lib/utils';

export function WorldGallery({ planets }: { planets: FictionalPlanet[] }) {
  const [sort, setSort] = useState<'beauty' | 'danger' | 'nama'>('beauty');

  const sorted = [...planets].sort((a, b) => {
    if (sort === 'danger') return b.dangerLevel - a.dangerLevel;
    if (sort === 'nama') return a.name.localeCompare(b.name);
    return b.beautyScore - a.beautyScore;
  });

  return (
    <div>
      <div className="glass-strong flex flex-wrap items-center gap-3 rounded-3xl p-4 sm:p-5">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Urutkan</span>
        <Chip active={sort === 'beauty'} onClick={() => setSort('beauty')}>
          Beauty score tertinggi
        </Chip>
        <Chip active={sort === 'danger'} onClick={() => setSort('danger')}>
          Danger level tertinggi
        </Chip>
        <Chip active={sort === 'nama'} onClick={() => setSort('nama')}>
          Nama A-Z
        </Chip>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {sorted.map((planet, index) => (
          <motion.div
            key={planet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <Link href={`/atlas-dunia/${planet.slug}`} className="block h-full">
              <article
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(150deg, ${planet.gradientFrom}22 0%, ${planet.gradientTo}18 45%, rgba(7,10,20,0.95) 100%)`
                }}
              >
                {/* "Planet" hiasan */}
                <span
                  aria-hidden
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[2px] transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${planet.gradientFrom}, ${planet.gradientTo} 65%, transparent 72%)`,
                    opacity: 0.75
                  }}
                />
                {/* Cincin cahaya */}
                <span
                  aria-hidden
                  className="absolute -right-6 top-16 h-28 w-56 -rotate-[24deg] rounded-full border"
                  style={{ borderColor: `${planet.themeColor}44` }}
                />

                <div className="relative">
                  <ContentBadge type="fiction" size="sm" />
                  <h3 className="mt-4 font-display text-2xl text-white">{planet.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: planet.themeColor }}>
                    {planet.tagline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {truncate(planet.description, 190)}
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400">
                        <span>Danger level</span>
                        <span className="text-rose-200">{planet.dangerLevel}/10</span>
                      </p>
                      <div className="mt-2">
                        <ProgressBar value={planet.dangerLevel} max={10} tone="danger" />
                      </div>
                    </div>
                    <div>
                      <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400">
                        <span>Beauty score</span>
                        <span className="text-emerald-200">{planet.beautyScore}/10</span>
                      </p>
                      <div className="mt-2">
                        <ProgressBar value={planet.beautyScore} max={10} tone="cyan" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {planet.resources.slice(0, 3).map((resource) => (
                      <span
                        key={resource}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-slate-300"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>

                  <span className="mt-5 inline-block text-xs" style={{ color: planet.themeColor }}>
                    Buka dossier planet →
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
