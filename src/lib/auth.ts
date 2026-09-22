import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

/**
 * Konfigurasi NextAuth (Auth.js v4-compatible).
 * - Strategi sesi: JWT (wajib untuk provider Credentials).
 * - Adapter Prisma hanya dipasang bila DATABASE_URL tersedia.
 * - Login email/password memakai bcrypt; pendaftaran lewat POST /api/auth/register.
 * - Bila database tidak aktif, mode demo menerima email apa pun (ditandai jelas di UI).
 */

const oauthProviders = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  oauthProviders.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  oauthProviders.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  );
}

export const authOptions: NextAuthOptions = {
  ...(prisma ? { adapter: PrismaAdapter(prisma) } : {}),
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: '/login'
  },
  secret:
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV === 'production'
      ? undefined
      : 'cosmos-academy-dev-secret-jangan-dipakai-di-produksi'),
  providers: [
    ...oauthProviders,
    CredentialsProvider({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? '';
        if (!email || password.length < 6) return null;

        // ---- Mode demo (tanpa database): identitas sesi sementara ----
        if (!prisma) {
          const handle = email.split('@')[0].replace(/[^a-z0-9._-]/gi, '') || 'cadet';
          return {
            id: `demo-${Buffer.from(email).toString('hex').slice(0, 12)}`,
            email,
            name: handle.charAt(0).toUpperCase() + handle.slice(1),
            image: null,
            role: 'demo'
          };
        }

        // ---- Mode database: verifikasi hash bcrypt ----
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.role = (user as { role?: string }).role ?? 'cadet';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.uid as string) ?? token.sub ?? 'demo';
        session.user.role = (token.role as string) ?? 'cadet';
      }
      return session;
    }
  },
  debug: false
};

export const OAUTH_ENABLED = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  github: Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET)
};
