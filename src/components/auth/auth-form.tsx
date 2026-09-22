'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Github, LogIn, Rocket, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/badge';
import { useSound } from '@/context/sound-context';
import { cn } from '@/lib/utils';

export function AuthForm({
  oauth,
  databaseEnabled
}: {
  oauth: { google: boolean; github: boolean };
  databaseEnabled: boolean;
}) {
  const [mode, setMode] = useState<'masuk' | 'daftar'>('masuk');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { play } = useSound();

  const callbackUrl = params.get('callbackUrl') ?? '/profil';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);
    play('click');

    try {
      if (mode === 'daftar') {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = (await response.json()) as { error?: string; demoMode?: boolean };

        if (!response.ok) {
          if (data.demoMode) {
            setMessage({
              type: 'ok',
              text: 'Mode demo: akun tidak dibuat di database. Kamu tetap bisa masuk dengan email ini langsung.'
            });
          } else {
            setMessage({ type: 'err', text: data.error ?? 'Pendaftaran gagal.' });
            return;
          }
        } else {
          setMessage({ type: 'ok', text: 'Pendaftaran berhasil! Masuk otomatis…' });
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl
      });

      if (result?.error) {
        setMessage({
          type: 'err',
          text:
            'Email atau password salah. Di mode demo (tanpa database), gunakan email apa pun dengan password minimal 6 karakter.'
        });
        return;
      }

      play('success');
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setMessage({ type: 'err', text: 'Terjadi kesalahan jaringan. Coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-strong mx-auto w-full max-w-md rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-aurora-gradient text-lg shadow-glow">
          🚀
        </span>
        <div>
          <p className="font-display text-sm text-white">Gerbang Stasiun</p>
          <p className="text-[11px] text-slate-400">Masuk untuk menyimpan progresmu</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Chip active={mode === 'masuk'} onClick={() => setMode('masuk')}>
          Masuk
        </Chip>
        <Chip active={mode === 'daftar'} onClick={() => setMode('daftar')}>
          Daftar akun
        </Chip>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === 'daftar' && (
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Nama penjelajah</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              placeholder="Kapten Alya"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-cosmos-deep px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none"
            />
          </label>
        )}

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="cadet@cosmos.academy"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-cosmos-deep px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            Password (min. 6 karakter)
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            placeholder="••••••"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-cosmos-deep px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none"
          />
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          <LogIn size={15} /> {loading ? 'Memproses…' : mode === 'masuk' ? 'Masuk' : 'Daftar & masuk'}
        </Button>
      </form>

      {(oauth.google || oauth.github) && (
        <>
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500">
            <span className="h-px flex-1 bg-white/10" /> atau <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-3">
            {oauth.google && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => signIn('google', { callbackUrl })}
              >
                <Rocket size={15} /> Lanjutkan dengan Google
              </Button>
            )}
            {oauth.github && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => signIn('github', { callbackUrl })}
              >
                <Github size={15} /> Lanjutkan dengan GitHub
              </Button>
            )}
          </div>
        </>
      )}

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'mt-5 rounded-2xl border p-3 text-xs leading-relaxed',
            message.type === 'ok'
              ? 'border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-100'
              : 'border-rose-400/30 bg-rose-500/[0.07] text-rose-100'
          )}
        >
          {message.text}
        </motion.p>
      )}

      <div
        className={cn(
          'mt-6 rounded-2xl border p-4 text-[11px] leading-relaxed',
          databaseEnabled
            ? 'border-white/10 bg-white/[0.03] text-slate-400'
            : 'border-amber-400/25 bg-amber-400/[0.06] text-amber-100'
        )}
      >
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck size={13} />
          {databaseEnabled ? 'Database aktif' : 'Mode demo (tanpa database)'}
        </p>
        {databaseEnabled ? (
          <p className="mt-2">
            Akun sungguhan: password di-hash bcrypt, sesi JWT, dan progres (quiz, bookmark, achievement)
            tersimpan di PostgreSQL. Akun demo contoh: <code>cadet@cosmos.academy</code> /{' '}
            <code>cosmos123</code>.
          </p>
        ) : (
          <p className="mt-2">
            Database belum dikonfigurasi, jadi masuk memakai email apa pun (password ≥ 6 karakter). Progres
            disimpan di perangkat ini. Isi <code>DATABASE_URL</code> untuk mengaktifkan akun sungguhan.
          </p>
        )}
      </div>
    </div>
  );
}
