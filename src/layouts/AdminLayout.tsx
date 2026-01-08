import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="admin" />
      <main className="max-w-7xl mx-auto px-4 md:px-6  py-8">
        <Outlet />
      </main>
    </div>
  );
};