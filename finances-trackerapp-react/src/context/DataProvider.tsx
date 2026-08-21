'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { defaultData as defaultDataObj, sampleData } from '@/data/defaultData';
import { isFirebaseConfigured } from '@/firebase/config';
import { fetchUserData, saveUserData, subscribeUserData, normalizeData } from '@/firebase/firestore';

const LOCAL_KEY = 'finanzas-app-data-v2';
const DEBOUNCE_MS = 500;

interface DataContextType {
  data: typeof defaultDataObj;
  setData: (updater: any) => void;
  user: any | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  logout: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<any>(defaultDataObj);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  // Auth state listener
  useEffect(() => {
    mountedRef.current = true;
    if (!isFirebaseConfigured) {
      // No Firebase: load from localStorage
      try {
        const local = localStorage.getItem(LOCAL_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          if (mountedRef.current) setDataState({ ...defaultDataObj, ...parsed });
        } else {
          if (mountedRef.current) setDataState(sampleData);
        }
      } catch {}
      if (mountedRef.current) setLoading(false);
      return () => { mountedRef.current = false; };
    }

    // Firebase: listen to auth state
    import('@/firebase/auth').then(({ onAuthChange }) => {
      const unsub = onAuthChange((u) => {
        if (!mountedRef.current) return;
        setUser(u);
        if (u) {
          // Logged in: load from Firestore
          setLoading(true);
          fetchUserData(u.uid).then((remote) => {
            if (!mountedRef.current) return;
            if (remote) {
              setDataState(normalizeData(remote));
            } else {
              // First login: migrate localStorage data
              try {
                const local = localStorage.getItem(LOCAL_KEY);
                if (local) {
                  const parsed = JSON.parse(local);
                  saveUserData(u.uid, parsed);
                  setDataState({ ...defaultDataObj, ...parsed });
                } else {
                  setDataState(sampleData);
                  saveUserData(u.uid, sampleData);
                }
              } catch {
                setDataState(sampleData);
              }
            }
            setLoading(false);
          }).catch((e) => {
            console.error('Firestore load error:', e);
            if (mountedRef.current) {
              setError('Error cargando datos');
              setLoading(false);
            }
          });

          // Subscribe to realtime updates
          const unsubFirestore = subscribeUserData(u.uid, (remote) => {
            if (!mountedRef.current || !remote) return;
            setDataState(normalizeData(remote));
          });

          return () => unsubFirestore();
        } else {
          // Not logged in: load from localStorage
          try {
            const local = localStorage.getItem(LOCAL_KEY);
            if (local) {
              const parsed = JSON.parse(local);
              setDataState({ ...defaultDataObj, ...parsed });
            } else {
              setDataState(sampleData);
            }
          } catch {}
          setLoading(false);
        }
      });
      return () => unsub();
    });

    return () => { mountedRef.current = false; };
  }, []);

  // Save with debounce
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<any>(null);

  const setData = useCallback((updater: any) => {
    setDataState((prev: any) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pendingRef.current = next;

      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        const toSave = pendingRef.current;
        pendingRef.current = null;
        setSaving(true);

        // Always save to localStorage
        try {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(toSave));
        } catch {}

        // Also save to Firestore if logged in
        if (user && isFirebaseConfigured) {
          saveUserData(user.uid, toSave)
            .then(() => setSaving(false))
            .catch((e) => {
              console.error('Firestore save error:', e);
              setSaving(false);
            });
        } else {
          setSaving(false);
        }
      }, DEBOUNCE_MS);

      return next;
    });
  }, [user]);

  const logout = useCallback(async () => {
    if (isFirebaseConfigured) {
      const { signOutUser } = await import('@/firebase/auth');
      await signOutUser();
    }
    setUser(null);
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      if (pendingRef.current && user && isFirebaseConfigured) {
        saveUserData(user.uid, pendingRef.current).catch(console.error);
      }
    };
  }, [user]);

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

