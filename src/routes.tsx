import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import IdentityVerificationPage from './pages/IdentityVerificationPage';
import HomePage from './pages/HomePage';
import FeeWaiverUpload from './components/auth/FeeWaiverUpload';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/verify-identity" element={<IdentityVerificationPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/fee-waiver-upload" element={<FeeWaiverUpload />} />
    </Routes>
  );
};

export default AppRoutes; 