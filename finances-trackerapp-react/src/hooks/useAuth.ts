'use client';

import { useState, useEffect, useCallback } from 'react';
import { isFirebaseConfigured } from '@/firebase/config';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setUser(null);
      setLoading(false);
      return;
    }

    import('@/firebase/auth').then(({ onAuthChange }) => {
      const unsub = onAuthChange((u) => {
        setUser(u);
        setLoading(false);
      });
      return () => unsub();
    });
  }, []);

  const logout = useCallback(async () => {
    if (isFirebaseConfigured) {
      const { signOutUser } = await import('@/firebase/auth');
      await signOutUser();
    }
    setUser(null);
  }, []);

  return { user, loading, logout };
}

