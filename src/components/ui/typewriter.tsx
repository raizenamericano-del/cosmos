'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSound } from '@/context/sound-context';

/**
 * Animasi mengetik (typewriter) dengan kursor berkedip.
 * Menghormati preferensi `prefers-reduced-motion`.
 */
export function Typewriter({
  lines,
  speed = 42,
  className,
  startDelay = 300,
  loop = false,
  onLineChange
}: {
  lines: string[];
  speed?: number;
  className?: string;
  startDelay?: number;
  loop?: boolean;
  onLineChange?: (index: number) => void;
}) {
  const [displayed, setDisplayed] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);
  const { play } = useSound();
  const reduceMotion = useRef(false);

  const targets = useMemo(() => lines.filter(Boolean), [lines]);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (targets.length === 0) return;

    if (reduceMotion.current) {
      setDisplayed(targets.join(' '));
      setDone(true);
      return;
    }

    const currentLine = targets[lineIndex] ?? '';
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const typeDelay = lineIndex === 0 ? startDelay : 260;

    const typeNext = () => {
      if (cancelled) return;
      if (charIndex <= currentLine.length) {
        setDisplayed(currentLine.slice(0, charIndex));
        if (charIndex % 3 === 0) play('type');
        charIndex += 1;
        timer = setTimeout(typeNext, speed + (charIndex % 5) * 9);
        return;
      }

      // Baris selesai
      if (lineIndex < targets.length - 1) {
        timer = setTimeout(() => {
          setLineIndex((prev) => {
            const next = prev + 1;
            onLineChange?.(next);
            return next;
          });
        }, 1100);
      } else if (loop) {
        timer = setTimeout(() => {
          setLineIndex(0);
          onLineChange?.(0);
          setDisplayed('');
        }, 2600);
      } else {
        setDone(true);
      }
    };

    timer = setTimeout(typeNext, typeDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lineIndex, loop, onLineChange, play, speed, startDelay, targets]);

  return (
    <p className={className} aria-live="polite">
      <span>{displayed}</span>
      <span
        className={`ml-0.5 inline-block h-[1em] w-[3px] translate-y-[2px] bg-cyan-300 ${
          done ? 'opacity-0' : 'animate-pulse'
        }`}
        aria-hidden
      />
    </p>
  );
}
