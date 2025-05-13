import React, { useState } from 'react';
import FormInput from './FormInput';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setError('');
    onSubmit(email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center animate-fadeIn">
        <div className="mb-6 inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
        <p className="mt-2 text-gray-600">
          We've sent a password reset link to<br /><strong>{email}</strong>
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or{' '}
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
          >
            try another email
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          required
        />
        
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Send reset link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;