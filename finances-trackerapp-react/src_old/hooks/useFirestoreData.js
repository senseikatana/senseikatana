import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { fetchUserData, saveUserData, subscribeUserData, normalizeData } from '../firebase/firestore';
import { defaultData } from '../data/defaultData';

const MIGRATION_KEY = 'finanzas-migration-done-v2';
const DEBOUNCE_MS = 500;

export function useFirestoreData() {
  const { user, loading: authLoading } = useAuth();
  const [data, setDataState] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);
  const pendingDataRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setDataState(defaultData);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const migrated = localStorage.getItem(MIGRATION_KEY);
        if (!migrated) {
          const localRaw = localStorage.getItem('finanzas-app-data-v2');
          if (localRaw) {
            try {
              const localData = JSON.parse(localRaw);
              await saveUserData(user.uid, localData);
              localStorage.setItem(MIGRATION_KEY, 'true');
            } catch (e) {
              console.warn('Migration parse error, using default:', e);
            }
          }
        }

        const remote = await fetchUserData(user.uid);
        const normalized = normalizeData(remote);
        if (isMountedRef.current) {
          setDataState(normalized);
        }
      } catch (e) {
        console.error('Firestore load error:', e);
        if (isMountedRef.current) {
          setError('Error cargando datos desde la nube');
          setDataState(defaultData);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    loadData();

    const unsub = subscribeUserData(user.uid, (remote) => {
      if (!isMountedRef.current) return;
      if (remote) {
        const normalized = normalizeData(remote);
        setDataState(normalized);
      }
    });

    return () => unsub();
  }, [user, authLoading]);

  const setData = useCallback((updater) => {
    setDataState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pendingDataRef.current = next;

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (!user || !isMountedRef.current) return;
        const toSave = pendingDataRef.current;
        pendingDataRef.current = null;
        setSaving(true);
        saveUserData(user.uid, toSave)
          .then(() => setSaving(false))
          .catch((e) => {
            console.error('Firestore save error:', e);
            setSaving(false);
            setError('Error guardando en la nube');
          });
      }, DEBOUNCE_MS);

      return next;
    });
  }, [user]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (pendingDataRef.current && user) {
        saveUserData(user.uid, pendingDataRef.current).catch(console.error);
      }
    };
  }, [user]);

  return [data, setData, { loading, saving, error }];
}