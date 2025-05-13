import React from 'react';
import { Twitter } from 'lucide-react';
import bluejayLogo from '../../assets/bluejay_logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - visible on larger screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center">
            <img src={bluejayLogo} alt="BlueJay Logo" className="h-10 w-10 object-contain bg-white rounded" />
            <span className="ml-2 text-white text-2xl font-bold">BlueJay</span>
          </div>
          
          <div className="mt-16 max-w-md">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Connect with your audience in a whole new way
            </h1>
            <p className="mt-6 text-blue-100 text-lg">
              BlueJay helps creators build a direct relationship with their audience through meaningful content and engagement.
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-700 to-transparent"></div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 text-blue-100 text-sm">
          &copy; {new Date().getFullYear()} BlueJay. All rights reserved.
        </div>
      </div>
      
      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;