'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserData, saveUserData, subscribeUserData, normalizeData } from '@/firebase/firestore';
import { defaultData as defaultDataObj } from '@/data/defaultData';

const MIGRATION_KEY = 'finanzas-migration-done-v2';
const DEBOUNCE_MS = 500;
const LOCAL_KEY = 'finanzas-app-data-v2';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [data, setDataState] = useState(defaultDataObj);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Load data on auth change
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      // Not logged in - use localStorage
      try {
        const local = localStorage.getItem(LOCAL_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          if (mountedRef.current) setDataState(normalizeData(parsed));
        }
      } catch {}
      if (mountedRef.current) setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsub = subscribeUserData(user.uid, (remote) => {
      if (!mountedRef.current) return;
      if (remote) {
        const normalized = normalizeData(remote);
        setDataState(normalized);
      }
      setLoading(false);
    });

    // Also do an initial fetch
    fetchUserData(user.uid).then(remote => {
      if (!mountedRef.current) return;
      if (remote) {
        const normalized = normalizeData(remote);
        setDataState(normalized);
      }
      setLoading(false);
    }).catch(e => {
      console.error('Fetch error:', e);
      if (mountedRef.current) {
        setError('Error cargando datos');
        setLoading(false);
      }
    });

    // Migrate localStorage if needed
    const migrate = async () => {
      const migrated = localStorage.getItem(MIGRATION_KEY);
      if (!migrated) {
        try {
          const local = localStorage.getItem(LOCAL_KEY);
          if (local) {
            const parsed = JSON.parse(local);
            await saveUserData(user.uid, parsed);
            localStorage.setItem(MIGRATION_KEY, 'true');
          }
        } catch (e) {
          console.warn('Migration failed:', e);
        }
      }
    };
    migrate();

    return () => unsub();
  }, [user, authLoading]);

  // Save with debounce
  const saveTimeout = useRef(null);
  const pendingRef = useRef(null);

  const setData = useCallback((updater) => {
    setDataState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pendingRef.current = next;

      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        const toSave = pendingRef.current;
        pendingRef.current = null;
        setSaving(true);

        // Save to localStorage
        try {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(toSave));
        } catch {}

        // Save to Firestore if logged in
        if (user) {
          saveUserData(user.uid, toSave)
            .then(() => setSaving(false))
            .catch(e => {
              console.error('Save error:', e);
              setSaving(false);
              setError('Error guardando');
            });
        } else {
          setSaving(false);
        }
      }, DEBOUNCE_MS);

      return next;
    });
  }, [user]);

  // Final save on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      if (pendingRef.current && user) {
        saveUserData(user.uid, pendingRef.current).catch(console.error);
      }
    };
  }, [user]);

  const value = {
    data,
    setData,
    user,
    loading: loading || authLoading,
    saving,
    error,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
