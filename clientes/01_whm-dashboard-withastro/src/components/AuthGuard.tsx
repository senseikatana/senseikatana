import { useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthProvider';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const publicPaths = ['/signin', '/signup', '/ForgotPassword', '/landing'];
  const isPublic = publicPaths.includes(currentPath);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      window.location.replace('/signin');
    }
  }, [user, loading, isPublic]);

  if (isPublic) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
