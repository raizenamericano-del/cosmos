import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(60),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter').max(72)
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON.' }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? 'Data pendaftaran tidak valid.' },
      { status: 422 }
    );
  }

  if (!prisma) {
    return NextResponse.json(
      {
        error:
          'Mode demo aktif: database belum dikonfigurasi. Kamu tetap bisa masuk memakai email apa pun (password ≥ 6 karakter) dan progres disimpan di perangkat ini.',
        demoMode: true
      },
      { status: 503 }
    );
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ error: 'Email sudah terdaftar. Silakan masuk.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email: normalizedEmail, passwordHash },
    select: { id: true, name: true, email: true, createdAt: true }
  });

  return NextResponse.json({ user, message: 'Pendaftaran berhasil. Silakan masuk.' }, { status: 201 });
}
