import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { BlackHoleExplorer } from '@/components/black-hole/black-hole-explorer';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'Black Hole Explorer',
  description:
    'Ubah massa lubang hitam dan lihat ukuran event horizon berubah secara real-time. Dilengkapi penjelasan event horizon, singularitas, radiasi Hawking, dan piringan akresi.'
};

export default function LubangHitamPage() {
  return (
    <>
      <PageHero
        eyebrow="📚 Fakta Ilmiah · Fisika Ekstrem"
        title="Black Hole Explorer"
        description="Sebuah lubang hitam bukan 'penyedot' seperti di film. Ia adalah wilayah ruang-waktu dengan gravitasi yang menang atas cahaya. Geser massa di bawah untuk melihat bagaimana radius Schwarzschild, suhu Hawking, dan gaya pasang berubah."
        type="fact"
        seed="lubang-hitam"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <BlackHoleExplorer />
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-cosmos-deep/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Ringkasan rumus"
              title="Tiga angka yang paling sering ditanyakan"
              description="Semua nilai di bawah dihitung di peramban kamu secara real-time dari rumus relativitas umum — bukan tabel statis."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                'Radius Schwarzschild',
                'R_s = 2GM/c²',
                'Batas event horizon. Untuk massa Matahari hasilnya hanya ±2,95 km — lebih kecil dari kota Jakarta.'
              ],
              [
                'Suhu Hawking',
                'T = ħc³ / (8πGMk_B)',
                'Lubang hitam bermassa bintang bersuhu ±10⁻⁸ K, jauh lebih dingin dari ruang hampa antar bintang.'
              ],
              [
                'Waktu penguapan',
                't ≈ 2,1×10⁶⁷ × M³ tahun',
                'Lubang hitam bermassa Matahari butuh 10⁶⁷ tahun untuk menguap — alam semesta belum setua itu.'
              ]
            ].map(([title, formula, body], index) => (
              <Reveal key={title} delay={index * 0.07}>
                <div className="glass h-full rounded-2xl p-5">
                  <p className="font-heading text-sm text-white">{title}</p>
                  <p className="mt-3 rounded-xl border border-white/10 bg-cosmos-deep px-3 py-2 font-mono text-xs text-cyan-200">
                    {formula}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
