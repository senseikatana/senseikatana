// @ts-nocheck
'use client';

import { useState, useCallback } from 'react';
import { isFirebaseConfigured } from '@/firebase/config';
import { signInWithGoogle, signInWithEmail, registerWithEmail, resetPassword } from '@/firebase/auth';
import { useData } from '@/context/DataProvider';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useData();
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleGoogle = useCallback(async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setError('Error con Google: ' + (e.message || 'Intentalo de nuevo'));
    }
  }, []);

  const handleEmailLogin = useCallback(async () => {
    setError('');
    try {
      await signInWithEmail(email, password);
    } catch (e: any) {
      setError('Error: ' + (e.message || 'Credenciales incorrectas'));
    }
  }, [email, password]);

  const handleRegister = useCallback(async () => {
    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }
    setError('');
    try {
      await registerWithEmail(email, password, displayName);
    } catch (e: any) {
      setError('Error: ' + (e.message || 'No se pudo crear la cuenta'));
    }
  }, [email, password, confirmPassword, displayName]);

  const handleReset = useCallback(async () => {
    setError('');
    try {
      await resetPassword(email);
      setError('✅ Revisa tu email para restablecer la contrasena');
    } catch (e: any) {
      setError('Error: ' + (e.message || 'No se pudo enviar el email'));
    }
  }, [email]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  // If not logged in and Firebase is configured
  if (!user && isFirebaseConfigured) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">💰</div>
            <h1 className="text-2xl font-bold mb-2" style={{color:'var(--color-primary)'}}>Finanzas App</h1>
            <p className="text-muted-foreground">Control total</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              ⚠️ {error}
            </div>
          )}

          {mode === 'login' && (
            <>
              <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 px-4 py-3 mb-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-muted-foreground">o</span></div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className="input" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Contrasena</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input" required />
              </div>
              <button onClick={handleEmailLogin} className="w-full py-3 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>Entrar</button>

              <p className="text-center mt-4 text-sm text-muted-foreground">
                No tienes cuenta?{' '}
                <button onClick={() => setMode('register')} className="text-blue underline">Registrate</button>
              </p>
              <p className="text-center mt-2">
                <button onClick={() => setMode('reset')} className="text-xs text-muted-foreground hover:text-foreground">Olvidaste la contrasena?</button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Tu nombre" className="input" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className="input" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Contrasena</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 caracteres" className="input" required minLength={6} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Confirmar</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repite la contrasena" className="input" required />
              </div>
              <button onClick={handleRegister} className="w-full py-3 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>Crear cuenta</button>
              <p className="text-center mt-4 text-sm text-muted-foreground">
                Ya tienes cuenta?{' '}
                <button onClick={() => setMode('login')} className="text-blue underline">Entrar</button>
              </p>
            </>
          )}

          {mode === 'reset' && (
            <>
              <p className="text-sm text-muted-foreground mb-4 text-center">Te enviaremos un email.</p>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className="input" required />
              </div>
              <button onClick={handleReset} className="w-full py-3 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>Enviar enlace</button>
              <p className="text-center mt-4 text-sm text-muted-foreground">
                <button onClick={() => setMode('login')} className="text-blue underline">Volver</button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // If Firebase is not configured, allow access without login
  // If user is logged in, show children
  return <>{children}</>;
}

