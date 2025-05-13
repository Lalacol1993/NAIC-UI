import React, { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normalize to 0-4 range
    return Math.min(4, Math.floor(score / 1.5));
  }, [password]);
  
  const getLabel = () => {
    if (strength === 0) return 'Weak';
    if (strength === 1) return 'Fair';
    if (strength === 2) return 'Good';
    if (strength === 3) return 'Strong';
    return 'Very Strong';
  };
  
  const getColor = () => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-orange-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-green-500';
    return 'bg-emerald-500';
  };
  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-600">Password strength</p>
        <p className={`text-xs font-medium ${
          strength === 0 ? 'text-red-500' : 
          strength === 1 ? 'text-orange-500' : 
          strength === 2 ? 'text-yellow-500' : 
          strength === 3 ? 'text-green-500' : 
          'text-emerald-500'
        }`}>
          {getLabel()}
        </p>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-300 ease-out`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;