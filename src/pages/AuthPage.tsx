import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import InvitationCodeForm from '../components/auth/InvitationCodeForm';
import bluejayLogo from '../assets/bluejay_logo.png';

enum AuthMode {
  INVITATION = 'invitation',
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT_PASSWORD = 'forgot_password',
}

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.INVITATION);
  const navigate = useNavigate();

  const handleInvitationCode = (code: string) => {
    console.log('Invitation code:', code);
    // Here you would typically validate the invitation code
    // For now, we'll just proceed to login
    setMode(AuthMode.LOGIN);
  };

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    console.log('Login with:', { email, password, rememberMe });
    // Implement actual login logic here
    alert(`Login attempt with: ${email}`);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('Signup with:', { name, email, password });
    // Implement actual signup logic here
    navigate('/verify-identity');
  };

  const handleForgotPassword = (email: string) => {
    console.log('Reset password for:', email);
    // Implement actual password reset logic here
  };

  const renderForm = () => {
    switch (mode) {
      case AuthMode.INVITATION:
        return (
          <AuthCard 
            title="Join BlueJay" 
            description="Enter your invitation code to continue"
            logo={bluejayLogo}
          >
            <InvitationCodeForm onSubmit={handleInvitationCode} />
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setMode(AuthMode.LOGIN)}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors"
              >
                Log In
              </button>
            </p>
          </AuthCard>
        );

      case AuthMode.LOGIN:
        return (
          <AuthCard 
            title="Welcome back" 
            description="Sign in to your account to continue"
            logo={bluejayLogo}
          >
            <LoginForm 
              onSubmit={handleLogin} 
              onForgotPassword={() => setMode(AuthMode.FORGOT_PASSWORD)} 
            />
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setMode(AuthMode.SIGNUP)}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors"
              >
                Sign up
              </button>
            </p>
          </AuthCard>
        );
        
      case AuthMode.SIGNUP:
        return (
          <AuthCard 
            title="Create an account" 
            description="Join BlueJay to connect with your audience"
            logo={bluejayLogo}
          >
            <SignupForm onSubmit={handleSignup} />
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setMode(AuthMode.LOGIN)}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors"
              >
                Sign in
              </button>
            </p>
          </AuthCard>
        );
        
      case AuthMode.FORGOT_PASSWORD:
        return (
          <AuthCard 
            title="Reset your password" 
            description="We'll send you a link to reset your password"
            showBackButton
            onBack={() => setMode(AuthMode.LOGIN)}
          >
            <ForgotPasswordForm onSubmit={handleForgotPassword} />
          </AuthCard>
        );
    }
  };

  return (
    <AuthLayout>
      {renderForm()}
    </AuthLayout>
  );
};

export default AuthPage;