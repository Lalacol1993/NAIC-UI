import React from 'react';

interface ScanSelectionProps {
  onSelect: (type: 'lidar' | 'camera') => void;
}

const placeholderLidar = 'https://via.placeholder.com/300x200?text=Lidar+Scan';
const placeholderCamera = 'https://via.placeholder.com/300x200?text=Camera+Scan';

const ScanSelection: React.FC<ScanSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-8">
      {/* Title */}
      <h1 className="text-xl font-bold text-blue-700 mb-2">Scanning</h1>
      {/* Card Buttons */}
      <div className="w-full max-w-md grid grid-cols-1 gap-6 mt-4">
        <button
          onClick={() => onSelect('lidar')}
          className="w-full bg-green-100 rounded-xl shadow flex flex-col items-center p-0 overflow-hidden relative hover:shadow-lg transition"
        >
          <img src={placeholderLidar} alt="Lidar Scan" className="w-full h-40 object-cover" />
          <div className="absolute top-2 left-2 bg-white bg-opacity-80 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">*Suggested</div>
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-2xl font-bold text-white drop-shadow-lg">Lidar Scan</span>
          </div>
        </button>
        <button
          onClick={() => onSelect('camera')}
          className="w-full bg-blue-100 rounded-xl shadow flex flex-col items-center p-0 overflow-hidden relative hover:shadow-lg transition"
        >
          <img src={placeholderCamera} alt="Camera Scan" className="w-full h-40 object-cover" />
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-2xl font-bold text-white drop-shadow-lg">Camera Scan</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ScanSelection; 