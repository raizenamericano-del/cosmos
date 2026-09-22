import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { SpaceWeatherPanel } from '@/components/weather/space-weather-panel';
import { generateLocationForecasts, generateSpaceWeather } from '@/lib/space-weather';
import { formatDateId } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Prakiraan Cuaca Antariksa',
  description:
    'Prakiraan "cuaca antariksa" bergaya aplikasi cuaca: hujan meteor di Mars, badai plasma di Proxima Centauri, kabut kosmik di luar sabuk Kuiper. Data fiksi dengan dasar astronomi nyata.'
};

export default function CuacaAntariksaPage() {
  const report = generateSpaceWeather();
  const locations = generateLocationForecasts();

  return (
    <>
      <PageHero
        eyebrow="🛸 Fiksi Ilmiah"
        title="Prakiraan Cuaca Antariksa"
        description={`Prakiraan hari ini (${formatDateId(report.date)}) dibangkitkan dengan seed tanggal, sehingga hasilnya konsisten sepanjang hari dan berubah besok. Semua isinya fiksi, tetapi istilahnya nyata.`}
        type="fiction"
        seed="cuaca-antariksa"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SpaceWeatherPanel initialReport={report} initialLocations={locations} />
      </section>
    </>
  );
}
