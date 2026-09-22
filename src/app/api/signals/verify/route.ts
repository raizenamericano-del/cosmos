import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSignalsWithAnswers } from '@/lib/repositories/content';
import { isDecodeCorrect } from '@/lib/ciphers';

export const dynamic = 'force-dynamic';

const verifySchema = z.object({
  signalId: z.string().min(1),
  answer: z.string().max(600)
});

/**
 * POST /api/signals/verify
 * Verifikasi jawaban decode. Pesan terdekode hanya dikirim ke klien SETELAH
 * jawaban benar, sehingga pemain tidak bisa membaca "bocoran" dari jaringan.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON.' }, { status: 400 });
  }

  const parsed = verifySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Data tidak valid.' }, { status: 422 });
  }

  const signals = await getSignalsWithAnswers();
  const signal = signals.find((item) => item.id === parsed.data.signalId);
  if (!signal) {
    return NextResponse.json({ error: 'Sinyal tidak ditemukan.' }, { status: 404 });
  }

  const correct = isDecodeCorrect(parsed.data.answer, signal.decodedMessage);

  return NextResponse.json({
    correct,
    sender: signal.sender,
    rewardBadge: signal.rewardBadge,
    decodedMessage: correct ? signal.decodedMessage : null,
    hint: correct ? null : signal.hint
  });
}
