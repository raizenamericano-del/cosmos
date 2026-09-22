'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * useState yang tersinkron dengan localStorage.
 * Aman untuk SSR: pembacaan pertama dilakukan setelah mount.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch (error) {
      console.warn(`[Cosmos Academy] Gagal membaca localStorage "${key}"`, error);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`[Cosmos Academy] Gagal menulis localStorage "${key}"`, error);
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, setValue, hydrated, reset };
}
