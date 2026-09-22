'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Panel glassmorphism dengan efek tilt 3D + sorotan mengikuti kursor.
 * Dipakai untuk kartu artikel, spesies, dan planet fiksi.
 * Navigasi dilakukan oleh elemen pembungkus (mis. <Link>) agar tetap aksesibel.
 */
export function GlowPanel({
  children,
  className,
  intensity = 9,
  glowColor = 'rgba(139,92,246,0.28)',
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotlight = useMotionValue('50% 50%');

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20
  });
  const background = useTransform(
    spotlight,
    (position) => `radial-gradient(circle at ${position}, ${glowColor}, transparent 62%)`
  );

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    mouseX.set(x);
    mouseY.set(y);
    spotlight.set(`${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    spotlight.set('50% 50%');
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-panel-gradient p-5 backdrop-blur-xl',
        'shadow-[0_18px_50px_-24px_rgba(2,6,23,0.9)] transition-colors duration-300 hover:border-white/25',
        className
      )}
    >
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
