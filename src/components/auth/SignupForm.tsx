import React, { useState } from 'react';
import { Twitter, Github } from 'lucide-react';
import FormInput from './FormInput';
import SocialButton from './SocialButton';
import PasswordStrength from './PasswordStrength';

interface SignupFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: { name?: string; email?: string; password?: string } = {};
    
    if (!name) newErrors.name = 'Name is required';
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (!agreed) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    onSubmit(name, email, password);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    // Add implementation for social signup here
  };

  return (
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
        
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        
        <div>
          <FormInput
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            showPasswordToggle
            isPassword={!showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          {password && <PasswordStrength password={password} />}
        </div>
        
        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Create account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;