'use client';

import { useMemo } from 'react';
import type { AlienSpecies } from '@/lib/types';
import { hashString, seededRandom } from '@/lib/utils';

/**
 * Avatar prosedural berbasis SVG — dibangkitkan dari slug spesies sehingga
 * setiap peradaban punya "wajah" unik tanpa memerlukan file gambar.
 */
export function SpeciesAvatar({
  species,
  size = 168,
  animated = true
}: {
  species: AlienSpecies;
  size?: number;
  animated?: boolean;
}) {
  const geometry = useMemo(() => {
    const rand = seededRandom(hashString(species.slug));
    const eyeCount = species.slug === 'nyx-collective' ? 6 : species.slug === 'zephyrians' ? 4 : 2;
    const eyes = Array.from({ length: eyeCount }, (_, index) => ({
      cx: 50 + (index - (eyeCount - 1) / 2) * (14 - eyeCount),
      cy: 42 + (rand() - 0.5) * 8,
      r: 3.4 + rand() * 2.6
    }));
    const tendrils = Array.from({ length: 5 }, (_, index) => ({
      angle: (index / 5) * Math.PI * 2,
      length: 16 + rand() * 22
    }));
    return { eyes, tendrils, crest: 3 + Math.floor(rand() * 4) };
  }, [species.slug]);

  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={size * 1.2}
      role="img"
      aria-label={`Ilustrasi spesies fiktif ${species.name}`}
      className={animated ? 'drop-shadow-[0_0_24px_rgba(139,92,246,0.35)]' : ''}
    >
      <defs>
        <radialGradient id={`body-${species.slug}`} cx="38%" cy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="45%" stopColor={species.accentColor} />
          <stop offset="100%" stopColor="#050915" />
        </radialGradient>
        <linearGradient id={`glow-${species.slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={species.accentColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Tendril / antena */}
      <g stroke={`url(#glow-${species.slug})`} strokeWidth="1.6" fill="none" opacity="0.85">
        {geometry.tendrils.map((tendril, index) => {
          const cx = 50 + Math.cos(tendril.angle) * tendril.length;
          const cy = 58 + Math.sin(tendril.angle) * tendril.length * 0.7;
          return (
            <path
              key={index}
              d={`M50 62 Q ${(50 + cx) / 2} ${(62 + cy) / 2 - 8} ${cx} ${cy}`}
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Kepala */}
      <ellipse cx="50" cy="46" rx="27" ry="30" fill={`url(#body-${species.slug})`} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {/* Crest */}
      <g fill={species.accentColor} opacity="0.75">
        {Array.from({ length: geometry.crest }, (_, index) => (
          <rect
            key={index}
            x={38 + index * 8}
            y={12 - index % 2 * 3}
            width="2.6"
            height="12"
            rx="1.3"
          />
        ))}
      </g>

      {/* Mata */}
      <g>
        {geometry.eyes.map((eye, index) => (
          <g key={index}>
            <circle cx={eye.cx} cy={eye.cy} r={eye.r + 0.9} fill="#0b1120" opacity="0.9" />
            <circle cx={eye.cx} cy={eye.cy} r={eye.r} fill="#f8fafc" />
            <circle cx={eye.cx} cy={eye.cy} r={eye.r * 0.42} fill="#0f172a" />
          </g>
        ))}
      </g>

      {/* Mulut / mandibula */}
      <path
        d="M42 62 Q50 67 58 62"
        stroke="#0b1120"
        strokeWidth="1.4"
        fill="none"
        opacity="0.8"
      />

      {/* Tubuh */}
      <path
        d="M36 74 Q50 68 64 74 L70 112 Q50 120 30 112 Z"
        fill={`url(#glow-${species.slug})`}
        opacity="0.6"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />

      {animated && (
        <circle
          cx="50"
          cy="46"
          r="31"
          fill="none"
          stroke={species.accentColor}
          strokeWidth="0.6"
          strokeDasharray="4 6"
          opacity="0.55"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 46"
            to="360 50 46"
            dur="24s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}
