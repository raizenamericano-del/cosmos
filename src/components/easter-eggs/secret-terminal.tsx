'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';

const COMMANDS = [
  'bantu',
  'whoami',
  'kosmos',
  'nyx',
  'hyperspace',
  'hidden'
] as const;

const RESPONSES: Record<string, string> = {
  bantu: 'Perintah tersedia: bantu, whoami, kosmos, nyx, hyperspace, hidden, clear',
  whoami:
    'Penjelajah terdaftar. Badge kamu tersimpan di konsol achievement — termasuk yang kamu sembunyikan.',
  kosmos:
    'KOSMOS: kata Yunani untuk "keteraturan alam semesta". Dipakai pertama kali oleh Pythagoras sekitar 2.500 tahun lalu.',
  nyx: '"Kami mengamatimu dari kegelapan. Jangan takut." — pesan diulang 4.096 kali, setiap 61 detik.',
  hyperspace:
    'Deteksi kode arcade… coba tekan ↑↑↓↓←→←→ B A di halaman mana pun untuk efeknya.',
  hidden: 'Ada 5 easter egg: glitch alien, bintang di hero, kode arcade, halaman ini, dan satu lagi di 404.'
};

export function SecretTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: 'system', output: 'Terminal Sektor 7 aktif. Ketik "bantu" untuk daftar perintah.' }
  ]);
  const { unlock, isUnlocked } = useAchievements();
  const { play } = useSound();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    play('click');

    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output =
      RESPONSES[command] ??
      `Perintah "${command}" tidak dikenali. Ketik "bantu" untuk melihat daftar perintah.`;

    if (command === 'hidden' && !isUnlocked('Hyperspace Rider')) {
      unlock('Hyperspace Rider', { silent: true });
    }

    setHistory((prev) => [...prev, { command, output }]);
    setInput('');
  };

  return (
    <div className="glass-strong overflow-hidden rounded-3xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <Terminal size={14} className="text-emerald-300" />
        <span className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
          terminal · sektor-7
        </span>
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto bg-cosmos-deep/80 p-5 font-mono text-[11px] leading-relaxed">
        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-slate-300"
          >
            <span className="text-emerald-300">guest@cosmos:~$</span> {entry.command}
            <p className="mt-1 text-cyan-100">{entry.output}</p>
          </motion.div>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 px-5 py-4">
        <span className="font-mono text-[11px] text-emerald-300">$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='ketik "bantu"'
          className="w-full bg-transparent font-mono text-[11px] text-white placeholder:text-slate-600 focus:outline-none"
          aria-label="Perintah terminal rahasia"
        />
      </form>

      <p className="px-5 pb-4 font-mono text-[10px] text-slate-500">
        Daftar perintah: {COMMANDS.join(' · ')}
      </p>
    </div>
  );
}
