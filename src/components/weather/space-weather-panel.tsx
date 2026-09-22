'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { SpaceWeatherReport } from '@/lib/types';
import { ContentBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/section-heading';
import { formatDateId } from '@/lib/utils';

interface LocationForecast {
  location: string;
  condition: string;
  icon: string;
  advice: string;
  probability: number;
}

export function SpaceWeatherPanel({
  initialReport,
  initialLocations
}: {
  initialReport: SpaceWeatherReport;
  initialLocations: LocationForecast[];
}) {
  const [report, setReport] = useState(initialReport);
  const [locations, setLocations] = useState(initialLocations);
  const [refreshing, setRefreshing] = useState(false);

  // Prakiraan berganti tepat saat tanggal di zona pengguna berganti.
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/space-weather', { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as {
          report: SpaceWeatherReport;
          locations: LocationForecast[];
        };
        if (data.report.date !== report.date) {
          setReport(data.report);
          setLocations(data.locations);
        }
      } catch {
        /* offline: tetap pakai data awal */
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [report.date]);

  const refresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/space-weather', { cache: 'no-store' });
      const data = (await response.json()) as {
        report: SpaceWeatherReport;
        locations: LocationForecast[];
      };
      setReport(data.report);
      setLocations(data.locations);
    } catch {
      /* biarkan data lama */
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kartu utama */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8"
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <ContentBadge type="fiction" />
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-slate-300">
                Prakiraan hari ini · {formatDateId(report.date)}
              </span>
            </div>

            <p className="mt-5 font-display text-[11px] uppercase tracking-[0.35em] text-cyan-300">
              {report.location}
            </p>
            <h2 className="mt-2 flex items-center gap-3 font-display text-2xl text-white sm:text-3xl">
              <span className="text-4xl">{report.icon}</span>
              {report.condition}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{report.advice}</p>

            <div className="mt-6 max-w-md">
              <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400">
                <span>Peluang kejadian</span>
                <span className="text-cyan-200">{report.probability}%</span>
              </p>
              <div className="mt-2">
                <ProgressBar value={report.probability} tone="cyan" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="sm" variant="ghost" onClick={refresh} disabled={refreshing}>
                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Perbarui
              </Button>
              <span className="self-center text-[11px] text-slate-500">
                Data dibangkitkan ulang otomatis setiap tanggal berganti.
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ['Kecepatan angin kosmik', report.windSpeed],
              ['Radiasi', report.radiation],
              ['Visibilitas', report.visibility]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
                <p className="mt-2 text-sm leading-snug text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Prakiraan per jam */}
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
          Perkembangan per jam
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {report.hourly.map((hour, index) => (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
            >
              <p className="text-[11px] uppercase tracking-widest text-slate-400">{hour.time}</p>
              <p className="mt-2 text-2xl">{hour.icon}</p>
              <p className="mt-2 text-[11px] leading-snug text-slate-200">{hour.condition}</p>
              <p className="mt-1 text-[10px] text-cyan-200">{hour.probability}%</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lokasi lain */}
      <div>
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
          Prakiraan lokasi lain
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <motion.div
              key={location.location}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-heading text-sm text-white">{location.location}</p>
                <span className="text-2xl">{location.icon}</span>
              </div>
              <p className="mt-2 text-xs text-slate-300">{location.condition}</p>
              <div className="mt-3">
                <ProgressBar
                  value={location.probability}
                  tone={location.probability > 80 ? 'danger' : 'cyan'}
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">{location.probability}% peluang</p>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">{location.advice}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500">
        Catatan edukasi: prakiraan ini <span className="text-slate-300">fiksi</span>, tetapi istilah yang
        dipakai nyata — angin matahari, flare, lontaran massa korona (CME), dan radiasi memang dipantau
        lembaga seperti NOAA SWPC untuk menjaga satelit serta astronaut tetap aman.
      </p>
    </div>
  );
}
