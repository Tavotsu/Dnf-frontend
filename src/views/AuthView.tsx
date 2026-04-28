import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

export const AuthView = ({ type, navigate, setIsLoggedIn }: { type: 'login' | 'register', navigate: (v: string) => void, setIsLoggedIn: (v: boolean) => void }) => {
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded credentials
  const GENERIC_EMAIL = 'admin@test.com';
  const GENERIC_PASSWORD = 'password123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (email === GENERIC_EMAIL && password === GENERIC_PASSWORD) {
        setIsLoggedIn(true);
        navigate('home');
      } else {
        setError('Credenciales incorrectas. Prueba con admin@test.com / password123');
      }
    } else {
      // For registration mock, just log in
      setIsLoggedIn(true);
      navigate('home');
    }
  };
  
  return (
    <div className="flex-1 flex items-center justify-center bg-surface-low p-6">
      <div className="bg-surface w-full max-w-md p-8 rounded-2xl shadow-xl border border-outline/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            {isLogin ? '¡Bienvenido de vuelta!' : 'Únete a la comunidad'}
          </h2>
          <p className="text-text-variant text-sm">
            {isLogin 
              ? 'Ingresa tus datos para continuar ayudando a las mascotas.' 
              : 'Crea una cuenta para reportar mascotas y contactar a otros usuarios.'}
          </p>
        </div>

        {isLogin && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Credenciales de prueba:</p>
            <p className="text-sm text-text-variant">Email: <span className="font-mono font-bold">{GENERIC_EMAIL}</span></p>
            <p className="text-sm text-text-variant">Pass: <span className="font-mono font-bold">{GENERIC_PASSWORD}</span></p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-error/10 border border-error/20 rounded-xl flex items-start gap-3 text-error">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">Nombre completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                  <User size={18} />
                </div>
                <input type="text" required className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Juan Pérez" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                placeholder="tu@correo.com" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary hover:underline font-medium">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button type="submit" className="w-full bg-primary text-surface py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md shadow-primary/20 mt-2">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-variant">
          {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
          <button onClick={() => navigate(isLogin ? 'register' : 'login')} className="text-primary font-bold hover:underline">
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
