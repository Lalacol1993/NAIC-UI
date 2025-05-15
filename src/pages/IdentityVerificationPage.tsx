import React, { useState, useRef, useEffect } from 'react';
import passportScanOutline from '../assets/passportscanoutline.svg';

const CameraScannerModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [captured, setCaptured] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode } })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, facingMode]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCaptured(canvas.toDataURL('image/png'));
      }
    }
  };

  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleRetake = () => {
    setCaptured(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <div className="relative w-full max-w-md h-[95vh] flex flex-col items-center justify-between">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full px-4 pt-4">
          <button className="text-white text-2xl font-bold" aria-label="Back">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={onClose} className="text-white text-2xl font-bold" aria-label="Close">&times;</button>
        </div>
        {/* Instruction Banner */}
        <div className="w-full flex justify-center mt-4">
          <div className="bg-neutral-800 text-white text-center text-base rounded-lg px-4 py-3 max-w-xs">
            Take a clear photo of your entire passport portrait page.
          </div>
        </div>
        {/* Scan Area */}
        <div className="flex flex-col items-center w-full mt-6">
          <div className="relative w-[340px] h-[240px] rounded-2xl border-4 border-white" style={{boxShadow: '0 0 0 4px #222'}}>
            {/* Video feed */}
            {!captured && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                style={{ zIndex: 1 }}
              />
            )}
            {/* Overlay SVG - Passport outline */}
            <img 
              src={passportScanOutline} 
              alt="Passport Outline" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
              style={{ zIndex: 10, opacity: 0.9 }}
            />
            {/* Canvas for capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {/* Captured image */}
            {captured && (
              <img src={captured} alt="Captured" className="absolute top-0 left-0 w-full h-full object-contain rounded-2xl" style={{zIndex: 3}} />
            )}
          </div>
          {/* Label Card */}
          <div className="flex items-center bg-neutral-100 rounded-b-2xl w-[340px] py-3 px-4 border-t border-gray-200">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" stroke="#3b82f6" strokeWidth="2" fill="#e0e7ef"/><rect x="5" y="7" width="5" height="6" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="1.5"/><rect x="12" y="9" width="7" height="2" rx="1" fill="#fff"/><rect x="12" y="13" width="7" height="2" rx="1" fill="#fff"/></svg>
            <span className="ml-3 text-gray-800 font-medium text-base">Passport Portrait Page</span>
          </div>
        </div>
        {/* Take Photo Button */}
        <div className="w-full flex justify-center mb-6 mt-4">
          {!captured ? (
            <button onClick={handleCapture} className="w-[90%] py-4 bg-white text-black text-lg font-semibold rounded-full shadow-md">Take photo</button>
          ) : (
            <button onClick={handleRetake} className="w-[90%] py-4 bg-white text-black text-lg font-semibold rounded-full shadow-md">Retake</button>
          )}
        </div>
        {/* Flip Camera Button (optional, bottom right) */}
        <button onClick={handleFlipCamera} className="absolute bottom-8 right-8 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold opacity-80">Flip Camera</button>
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