import { useState, useEffect, createContext } from 'react';
import { User, AuthContextType, UserRole } from '@/types/auth';
import { SERVER_URL } from '@/config/config';

/**
 * Auth context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider props
 */
export type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Auth provider component
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const userData = localStorage.getItem('userData');
      
      if (isAuthenticated && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          // If userData is invalid, clear auth
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userData');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login error', error);
    }

    setIsLoading(false);
    return false;
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole(UserRole.ADMIN);
  };

  const isUser = (): boolean => {
    return hasRole(UserRole.USER);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setUser(null);
    // Redirect to login page
    window.location.href = '/login';
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    hasRole,
    isAdmin,
    isUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 