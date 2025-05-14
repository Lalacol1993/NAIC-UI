import React, { useState, useRef, useEffect } from 'react';

const CameraScannerModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        });
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-black rounded-xl shadow-lg w-full max-w-md h-[70vh] flex flex-col items-center justify-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl font-bold z-10">&times;</button>
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-lg w-full h-full object-cover"
            style={{ maxHeight: '60vh' }}
          />
          {/* Scanning outline overlay */}
          <div className="absolute border-4 border-indigo-500 rounded-lg pointer-events-none"
            style={{
              top: '15%',
              left: '10%',
              width: '80%',
              height: '60%',
              boxSizing: 'border-box',
            }}
          ></div>
        </div>
        <div className="text-white text-center mt-4">Align your passport within the frame</div>
      </div>
    </div>
  );
};

const IdentityVerificationPage: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
      <CameraScannerModal open={showCamera} onClose={() => setShowCamera(false)} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-center text-2xl font-bold mb-2">Verify Your Identity</h2>
        <p className="text-center text-lg font-bold mb-6 mt-4">Secure Identity Verification</p>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Please select the type of identification you wish to scan and follow the instructions carefully.
        </p>
        {/* Passport Option */}
        <div className="border rounded-xl p-6 mb-6 bg-gray-50">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-xl">📘</span>
            <span className="font-semibold text-lg">Passport</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            To scan your passport, open it to the page with your photo and details. Ensure the entire page is visible and well-lit.
          </p>
          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            <li>✅ Place your passport on a flat, dark surface.</li>
            <li>✅ Open to the photo page.</li>
            <li>✅ Ensure all text and the photo are clear.</li>
            <li>✅ Avoid any shadows or glare.</li>
          </ul>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-colors" onClick={() => setShowCamera(true)}>Scan Passport</button>
        </div>
        {/* Malaysian ID Option */}
        <div className="border rounded-xl p-6 bg-gray-50">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-xl">💳</span>
            <span className="font-semibold text-lg">Malaysian Identity Card (MyKad) / Malaysian Permanent Resident (MyPR)</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Place your <span className="font-semibold">MyKad / MyPR</span> on a flat surface. Scan both the front and back sides when prompted.
          </p>
          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            <li>✅ Use a dark background.</li>
            <li>✅ Capture all four corners of the card.</li>
            <li>✅ Ensure the NRIC number is readable.</li>
            <li>✅ Scan both sides clearly.</li>
          </ul>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-colors">Scan MyKad / MyPR</button>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerificationPage; 