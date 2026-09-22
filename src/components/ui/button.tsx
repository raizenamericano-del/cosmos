'use client';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline' | 'danger' | 'fiction';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-aurora-gradient text-white shadow-glow hover:brightness-110 focus-visible:outline-cyan-300',
  fiction:
    'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-[0_0_24px_rgba(192,132,252,0.35)] hover:brightness-110',
  ghost: 'bg-white/[0.03] text-slate-200 hover:bg-white/[0.08] border border-white/10',
  outline: 'border border-cyan-400/40 text-cyan-100 hover:bg-cyan-400/10',
  danger: 'bg-rose-500/90 text-white hover:bg-rose-500'
};

const SIZES: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm'
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-wide transition-all duration-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
