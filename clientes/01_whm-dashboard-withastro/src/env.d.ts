/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { AuthSession } from './lib/auth';

declare global {
  interface Window {
    __CURRENT_USER?: AuthSession;
    toggleLanguage?: () => void;
  }
}