'use client';

import { useEffect, useState } from 'react';

/**
 * Kursor glow kustom (opsional). Hanya aktif pada perangkat dengan pointer presisi
 * dan tidak aktif bila pengguna memilih `prefers-reduced-motion`.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.classList.add('custom-cursor-active');
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] hidden lg:block"
      style={{ left: position.x, top: position.y }}
    >
      <span
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 transition-all duration-150 ${
          pressed ? 'h-10 w-10 opacity-90' : 'h-7 w-7 opacity-60'
        }`}
        style={{ boxShadow: '0 0 22px rgba(34,211,238,0.55)' }}
      />
      <span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200" />
    </div>
  );
}
