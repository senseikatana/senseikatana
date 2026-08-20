import { useAuth } from './AuthProvider';

export default function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-4">
        <img
          alt={user.name || 'User'}
          src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'U')}&background=4f46e5&color=fff&size=128`}
          className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-900 dark:text-white">
            <strong className="block font-medium truncate">{user.name || 'Operario'}</strong>
            <span className="text-gray-500 dark:text-gray-400 truncate block">{user.email}</span>
          </p>
        </div>
        <button
          title="Cerrar sesión"
          onClick={signOut}
          className="shrink-0 rounded-md p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
