import { cn } from '@/lib/utils';
import type { ContentType } from '@/lib/types';

/** Label wajib: 📚 FAKTA ILMIAH / 🛸 FIKSI ILMIAH */
export function ContentBadge({
  type,
  className,
  size = 'md'
}: {
  type: ContentType;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const isFact = type === 'fact';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-display uppercase tracking-[0.18em]',
        size === 'sm' ? 'px-2.5 py-1 text-[9px]' : 'px-3 py-1.5 text-[10px]',
        isFact
          ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
          : 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200',
        className
      )}
    >
      {isFact ? '📚' : '🛸'} {isFact ? 'Fakta Ilmiah' : 'Fiksi Ilmiah'}
    </span>
  );
}

export function Chip({
  children,
  active,
  onClick,
  className
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs transition-all duration-200',
        active
          ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100 shadow-glow-cyan'
          : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white',
        className
      )}
    >
      {children}
    </button>
  );
}

export function StatusPill({
  label,
  tone = 'neutral'
}: {
  label: string;
  tone?: 'neutral' | 'good' | 'warn' | 'bad' | 'mystery';
}) {
  const tones: Record<string, string> = {
    neutral: 'border-slate-400/30 bg-slate-400/10 text-slate-200',
    good: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
    warn: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
    bad: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
    mystery: 'border-violet-400/40 bg-violet-400/10 text-violet-200'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
        tones[tone]
      )}
    >
      {label}
    </span>
  );
}
