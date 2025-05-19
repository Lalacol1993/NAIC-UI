import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface AppointmentConfirmationProps {
  appointmentType: 'physical' | 'online';
  date: Date;
  time: string;
  onConfirm: () => void;
  onEdit: () => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  appointmentType,
  date,
  time,
  onConfirm,
  onEdit,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Confirm Appointment</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium text-gray-900">{formatDate(date)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium text-gray-900">{time}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="text-blue-600 font-medium">
                {appointmentType === 'online' ? 'V' : 'P'}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium text-gray-900">
                {appointmentType === 'online' ? 'Online Consultation' : 'Physical Visit'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-center mb-6">
        Please review your appointment details carefully before confirming. You can edit details if needed.
      </p>

      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Confirm Appointment
        </button>
        <button
          onClick={onEdit}
          className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation; 