'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/** Konfeti partikel bintang — dipakai saat achievement terbuka. */
export function StarConfetti({ count = 24 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const distance = 60 + ((index * 37) % 120);
        return {
          id: index,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          delay: (index % 7) * 0.05,
          size: 4 + ((index * 13) % 8),
          symbol: index % 4 === 0 ? '✦' : index % 3 === 0 ? '✧' : '★'
        };
      }),
    [count]
  );

  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute left-1/2 top-1/2 text-cyan-300"
          style={{ fontSize: particle.size }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], x: particle.x, y: particle.y, scale: 1 }}
          transition={{ duration: 1.4, delay: particle.delay, ease: 'easeOut' }}
        >
          {particle.symbol}
        </motion.span>
      ))}
    </span>
  );
}
