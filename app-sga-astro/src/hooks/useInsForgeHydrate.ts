import { useEffect, useState } from 'react';
import { useInventoryStore, useOrdersStore, useCustomersStore } from '../lib/stores';

/**
 * Hydrates all WMS stores from InsForge on first mount.
 * Falls back to local seed data if network fails.
 */
export function useInsForgeHydrate() {
  const [ready, setReady] = useState(false);
  const loadInv = useInventoryStore((s) => s.load);
  const loadOrd = useOrdersStore((s) => s.load);
  const loadCus = useCustomersStore((s) => s.load);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.allSettled([loadInv(), loadOrd(), loadCus()]);
      if (!cancelled) setReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  return ready;
}
