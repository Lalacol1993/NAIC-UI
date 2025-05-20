import React from 'react';
import { Calendar, Video } from 'lucide-react';
// import jayLogo from '../../assets/jay-logo.png'; // Logo import removed

interface AppointmentTypeSelectionProps {
  onSelect: (type: 'physical' | 'online') => void;
}

const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-8 relative">
      {/* Title only, logo removed */}
      <div className="w-full flex items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-700">Appointment Options</h1>
      </div>
      {/* Card Buttons */}
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={() => onSelect('physical')}
          className="w-full flex items-start bg-white rounded-xl shadow p-5 border border-gray-200 hover:shadow-md transition mb-2"
        >
          <div className="flex-shrink-0">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Physical Consultation</h3>
            <p className="text-gray-700 text-sm leading-snug">Visit the clinic for a face-to-face appointment with the doctor. No additional charges*</p>
          </div>
        </button>
        <button
          onClick={() => onSelect('online')}
          className="w-full flex items-start bg-white rounded-xl shadow p-5 border border-gray-200 hover:shadow-md transition"
        >
          <div className="flex-shrink-0">
            <Video className="w-8 h-8 text-blue-600" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Online Consultation</h3>
            <p className="text-gray-700 text-sm leading-snug">Connect with the doctor remotely via video call for a virtual appointment. No additional charges*</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AppointmentTypeSelection; 