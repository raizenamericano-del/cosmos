import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { SolarSystemExplorer } from '@/components/solar-system/solar-system-explorer';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'Tata Surya 3D Interaktif',
  description:
    'Jelajahi Matahari dan 8 planet dalam simulator 3D interaktif. Klik planet untuk melihat diameter, jarak dari Matahari, suhu, jumlah satelit, dan fun facts uniknya.'
};

export default function TataSuryaPage() {
  return (
    <>
      <PageHero
        eyebrow="📚 Fakta Ilmiah"
        title="Tata Surya 3D Interaktif"
        description="Rotasi, zoom, dan klik setiap planet. Data pada panel detail diambil dari NASA Planetary Fact Sheet — sedangkan ukuran visual pada simulator sengaja tidak berskala agar nyaman dieksplorasi."
        type="fact"
        seed="tata-surya"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <SolarSystemExplorer />
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-cosmos-deep/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Konteks ilmiah"
              title="Mengapa tata surya kita istimewa?"
              description="Matahari menahan 99,86% massa tata surya. Delapan planet terbagi menjadi planet kebumian (Merkurius–Mars) dan raksasa gas/es (Jupiter–Neptunus). Di antaranya ada Sabuk Asteroid, dan di luar Neptunus terbentang Sabuk Kuiper serta Awan Oort."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['4 planet kebumian', 'Permukaan batuan, kerapatan tinggi, sedikit atau tanpa satelit.'],
              ['4 raksasa gas & es', 'Atmosfer tebal hidrogen–helium, sistem cincin, puluhan satelit.'],
              ['Sabuk Asteroid', 'Sisa material pembentuk planet yang gagal bergabung karena gravitasi Jupiter.'],
              ['Awan Oort', 'Bola hipotetis objek es hingga 100.000 AU, asal komet periode panjang.']
            ].map(([title, body], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <div className="glass h-full rounded-2xl p-5">
                  <p className="font-heading text-sm text-white">{title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
