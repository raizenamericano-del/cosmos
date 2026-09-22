'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';
import { Compass, Orbit, RotateCcw, MousePointer2 } from 'lucide-react';
import { PLANETARY_BODIES } from '@/lib/data/solar-system';
import type { PlanetaryBody } from '@/lib/types';
import { useAchievements } from '@/context/achievement-context';
import { Button } from '@/components/ui/button';
import { ContentBadge } from '@/components/ui/badge';
import { Chip } from '@/components/ui/badge';
import type { SolarMode } from '@/components/solar-system/solar-system-canvas';
import { formatNumber } from '@/lib/utils';

const SolarSystemCanvas = dynamic(() => import('@/components/solar-system/solar-system-canvas'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-cosmos-deep">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-300" />
        <p className="mt-4 font-display text-[10px] uppercase tracking-[0.35em] text-cyan-200">
          Menyalakan simulator orbit
        </p>
      </div>
    </div>
  )
});

/** Tautan silang ke artikel ensiklopedia yang relevan (📚 fakta ilmiah). */
const ARTICLE_LINKS: Record<string, string> = {
  matahari: 'matahari-reaktor-fusi-tata-surya',
  bumi: 'bumi-planet-biru-pelindung-kehidupan',
  mars: 'mars-planet-merah-masa-depan-kolonisasi',
  jupiter: 'jupiter-raksasa-gas-tameng-tata-surya',
  saturnus: 'saturnus-permata-cincin-es'
};

export function SolarSystemExplorer() {
  const [mode, setMode] = useState<SolarMode>('orbital');
  const [selected, setSelected] = useState<PlanetaryBody | null>(null);
  const [focusToken, setFocusToken] = useState(0);
  const [viewed, setViewed] = useState<string[]>([]);
  const positionsRef = useRef<Map<string, THREE.Vector3>>(new Map());
  const { unlock } = useAchievements();

  const handleSelect = useCallback(
    (body: PlanetaryBody) => {
      setSelected(body);
      setFocusToken((token) => token + 1);
      setViewed((prev) => {
        if (prev.includes(body.id)) return prev;
        const next = [...prev, body.id];
        if (next.length >= 5) unlock('Stargazer');
        return next;
      });
    },
    [unlock]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* ------------------------------ KANVAS 3D ------------------------------ */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-cosmos-deep shadow-glow-soft">
        <div className="h-[420px] sm:h-[520px] lg:h-[620px]">
          <SolarSystemCanvas
            mode={mode}
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
            positionsRef={positionsRef}
            focusToken={focusToken}
          />
        </div>

        {/* Kontrol mode */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-cosmos-void/80 p-2 backdrop-blur-xl">
            <Chip active={mode === 'orbital'} onClick={() => setMode('orbital')}>
              <span className="inline-flex items-center gap-1.5">
                <Orbit size={13} /> Mode Orbital
              </span>
            </Chip>
            <Chip active={mode === 'jelajah'} onClick={() => setMode('jelajah')}>
              <span className="inline-flex items-center gap-1.5">
                <Compass size={13} /> Mode Jelajah
              </span>
            </Chip>
            <button
              type="button"
              onClick={() => {
                setSelected(PLANETARY_BODIES[0]);
                setFocusToken((token) => token + 1);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              <RotateCcw size={13} /> Pusat
            </button>
          </div>

          <div className="pointer-events-none hidden rounded-2xl border border-white/10 bg-cosmos-void/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-300 backdrop-blur-xl sm:block">
            <MousePointer2 size={11} className="mr-1 inline" /> drag: putar · scroll: zoom · klik: detail
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <p className="rounded-xl border border-white/10 bg-cosmos-void/80 px-3 py-2 text-[11px] leading-relaxed text-slate-400 backdrop-blur-xl">
            Ukuran dan jarak pada simulator ini <span className="text-slate-200">tidak berskala</span> agar
            nyaman dilihat. Data pada panel detail tetap memakai angka asli (sumber: NASA Planetary Fact Sheet).
          </p>
        </div>
      </div>

      {/* ------------------------------ PANEL DETAIL ------------------------------ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Benda langit dilihat
            </p>
            <p className="font-heading text-lg text-white">{viewed.length}/9 entri</p>
          </div>
          <ContentBadge type="fact" />
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="glass-strong rounded-3xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.35em] text-cyan-300">
                    {selected.type === 'bintang'
                      ? 'Bintang'
                      : selected.type === 'planet-katai'
                        ? 'Raksasa Gas / Es'
                        : 'Planet Kebumian'}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">{selected.name}</h3>
                </div>
                <span
                  className="h-12 w-12 shrink-0 rounded-full border border-white/20"
                  style={{
                    background: `radial-gradient(circle at 32% 30%, ${selected.color}, ${selected.accentColor})`,
                    boxShadow: `0 0 26px ${selected.accentColor}66`
                  }}
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">{selected.description}</p>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                {[
                  ['Diameter', `${formatNumber(selected.diameterKm)} km`],
                  ['Jarak dari Matahari', selected.distanceFromSun],
                  ['Suhu', selected.temperature],
                  ['Jumlah satelit', selected.moons === 0 ? 'Tidak ada' : `${selected.moons}`],
                  ['Rotasi (1 hari)', selected.dayLength],
                  ['Revolusi (1 tahun)', selected.yearLength],
                  ['Komposisi', selected.composition],
                  ['Atmosfer', selected.atmosphere ?? '—']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-[10px] uppercase tracking-widest text-slate-400">{label}</dt>
                    <dd className="mt-1 leading-relaxed text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>

              {selected.moonsList && selected.moonsList.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Satelit terkenal</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.moonsList.map((moon) => (
                      <span
                        key={moon}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-200"
                      >
                        {moon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-4">
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-cyan-200">
                  Fun facts
                </p>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-200">
                  {selected.funFacts.map((fact) => (
                    <li key={fact} className="flex gap-2">
                      <span className="text-cyan-300">◆</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {ARTICLE_LINKS[selected.slug] && (
                  <Link href={`/ensiklopedia/${ARTICLE_LINKS[selected.slug]}`}>
                    <Button size="sm" variant="primary">
                      Baca artikel lengkap
                    </Button>
                  </Link>
                )}
                <Button size="sm" variant="ghost" onClick={() => setSelected(null)}>
                  Tutup panel
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl p-6 text-sm leading-relaxed text-slate-300"
            >
              <p className="font-heading text-base text-white">Pilih benda langit untuk mulai belajar</p>
              <p className="mt-3">
                Klik Matahari atau salah satu dari 8 planet di simulator. Kamu akan melihat data resmi
                (diameter, jarak, suhu, jumlah satelit) beserta fun facts unik.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Buka 5 benda langit berbeda untuk membuka achievement <span className="text-cyan-200">Stargazer</span> 🔭
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass rounded-3xl p-5">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Cara menjelajah
          </p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300">
            <li>
              <span className="text-cyan-300">Mode Orbital</span> — planet bergerak mengelilingi Matahari
              dengan kecepatan orbit relatif terhadap Bumi.
            </li>
            <li>
              <span className="text-cyan-300">Mode Jelajah</span> — planet berhenti, kamera bebas untuk
              memeriksa detail tekstur dan cincin.
            </li>
            <li>
              Klik planet untuk mendekat otomatis; klik area kosong sambil men-drag untuk kembali melihat
              seluruh tata surya.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
