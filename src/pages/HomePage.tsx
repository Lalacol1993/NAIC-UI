import React, { useState } from 'react';
import { Home, Calendar, Camera, ChevronRight, Clock, Dumbbell } from 'lucide-react';
import AppointmentTypeSelection from '../components/appointments/AppointmentTypeSelection';
import AppointmentCalendar from '../components/appointments/AppointmentCalendar';
import TimeSelection from '../components/appointments/TimeSelection';
import AppointmentConfirmation from '../components/appointments/AppointmentConfirmation';
import ScanSelection from '../components/scan/ScanSelection';

type AppointmentStep = 'type' | 'calendar' | 'time' | 'confirmation';
type ScanType = 'lidar' | 'camera';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'appointments' | 'scan'>('home');
  const [appointmentStep, setAppointmentStep] = useState<AppointmentStep | null>(null);
  const [appointmentType, setAppointmentType] = useState<'physical' | 'online' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showScanSelection, setShowScanSelection] = useState(false);

  const handleAppointmentTypeSelect = (type: 'physical' | 'online') => {
    setAppointmentType(type);
    setAppointmentStep('calendar');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setAppointmentStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setAppointmentStep('confirmation');
  };

  const handleAppointmentConfirm = () => {
    // Handle appointment confirmation
    setAppointmentStep(null);
    setAppointmentType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setActiveTab('home');
  };

  const handleAppointmentEdit = () => {
    setAppointmentStep('type');
  };

  const handleScanTypeSelect = (type: ScanType) => {
    // Handle scan type selection
    setShowScanSelection(false);
    setActiveTab('home');
  };

  const renderContent = () => {
    if (showScanSelection) {
      return <ScanSelection onSelect={handleScanTypeSelect} />;
    }

    if (appointmentStep) {
      switch (appointmentStep) {
        case 'type':
          return <AppointmentTypeSelection onSelect={handleAppointmentTypeSelect} />;
        case 'calendar':
          return <AppointmentCalendar onDateSelect={handleDateSelect} />;
        case 'time':
          return selectedDate && <TimeSelection onTimeSelect={handleTimeSelect} selectedDate={selectedDate} />;
        case 'confirmation':
          return selectedDate && selectedTime && appointmentType && (
            <AppointmentConfirmation
              appointmentType={appointmentType}
              date={selectedDate}
              time={selectedTime}
              onConfirm={handleAppointmentConfirm}
              onEdit={handleAppointmentEdit}
            />
          );
      }
    }

    return (
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-2">Hi, John</h1>
        <p className="text-gray-600 text-sm mb-6">Let's work on your recovery today</p>

        {/* Next Appointment Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Next Appointment</h2>
            <button 
              className="text-blue-600 text-sm font-medium flex items-center"
              onClick={() => {
                setActiveTab('appointments');
                setAppointmentStep('type');
              }}
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Physical Therapy</h3>
              <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* Personalized Exercise Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Today's Exercises</h2>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              See All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Exercise Item */}
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Dumbbell size={20} className="text-emerald-600" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-gray-900">Shoulder Stretches</h3>
                <p className="text-sm text-gray-600">3 sets × 10 reps</p>
              </div>
              <button className="bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                Start
              </button>
            </div>

            {/* Exercise Item */}
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Dumbbell size={20} className="text-emerald-600" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-gray-900">Wrist Mobility</h3>
                <p className="text-sm text-gray-600">4 sets × 8 reps</p>
              </div>
              <button className="bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                Start
              </button>
            </div>

            {/* Exercise Item */}
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Dumbbell size={20} className="text-emerald-600" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-gray-900">Hand Exercises</h3>
                <p className="text-sm text-gray-600">2 sets × 15 reps</p>
              </div>
              <button className="bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {renderContent()}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-between px-4">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeTab === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        {/* Centered Scan Button */}
        <button 
          onClick={() => setShowScanSelection(true)}
          className="relative -top-6 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Camera size={28} />
        </button>
        
        <button 
          onClick={() => {
            setActiveTab('appointments');
            setAppointmentStep('type');
          }}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeTab === 'appointments' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">Appointments</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;