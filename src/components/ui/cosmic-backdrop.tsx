'use client';

import { useEffect, useState } from 'react';
import { hashString, seededRandom } from '@/lib/utils';

interface Star {
  top: string;
  left: string;
  size: number;
  delay: string;
  opacity: number;
  hue: string;
}

const HUES = ['#ffffff', '#c7d2fe', '#a5f3fc', '#ddd6fe', '#fde68a'];

/**
 * Latar bintang CSS (ringan) untuk halaman selain hero.
 * Dipakai agar halaman tetap terasa "kosmik" tanpa biaya render WebGL.
 */
export function CosmicBackdrop({
  density = 110,
  seed = 'cosmos',
  withGrid = true
}: {
  density?: number;
  seed?: string;
  withGrid?: boolean;
}) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const rand = seededRandom(hashString(seed));
    const generated: Star[] = Array.from({ length: density }, () => ({
      top: `${(rand() * 100).toFixed(2)}%`,
      left: `${(rand() * 100).toFixed(2)}%`,
      size: rand() > 0.88 ? 2.4 : rand() > 0.6 ? 1.6 : 1,
      delay: `${(rand() * 4).toFixed(2)}s`,
      opacity: 0.25 + rand() * 0.7,
      hue: HUES[Math.floor(rand() * HUES.length)]
    }));
    setStars(generated);
  }, [density, seed]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-cosmos-void" />
      <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-600/12 blur-[120px]" />
      <div className="absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-cyan-500/12 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[120px]" />
      {withGrid && (
        <div className="absolute inset-0 bg-grid-lines bg-[length:64px_64px] opacity-[0.35]" />
      )}
      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: star.hue,
            opacity: star.opacity,
            animationDelay: star.delay
          }}
        />
      ))}
    </div>
  );
}
