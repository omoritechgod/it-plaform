import api from "./api";
import {
  ApiResponse,
  Cohort,
  User,
  SkillTest,
  Project,
  WithdrawalRequest,
  Transaction,
  TrainingModule,
} from "../types";
import { Candidate } from "../pages/admin/Candidates";
import { trainingModuleData } from "../pages/admin/TrainingModule";

export interface CohortData {
  name: string;
  description: string;
  start_date: string;
  max_slot: number;
  is_accepting: boolean;
  settings: {
    duration: string;
    level: string;
  };
}

export interface TestData {
  title: string;
  skill: string;
  level: "beginner" | "intermediate" | "advanced";
  time_limit: number;
  max_attempts: number;
  passing_score: number;
  questions: any[];
}

export interface ProjectData {
  title: string;
  description: string;
  requirements: string[];
  skills_required: string[];
  stage_required: string;
  max_interns: number;
  deadline: string;
  stipend_amount?: number;
}

class AdminService {
  // Cohort Management
  async getCohorts(): Promise<ApiResponse<Cohort[]>> {
    const token = localStorage.getItem("auth_token");
    return api.get("/api/cohorts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createCohort(data: CohortData): Promise<ApiResponse<Cohort>> {
    return api.post("/api/cohorts", data);
  }

  async updateCohort(
    id: string,
    data: Partial<CohortData>
  ): Promise<ApiResponse<Cohort>> {
    return api.put(`/api/cohorts/${id}`, data);
  }

  async deleteCohort(id: string): Promise<ApiResponse> {
    return api.delete(`/api/cohorts/${id}`);
  }

  async toggleAccepting(id: string, accepting: boolean): Promise<ApiResponse> {
    return api.patch(`/api/cohorts/${id}/toggle-accepting`, {
      is_accepting: accepting,
    });
  }

  // Candidate Management
  async getCandidates(filters?: any): Promise<ApiResponse<Candidate[]>> {
    return api.get("/admin/candidates", { params: filters });
  }

  async approveCandidate(id: string): Promise<ApiResponse> {
    return api.post(`/admin/candidates/${id}/approve`);
  }

  async rejectCandidate(id: string): Promise<ApiResponse> {
    return api.post(`/admin/candidates/${id}/reject`);
  }

  async deleteCandidate(id: string): Promise<ApiResponse> {
    return api.delete(`/admin/candidates/${id}`);
  }

  async bulkEmail(data: {
    recipient_ids: string[];
    subject: string;
    message: string;
  }): Promise<ApiResponse> {
    return api.post("/admin/candidates/bulk-email", data);
  }

  async exportCandidates(filters?: any): Promise<Blob> {
    const response = await api.get("/admin/candidates/export", {
      params: filters,
      responseType: "blob",
    });
    return response.data;
  }

  // Skill Tests
  async getTests(): Promise<ApiResponse<SkillTest[]>> {
    return api.get("/admin/tests");
  }

  async createTest(data: TestData): Promise<ApiResponse<SkillTest>> {
    return api.post("/admin/tests", data);
  }

  async updateTest(
    id: string,
    data: Partial<TestData>
  ): Promise<ApiResponse<SkillTest>> {
    return api.put(`/admin/tests/${id}`, data);
  }

  async deleteTest(id: string): Promise<ApiResponse> {
    return api.delete(`/admin/tests/${id}`);
  }

  async importQuestions(testId: string, file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/admin/tests/${testId}/import-questions`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  // training module
  async createTrainingModule(
    data: trainingModuleData
  ): Promise<ApiResponse<TrainingModule>> {
    return api.post("/api/training/modules", data);
  }

  async getTrainingModule(): Promise<ApiResponse<TrainingModule>> {
    return api.get("/api/training/modules");
  }

  // Project Management
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return api.get("/admin/projects");
  }

  async createProject(data: ProjectData): Promise<ApiResponse<Project>> {
    return api.post("/admin/projects", data);
  }

  async updateProject(
    id: string,
    data: Partial<ProjectData>
  ): Promise<ApiResponse<Project>> {
    return api.put(`/admin/projects/${id}`, data);
  }

  async deleteProject(id: string): Promise<ApiResponse> {
    return api.delete(`/admin/projects/${id}`);
  }

  async getProjectApplicants(id: string): Promise<ApiResponse<User[]>> {
    return api.get(`/admin/projects/${id}/applicants`);
  }

  async assignInterns(
    projectId: string,
    internIds: string[]
  ): Promise<ApiResponse> {
    return api.post(`/admin/projects/${projectId}/assign`, {
      intern_ids: internIds,
    });
  }

  // Wallet Management
  async getWalletBalance(): Promise<ApiResponse<{ balance: number }>> {
    return api.get("/admin/wallet/balance");
  }

  async fundWallet(
    amount: number
  ): Promise<ApiResponse<{ authorization_url: string }>> {
    return api.post("/admin/wallet/fund", { amount });
  }

  async getTransactions(filters?: any): Promise<ApiResponse<Transaction[]>> {
    return api.get("/admin/wallet/transactions", { params: filters });
  }

  async payIntern(data: {
    intern_id: string;
    amount: number;
    description: string;
  }): Promise<ApiResponse> {
    return api.post("/admin/wallet/pay-intern", data);
  }

  // Withdrawal Management
  async getWithdrawalRequests(
    filters?: any
  ): Promise<ApiResponse<WithdrawalRequest[]>> {
    return api.get("/admin/withdrawals", { params: filters });
  }

  async approveWithdrawal(id: string, notes?: string): Promise<ApiResponse> {
    return api.post(`/admin/withdrawals/${id}/approve`, { admin_notes: notes });
  }

  async rejectWithdrawal(id: string, notes: string): Promise<ApiResponse> {
    return api.post(`/admin/withdrawals/${id}/reject`, { admin_notes: notes });
  }

  // Reports & Analytics
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return api.get("/admin/dashboard/stats");
  }

  async getEnrollmentReport(filters?: any): Promise<ApiResponse<any>> {
    return api.get("/admin/reports/enrollment", { params: filters });
  }

  async getPerformanceReport(filters?: any): Promise<ApiResponse<any>> {
    return api.get("/admin/reports/performance", { params: filters });
  }

  async getPaymentReport(filters?: any): Promise<ApiResponse<any>> {
    return api.get("/admin/reports/payments", { params: filters });
  }

  async createApply(data: {
    cohort_id: string;
    form_schema: {
      fields: { name: string; type: string }[];
      agreement_text: string;
    };
  }): Promise<ApiResponse> {
    return api.post(`/api/application-forms`, { data });
  }
}

export default new AdminService();
