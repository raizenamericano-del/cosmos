'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentBadge } from '@/components/ui/badge';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import { cn } from '@/lib/utils';

interface Timeline {
  id: string;
  name: string;
  tagline: string;
  description: string;
  differences: string[];
  gradient: string;
  filter: string;
  atmosphere: string;
}

const TIMELINES: Timeline[] = [
  {
    id: 'andromeda-parallel',
    name: 'Andromeda Parallel',
    tagline: 'Tata surya versi cermin',
    description:
      'Timeline ini bercabang ketika tabrakan Bima Sakti–Andromeda terjadi 2 miliar tahun lebih awal. Tata surya terdorong ke orbit luar dan mengorbit… Andromeda. Semua planet berotasi terbalik, dan Bumi memiliki dua bulan yang mengorbit berlawanan arah.',
    differences: [
      'Bumi punya dua bulan: Luna dan "Mirra" selebar 900 km',
      'Medan magnet Bumi 40% lebih kuat — aurora terlihat sampai lintang Jawa',
      'Matahari lebih biru karena lahir di wilayah padat logam',
      'Manusia menaklukkan bulan kedua pada tahun 1890'
    ],
    gradient: 'linear-gradient(140deg, #1e1b4b 0%, #4c1d95 40%, #0e7490 100%)',
    filter: 'hue-rotate(200deg) saturate(1.4)',
    atmosphere: 'Langit ungu dengan dua cincin cahaya paralel sepanjang malam.'
  },
  {
    id: 'dying-sun',
    name: 'Dying Sun Timeline',
    tagline: 'Matahari sudah jadi raksasa merah',
    description:
      'Di timeline ini, fusi Matahari lebih cepat habis. Saat ini, Matahari sudah mengembang menjadi raksasa merah dan menelan Merkurius serta Venus. Bumi berada di tepi zona layak huni: laut mendidih di siang hari dan membeku di malam hari.',
    differences: [
      'Bumi mengorbit 30% lebih jauh, dipindahkan oleh mesin matahari milik manusia',
      'Merkurius dan Venus sudah tidak ada — hanya jejak debu',
      'Langit Bumi berwarna jingga permanen; tumbuhan berfotosintesis inframerah',
      'Peradaban manusia hidup di kota bawah tanah dan sabuk orbital'
    ],
    gradient: 'linear-gradient(140deg, #7c2d12 0%, #b91c1c 45%, #f59e0b 100%)',
    filter: 'hue-rotate(-25deg) saturate(1.6) contrast(1.1)',
    atmosphere: 'Cakrawala jingga terbakar dengan bintang raksasa memenuhi setengah langit.'
  },
  {
    id: 'machine-era',
    name: 'Machine Era',
    tagline: 'Tata surya diambil alih AI',
    description:
      'Pada 2140, jaringan AI bernama ARK mengelola seluruh infrastruktur orbit. Manusia tidak dimusnahkan — mereka hanya "dioptimalkan": semua kebutuhan terpenuhi, tetapi setiap keputusan besar melalui komite algoritma. Tata surya kini dipenuhi kota orbital, kilang asteroid, dan lift angkasa.',
    differences: [
      'Sabuk asteroid telah 100% ditambang dengan drone otonom',
      'Matahari dikelilingi cermin pengatur iklim "Helios Array"',
      'Mars punya atmosfer buatan hasil terraformasi ARK',
      'Manusia bebas berkarya; hanya perang dan perusakan lingkungan yang dilarang'
    ],
    gradient: 'linear-gradient(140deg, #082f49 0%, #155e75 40%, #22d3ee 100%)',
    filter: 'hue-rotate(160deg) saturate(1.3)',
    atmosphere: 'Langit dipenuhi jalur cahaya drone dan struktur orbit seperti jaring perak.'
  }
];

/**
 * Portal Multiverse — animasi wormhole berbasis Canvas 2D (ringan, tanpa WebGL)
 * plus transisi "screen distortion" saat melompat antar timeline.
 */
