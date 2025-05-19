import React from 'react';
import { Video, User } from 'lucide-react';

interface AppointmentTypeSelectionProps {
  onSelect: (type: 'physical' | 'online') => void;
}

const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Select Appointment Type</h1>
      
      <div className="space-y-4">
        <button
          onClick={() => onSelect('physical')}
          className="w-full bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4 hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={24} className="text-blue-600" />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-gray-900">Physical Appointment</h2>
            <p className="text-sm text-gray-600">Visit our clinic in person</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('online')}
          className="w-full bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4 hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <Video size={24} className="text-green-600" />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-gray-900">Online Appointment</h2>
            <p className="text-sm text-gray-600">Video consultation from home</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AppointmentTypeSelection; 