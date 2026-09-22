import { NextResponse } from 'next/server';
import { z } from 'zod';
import { planTravel } from '@/lib/travel';
import { BODY_IDS } from '@/lib/validation/travel';

const isKnownBody = (value: string) => (BODY_IDS as readonly string[]).includes(value);

const planSchema = z.object({
  origin: z.string().refine(isKnownBody, { message: 'Titik asal tidak dikenali.' }),
  destination: z.string().refine(isKnownBody, { message: 'Titik tujuan tidak dikenali.' }),
  engine: z.enum(['warp', 'hyperspace', 'lightfold'])
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON.' }, { status: 400 });
  }

  const parsed = planSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Parameter rute tidak valid. Pilih asal, tujuan, dan mesin dari daftar yang tersedia.' },
      { status: 422 }
    );
  }

  const result = planTravel(parsed.data.origin, parsed.data.destination, parsed.data.engine);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ plan: result.plan, fictional: true });
}
