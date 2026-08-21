import { useState, useCallback } from 'react';
import { signInWithGoogle, signInWithEmail, registerWithEmail, resetPassword } from '../firebase/auth';
import { useAuth } from '../hooks/useAuth';

export function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleGoogle = useCallback(async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (e) {
      setError('Error con Google: ' + (e.message || 'Inténtalo de nuevo'));
    }
  }, []);

  const handleEmailLogin = useCallback(async () => {
    setError('');
    try {
      await signInWithEmail(email, password);
    } catch (e) {
      setError('Error: ' + (e.message || 'Credenciales incorrectas'));
    }
  }, [email, password]);

  const handleRegister = useCallback(async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    try {
      await registerWithEmail(email, password, displayName);
    } catch (e) {
      setError('Error: ' + (e.message || 'No se pudo crear la cuenta'));
    }
  }, [email, password, confirmPassword, displayName]);

  const handleReset = useCallback(async () => {
    setError('');
    try {
      await resetPassword(email);
      setError('✅ Revisa tu email para restablecer la contraseña');
    } catch (e) {
      setError('Error: ' + (e.message || 'No se pudo enviar el email'));
    }
  }, [email]);

  if (loading) {
    return (
      <div className="app" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'40px',marginBottom:'16px'}}>⏳</div>
          <p style={{color:'var(--text-light)'}}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f5f6fa'}}>
        <div className="card" style={{width:'100%',maxWidth:'420px',padding:'32px'}}>
          <div style={{textAlign:'center',marginBottom:'24px'}}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--green)" strokeWidth="2.5" style={{marginBottom:'12px'}}>
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <h1 style={{color:'var(--primary)',fontSize:'24px',marginBottom:'4px'}}>Finanzas App</h1>
            <p style={{color:'var(--text-light)',fontSize:'14px'}}>Control personal de finanzas</p>
          </div>

          {error && (
            <div style={{background:'var(--red-light)',color:'var(--red)',padding:'10px 12px',borderRadius:'6px',fontSize:'13px',marginBottom:'16px',textAlign:'center'}}>
              ⚠️ {error}
            </div>
          )}

          {mode === 'login' && (
            <>
              <button className="btn btn-primary" style={{width:'100%',marginBottom:'12px',justifyContent:'center'}} onClick={handleGoogle}>
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continuar con Google
              </button>

              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px',color:'var(--text-light)',fontSize:'13px'}}>
                <hr style={{flex:1,border:'none',borderTop:'1px solid var(--border)'}}/>
                <span>o</span>
                <hr style={{flex:1,border:'none',borderTop:'1px solid var(--border)'}}/>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <button className="btn btn-primary" style={{width:'100%',marginTop:'8px'}} onClick={handleEmailLogin}>Entrar</button>

              <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'var(--text-light)'}}>
                ¿No tienes cuenta? <button className="btn btn-ghost btn-sm" onClick={()=>{setMode('register');setError('')}}>Regístrate</button>
              </p>
              <p style={{textAlign:'center',fontSize:'12px',color:'var(--text-light)',marginTop:'8px'}}>
                <button className="btn btn-ghost btn-sm" onClick={()=>setMode('reset')}>¿Olvidaste la contraseña?</button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Tu nombre" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mín. 6 caracteres" required minLength={6} />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Repite la contraseña" required />
              </div>
              <button className="btn btn-primary" style={{width:'100%',marginTop:'8px'}} onClick={handleRegister}>Crear cuenta</button>

              <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'var(--text-light)'}}>
                ¿Ya tienes cuenta? <button className="btn btn-ghost btn-sm" onClick={()=>{setMode('login');setError('')}}>Entrar</button>
              </p>
            </>
          )}

          {mode === 'reset' && (
            <>
              <p style={{fontSize:'13px',color:'var(--text-light)',marginBottom:'16px',textAlign:'center'}}>
                Te enviaremos un email para restablecer tu contraseña.
              </p>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" required />
              </div>
              <button className="btn btn-primary" style={{width:'100%'}} onClick={handleReset}>Enviar enlace</button>

              <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'var(--text-light)'}}>
                <button className="btn btn-ghost btn-sm" onClick={()=>{setMode('login');setError('')}}>Volver al login</button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}