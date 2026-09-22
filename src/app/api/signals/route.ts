import { NextResponse } from 'next/server';
import { getPublicSignals } from '@/lib/repositories/content';

export const revalidate = 600;

/**
 * GET /api/signals
 * Daftar sinyal TANPA pesan terdekode — verifikasi jawaban ada di
 * POST /api/signals/verify agar tidak ada jawaban yang bocor lewat jaringan.
 */
export async function GET() {
  const signals = await getPublicSignals();
  return NextResponse.json({ total: signals.length, signals });
}
