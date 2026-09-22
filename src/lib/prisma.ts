import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma Client.
 *
 * PENTING: instance dibuat LAMBAT (lazy) hanya ketika `DATABASE_URL` tersedia.
 * Jika variabel tersebut kosong, aplikasi berjalan dalam MODE DEMO dan seluruh
 * repository otomatis memakai data statis di `src/lib/data/*` — sehingga proyek
 * bisa dijalankan/di-deploy tanpa database sama sekali.
 */
const globalForPrisma = globalThis as unknown as {
  __cosmosPrisma?: PrismaClient | null;
};

function createClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
    });
  } catch (error) {
    console.warn('[Cosmos Academy] Gagal membuat Prisma Client, memakai data statis.', error);
    return null;
  }
}

export const prisma: PrismaClient | null = globalForPrisma.__cosmosPrisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__cosmosPrisma = prisma;
}

/** Apakah aplikasi berjalan dengan database aktif? */
export function isDatabaseEnabled(): boolean {
  return Boolean(prisma);
}

/**
 * Jalankan query database dengan pengaman: jika database tidak aktif atau
 * query gagal, kembalikan `null` agar pemanggil memakai fallback statis.
 */
export async function safeQuery<T>(
  label: string,
  query: () => Promise<T>
): Promise<T | null> {
  if (!prisma) return null;
  try {
    return await query();
  } catch (error) {
    console.warn(`[Cosmos Academy] Query database gagal (${label}), memakai data statis.`, error);
    return null;
  }
}

export function databaseMode(): 'database' | 'demo' {
  return prisma ? 'database' : 'demo';
}
