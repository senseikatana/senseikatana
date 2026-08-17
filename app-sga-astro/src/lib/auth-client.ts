import { createAuthClient } from "@neondatabase/auth";

export const authClient = createAuthClient({
  baseURL: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.PUBLIC_NEON_AUTH_URL : '',
});

export const { useSession, signIn, signUp, signOut } = authClient;
