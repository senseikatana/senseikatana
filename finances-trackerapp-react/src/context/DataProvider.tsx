// @ts-nocheck

'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { defaultData as defaultDataObj, sampleData } from '@/data/defaultData';

const LOCAL_KEY = 'finanzas-app-data-v2';
const DEBOUNCE_MS = 500;

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setDataState] = useState(defaultDataObj);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const saveTimeout = useRef(null);
  const pendingRef = useRef(null);

  // Load from localStorage synchronously
  useEffect(() => {
    mountedRef.current = true;
    try {
      const local = localStorage.getItem(LOCAL_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (mountedRef.current) setDataState(parsed);
      } else {
        if (mountedRef.current) setDataState(sampleData);
      }
    } catch {}
    if (mountedRef.current) setLoading(false);
    return () => { mountedRef.current = false; };
  }, []);

  // Check Firebase auth lazily
  useEffect(() => {
    let unsub = null;
    let unsubFirestore = null;

    const checkAuth = async () => {
      try {
        const config = await import('@/firebase/config');
        if (!config.isFirebaseConfigured) return;

        const auth = await import('@/firebase/auth');
        const firestore = await import('@/firebase/firestore');

        unsub = auth.onAuthChange((u) => {
          if (!mountedRef.current) return;
          setUser(u);
          if (u) {
            setLoading(true);
            firestore.fetchUserData(u.uid).then((remote) => {
              if (!mountedRef.current) return;
              if (remote) {
                setDataState(firestore.normalizeData(remote));
              } else {
                try {
                  const local = localStorage.getItem(LOCAL_KEY);
                  const parsed = local ? JSON.parse(local) : sampleData;
                  firestore.saveUserData(u.uid, parsed);
                  setDataState(parsed);
                } catch {
                  setDataState(sampleData);
                }
              }
              setLoading(false);
            }).catch(() => {
              // Firestore offline or error - just use localStorage data
              if (mountedRef.current) setLoading(false);
            });

            unsubFirestore = firestore.subscribeUserData(u.uid, (remote) => {
              if (!mountedRef.current || !remote) return;
              setDataState(firestore.normalizeData(remote));
            });
          } else {
            setLoading(false);
          }
        });
      } catch {}
    };

    checkAuth();

    return () => {
      unsub?.();
      unsubFirestore?.();
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  const setData = useCallback((updater) => {
    setDataState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pendingRef.current = next;

      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        const toSave = pendingRef.current;
        pendingRef.current = null;
        setSaving(true);
        try { localStorage.setItem(LOCAL_KEY, JSON.stringify(toSave)); } catch {}
        if (user) {
          import('@/firebase/firestore').then(({ saveUserData }) => {
            saveUserData(user.uid, toSave).then(() => setSaving(false)).catch(() => setSaving(false));
          });
        } else {
          setSaving(false);
        }
      }, DEBOUNCE_MS);

      return next;
    });
  }, [user]);

  const logout = useCallback(async () => {
    try {
      const { signOutUser } = await import('@/firebase/auth');
      await signOutUser();
    } catch {}
    setUser(null);
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, user, loading, saving, error, logout }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

