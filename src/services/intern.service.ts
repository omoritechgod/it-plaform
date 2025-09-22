import api from './api';
import { ApiResponse, SkillTest, Project, Wallet, Transaction, WithdrawalRequest } from '../types';

export interface ApplicationData {
  name: string;
  email: string;
  password: string;
  skills: string[];
  agreement_accepted: boolean;
  affirmation_video?: File;
}

export interface WithdrawalData {
  amount: number;
  bank_account: {
    account_number: string;
    bank_name: string;
    account_name: string;
    bank_code: string;
  };
}

class InternService {
  // Application
  async submitApplication(data: ApplicationData): Promise<ApiResponse> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'skills') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'affirmation_video' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });
    
    return api.post('/intern/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async signAgreement(): Promise<ApiResponse> {
    return api.post('/intern/sign-agreement');
  }

  // Skill Tests
  async getAvailableTests(): Promise<ApiResponse<SkillTest[]>> {
    return api.get('/intern/tests/available');
  }

  async startTest(testId: string): Promise<ApiResponse<{ test: SkillTest; session_id: string }>> {
    return api.post(`/intern/tests/${testId}/start`);
  }

  async submitTest(sessionId: string, answers: Record<string, string>): Promise<ApiResponse> {
    return api.post(`/intern/tests/submit`, { session_id: sessionId, answers });
  }

  async getTestResults(): Promise<ApiResponse<any[]>> {
    return api.get('/intern/tests/results');
  }

  // Learning & Progress
  async getProgress(): Promise<ApiResponse<any>> {
    return api.get('/intern/progress');
  }

  async updateStreak(): Promise<ApiResponse> {
    return api.post('/intern/progress/streak');
  }

  async submitModuleCompletion(moduleId: string): Promise<ApiResponse> {
    return api.post(`/intern/modules/${moduleId}/complete`);
  }

  async getProjects(): Promise<ApiResponse<Project[]>> {
    return api.get('/intern/projects');
  }

  async applyToProject(projectId: string): Promise<ApiResponse> {
    return api.post(`/intern/projects/${projectId}/apply`);
  }

  async submitProject(projectId: string, data: { submission_url: string; description: string }): Promise<ApiResponse> {
    return api.post(`/intern/projects/${projectId}/submit`, data);
  }

  // Wallet
  async getWallet(): Promise<ApiResponse<Wallet>> {
    return api.get('/intern/wallet');
  }

  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    return api.get('/intern/wallet/transactions');
  }

  async requestWithdrawal(data: WithdrawalData): Promise<ApiResponse> {
    return api.post('/intern/wallet/withdraw', data);
  }

  async getWithdrawalRequests(): Promise<ApiResponse<WithdrawalRequest[]>> {
    return api.get('/intern/wallet/withdrawals');
  }

  async connectBankAccount(data: any): Promise<ApiResponse> {
    return api.post('/intern/wallet/connect-bank', data);
  }

  // Profile
  async getProfile(): Promise<ApiResponse<any>> {
    return api.get('/intern/profile');
  }

  async updateProfile(data: any): Promise<ApiResponse> {
    return api.put('/intern/profile', data);
  }

  async uploadAvatar(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/intern/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
}

export default new InternService();