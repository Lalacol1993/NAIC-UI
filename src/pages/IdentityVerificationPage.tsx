import React, { useState, useRef, useEffect } from 'react';
import passportScanOutline from '../assets/passportscanoutline.svg';
import mykadFrontOutline from '../assets/IDoutlinefront.svg';
import mykadBackOutline from '../assets/IDoutlineback.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CameraScannerModalProps {
  open: boolean;
  onClose: () => void;
  type: 'passport' | 'mykad';
}

const CameraScannerModal: React.FC<CameraScannerModalProps> = ({ open, onClose, type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [captured, setCaptured] = useState<string | null>(null);
  const [side, setSide] = useState<'front' | 'back'>('front');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let localStream: MediaStream | null = null;
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode } })
        .then((mediaStream) => {
          setStream(mediaStream);
          localStream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        });
    }
    return () => {
      // Don't stop stream here
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, facingMode, side]);

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match the frame size (340x240)
      canvas.width = 340;
      canvas.height = 240;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Calculate the scaling factor to maintain aspect ratio
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        const frameAspectRatio = canvas.width / canvas.height;
        
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = video.videoWidth;
        let sourceHeight = video.videoHeight;
        
        // Adjust source dimensions to maintain aspect ratio
        if (videoAspectRatio > frameAspectRatio) {
          // Video is wider than frame
          sourceWidth = video.videoHeight * frameAspectRatio;
          sourceX = (video.videoWidth - sourceWidth) / 2;
        } else {
          // Video is taller than frame
          sourceHeight = video.videoWidth / frameAspectRatio;
          sourceY = (video.videoHeight - sourceHeight) / 2;
        }
        
        // Draw the cropped image
        ctx.drawImage(
          video,
          sourceX, sourceY, sourceWidth, sourceHeight,  // Source rectangle
          0, 0, canvas.width, canvas.height            // Destination rectangle
        );
        
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

  const handleNext = () => {
    if (type === 'mykad' && side === 'front') {
      setSide('back');
      setCaptured(null);
    } else {
      stopStream();
      onClose();
      navigate('/fee-waiver-upload'); // Navigate to fee waiver upload after completion
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <div className="relative w-full max-w-md h-[95vh] flex flex-col items-center justify-between">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full px-4 pt-4">
          <div></div>
          <button onClick={onClose} className="text-white text-2xl font-bold" aria-label="Close">&times;</button>
        </div>
        {/* Instruction Banner */}
        <div className="w-full flex justify-center mt-4">
          <div className="bg-neutral-800 text-white text-center text-base rounded-lg px-4 py-3 max-w-xs">
            {type === 'passport' 
              ? t('passportBanner')
              : side === 'front'
                ? t('mykadBannerFront')
                : t('mykadBannerBack')
            }
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
            {/* Overlay SVG - Document outline */}
            {type === 'passport' && (
              <img 
                src={passportScanOutline} 
                alt="Passport Outline" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
                style={{ zIndex: 10, opacity: 0.9 }}
              />
            )}
            {type === 'mykad' && side === 'front' && (
              <img 
                src={mykadFrontOutline} 
                alt="MyKad Front Outline" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
                style={{ zIndex: 10, opacity: 0.9 }}
              />
            )}
            {type === 'mykad' && side === 'back' && (
              <img 
                src={mykadBackOutline} 
                alt="MyKad Back Outline" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
                style={{ zIndex: 10, opacity: 0.9 }}
              />
            )}
            {/* Canvas for capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {/* Captured image */}
            {captured && (
              <img src={captured} alt="Captured" className="absolute top-0 left-0 w-full h-full object-contain rounded-2xl" style={{zIndex: 3}} />
            )}
          </div>
          {/* Label Card */}
          <div className="flex items-center bg-neutral-100 rounded-b-2xl w-[340px] py-3 px-4 border-t border-gray-200">
            {type === 'passport' ? (
              <>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" stroke="#3b82f6" strokeWidth="2" fill="#e0e7ef"/><rect x="5" y="7" width="5" height="6" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="1.5"/><rect x="12" y="9" width="7" height="2" rx="1" fill="#fff"/><rect x="12" y="13" width="7" height="2" rx="1" fill="#fff"/></svg>
                <span className="ml-3 text-gray-800 font-medium text-base">Passport Portrait Page</span>
              </>
            ) : (
              <>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" stroke="#3b82f6" strokeWidth="2" fill="#e0e7ef"/><rect x="5" y="7" width="5" height="6" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="1.5"/><rect x="12" y="9" width="7" height="2" rx="1" fill="#fff"/><rect x="12" y="13" width="7" height="2" rx="1" fill="#fff"/></svg>
                <span className="ml-3 text-gray-800 font-medium text-base">MyKad/MyPR {side === 'front' ? 'Front' : 'Back'} Side</span>
              </>
            )}
          </div>
        </div>
        {/* Take Photo Button */}
        <div className="w-full flex justify-center mb-6 mt-4">
          {!captured ? (
            <button onClick={handleCapture} className="w-[90%] py-4 bg-white text-black text-lg font-semibold rounded-full shadow-md">{t('takePhoto')}</button>
          ) : (
            <button onClick={handleRetake} className="w-[90%] py-4 bg-white text-black text-lg font-semibold rounded-full shadow-md">{t('retake')}</button>
          )}
        </div>
        {/* Bottom right button - Flip Camera or Done/Next */}
        {!captured ? (
          <button onClick={handleFlipCamera} className="absolute bottom-8 right-8 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold opacity-80">{t('flipCamera')}</button>
        ) : (
          <button onClick={handleNext} className="absolute bottom-8 right-8 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold opacity-80">
            {type === 'mykad' && side === 'front' ? t('next') : t('done')}
          </button>
        )}
      </div>
    </div>
  );
};

