// src/services/sheet-sync.service.ts
// Stub implementation for sheet sync service

export interface SyncResult {
  error?: string;
  lastCodeGenerated?: string;
}

export async function importProductsFromSheet(): Promise<SyncResult> {
  // TODO: Implement actual Google Sheets sync logic
  console.log('Sheet sync not yet implemented');
  
  return {
    error: 'Sheet sync not configured',
    lastCodeGenerated: undefined
  };
}
