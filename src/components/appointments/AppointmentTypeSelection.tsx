import React, { useContext } from 'react';
import { Calendar, Video } from 'lucide-react';
import { DarkModeContext } from '../../App';
// import jayLogo from '../../assets/jay-logo.png'; // Logo import removed

interface AppointmentTypeSelectionProps {
  onSelect: (type: 'physical' | 'online') => void;
}

const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({ onSelect }) => {
  const { dark } = useContext(DarkModeContext);
  return (
    <div className={dark ? 'min-h-screen bg-gray-900 flex flex-col items-center px-4 pt-8 relative' : 'min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-8 relative'}>
      {/* Title only, logo removed */}
      <div className="w-full flex items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Appointment Options</h1>
      </div>
      {/* Card Buttons */}
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={() => onSelect('physical')}
          className="w-full flex items-start bg-white dark:bg-gray-800 rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition mb-2"
        >
          <div className="flex-shrink-0">
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Physical Consultation</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-snug">Visit the clinic for a face-to-face appointment with the doctor. No additional charges*</p>
          </div>
        </button>
        <button
          onClick={() => onSelect('online')}
          className="w-full flex items-start bg-white dark:bg-gray-800 rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex-shrink-0">
            <Video className="w-8 h-8 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Online Consultation</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-snug">Connect with the doctor remotely via video call for a virtual appointment. No additional charges*</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AppointmentTypeSelection; 