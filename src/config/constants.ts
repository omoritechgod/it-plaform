// Application constants
export const APP_CONFIG = {
  APP_NAME: 'Internship Platform',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  PAYSTACK_PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  UPLOAD_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
};

export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  JOBS: '/jobs',
  APPLY: '/apply',
  
  // Auth routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Admin routes
  ADMIN_ROOT: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_COHORTS: '/admin/cohorts',
  ADMIN_CANDIDATES: '/admin/candidates',
  ADMIN_TESTS: '/admin/tests',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_WALLETS: '/admin/wallets',
  ADMIN_WITHDRAWALS: '/admin/withdrawals',
  ADMIN_REPORTS: '/admin/reports',
  
  // Intern routes
  INTERN_DASHBOARD: '/intern/dashboard',
  INTERN_LEARNING: '/intern/learning',
  INTERN_TEST: '/intern/test',
  INTERN_PROJECTS: '/intern/projects',
  INTERN_WALLET: '/intern/wallet',
  INTERN_PROFILE: '/intern/profile',
};

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  INTERN: 'intern',
} as const;

export const STAGES = {
  APPLICATION: 'application',
  AGREEMENT: 'agreement', 
  SKILL_TEST: 'skill_test',
  INTERVIEW: 'interview',
  TRAINING: 'training',
  PROJECTS: 'projects',
  PAYMENT: 'payment',
} as const;