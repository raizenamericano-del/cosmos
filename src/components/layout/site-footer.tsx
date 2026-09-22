import Link from 'next/link';
import { ACCOUNT_NAV, EDU_NAV, FICTION_NAV } from '@/lib/navigation';

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-cosmos-deep/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-base font-bold tracking-wide text-white">COSMOS ACADEMY</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Platform eksplorasi alam semesta & peradaban luar angkasa. Konten edukasi disusun dari data
            astronomi resmi (NASA/ESA), sedangkan seluruh konten fiksi ilmiah selalu diberi label 🛸.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Dibangun dengan Next.js 14, TypeScript, Tailwind CSS, React Three Fiber, Framer Motion, Prisma,
            PostgreSQL & NextAuth.
          </p>
        </div>

        <FooterColumn title="📚 Fakta Ilmiah" items={EDU_NAV} />
        <FooterColumn title="🛸 Fiksi Ilmiah" items={FICTION_NAV} />
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.3em] text-slate-400">Akun</p>
          <ul className="mt-4 space-y-2 text-sm">
            {ACCOUNT_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-400 transition hover:text-white">
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/masuk" className="text-slate-400 transition hover:text-white">
                🚀 Masuk / Daftar
              </Link>
            </li>
          </ul>

          <div className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/[0.06] p-3 text-[11px] leading-relaxed text-fuchsia-100">
            Ada 5 easter egg tersembunyi di stasiun ini. Petunjuk pertama: bintang di halaman utama mungkin
            menyimpan sesuatu. 🔭
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Cosmos Academy. Seluruh entri bertanda 🛸 adalah fiksi ilmiah —
            bukan klaim ilmiah.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Sinyal dari Nyx Collective: stabil
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items
}: {
  title: string;
  items: { href: string; label: string; icon: string }[];
}) {
  return (
    <div>
      <p className="font-display text-[11px] uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-slate-400 transition hover:text-white">
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
