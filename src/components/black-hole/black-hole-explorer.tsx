'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAchievements } from '@/context/achievement-context';
import { ContentBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/section-heading';
import {
  BLACK_HOLE_EDUCATION,
  BLACK_HOLE_PRESETS,
  densityKgPerM3,
  evaporationTimeYears,
  formatScientific,
  hawkingTemperature,
  iscoKm,
  photonSphereKm,
  schwarzschildRadiusKm,
  sizeComparisons,
  tidalGradientAtHorizon,
  timeDilationFactor
} from '@/lib/physics';
import { formatNumber } from '@/lib/utils';

const BlackHoleCanvas = dynamic(() => import('@/components/black-hole/black-hole-canvas'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-cosmos-deep">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-amber-400/30 border-t-amber-300" />
        <p className="mt-4 font-display text-[10px] uppercase tracking-[0.35em] text-amber-200">
          Melengkungkan ruang-waktu
        </p>
      </div>
    </div>
  )
});

export function BlackHoleExplorer() {
  // Slider logaritmik: 0 (1 M☉) → 10,82 (≈ 66 miliar M☉)
  const [massLog, setMassLog] = useState(0.3);
  const [activeTab, setActiveTab] = useState<string>(BLACK_HOLE_EDUCATION[0].id);
  const { unlock, isUnlocked } = useAchievements();

  const massSolar = useMemo(() => 10 ** massLog, [massLog]);
  const radiusKm = schwarzschildRadiusKm(massSolar);

  useEffect(() => {
    if (massSolar >= 1e10) unlock('Black Hole Diver');
  }, [massSolar, unlock]);

  const readouts = useMemo(
    () => [
      {
        label: 'Radius Schwarzschild (event horizon)',
        value: `${formatNumber(radiusKm, radiusKm < 100 ? 2 : 0)} km`,
        detail: `± ${formatScientific(radiusKm / 1.496e8)} AU`
      },
      {
        label: 'Photon sphere (cahaya mengorbit)',
        value: `${formatNumber(photonSphereKm(massSolar), 0)} km`,
        detail: '1,5 × radius Schwarzschild'
      },
      {
        label: 'ISCO (orbit stabil terakhir)',
        value: `${formatNumber(iscoKm(massSolar), 0)} km`,
        detail: '3 × radius Schwarzschild'
      },
      {
        label: 'Suhu Hawking',
        value: `${formatScientific(hawkingTemperature(massSolar))} K`,
        detail: 'Semakin besar massa, semakin dingin'
      },
      {
        label: 'Waktu penguapan Hawking',
        value: `${formatScientific(evaporationTimeYears(massSolar))} tahun`,
        detail: 'Alam semesta baru berumur 1,38 × 10¹⁰ tahun'
      },
      {
        label: 'Massa jenis rata-rata di dalam horizon',
        value: `${formatScientific(densityKgPerM3(massSolar))} kg/m³`,
        detail: 'Untuk perbandingan: air 1.000 kg/m³'
      },
      {
        label: 'Gradien gaya pasang di horizon',
        value: `${formatScientific(tidalGradientAtHorizon(massSolar))} m/s² per meter`,
        detail: 'Di bawah 10: kamu masih hidup melewati horizon'
      },
      {
        label: 'Dilatasi waktu pada 2 R_s',
        value: `${(timeDilationFactor(massSolar, 2) * 100).toFixed(1)}% laju normal`,
        detail: 'Jam kamu berjalan lebih lambat dari pengamat jauh'
      }
    ],
    [massSolar, radiusKm]
  );

  const comparisons = useMemo(() => sizeComparisons(radiusKm), [radiusKm]);
  const education = BLACK_HOLE_EDUCATION.find((item) => item.id === activeTab) ?? BLACK_HOLE_EDUCATION[0];

  return (
    <div className="space-y-6">
      {/* ------------------------------- KANVAS ------------------------------- */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-cosmos-deep shadow-glow-soft">
        <div className="h-[380px] sm:h-[460px] lg:h-[560px]">
          <BlackHoleCanvas massLog={massLog} />
        </div>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-cosmos-void/80 px-4 py-3 backdrop-blur-xl">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-amber-200">
            Massa simulasi
          </p>
          <p className="font-display text-xl text-white">
            {formatScientific(massSolar)} M☉
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Horizon: {formatNumber(radiusKm, radiusKm < 100 ? 2 : 0)} km
          </p>
        </div>

        <div className="pointer-events-none absolute right-4 top-4 hidden rounded-2xl border border-white/10 bg-cosmos-void/80 px-4 py-3 text-right backdrop-blur-xl sm:block">
          <ContentBadge type="fact" size="sm" />
          <p className="mt-2 max-w-[200px] text-[10px] leading-relaxed text-slate-400">
            Visualisasi bersifat artistik; ukuran piringan akresi tidak proporsional terhadap massa.
          </p>
        </div>
      </div>

      {/* ------------------------------- SLIDER ------------------------------- */}
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Geser untuk mengubah massa
            </p>
            <p className="font-heading text-lg text-white">
              1 M☉ → 10¹⁰ M☉ (skala logaritmik)
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl text-cyan-200">{formatScientific(massSolar)} M☉</p>
            <p className="text-[11px] text-slate-400">
              ± {formatNumber(massSolar * 1.989, 2)} × 10³⁰ kg
            </p>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={10}
          step={0.01}
          value={massLog}
          onChange={(event) => setMassLog(Number(event.target.value))}
          aria-label="Massa lubang hitam (skala logaritmik)"
          className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-amber-400/40 via-fuchsia-500/50 to-cyan-400/60 accent-cyan-300 outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-cyan-300 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,211,238,0.9)]"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {BLACK_HOLE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setMassLog(Math.log10(preset.massSolar))}
              title={preset.note}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-300 transition hover:border-amber-300/50 hover:text-amber-100"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="mb-2 text-[11px] uppercase tracking-widest text-slate-400">
            Semakin masif → horizon makin besar, tapi suhu Hawking makin dingin
          </p>
          <ProgressBar value={massLog} max={10} tone="gold" showLabel />
        </div>

        {!isUnlocked('Black Hole Diver') && (
          <p className="mt-4 text-[11px] text-slate-400">
            🕳️ Coba geser sampai <span className="text-amber-200">10¹⁰ M☉</span> untuk membuka achievement
            <span className="text-amber-200"> Black Hole Diver</span>.
          </p>
        )}
      </div>

      {/* ------------------------------- READOUT ------------------------------- */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {readouts.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-[10px] uppercase tracking-widest text-slate-400">{item.label}</p>
            <p className="mt-2 font-heading text-base leading-snug text-white">{item.value}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{item.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* ---------------------------- PERBANDINGAN ---------------------------- */}
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-cyan-300">
          Seberapa besar horizon itu?
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs"
            >
              <p className="text-slate-300">{item.label}</p>
              <p className="mt-1 text-[11px] text-slate-500">referensi {item.reference}</p>
              <p className="mt-2 font-heading text-sm text-cyan-100">{item.scale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------ EDUKASI ------------------------------ */}
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Penjelasan edukatif
          </p>
          <ContentBadge type="fact" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {BLACK_HOLE_EDUCATION.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={item.id === activeTab ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} {item.title}
            </Button>
          ))}
        </div>

        <motion.div
          key={education.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300"
        >
          {education.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
