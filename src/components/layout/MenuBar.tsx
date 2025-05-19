import React from 'react';
import { Camera, Home, User, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <button
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center p-2 ${
            isActive('/home') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button
          onClick={() => navigate('/scan')}
          className={`flex flex-col items-center p-2 ${
            isActive('/scan') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 rounded-full p-3 shadow-lg">
                <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>
          <span className="text-xs mt-1">Scan</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center p-2 ${
            isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>

        <button
          onClick={() => navigate('/settings')}
          className={`flex flex-col items-center p-2 ${
            isActive('/settings') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default MenuBar; 