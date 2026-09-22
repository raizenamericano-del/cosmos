'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Layar pemuatan animasi roket. Tampil sekali per sesi (disimpan di sessionStorage)
 * agar navigasi berikutnya tidak terganggu.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = window.sessionStorage.getItem('cosmos.intro-seen');
    if (seen === '1') {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      window.sessionStorage.setItem('cosmos.intro-seen', '1');
      setVisible(false);
    }, 2100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    return undefined;
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99] grid place-items-center bg-cosmos-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          aria-hidden
        >
          <div className="relative flex w-[min(88vw,420px)] flex-col items-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-center text-xs uppercase tracking-[0.5em] text-cyan-300"
            >
              Cosmos Academy
            </motion.div>

            <div className="relative mt-8 h-28 w-full">
              <motion.div
                className="absolute left-0 text-4xl"
                initial={{ x: -20, y: 10 }}
                animate={{ x: 360, y: -30, rotate: 15 }}
                transition={{ duration: 1.9, ease: 'easeInOut' }}
              >
                🚀
              </motion.div>
              <motion.div
                className="absolute left-0 top-[70px] h-[2px] w-full origin-left rounded-full bg-aurora-gradient"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.9, ease: 'easeInOut' }}
              />
            </div>

            <motion.p
              className="mt-6 text-center text-xs text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Mengkalibrasi teleskop, menjalankan pra-penerbangan…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
