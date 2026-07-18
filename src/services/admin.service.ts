import api from "./api";
import {
  ApiResponse,
  User,
  SkillTest,
  Project,
  WithdrawalRequest,
  Transaction, 
  TrainingModule,
  Lesson,
  Candidate,
  SkillQuestion,
  Test,
  Cohort,
  TestData,
  ProjectData,
} from "../types";
import { trainingModuleData } from "../pages/admin/TrainingModule";
import { cohortData } from "../components/admin/CreateCohortModal";


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

  async createCohort(data: cohortData): Promise<ApiResponse<Cohort>> {
    return api.post("/api/cohorts", data);
  }

  async updateCohort(
    id: string,
    data: Partial<Cohort>
  ): Promise<ApiResponse<Cohort>> {
    return api.put(`/api/cohorts/${id}`, data);
  }

  async deleteCohort(m:Cohort): Promise<ApiResponse> {
    return api.delete(`/api/cohorts/${m.id}`);
  }

  async toggleAccepting(m: Cohort, accepting: boolean): Promise<ApiResponse> {
    return api.patch(`/api/cohorts/${m.id}/toggle-accepting`, {
      is_accepting: accepting,
    });
  }

  // Candidate Management
  async getCandidates(): Promise<ApiResponse<Candidate[]>> {
    return api.get("/api/all-interns");
  }

  async approveCandidate(id: string | number): Promise<ApiResponse> {
    return api.post(`/api/intern/review/${id}`, {
      status: "active"
    });
  }

  async rejectCandidate(id: string | number): Promise<ApiResponse> {
    return api.post(`/api/intern/review/${id}`, {
      status: "rejected"
    });
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

  async getTrainingModule(): Promise<ApiResponse<TrainingModule[]>> {
    return api.get("/api/training/modules");
  }

  async updateTrainingModule(
    data: TrainingModule
  ): Promise<ApiResponse<TrainingModule>> {
    return api.put(`/api/training/modules/${data.id}`, data);
  }

  async getOneTrainingModule(
    id: number | string
  ): Promise<ApiResponse<TrainingModule>> {
    return api.get(`/api/training/modules/${id}`);
  }

  async updateLessonModule(
    data: Lesson,
  ): Promise<ApiResponse<TrainingModule>> {
    return api.put(`/api/lessons/${data.id}`, data);
  }

  async getLessonModule(): Promise<ApiResponse<Lesson[]>> {
    return api.get(`/api/lessons`);
  }

  async createLessonModule(
    data: Lesson,
    moduleId: string | number
  ): Promise<ApiResponse> {
    return api.post(`/api/module/${moduleId}/lessons`, data);
  }

  async deleteLesson(m: Lesson): Promise<ApiResponse<Lesson[]>> {
    return api.delete(`/api/lessons/${m.id}`);
  }

  // question management
  async createQuestionModule(
    data: SkillQuestion,
    moduleId: string | number
  ): Promise<ApiResponse> {
    return api.post(`/api/module/${moduleId}/quests`, {
      ...data,
      module_id: moduleId,
    });
  }

  async getOneQuestionModule(moduleId: string | number): Promise<ApiResponse> {
    return api.get(`/api/module/${moduleId}/quests`);
  }

  async updateQuestionModule(
    data: SkillQuestion,
    moduleId: string | number
  ): Promise<ApiResponse> {
    return api.put(`/api/module/${moduleId}/quests`, data);
  }

  // create new test
  async createTestModule(
    data: Test,
    moduleId: string | number
  ): Promise<ApiResponse> {
    return api.post(`/api/template`, {
      ...data,
      module_id: moduleId,
    });
  }

  async getOneTestModule(moduleId: string | number): Promise<ApiResponse> {
    return api.get(`/api/template/${moduleId}`);
  }

  async updateOnetestModule(moduleId: string | number): Promise<ApiResponse> {
    return api.put(`/api/template/${moduleId}`);
  }

  async deleteOnetestModule(testId: string | number): Promise<ApiResponse> {
    return api.delete(`/api/template/${testId}`);
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
