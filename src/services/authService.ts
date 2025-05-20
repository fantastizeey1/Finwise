import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

// Define base URL for API
const API_URL = 'http://localhost:3000/api';

// Define API endpoints
const endpoints = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  logout: `${API_URL}/auth/logout`,
};

// Define types for auth data
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  token: string;
}

// Create an axios instance with default config
const authApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject token to requests if available
authApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth service functions
export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await authApi.post(endpoints.login, credentials);
    return response.data;
  },

  // Register user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await authApi.post(endpoints.register, data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
      await authApi.post(endpoints.logout);
    }
    localStorage.removeItem('token');
  },
};

// React Query hooks for auth
export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
  });
};

export default authService;
