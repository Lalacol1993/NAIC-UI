import React, { useState } from 'react';
import { Camera, Scan, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ScanSelectionProps {
  onSelect: (type: 'lidar' | 'camera') => void;
}

const ScanSelection: React.FC<ScanSelectionProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<'lidar' | 'camera' | null>(null);
  const navigate = useNavigate();

  const handleTypeSelect = (type: 'lidar' | 'camera') => {
    setSelectedType(type);
  };

  const handleUnderstand = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  if (selectedType === 'lidar') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button
          onClick={() => setSelectedType(null)}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        
        <h1 className="text-2xl font-bold mb-6">Tips for LiDAR Scanning</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Ensure good room lighting
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Please take off your upper garments
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              If wearing any top undergarment, ensure that it does not obstruct too much
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Place your phone on an elevated surface then face your back towards the camera
            </li>
          </ul>
        </div>

        <button
          onClick={handleUnderstand}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          I Understand
        </button>
      </div>
    );
  }

  if (selectedType === 'camera') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button
          onClick={() => setSelectedType(null)}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        
        <h1 className="text-2xl font-bold mb-6">Tips for Camera Scanning</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Ensure good room lighting
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Please take off your upper garments
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              If wearing any top undergarment, ensure that it is thin and contrasts your skin tone
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Place your phone on an elevated surface then face your back towards the camera
            </li>
          </ul>
        </div>

        <button
          onClick={handleUnderstand}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          I Understand
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex">
      <button
        onClick={() => handleTypeSelect('lidar')}
        className="flex-1 bg-white flex items-center justify-center space-x-4 hover:bg-gray-50 transition-colors"
      >
        <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Scan size={32} className="text-purple-600" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-900">LiDAR Scan</h2>
          <p className="text-gray-600">3D depth sensing for precise measurements</p>
        </div>
      </button>

      <button
        onClick={() => handleTypeSelect('camera')}
        className="flex-1 bg-white flex items-center justify-center space-x-4 hover:bg-gray-50 transition-colors border-l border-gray-100"
      >
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Camera size={32} className="text-blue-600" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-900">Camera Scan</h2>
          <p className="text-gray-600">Standard photo capture for visual assessment</p>
        </div>
      </button>
    </div>
  );
};

export default ScanSelection; 