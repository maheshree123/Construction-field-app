import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USER = { email: 'test@test.com', password: '123456' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password. Please try again.' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
