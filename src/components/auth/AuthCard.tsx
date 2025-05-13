import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showBackButton?: boolean;
  onBack?: () => void;
  logo?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  description,
  showBackButton = false,
  onBack,
  logo,
}) => {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6 text-center">
        {showBackButton && (
          <button 
            onClick={onBack}
            className="p-1 mb-4 -ml-1 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {logo && (
          <img src={logo} alt="Logo" className="mx-auto mb-4 w-24 h-24 object-contain" />
        )}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;