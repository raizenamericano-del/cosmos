import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/page-hero';
import { AuthForm } from '@/components/auth/auth-form';
import { OAUTH_ENABLED } from '@/lib/auth';
import { isDatabaseEnabled } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Masuk & Daftar',
  description:
    'Masuk ke Cosmos Academy untuk menyimpan bookmark artikel, riwayat kuis, dan achievement di akunmu.'
};

export default function MasukPage() {
  return (
    <>
      <PageHero
        eyebrow="👤 Akun Penjelajah"
        title="Masuk ke stasiun"
        description="Dengan akun, skormu masuk papan skor global, bookmark tersimpan di database, dan achievement tersinkron di semua perangkat."
        seed="masuk"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Suspense fallback={<div className="glass mx-auto h-96 max-w-md rounded-3xl" />}>
          <AuthForm oauth={OAUTH_ENABLED} databaseEnabled={isDatabaseEnabled()} />
        </Suspense>
      </section>
    </>
  );
}
