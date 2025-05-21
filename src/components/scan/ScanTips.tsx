import React, { useState } from 'react';

interface ScanTipsProps {
  type: 'lidar' | 'camera';
  onContinue: () => void;
}

const tips = {
  lidar: [
    'Ensure the room is well-lit.',
    'Stand still and let the scan complete.',
    'Remove any reflective objects from your body.',
    'Follow the on-screen outline for best results.'
  ],
  camera: [
    'Ensure the room is well-lit.',
    'Hold the camera steady and parallel to your body.',
    'Remove any reflective objects from your body.',
    'Make sure your entire body is visible in the frame.'
  ]
};

const ScanTips: React.FC<ScanTipsProps> = ({ type, onContinue }) => {
  const [showPolycamLink, setShowPolycamLink] = useState(false);

  const handleContinue = () => {
    setShowPolycamLink(true);
  };

  if (showPolycamLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Download Polycam</h2>
          <p className="text-gray-700 mb-6 text-center">
            For the best scanning experience, we recommend using the Polycam app on your iOS device.
          </p>
          <a
            href="https://apps.apple.com/app/polycam-3d-scanner/id1532482376"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-lg text-center block"
          >
            Download Polycam
          </a>
          <button
            onClick={onContinue}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Continue without Polycam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">{type === 'lidar' ? 'Lidar Scan Tips' : 'Camera Scan Tips'}</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
          {tips[type].map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-lg"
          onClick={handleContinue}
        >
          I understand
        </button>
      </div>
    </div>
  );
};

export default ScanTips; 