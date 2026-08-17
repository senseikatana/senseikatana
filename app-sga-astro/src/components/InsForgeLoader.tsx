import { useEffect, useState } from 'react';
import { useInventoryStore, useOrdersStore, useCustomersStore } from '../lib/stores';

/**
 * Hydrates all WMS stores from InsForge on first mount.
 * Shows loading state while data is being fetched.
 */
export default function InsForgeLoader({ children }: { children: React.ReactNode }) {
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

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando datos del almacén...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
