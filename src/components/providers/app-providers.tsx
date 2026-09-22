'use client';

import { SessionProvider } from 'next-auth/react';
import { SoundProvider } from '@/context/sound-context';
import { AchievementProvider } from '@/context/achievement-context';
import { HyperspaceProvider } from '@/context/hyperspace-context';

/**
 * Provider global. Urutan penting:
 * SessionProvider → SoundProvider → AchievementProvider → HyperspaceProvider
 * (AchievementProvider memakai useSession & useSound; HyperspaceProvider memakai achievement).
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SoundProvider>
        <AchievementProvider>
          <HyperspaceProvider>{children}</HyperspaceProvider>
        </AchievementProvider>
      </SoundProvider>
    </SessionProvider>
  );
}
