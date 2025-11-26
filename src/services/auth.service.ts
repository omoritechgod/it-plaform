import api from "./api";
import { ApiResponse } from "../types";

export interface LoginData {
  email: string;
  password: string;
  role?: "admin" | "intern";
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  skills?: string[];
  agreement_accepted: boolean;
}

class AuthService {
  async login(data: LoginData): Promise<ApiResponse> {
    const response: ApiResponse = await api.post("/api/login", data);
    if (response.status === true && response.token) {
      localStorage.setItem("auth_token", response.token);
    }
    return response;
  }

  async adminLogin(data: LoginData): Promise<ApiResponse> {
    const response: ApiResponse = await api.post("/api/admin/login", data);

    console.log(response);

    if (response.status === true && response.token) {
      localStorage.setItem("auth_token", response.token);
    }
    return response;
  }

  async signup(data: SignupData): Promise<ApiResponse> {
    const response: ApiResponse = await api.post("/api/register", data);
    if (response.status === true && response.token) {
      localStorage.setItem("auth_token", response.data.token);
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("auth_token");
    }
  }

  async getCurrentUser(): Promise<ApiResponse> {
    const response = await api.get("/auth/me");
    return response.data;
  }
  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  }
  async resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Promise<ApiResponse> {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  }
}

export default new AuthService();
