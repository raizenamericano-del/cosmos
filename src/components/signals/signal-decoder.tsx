'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Radio, ShieldCheck } from 'lucide-react';
import type { PublicSignal } from '@/lib/data/signals';
import { CIPHER_LABELS, SYMBOL_LEGEND } from '@/lib/ciphers';
import { Button } from '@/components/ui/button';
import { ContentBadge, Chip, StatusPill } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import { cn } from '@/lib/utils';

interface VerifyResponse {
  correct: boolean;
  decodedMessage: string | null;
  hint: string | null;
  sender: string;
  rewardBadge: string;
}

const DIFFICULTY_TONE: Record<number, 'good' | 'warn' | 'bad' | 'mystery'> = {
  1: 'good',
  2: 'warn',
  3: 'bad',
  4: 'mystery'
};

export function SignalDecoder({ signals }: { signals: PublicSignal[] }) {
  const [activeId, setActiveId] = useState(signals[0]?.id ?? '');
  const { value: drafts, setValue: setDrafts } = useLocalStorage<Record<string, string>>(
    'cosmos.signals.drafts',
    {}
  );
  const { value: solved, setValue: setSolved } = useLocalStorage<string[]>('cosmos.signals.solved', []);
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [hintOpen, setHintOpen] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const { unlock } = useAchievements();
  const { play } = useSound();

  const active = useMemo(
    () => signals.find((signal) => signal.id === activeId) ?? signals[0],
    [activeId, signals]
  );

  const decodedMessages = messages;

  const verify = async () => {
    if (!active || checking) return;
    setChecking(true);
    play('click');

    try {
      const response = await fetch('/api/signals/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signalId: active.id, answer: drafts[active.id] ?? '' })
      });
      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        setStatus({ type: 'err', text: 'Transmisi gagal diproses. Coba lagi.' });
        return;
      }

      if (data.correct) {
        play('success');
        setStatus({ type: 'ok', text: `Sinyal terpecahkan! Pesan dari ${data.sender} terbaca.` });
        setMessages((prev) => ({ ...prev, [active.id]: data.decodedMessage ?? '' }));
        setSolved((prev) => {
          const next = Array.from(new Set([...prev, active.id]));
          unlock(data.rewardBadge);
          if (next.length >= signals.length) unlock('Signal Master');
          return next;
        });
      } else {
        play('error');
        setStatus({ type: 'err', text: 'Dekode belum tepat. Periksa kembali polanya.' });
        setHintOpen((prev) => ({ ...prev, [active.id]: true }));
      }
    } catch {
      setStatus({ type: 'err', text: 'Stasiun radio kehilangan sinyal. Coba lagi.' });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Daftar sinyal */}
      <div className="space-y-3">
        <div className="glass-strong rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Arsip radio
            </p>
            <span className="text-[11px] text-emerald-200">
              {solved.length}/{signals.length}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {signals.map((signal) => {
              const isSolved = solved.includes(signal.id);
              return (
                <button
                  key={signal.id}
                  type="button"
                  onClick={() => {
                    setActiveId(signal.id);
                    setStatus(null);
                  }}
                  className={cn(
                    'w-full rounded-2xl border p-3 text-left transition',
                    signal.id === active?.id
                      ? 'border-cyan-400/50 bg-cyan-400/[0.08]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                  )}
                >
                  <p className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Radio size={12} /> Sinyal #{signal.order}
                    {isSolved && <ShieldCheck size={12} className="text-emerald-300" />}
                  </p>
                  <p className="mt-1 font-heading text-sm leading-snug text-white">{signal.title}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusPill
                      label={`Level ${signal.difficulty}`}
                      tone={DIFFICULTY_TONE[signal.difficulty] ?? 'neutral'}
                    />
                    <span className="text-[10px] text-slate-500">{signal.sender}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-4 text-[11px] leading-relaxed text-slate-400">
          <p className="font-heading text-xs text-slate-200">Klasifikasi sandi</p>
          <ul className="mt-2 space-y-1">
            {Object.entries(CIPHER_LABELS).map(([key, label]) => (
              <li key={key}>
                • {label}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Jawaban dicek di server; pesan asli hanya dikirim setelah decoding benar. Tidak ada satu pun
            pesan ini nyata — semua fiksi ilmiah 🛸.
          </p>
        </div>
      </div>

      {/* Dekoder */}
      {active && (
        <div className="glass-strong rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <ContentBadge type="fiction" size="sm" />
              <h2 className="mt-3 font-display text-xl text-white">{active.title}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">
                Sumber: {active.sender} · {CIPHER_LABELS[active.cipher]}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setHintOpen((prev) => ({ ...prev, [active.id]: !prev[active.id] }))}
            >
              <HelpCircle size={14} /> Petunjuk
            </Button>
          </div>

          <AnimatePresence>
            {hintOpen[active.id] && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-3 text-xs leading-relaxed text-amber-50"
              >
                💡 {active.hint}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Pesan terenkripsi */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-cosmos-deep p-4">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Transmisi terenkripsi
            </p>
            <p
              className={cn(
                'break-words font-mono text-sm leading-7 text-cyan-200',
                active.cipher === 'binary' && 'text-[11px] leading-6 sm:text-xs'
              )}
            >
              {active.cipher === 'symbol' ? active.encodedMessage : active.encodedMessage}
            </p>
          </div>

          {active.cipher === 'symbol' && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Legenda simbol alien
              </p>
              <div className="mt-3 grid grid-cols-6 gap-2 text-center sm:grid-cols-9">
                {Object.entries(SYMBOL_LEGEND).map(([letter, symbol]) => (
                  <div
                    key={letter}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-1 py-2 text-[11px] text-slate-300"
                  >
                    <div className="text-base text-cyan-200">{symbol}</div>
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jawaban */}
          <div className="mt-5">
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-slate-400">
                Tulis pesan hasil dekode (bahasa Indonesia, huruf kapital/tidak sama-sama diterima)
              </span>
              <textarea
                value={drafts[active.id] ?? ''}
                onChange={(event) =>
                  setDrafts((prev) => ({ ...prev, [active.id]: event.target.value }))
                }
                rows={3}
                placeholder="Misal: KAMI MENGAMATIMU DARI KEGELAPAN"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-cosmos-deep px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={verify} disabled={checking}>
                <Radio size={15} /> {checking ? 'Memverifikasi…' : 'Verifikasi sinyal'}
              </Button>
              {decodedMessages[active.id] && (
                <Button
                  variant="ghost"
                  onClick={() => setDrafts((prev) => ({ ...prev, [active.id]: '' }))}
                >
                  Bersihkan
                </Button>
              )}
            </div>

            {status && (
              <p
                className={cn(
                  'mt-3 text-xs',
                  status.type === 'ok' ? 'text-emerald-200' : 'text-rose-200'
                )}
              >
                {status.text}
              </p>
            )}
          </div>

          {/* Pesan terdekode */}
          <AnimatePresence>
            {decodedMessages[active.id] && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200">
                  Pesan terdekode
                </p>
                <p className="mt-3 font-heading text-base leading-relaxed text-white">
                  &quot;{decodedMessages[active.id]}&quot;
                </p>
                <p className="mt-2 text-[11px] text-slate-300">— {active.sender}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>
              #{active.order} · {CIPHER_LABELS[active.cipher]}
            </Chip>
            <Chip>Hadiah badge: {active.rewardBadge}</Chip>
          </div>
        </div>
      )}
    </div>
  );
}
