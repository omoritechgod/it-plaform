import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import authService from '../services/auth.service';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        setLoading(true);
        try {
          const response = await authService.getCurrentUser();
          if (response.status === true && response.data) {
            setUser(response.data);
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('auth_token');
        } finally {
          setLoading(false);
        }
      }
    };

    initializeAuth();
  }, [setUser, setLoading]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  };
};