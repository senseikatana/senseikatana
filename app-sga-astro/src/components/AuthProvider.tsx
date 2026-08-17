import type { ReactNode } from 'react';
import { useSession, signIn, signUp, signOut } from '../lib/auth-client';

export function useAuth() {
  const { data: sessionData, isPending: loading } = useSession();
  
  return {
    user: sessionData?.user ?? null,
    loading,
    signIn: async (email: string, password: string) => {
      const { data, error } = await signIn.email({ email, password });
      if (error) return { error: error.message };
      return {};
    },
    signUp: async (email: string, password: string, name: string) => {
      const { data, error } = await signUp.email({ email, password, name });
      if (error) return { error: error.message };
      return {};
    },
    signOut: async () => {
      await signOut();
      window.location.href = '/signin';
    },
    signInWithOAuth: async (provider: 'google' | 'github' | 'microsoft') => {
      await signIn.social({ provider: provider as any });
    }
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Better Auth's useSession hook is globally stateful, so we don't strictly need Context.
  return <>{children}</>;
}
