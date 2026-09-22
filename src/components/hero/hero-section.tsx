'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Rocket, Sparkles } from 'lucide-react';
import { Typewriter } from '@/components/ui/typewriter';
import { ContentBadge } from '@/components/ui/badge';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import { seededRandom } from '@/lib/utils';

const StarfieldScene = dynamic(() => import('@/components/hero/starfield-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#111a3a,#04060f_70%)]" />
});

const TAGLINE_LINES = [
  'Selamat datang di Cosmos Academy...',
  'Tempat astronomi yang akurat bertemu fiksi ilmiah yang liar.',
  'Satu stasiun, dua dunia: 📚 Fakta Ilmiah & 🛸 Fiksi Ilmiah.',
  'Siap menjelajah, Kapten?'
];

const STATS = [
  { value: '12', label: 'Artikel astronomi terverifikasi' },
  { value: '8+1', label: 'Planet & Matahari dalam 3D' },
  { value: '30', label: 'Soal kuis 4 kategori' },
  { value: '5', label: 'Peradaban alien + 5 dunia fiksi' }
];

export function HeroSection() {
  const [secretClicks, setSecretClicks] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [rocketLaunching, setRocketLaunching] = useState(false);
  const { unlock } = useAchievements();
  const { play } = useSound();
  const exploreRef = useRef<HTMLDivElement>(null);

  const handleSecretStar = useCallback(() => {
    play('success');
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next >= 5 && !secretUnlocked) {
        setSecretUnlocked(true);
        unlock('Sector Cartographer');
      }
      return next;
    });
  }, [play, secretUnlocked, unlock]);

  const scrollToExplore = () => {
    setRocketLaunching(true);
    play('warp');
    exploreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => setRocketLaunching(false), 1400);
  };

  const shootingStars = Array.from({ length: 3 }, (_, index) => {
    const rand = seededRandom(index * 977 + 13);
    return {
      top: `${8 + rand() * 40}%`,
      left: `${10 + rand() * 60}%`,
      delay: `${rand() * 8}s`,
      duration: `${2.4 + rand() * 1.8}s`
    };
  });

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <StarfieldScene />

      {/* Lapisan gelap agar teks tetap terbaca */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(10,14,26,0.1)_0%,rgba(10,14,26,0.72)_58%,rgba(10,14,26,0.96)_100%)]" />

      {/* Bintang jatuh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {shootingStars.map((star, index) => (
          <span
            key={index}
            className="absolute h-[2px] w-[140px] rotate-[115deg] rounded-full bg-gradient-to-r from-transparent via-cyan-100 to-transparent opacity-0"
            style={{
              top: star.top,
              left: star.left,
              animation: `shooting-star ${star.duration} linear ${star.delay} infinite`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes shooting-star {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(115deg) scaleX(0.3);
          }
          8% {
            opacity: 0.95;
          }
          60% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: translate3d(-520px, 320px, 0) rotate(115deg) scaleX(1.15);
          }
        }
      `}</style>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <ContentBadge type="fact" />
            <ContentBadge type="fiction" />
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-slate-300">
              Dua dunia konten, jelas dipisah
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            COSMOS
            <span className="block bg-aurora-gradient bg-clip-text text-transparent">ACADEMY</span>
          </h1>

          <Typewriter
            lines={TAGLINE_LINES}
            className="mt-6 max-w-2xl font-heading text-base leading-relaxed text-slate-200 sm:text-lg"
            speed={38}
          />

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Belajar dari data resmi NASA & ESA, lalu berlayar ke peradaban Xel&apos;Tharis, Nyx Collective,
            dan Aurelians. Setiap klaim ilmiah diberi label 📚, setiap imajinasi diberi label 🛸.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToExplore}
              className="group relative inline-flex items-center gap-2 rounded-full bg-aurora-gradient px-9 py-3.5 font-heading text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              <Rocket size={16} className="transition-transform group-hover:-translate-y-0.5" />
              Mulai Menjelajah
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              <AnimatePresence>
                {rocketLaunching && (
                  <motion.span
                    initial={{ opacity: 0, y: 0, scale: 1 }}
                    animate={{ opacity: [0, 1, 0], y: -120, scale: 1.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.3 }}
                    className="pointer-events-none absolute right-6 top-0 text-2xl"
                  >
                    🚀
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              href="/tata-surya"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-7 py-3.5 font-heading text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
            >
              🪐 Buka Tata Surya 3D
            </Link>

            <Link
              href="/codex-alien"
              className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 px-7 py-3.5 font-heading text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/10"
            >
              🛸 Masuk Alien Codex
            </Link>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="font-display text-xl text-white">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* EASTER EGG: bintang rahasia — klik 5× untuk membuka sektor tersembunyi */}
        <button
          type="button"
          onClick={handleSecretStar}
          title="Bintang ini terlihat… aneh."
          aria-label="Bintang rahasia"
          className="absolute right-6 top-24 z-10 grid h-14 w-14 place-items-center rounded-full transition hover:scale-110 sm:right-16 sm:top-28"
        >
          <span
            className="block h-3 w-3 rounded-full bg-white"
            style={{ boxShadow: '0 0 22px 8px rgba(255,255,255,0.75)' }}
          />
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/10" />
        </button>

        <AnimatePresence>
          {(secretClicks > 0 || secretUnlocked) && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-4 top-44 z-10 w-64 rounded-2xl border border-violet-400/30 bg-cosmos-void/90 p-4 text-xs backdrop-blur-xl sm:right-16"
            >
              {secretUnlocked ? (
                <>
                  <p className="font-display text-[10px] uppercase tracking-[0.3em] text-violet-200">
                    Sektor tersembunyi terbuka
                  </p>
                  <p className="mt-2 text-slate-300">
                    Kamu menemukannya. Badge 🛰️ <strong>Sector Cartographer</strong> telah terbuka.
                  </p>
                  <Link
                    href="/rahasia"
                    className="mt-3 inline-flex items-center gap-1 text-cyan-200 underline decoration-dotted"
                  >
                    <Sparkles size={12} /> Masuk ke sektor rahasia
                  </Link>
                </>
              ) : (
                <p className="text-slate-300">
                  Bintang itu bergetar… <span className="text-white">{5 - secretClicks}</span> klik lagi.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          aria-hidden
        >
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-slate-400">
            Gulir untuk memulai
          </p>
          <div className="mx-auto mt-2 h-10 w-[1px] bg-gradient-to-b from-cyan-300/70 to-transparent" />
        </motion.div>
      </div>

      <div ref={exploreRef} />
    </section>
  );
}
