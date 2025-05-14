import React, { useState, useRef, useEffect } from 'react';
import PassportOutline from '../components/PassportOutline';

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
            <PassportOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

const IdentityVerificationPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(true);

  // Prevent modal from closing immediately on page load
  useEffect(() => {
    setModalOpen(true);
  }, []);

  return (
    <div>
      <CameraScannerModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {!modalOpen && (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-lg mb-4">Scanner closed. Please reopen to continue verification.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reopen Scanner
          </button>
        </div>
      )}
    </div>
  );
};

export default IdentityVerificationPage;