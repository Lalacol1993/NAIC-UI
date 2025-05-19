import React from 'react';
import { Home, Calendar, Camera } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to BlueJay</h1>
        <p className="text-gray-600">Your dashboard will appear here.</p>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-between px-4">
        <button className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        {/* Centered Scan Button */}
        <button className="relative -top-6 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors">
          <Camera size={28} />
        </button>
        
        <button className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
          <Calendar size={24} />
          <span className="text-xs mt-1">Appointments</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;