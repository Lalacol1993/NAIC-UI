import React from 'react';
import { Video, User } from 'lucide-react';

interface AppointmentTypeSelectionProps {
  onSelect: (type: 'physical' | 'online') => void;
}

const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 flex flex-col">
      <button
        onClick={() => onSelect('physical')}
        className="flex-1 bg-white flex items-center justify-center space-x-4 hover:bg-gray-50 transition-colors"
      >
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User size={32} className="text-blue-600" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-900">Physical Appointment</h2>
          <p className="text-gray-600">Visit our clinic in person</p>
        </div>
      </button>

      <button
        onClick={() => onSelect('online')}
        className="flex-1 bg-white flex items-center justify-center space-x-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
      >
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <Video size={32} className="text-green-600" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-900">Online Appointment</h2>
          <p className="text-gray-600">Video consultation from home</p>
        </div>
      </button>
    </div>
  );
};

export default AppointmentTypeSelection; 