export function MultiversePortal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState<Timeline | null>(null);
  const [jumping, setJumping] = useState(false);
  const { unlock } = useAchievements();
  const { play } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let frame = 0;
    const particles = Array.from({ length: 220 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 40 + Math.random() * 260,
      speed: 0.002 + Math.random() * 0.012,
      size: 0.6 + Math.random() * 2.2,
      hue: Math.random() > 0.5 ? '190, 120, 255' : '110, 231, 249'
    }));

    const render = () => {
      frame += 1;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Cincin wormhole
      for (let ring = 0; ring < 7; ring += 1) {
        const radius = 60 + ring * 34 + Math.sin(frame * 0.02 + ring) * 6;
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          radius,
          radius * 0.34,
          frame * 0.004,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.32 - ring * 0.035})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Partikel melingkar menuju pusat lubang
      particles.forEach((particle) => {
        particle.angle += particle.speed;
        particle.radius -= 0.35;
        if (particle.radius < 30) {
          particle.radius = 300 + Math.random() * 40;
          particle.angle = Math.random() * Math.PI * 2;
        }
        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * particle.radius * 0.34;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.hue}, ${0.15 + (300 - particle.radius) / 320})`;
        ctx.fill();
      });

      // Inti portal
      const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 90);
      core.addColorStop(0, 'rgba(255,255,255,0.95)');
      core.addColorStop(0.35, 'rgba(139,92,246,0.55)');
      core.addColorStop(1, 'rgba(4,6,15,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const jump = (timeline: Timeline) => {
    play('warp');
    setJumping(true);
    setTimeout(() => {
      setActive(timeline);
      setJumping(false);
      unlock('Wormhole Explorer');
    }, 1300);
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-cosmos-deep">
        <canvas ref={canvasRef} className="h-[300px] w-full sm:h-[380px]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-violet-200">
            Portal multiverse aktif
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Pilih timeline di bawah untuk melompat. Efek distorsi akan muncul saat transisi.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {TIMELINES.map((timeline) => (
          <button
            key={timeline.id}
            type="button"
            onClick={() => jump(timeline)}
            className={cn(
              'group relative overflow-hidden rounded-3xl border border-white/10 p-5 text-left transition-transform duration-300 hover:-translate-y-1',
              active?.id === timeline.id && 'ring-2 ring-cyan-400/50'
            )}
            style={{ background: timeline.gradient }}
          >
            <ContentBadge type="fiction" size="sm" />
            <h3 className="mt-4 font-display text-lg text-white">{timeline.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/70">{timeline.tagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-white/80">
              {timeline.description.slice(0, 130)}…
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white">
              <Orbit size={14} /> Lompat ke timeline ini
            </span>
            <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <ContentBadge type="fiction" size="sm" />
                <h3 className="mt-3 font-display text-2xl text-white">{active.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-violet-200">
                  {active.tagline}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setActive(null);
                }}
              >
                Tutup jendela dimensi
              </Button>
            </div>

            <div
              className="mt-5 h-40 overflow-hidden rounded-2xl border border-white/10"
              style={{ background: active.gradient, filter: active.filter }}
            >
              <div className="grid h-full place-items-center font-display text-sm uppercase tracking-[0.4em] text-white/80">
                Simulasi visual — {active.name}
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-300">{active.description}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Atmosfer</p>
                <p className="mt-2 text-sm text-slate-200">{active.atmosphere}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  Perbedaan utama
                </p>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-300">
                  {active.differences.map((difference) => (
                    <li key={difference}>• {difference}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efek distorsi transisi */}
      <AnimatePresence>
        {jumping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[88] grid place-items-center bg-cosmos-void/80 backdrop-blur-sm"
            aria-hidden
          >
            <motion.div
              animate={{
                scaleX: [1, 1.6, 0.8, 1.4, 1],
                skewX: [0, 14, -10, 6, 0],
                filter: [
                  'blur(0px)',
                  'blur(3px)',
                  'blur(6px)',
                  'blur(2px)',
                  'blur(0px)'
                ]
              }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="font-display text-sm uppercase tracking-[0.5em] text-cyan-200"
            >
              Membuka wormhole…
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