const IdentityVerificationPage: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState<'passport' | 'mykad'>('passport');
  const { t, i18n } = useTranslation();

  const handlePassportScan = () => {
    setCameraType('passport');
    setShowCamera(true);
  };

  const handleMyKadScan = () => {
    setCameraType('mykad');
    setShowCamera(true);
  };

  // Language selector
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
      {/* Language Selector */}
      <div className="w-full max-w-md flex justify-end mb-2 pr-2">
        <select
          value={i18n.language}
          onChange={handleLangChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="en">English</option>
          <option value="ms">Malay</option>
          <option value="zh">中文</option>
        </select>
      </div>
      <CameraScannerModal 
        open={showCamera} 
        onClose={() => setShowCamera(false)} 
        type={cameraType}
      />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-center text-2xl font-bold mb-2">{t('verifyIdentity')}</h2>
        <p className="text-center text-lg font-bold mb-6 mt-4">{t('secureVerification')}</p>
        <p className="text-center text-gray-600 mb-8 text-sm">
          {t('selectIdType')}
        </p>
        {/* Passport Option */}
        <div className="border rounded-xl p-6 mb-6 bg-gray-50">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-xl">📘</span>
            <span className="font-semibold text-lg">{t('passport')}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {t('passportInstructions')}
          </p>
          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            <li>✅ {t('passportStep1')}</li>
            <li>✅ {t('passportStep2')}</li>
            <li>✅ {t('passportStep3')}</li>
            <li>✅ {t('passportStep4')}</li>
          </ul>
          <button 
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-colors" 
            onClick={handlePassportScan}
          >
            {t('scanPassport')}
          </button>
        </div>
        {/* Malaysian ID Option */}
        <div className="border rounded-xl p-6 bg-gray-50">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-xl">💳</span>
            <span className="font-semibold text-lg">{t('mykad')}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {t('mykadInstructions')}
          </p>
          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            <li>✅ {t('mykadStep1')}</li>
            <li>✅ {t('mykadStep2')}</li>
            <li>✅ {t('mykadStep3')}</li>
            <li>✅ {t('mykadStep4')}</li>
          </ul>
          <button 
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-colors"
            onClick={handleMyKadScan}
          >
            {t('scanMykad')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerificationPage; 