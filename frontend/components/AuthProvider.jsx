'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(typeof window === 'undefined' ? null : localStorage.getItem('bp_token'));

  const value = useMemo(() => ({
    token,
    setAuthToken: (newToken) => {
      setToken(newToken);
      if (newToken) localStorage.setItem('bp_token', newToken);
      else localStorage.removeItem('bp_token');
    }
  }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
