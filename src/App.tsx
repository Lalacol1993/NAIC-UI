import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import IdentityVerificationPage from './pages/IdentityVerificationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/verify-identity" element={<IdentityVerificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;