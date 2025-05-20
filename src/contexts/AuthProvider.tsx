import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../features/auth/authSlice';
import authService, { AuthResponse, LoginCredentials, RegisterData } from '../services/authService';
import { useLogin, useLogout, useRegister } from '../services/authService';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthResponse['user'] | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
        setIsAuthenticated(true);
        dispatch(loginSuccess({ user: userData, token }));
      } catch (error) {
        // If there's an error parsing the user, clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    }
  }, [dispatch]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const response = await loginMutation.mutateAsync(credentials);

      // Save user data to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Update state
      setUser(response.user);
      setIsAuthenticated(true);

      // Update Redux state
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Login failed'));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const response = await registerMutation.mutateAsync(data);

      // Save user data to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Update state
      setUser(response.user);
      setIsAuthenticated(true);

      // Update Redux state
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Registration failed'));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logoutMutation.mutateAsync();

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Update state
      setUser(null);
      setIsAuthenticated(false);

      // Update Redux state
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the logout API call fails, we still want to clear local state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      dispatch(logout());
    }
  };

  const value = {
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    isAuthenticated,
    user,
    login,
    register,
    signOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // if (context === undefined) {
  //   throw new Error('useAuth must be used within an AuthProvider');
  // }
  if (context === undefined) {
    // Temporary fallback for development
    return {
      login: async () => {
        console.log('Auth disabled — fake login success.');
      },
      register: async () => {
        console.log('Auth disabled — fake register success.');
      },
      signOut: async () => {
        console.log('Auth disabled — fake sign out success.');
      },
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    };
  }

  return context;
};

export default AuthProvider;
