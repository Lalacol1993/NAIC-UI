import React from 'react';

interface TimeSelectionProps {
  onTimeSelect: (time: string) => void;
  selectedDate: Date;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({ onTimeSelect, selectedDate }) => {
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Select Time</h1>
        <p className="text-gray-600">{formatDate(selectedDate)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className="bg-white p-4 rounded-xl shadow-sm text-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{time}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection; 