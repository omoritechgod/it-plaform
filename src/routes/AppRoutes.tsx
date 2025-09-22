import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { InternLayout } from '../layouts/InternLayout';
import { Home } from '../pages/public/Home';
import { Apply } from '../pages/public/Apply';
import { Login } from '../pages/auth/Login';
import { AdminDashboard } from '../pages/admin/Dashboard';
import { Cohorts } from '../pages/admin/Cohorts';
import { Candidates } from '../pages/admin/Candidates';
import { Wallets } from '../pages/admin/Wallets';
import { InternDashboard } from '../pages/intern/Dashboard';
import { LearningHub } from '../pages/intern/LearningHub';
import { Wallet } from '../pages/intern/Wallet';
import { useAuth } from '../hooks/useAuth';
import { ROUTES, USER_ROLES } from '../config/constants';

const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requiredRole?: string;
}> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007bff]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<div>About Page Coming Soon</div>} />
          <Route path="jobs" element={<div>Jobs Page Coming Soon</div>} />
          <Route path="apply" element={<Apply />} />
        </Route>

        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<div>Signup Page Coming Soon</div>} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SUPER_ADMIN}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cohorts" element={<Cohorts />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="tests" element={<div>Tests Management Coming Soon</div>} />
          <Route path="projects" element={<div>Projects Management Coming Soon</div>} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="withdrawals" element={<div>Withdrawals Management Coming Soon</div>} />
          <Route path="reports" element={<div>Reports Coming Soon</div>} />
        </Route>

        {/* Admin Routes (for both super admin and admin) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cohorts" element={<div>Cohorts Management Coming Soon</div>} />
          <Route path="candidates" element={<div>Candidates Management Coming Soon</div>} />
          <Route path="tests" element={<div>Tests Management Coming Soon</div>} />
          <Route path="projects" element={<div>Projects Management Coming Soon</div>} />
          <Route path="wallets" element={<div>Wallets Management Coming Soon</div>} />
          <Route path="withdrawals" element={<div>Withdrawals Management Coming Soon</div>} />
          <Route path="reports" element={<div>Reports Coming Soon</div>} />
        </Route>

        {/* Intern Routes */}
        <Route
          path="/intern"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.INTERN}>
              <InternLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.INTERN_DASHBOARD} replace />} />
          <Route path="dashboard" element={<InternDashboard />} />
          <Route path="learning" element={<LearningHub />} />
          <Route path="test" element={<div>Skill Test Coming Soon</div>} />
          <Route path="projects" element={<div>Projects Coming Soon</div>} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<div>Profile Coming Soon</div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Router>
  );
};