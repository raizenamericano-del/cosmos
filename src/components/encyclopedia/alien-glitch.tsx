'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * EASTER EGG: mengetik "alien" pada kotak pencarian ensiklopedia
 * memunculkan glitch alien singkat di layar.
 */
export function AlienGlitch({ trigger }: { trigger: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[85] grid place-items-center bg-cosmos-void/70 backdrop-blur-[2px]"
          aria-hidden
        >
          <div className="text-center">
            <motion.pre
              animate={{ opacity: [1, 0.4, 1], x: [0, -3, 3, 0] }}
              transition={{ duration: 0.28, repeat: Infinity }}
              className="font-mono text-5xl leading-tight text-emerald-300 sm:text-7xl"
            >
              {`  ▄▄▄▄▄
 █ ◉ ◉ █
 █  ▂  █
  ▀▀▀▀▀`}
            </motion.pre>
            <p className="mt-4 font-display text-xs uppercase tracking-[0.45em] text-fuchsia-200 glitch-text" data-text="KONTAK TERDETEKSI">
              KONTAK TERDETEKSI
            </p>
            <p className="mt-2 text-[11px] text-slate-300">
              &quot;Kami mengamatimu dari kegelapan. Jangan takut.&quot; — The Nyx
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
