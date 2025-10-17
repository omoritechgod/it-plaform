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
    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response;
  }

  async adminLogin(data: LoginData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('/auth/admin/login', data);
    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response;
  }

  async signup(data: SignupData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('/register', data);
    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return api.get('/auth/me');
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return api.post('/auth/forgot-password', { email });
  }

  async resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Promise<ApiResponse> {
    return api.post('/auth/reset-password', data);
  }
}

export default new AuthService();