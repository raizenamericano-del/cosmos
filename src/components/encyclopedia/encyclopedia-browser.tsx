'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Article, ArticleCategory, ContentType } from '@/lib/types';
import { ContentBadge, Chip } from '@/components/ui/badge';
import { GlowPanel } from '@/components/ui/glow-panel';
import { AlienGlitch } from '@/components/encyclopedia/alien-glitch';
import { truncate } from '@/lib/utils';
import { useSound } from '@/context/sound-context';

const SORTS = [
  { id: 'terbaru', label: 'Terbaru' },
  { id: 'terlama', label: 'Terlama' },
  { id: 'judul', label: 'Judul A-Z' },
  { id: 'baca', label: 'Paling singkat' }
] as const;

export function EncyclopediaBrowser({
  articles,
  categories
}: {
  articles: Article[];
  categories: ArticleCategory[];
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'semua' | ArticleCategory>('semua');
  const [type, setType] = useState<'semua' | ContentType>('fact');
  const [sort, setSort] = useState<(typeof SORTS)[number]['id']>('terbaru');
  const [glitch, setGlitch] = useState(false);
  const { play } = useSound();

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim().toLowerCase() === 'alien') {
      setGlitch((prev) => !prev);
      play('error');
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = articles.filter((article) => {
      const matchesQuery =
        query.length === 0 ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      const matchesCategory = category === 'semua' || article.category === category;
      const matchesType = type === 'semua' || article.type === type;
      return matchesQuery && matchesCategory && matchesType;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'judul') return a.title.localeCompare(b.title, 'id');
      if (sort === 'baca') return a.readTime - b.readTime;
      if (sort === 'terlama') return a.createdAt.localeCompare(b.createdAt);
      return b.createdAt.localeCompare(a.createdAt);
    });

    return result;
  }, [articles, category, search, sort, type]);

  return (
    <div>
      <AlienGlitch trigger={glitch} />

      <div className="glass-strong rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <label className="relative block">
            <span className="sr-only">Cari artikel</span>
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Cari planet, black hole, nebula… (coba ketik: alien)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-400">
              <SlidersHorizontal size={12} /> Dunia
            </span>
            <Chip active={type === 'fact'} onClick={() => setType('fact')}>
              📚 Fakta Ilmiah
            </Chip>
            <Chip active={type === 'fiction'} onClick={() => setType('fiction')}>
              🛸 Fiksi Ilmiah
            </Chip>
            <Chip active={type === 'semua'} onClick={() => setType('semua')}>
              Semua
            </Chip>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Kategori</span>
            <Chip active={category === 'semua'} onClick={() => setCategory('semua')}>
              Semua
            </Chip>
            {categories.map((item) => (
              <Chip key={item} active={category === item} onClick={() => setCategory(item)}>
                {item}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Urutkan</span>
            {SORTS.map((item) => (
              <Chip key={item.id} active={sort === item.id} onClick={() => setSort(item.id)}>
                {item.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Menampilkan <span className="text-white">{filtered.length}</span> dari {articles.length} entri arsip.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
          >
            <Link href={`/ensiklopedia/${article.slug}`} className="block h-full">
              <GlowPanel
                className="flex h-full flex-col p-5"
                glowColor={
                  article.type === 'fact' ? 'rgba(56,189,248,0.28)' : 'rgba(192,132,252,0.3)'
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <ContentBadge type={article.type} size="sm" />
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">
                    {article.readTime} mnt
                  </span>
                </div>

                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-cyan-200/70">
                  {article.category}
                </p>
                <h3 className="mt-2 font-heading text-base leading-snug text-white">{article.title}</h3>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-400">
                  {truncate(article.summary, 132)}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {article.funFacts.slice(0, 2).map((fact) => (
                    <li key={fact} className="flex gap-2 text-[11px] leading-relaxed text-slate-400">
                      <span className="text-cyan-300">◆</span>
                      <span>{truncate(fact, 74)}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-4 text-xs text-cyan-200">Baca selengkapnya →</span>
              </GlowPanel>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass mt-6 rounded-3xl p-10 text-center">
          <p className="text-3xl">🛰️</p>
          <p className="mt-3 font-heading text-base text-white">Tidak ada entri yang cocok</p>
          <p className="mt-2 text-sm text-slate-400">
            Coba kata kunci lain, atau ubah filter dunia/kategori.
          </p>
        </div>
      )}
    </div>
  );
}
