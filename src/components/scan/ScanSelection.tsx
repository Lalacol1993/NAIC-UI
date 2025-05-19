import React from 'react';
import { Camera, Scan } from 'lucide-react';

interface ScanSelectionProps {
  onSelect: (type: 'lidar' | 'camera') => void;
}

const ScanSelection: React.FC<ScanSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Select Scan Type</h1>
      
      <div className="space-y-4">
        <button
          onClick={() => onSelect('lidar')}
          className="w-full bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4 hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Scan size={24} className="text-purple-600" />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-gray-900">LiDAR Scan</h2>
            <p className="text-sm text-gray-600">3D depth sensing for precise measurements</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('camera')}
          className="w-full bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4 hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Camera size={24} className="text-blue-600" />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-gray-900">Camera Scan</h2>
            <p className="text-sm text-gray-600">Standard photo capture for visual assessment</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ScanSelection; 