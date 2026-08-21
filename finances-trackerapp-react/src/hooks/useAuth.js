'use client';

import { useState, useEffect, useCallback } from 'react';
import { isFirebaseConfigured } from '@/firebase/config';

// Mock auth if Firebase is not configured
const mockUser = null;

export function useAuth() {
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setUser(mockUser);
      setLoading(false);
      return;
    }

    // Only import auth if Firebase is configured
    const loadAuth = async () => {
      try {
        const { onAuthChange } = await import('@/firebase/auth');
        const unsub = onAuthChange((u) => {
          if (u) {
            setUser({ uid: u.uid, email: u.email, displayName: u.displayName });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsub();
      } catch (e) {
        console.warn('Auth load failed:', e.message);
        setUser(null);
        setLoading(false);
      }
    };

    const unsubPromise = loadAuth();
    return () => { unsubPromise.then(fn => fn && fn()); };
  }, []);

  const logout = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    try {
      const { signOutUser } = await import('@/firebase/auth');
      await signOutUser();
    } catch {}
  }, []);

  return { user, loading, logout };
}

