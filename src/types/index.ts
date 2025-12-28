export interface User {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "intern";
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Intern {
  user: User;
  stage: string;
  skills: string[];
  wallet_balance: number;
  cohort_id?: string;
  progress_summary: {
    completed_modules: number;
    notes: string;
  };
  current_stage: number;
  status: "pending" | "approved" | "rejected";
  cohort: Cohort;
  current_skill_level: number;
  agreement_signed: boolean;
  test_attempts: number;
  training_progress: number;
  unlocked_modules: string[];
}

export interface Admin extends User {
  permissions: string[];
  wallet_access: boolean;
}

export interface Cohort {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_accepting: boolean;
  max_interns: number;
  current_interns: number;
  created_at: string;
}

export interface TrainingModule {
  title: string;
  slug: string;
  description: string;
  skill_tag: string;
  level: "beginner" | "intermediate" | "advanced";
  order: number;
  resources: {
    video: string;
    pdf: string;
  };
  status: "active" | "inactive";
}

export interface SkillTest {
  id: string;
  title: string;
  skill: string;
  level: "beginner" | "intermediate" | "advanced";
  questions: Question[];
  time_limit: number; // minutes
  max_attempts: number;
  passing_score: number;
}

export interface Question {
  id: string;
  question: string;
  type: "multiple_choice" | "text" | "image";
  options?: string[];
  correct_answer: string;
  image_url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills_required: string[];
  stage_required: string;
  max_interns: number;
  current_applicants: number;
  deadline: string;
  status: "active" | "closed" | "completed";
  stipend_amount?: number;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  bank_account?: BankAccount;
  transactions: Transaction[];
}

export interface BankAccount {
  account_number: string;
  bank_name: string;
  account_name: string;
  bank_code: string;
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  reference: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  bank_account: BankAccount;
  status: "pending" | "approved" | "rejected" | "completed";
  admin_notes?: string;
  created_at: string;
}

export interface ApiResponse<T = any> {
  message: string;
  status: boolean;
  token: string;
  data: T;
  errors?: Record<string, string[]>;
}
