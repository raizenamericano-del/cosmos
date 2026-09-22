import type { ContentType } from '@/lib/types';
import { ContentBadge } from '@/components/ui/badge';
import { CosmicBackdrop } from '@/components/ui/cosmic-backdrop';

/** Header standar untuk halaman selain beranda — selalu membawa label fakta/fiksi. */
export function PageHero({
  eyebrow,
  title,
  description,
  type,
  seed,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  type?: ContentType;
  seed?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <CosmicBackdrop density={80} seed={seed ?? title} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">
            {eyebrow}
          </p>
          {type && <ContentBadge type={type} size="sm" />}
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {description}
        </p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
