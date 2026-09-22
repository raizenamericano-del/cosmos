import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="font-display text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>
      )}
      <div
        className={cn(
          'mt-6 h-px w-24 bg-aurora-gradient',
          align === 'center' && 'mx-auto'
        )}
      />
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  tone = 'aurora',
  showLabel = false
}: {
  value: number;
  max?: number;
  tone?: 'aurora' | 'danger' | 'cyan' | 'gold';
  showLabel?: boolean;
}) {
  const percent = Math.round((value / max) * 100);
  const tones: Record<string, string> = {
    aurora: 'bg-aurora-gradient',
    cyan: 'bg-gradient-to-r from-cyan-400 to-sky-500',
    danger: 'bg-gradient-to-r from-amber-400 to-rose-500',
    gold: 'bg-gradient-to-r from-amber-300 to-yellow-500'
  };
  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={cn('h-full rounded-full transition-all duration-500', tones[tone])}
          style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-right text-[10px] uppercase tracking-widest text-slate-400">
          {percent}%
        </p>
      )}
    </div>
  );
}
