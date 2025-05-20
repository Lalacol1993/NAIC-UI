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
}

const ClinicSelection: React.FC<ClinicSelectionProps> = ({ clinics, onSelectClinic }) => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-8">
      <h1 className="text-xl font-bold text-blue-700 mb-4">Nearby Clinics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-start border border-gray-200">
            <img src={clinic.logo} alt={clinic.name} className="w-20 h-12 object-contain mb-2" />
            <div className="font-semibold text-gray-900 leading-tight mb-1">{clinic.name}</div>
            <div className="text-blue-600 text-sm mb-1">
              <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="underline">{clinic.phone}</a>
            </div>
            <div className="text-gray-700 text-sm mb-1">{clinic.address}</div>
            <div className="text-gray-500 text-xs mb-2">{clinic.distance} km</div>
            <button
              onClick={() => onSelectClinic(clinic)}
              className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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