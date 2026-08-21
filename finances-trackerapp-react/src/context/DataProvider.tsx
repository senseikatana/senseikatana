'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { defaultData as defaultDataObj, sampleData } from '@/data/defaultData';

const LOCAL_KEY = 'finanzas-app-data-v2';
const DEBOUNCE_MS = 500;

// Remove the declare localStorage - we have DOM types now

interface DataContextType {
  data: typeof defaultDataObj;
  setData: (updater: any) => void;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<any>(defaultDataObj);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    try {
      const local = localStorage.getItem(LOCAL_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (mountedRef.current) setDataState({ ...defaultDataObj, ...parsed });
      } else {
        if (mountedRef.current) setDataState(sampleData);
      }
    } catch (e) {}
    if (mountedRef.current) setLoading(false);
    return () => { mountedRef.current = false; };
  }, []);

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
        try {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(toSave));
        } catch {}
        setSaving(false);
      }, DEBOUNCE_MS);

      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, loading, saving, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

