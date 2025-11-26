import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="public" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};