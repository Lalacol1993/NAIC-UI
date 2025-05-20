import React from 'react';

interface ScanSelectionProps {
  onSelect: (type: 'lidar' | 'camera') => void;
}

const placeholderLidar = 'https://raw.githubusercontent.com/Lalacol1993/NAIC-UI/refs/heads/main/src/assets/Lidar%20scan%20image.png';
const placeholderCamera = 'https://raw.githubusercontent.com/Lalacol1993/NAIC-UI/refs/heads/main/src/assets/Camera%20scan%20image.png';

const ScanSelection: React.FC<ScanSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-6">
      {/* Subtitle */}
      <div className="w-full max-w-md text-left mb-4">
        <span className="text-lg font-bold text-blue-700">Scanning</span>
      </div>
      {/* Scan Options */}
      <div className="w-full max-w-md grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button
          onClick={() => onSelect('lidar')}
          className="relative rounded-xl overflow-hidden shadow-lg h-48 flex items-end justify-start focus:outline-none group"
        >
          <img src={placeholderLidar} alt="Lidar Scan" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-95 transition" />
          <div className="absolute inset-0 bg-green-200 bg-opacity-60 group-hover:bg-opacity-70 transition" />
          <div className="absolute top-3 left-3 bg-white bg-opacity-80 text-green-700 text-xs font-semibold px-2 py-0.5 rounded shadow">*Suggested</div>
          <span className="relative z-10 text-2xl sm:text-3xl font-bold text-white drop-shadow-lg p-4 font-sans tracking-wide" style={{fontFamily: 'Inter, sans-serif'}}>Lidar Scan</span>
        </button>
        <button
          onClick={() => onSelect('camera')}
          className="relative rounded-xl overflow-hidden shadow-lg h-48 flex items-end justify-start focus:outline-none group"
        >
          <img src={placeholderCamera} alt="Camera Scan" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-95 transition" />
          <div className="absolute inset-0 bg-blue-200 bg-opacity-60 group-hover:bg-opacity-70 transition" />
          <span className="relative z-10 text-2xl sm:text-3xl font-bold text-white drop-shadow-lg p-4 font-sans tracking-wide" style={{fontFamily: 'Inter, sans-serif'}}>Camera Scan</span>
        </button>
      </div>
    </div>
  );
};

export default ScanSelection; 
