import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Clock, CheckCircle, Phone, MapPin } from 'lucide-react';
import { DarkModeContext } from '../../App';

interface AppointmentConfirmationProps {
  appointmentType: 'physical' | 'online';
  date: Date;
  time: string;
  onConfirm: () => void;
  onEdit: () => void;
  onCancel: () => void;
  rescheduling?: boolean;
  clinic?: any;
}

const AppointmentConfirmed: React.FC<{ onReschedule: () => void; onCancel: () => void; date: Date; time: string; appointmentType: 'physical' | 'online'; clinic?: any }>
  = ({ onReschedule, onCancel, date, time, appointmentType, clinic }) => {
  const { dark } = useContext(DarkModeContext);
  return (
    <div className={dark ? 'min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4' : 'min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'}>
      <div className="flex flex-col items-center mb-6">
        <CheckCircle size={64} className="text-green-500 mb-2" />
        <h1 className="text-2xl font-bold text-center mb-2 dark:text-gray-100">Appointment Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">Your appointment has been successfully booked.</p>
      </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900 rounded-xl mr-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">{date.getDate()}</span>
            <span className="text-xs text-blue-600 dark:text-blue-300">{date.toLocaleString('en-US', { month: 'short' })}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100 mr-2">Mr. BlueJay²</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-2 py-0.5 rounded">Confirmed</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
              <Calendar size={16} className="mr-1" />
              {date.toLocaleString('en-US', { weekday: 'long' })}
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-1" />
              {time}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          {appointmentType === 'physical' && clinic && (
            <>
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium">Clinic</span>
                <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">{clinic.name}</span>
              </div>
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-300">
                <Phone size={16} className="mr-1" />
                <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="underline">{clinic.phone}</a>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <MapPin size={16} className="mr-1" />
                {clinic.address}
              </div>
            </>
          )}
        </div>
        <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 rounded-lg font-medium mb-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Add to Calendar</button>
        <div className="flex space-x-2 mt-2">
          <button onClick={onReschedule} className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Reschedule</button>
          <button onClick={onCancel} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors">Cancel Appointment</button>
        </div>
      </div>
    </div>
  );
};

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  appointmentType,
  date,
  time,
  onConfirm,
  onEdit,
  onCancel,
  rescheduling,
  clinic,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const { dark } = useContext(DarkModeContext);

  useEffect(() => {
    if (rescheduling) {
      setConfirmed(false);
    }
  }, [rescheduling, date, time]);

  if (confirmed && !rescheduling) {
    return (
      <AppointmentConfirmed
        onReschedule={onEdit}
        onCancel={onCancel}
        date={date}
        time={time}
        appointmentType={appointmentType}
        clinic={clinic}
      />
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={dark ? 'min-h-screen bg-gray-900 p-4' : 'min-h-screen bg-gray-50 p-4'}>
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Confirm Appointment</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Calendar size={20} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Date</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{formatDate(date)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Time</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{time}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <div className="text-blue-600 dark:text-blue-300 font-medium">
                {appointmentType === 'online' ? 'V' : 'P'}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Type</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {appointmentType === 'online' ? 'Online Consultation' : 'Physical Visit'}
              </p>
            </div>
          </div>
          {appointmentType === 'physical' && clinic && (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <MapPin size={20} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Clinic</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{clinic.name}</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">{clinic.phone}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{clinic.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
        Please review your appointment details carefully before confirming. You can edit details if needed.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Confirm Appointment
        </button>
        <button
          onClick={onEdit}
          className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Edit Details
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation; 