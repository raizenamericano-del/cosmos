'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, Share2, Trophy, XCircle } from 'lucide-react';
import type { QuizCategory, QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ContentBadge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/section-heading';
import { StarConfetti } from '@/components/ui/star-confetti';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import { cn, scoreToRank } from '@/lib/utils';
import Link from 'next/link';

type Phase = 'intro' | 'playing' | 'result';
const QUESTION_TIME = 20;

export function QuizGame({
  questions,
  categories
}: {
  questions: QuizQuestion[];
  categories: { category: string; count: number }[];
}) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [category, setCategory] = useState<QuizCategory>(categories[0]?.category as QuizCategory ?? 'Tata Surya');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [stored, setStored] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const { unlock } = useAchievements();
  const { play } = useSound();
  const submittedRef = useRef(false);

  const pool = useMemo(
    () => questions.filter((question) => question.category === category),
    [category, questions]
  );
  const current = pool[index];

  const finish = useCallback(
    async (finalAnswers: Record<string, number>) => {
      if (submittedRef.current) return;
      submittedRef.current = true;

      // Penilaian lokal untuk tampilan cepat
      const localScore = pool.filter(
        (question) => finalAnswers[question.id] === question.correctAnswer
      ).length;
      setScore(localScore);
      setTotal(pool.length);

      if (localScore === pool.length) unlock('Quiz Champion');
      setPhase('result');

      // Penilaian resmi di server (mengunci kunci jawaban di sisi server)
      try {
        const response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, answers: finalAnswers })
        });
        if (response.ok) {
          const data = (await response.json()) as { score: number; total: number; stored: boolean };
          setScore(data.score);
          setTotal(data.total);
          setStored(data.stored);
        }
      } catch {
        setStored(false);
      }
    },
    [category, pool, unlock]
  );

  // Timer per pertanyaan
  useEffect(() => {
    if (phase !== 'playing' || selected !== null) return;
    if (timeLeft <= 0) {
      const nextAnswers = { ...answers, [current.id]: -1 };
      setAnswers(nextAnswers);
      setSelected(-1);
      play('error');
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [answers, current, phase, play, selected, timeLeft]);

  const start = (value: QuizCategory) => {
    setCategory(value);
    setPhase('playing');
    setIndex(0);
    setSelected(null);
    setAnswers({});
    setTimeLeft(QUESTION_TIME);
    submittedRef.current = false;
    play('click');
  };

  const answer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const nextAnswers = { ...answers, [current.id]: optionIndex };
    setAnswers(nextAnswers);
    play(optionIndex === current.correctAnswer ? 'success' : 'error');
  };

  const next = () => {
    if (index + 1 >= pool.length) {
      void finish(answers);
      return;
    }
    setIndex((prev) => prev + 1);
    setSelected(null);
    setTimeLeft(QUESTION_TIME);
  };

  const share = async () => {
    const rank = scoreToRank(score, total);
    const text = `Aku mendapat ${score}/${total} (${rank.title} ${rank.icon}) pada kuis ${category} di Cosmos Academy! 🚀`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Cosmos Academy', text, url: window.location.origin });
        return;
      }
      await navigator.clipboard.writeText(text);
      setShareMessage('Hasil disalin ke clipboard ✅');
    } catch {
      setShareMessage('Bagikan manual: ' + text);
    } finally {
      setTimeout(() => setShareMessage(null), 3200);
    }
  };

  // ------------------------------- INTRO -------------------------------
  if (phase === 'intro') {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          <ContentBadge type="fact" />
          <h2 className="mt-4 font-display text-2xl text-white">Pilih kategori misi</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Setiap pertanyaan punya batas waktu {QUESTION_TIME} detik. Setelah menjawab, kamu akan langsung
            melihat penjelasan ilmiahnya. Skor akhir tersimpan ke akun (bila login) dan masuk ke papan skor
            global.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {categories.map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => start(item.category as QuizCategory)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.07]"
              >
                <p className="font-heading text-sm text-white">{item.category}</p>
                <p className="mt-1 text-xs text-slate-400">{item.count} pertanyaan</p>
                <span className="mt-3 inline-block text-[11px] text-cyan-200 opacity-0 transition group-hover:opacity-100">
                  Mulai sekarang →
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Tingkatan rank
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ['Crew Cadet', '⭐', '< 50%'],
              ['Teknisi Stasiun', '🛠️', '50–69%'],
              ['Astronom Muda', '🔭', '70–84%'],
              ['Navigator Bintang', '🧭', '85–99%'],
              ['Starship Captain', '🚀', '100%']
            ].map(([title, icon, range]) => (
              <li key={title} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <span className="text-slate-200">
                  {icon} {title}
                </span>
                <span className="text-xs text-slate-400">{range}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11px] leading-relaxed text-slate-500">
            Semua soal bersumber dari data astronomi resmi. Bila ragu, jelajahi dulu Ensiklopedia dan Tata
            Surya 3D.
          </p>
        </div>
      </div>
    );
  }

  // ------------------------------- RESULT -------------------------------
  if (phase === 'result') {
    const rank = scoreToRank(score, total);
    return (
      <div className="relative mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center"
        >
          {rank.tier >= 4 && <StarConfetti count={30} />}
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-cyan-300">
            Misi selesai
          </p>
          <p className="mt-4 text-6xl">{rank.icon}</p>
          <h2 className="mt-4 font-display text-3xl text-white">{rank.title}</h2>
          <p className="mt-3 text-sm text-slate-300">
            Skor kamu <span className="font-display text-lg text-cyan-200">{score}</span> dari {total} ·{' '}
            {rank.percent}% benar
          </p>
          <p className="mt-1 text-xs text-slate-500">Kategori: {category}</p>

          <div className="mt-6">
            <ProgressBar value={score} max={total} tone="aurora" showLabel />
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            {stored
              ? '✅ Skor tersimpan ke akunmu dan sudah muncul di papan skor global.'
              : 'Skor tersimpan di perangkat ini. Masuk ke akun agar tampil di papan skor global.'}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button onClick={() => setPhase('intro')} variant="primary">
              Pilih kategori lain
            </Button>
            <Button onClick={share} variant="ghost">
              <Share2 size={14} /> Bagikan hasil
            </Button>
            <Link href="/papan-skor">
              <Button variant="outline">
                <Trophy size={14} /> Papan skor
              </Button>
            </Link>
          </div>

          {shareMessage && <p className="mt-4 text-xs text-cyan-200">{shareMessage}</p>}
        </motion.div>
      </div>
    );
  }

  // ------------------------------- PLAYING -------------------------------
  const isCorrect = selected === current.correctAnswer;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ContentBadge type="fact" size="sm" />
          <span className="font-display text-xs uppercase tracking-[0.3em] text-slate-400">
            {category}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs',
              timeLeft <= 5
                ? 'border-rose-400/50 bg-rose-500/10 text-rose-200'
                : 'border-white/15 bg-white/[0.03] text-slate-200'
            )}
          >
            <Clock size={13} /> {timeLeft}s
          </span>
        </div>

        <div className="mt-5">
          <ProgressBar value={index} max={pool.length} tone="cyan" />
          <p className="mt-2 text-[11px] uppercase tracking-widest text-slate-400">
            Pertanyaan {index + 1} / {pool.length} · {current.difficulty}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mt-6 font-heading text-lg leading-snug text-white sm:text-xl">
              {current.question}
            </h2>

            <div className="mt-5 grid gap-3">
              {current.options.map((option, optionIndex) => {
                const chosen = selected === optionIndex;
                const revealCorrect = selected !== null && optionIndex === current.correctAnswer;
                const revealWrong = chosen && optionIndex !== current.correctAnswer;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answer(optionIndex)}
                    disabled={selected !== null}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition',
                      'border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]',
                      revealCorrect && 'border-emerald-400/60 bg-emerald-400/10 text-emerald-100',
                      revealWrong && 'border-rose-400/60 bg-rose-500/10 text-rose-100',
                      selected !== null && 'cursor-default hover:border-white/10 hover:bg-white/[0.03]'
                    )}
                  >
                    <span>
                      <span className="mr-2 font-display text-xs text-slate-500">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      {option}
                    </span>
                    {revealCorrect && <CheckCircle2 size={16} />}
                    {revealWrong && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'mt-5 rounded-2xl border p-4 text-sm leading-relaxed',
                isCorrect
                  ? 'border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-50'
                  : 'border-amber-400/30 bg-amber-400/[0.07] text-amber-50'
              )}
            >
              <p className="font-heading text-sm">
                {selected === -1 ? '⏰ Waktu habis!' : isCorrect ? '✅ Tepat sekali!' : '❌ Belum tepat.'}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-200">{current.explanation}</p>
              <Button className="mt-4" size="sm" onClick={next}>
                {index + 1 >= pool.length ? 'Lihat hasil' : 'Pertanyaan berikutnya'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
