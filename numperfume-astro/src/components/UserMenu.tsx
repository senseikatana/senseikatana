import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from '../lib/firebase';

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  if (loading) return null;

  if (!user) {
    return (
      <a
        href="/login"
        className="text-sm font-medium text-warm-700 hover:text-gold-600 transition-colors"
      >
        Iniciar sesion
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-warm-700 hover:text-gold-600 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-warm-200 flex items-center justify-center">
          <span className="text-warm-700 text-xs font-medium">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white border border-warm-200 shadow-lg rounded-xl py-2 z-50">
            <div className="px-4 py-2 border-b border-warm-100">
              <p className="text-sm font-medium text-warm-800 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-warm-700 hover:bg-warm-50 transition-colors"
            >
              Cerrar sesion
            </button>
          </div>
        </>
      )}
    </div>
  );
}
