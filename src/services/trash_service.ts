import api from './api';
import { ApiResponse, User } from '../types';

export interface LoginData {
  email: string;
  password: string;
  role?: 'admin' | 'intern';
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  skills?: string[];
  agreement_accepted: boolean;
}

class AuthService {
  async login(data: LoginData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('/auth/login', data);
    const res = response.data as ApiResponse<{ user: User; token: string }>;
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
    }
    return res;
  }

  async adminLogin(data: LoginData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('api/admin/login', data);
    const res = response.data as ApiResponse<{ user: User; token: string }>;
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
    }
    return res;
  }

  async signup(data: SignupData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('/register', data);
    const res = response.data as ApiResponse<{ user: User; token: string }>;
    if (res.success && res.data?.token) {
      localStorage.setItem('auth_token', res.data.token);
    }
    return res;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get('/auth/me');
    return response.data as ApiResponse<User>;
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data as ApiResponse;
  }

  async resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Promise<ApiResponse> {
    const response = await api.post('/auth/reset-password', data);
    return response.data as ApiResponse;
  }
}

export default new AuthService();