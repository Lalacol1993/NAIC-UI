import React from 'react';

interface Clinic {
  id: string;
  name: string;
  logo: string;
  phone: string;
  address: string;
  distance: string;
}

interface ClinicSelectionProps {
  clinics: Clinic[];
  onSelectClinic: (clinic: Clinic) => void;
  onBack: () => void;
}

const ClinicSelection: React.FC<ClinicSelectionProps> = ({ clinics, onSelectClinic, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pt-8">
      <button onClick={onBack} className="mb-4 text-blue-600 dark:text-blue-400 font-medium flex items-center">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        <span className="ml-2">Back</span>
      </button>
      <h1 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Nearby Clinics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-start border border-gray-200 dark:border-gray-700">
            <img src={clinic.logo} alt={clinic.name} className="w-20 h-12 object-contain mb-2" />
            <div className="font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-1">{clinic.name}</div>
            <div className="text-blue-600 dark:text-blue-400 text-sm mb-1">
              <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="underline">{clinic.phone}</a>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">{clinic.address}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">{clinic.distance} km</div>
            <button
              onClick={() => onSelectClinic(clinic)}
              className="mt-auto w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicSelection; 