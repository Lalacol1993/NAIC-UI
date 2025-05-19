import React from 'react';
import { Calendar, Video } from 'lucide-react';

interface AppointmentTypeSelectionProps {
  onSelect: (type: 'physical' | 'online') => void;
}

const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 flex">
      {/* Physical Appointment Button */}
      <button
        onClick={() => onSelect('physical')}
        className="flex-1 bg-white flex flex-col items-center justify-center space-y-4 hover:bg-gray-50 transition-colors border-r border-gray-200"
      >
        <Calendar className="w-12 h-12 text-blue-600" />
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">Physical Appointment</h3>
          <p className="text-gray-600 mt-1">Visit our clinic in person</p>
        </div>
      </button>

      {/* Online Appointment Button */}
      <button
        onClick={() => onSelect('online')}
        className="flex-1 bg-white flex flex-col items-center justify-center space-y-4 hover:bg-gray-50 transition-colors"
      >
        <Video className="w-12 h-12 text-blue-600" />
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">Online Appointment</h3>
          <p className="text-gray-600 mt-1">Video consultation from anywhere</p>
        </div>
      </button>
    </div>
  );
};

export default AppointmentTypeSelection; 