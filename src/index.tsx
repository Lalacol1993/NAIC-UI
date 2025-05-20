import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// i18n setup
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        verifyIdentity: 'Verify Your Identity',
        secureVerification: 'Secure Identity Verification',
        selectIdType: 'Please select the type of identification you wish to scan and follow the instructions carefully.',
        passport: 'Passport',
        scanPassport: 'Scan Passport',
        passportInstructions: 'To scan your passport, open it to the page with your photo and details. Ensure the entire page is visible and well-lit.',
        passportStep1: 'Place your passport on a flat, dark surface.',
        passportStep2: 'Open to the photo page.',
        passportStep3: 'Ensure all text and the photo are clear.',
        passportStep4: 'Avoid any shadows or glare.',
        mykad: 'Malaysian Identity Card (MyKad) / Malaysian Permanent Resident (MyPR)',
        scanMykad: 'Scan MyKad / MyPR',
        mykadInstructions: 'Place your MyKad / MyPR on a flat surface. Scan both the front and back sides when prompted.',
        mykadStep1: 'Use a dark background.',
        mykadStep2: 'Capture all four corners of the card.',
        mykadStep3: 'Ensure the NRIC number is readable.',
        mykadStep4: 'Scan both sides clearly.',
        takePhoto: 'Take photo',
        retake: 'Retake',
        flipCamera: 'Flip Camera',
        next: 'Next',
        done: 'Done',
        scanning: 'Scanning',
        passportBanner: 'Take a clear photo of your entire passport portrait page.',
        mykadBannerFront: 'Take a clear photo of your MyKad/MyPR front side.',
        mykadBannerBack: 'Take a clear photo of your MyKad/MyPR back side.'
      }
    },
    ms: {
      translation: {
        verifyIdentity: 'Sahkan Identiti Anda',
        secureVerification: 'Pengesahan Identiti Selamat',
        selectIdType: 'Sila pilih jenis pengenalan yang ingin diimbas dan ikut arahan dengan teliti.',
        passport: 'Pasport',
        scanPassport: 'Imbas Pasport',
        passportInstructions: 'Untuk mengimbas pasport anda, buka ke muka surat dengan gambar dan butiran anda. Pastikan seluruh muka surat kelihatan dan terang.',
        passportStep1: 'Letakkan pasport anda di permukaan rata dan gelap.',
        passportStep2: 'Buka ke muka surat gambar.',
        passportStep3: 'Pastikan semua teks dan gambar jelas.',
        passportStep4: 'Elakkan bayang-bayang atau silau.',
        mykad: 'Kad Pengenalan Malaysia (MyKad) / Penduduk Tetap Malaysia (MyPR)',
        scanMykad: 'Imbas MyKad / MyPR',
        mykadInstructions: 'Letakkan MyKad / MyPR anda di permukaan rata. Imbas kedua-dua bahagian depan dan belakang apabila diminta.',
        mykadStep1: 'Gunakan latar belakang gelap.',
        mykadStep2: 'Tangkap keempat-empat penjuru kad.',
        mykadStep3: 'Pastikan nombor NRIC boleh dibaca.',
        mykadStep4: 'Imbas kedua-dua bahagian dengan jelas.',
        takePhoto: 'Ambil gambar',
        retake: 'Ambil semula',
        flipCamera: 'Tukar Kamera',
        next: 'Seterusnya',
        done: 'Selesai',
        scanning: 'Mengimbas',
        passportBanner: 'Ambil gambar jelas muka depan pasport anda.',
        mykadBannerFront: 'Ambil gambar jelas bahagian depan MyKad/MyPR anda.',
        mykadBannerBack: 'Ambil gambar jelas bahagian belakang MyKad/MyPR anda.'
      }
    },
    zh: {
      translation: {
        verifyIdentity: '验证您的身份',
        secureVerification: '安全身份验证',
        selectIdType: '请选择您要扫描的身份证明类型，并仔细按照说明操作。',
        passport: '护照',
        scanPassport: '扫描护照',
        passportInstructions: '要扫描您的护照，请打开带有您照片和详细信息的页面。确保整个页面清晰可见且光线充足。',
        passportStep1: '将护照放在平坦、深色的表面上。',
        passportStep2: '打开到有照片的页面。',
        passportStep3: '确保所有文字和照片清晰。',
        passportStep4: '避免任何阴影或眩光。',
        mykad: '马来西亚身份证 (MyKad) / 马来西亚永久居民 (MyPR)',
        scanMykad: '扫描 MyKad / MyPR',
        mykadInstructions: '请将您的 MyKad / MyPR 放在平坦的表面上。根据提示扫描正反两面。',
        mykadStep1: '使用深色背景。',
        mykadStep2: '拍摄身份证的四个角。',
        mykadStep3: '确保 NRIC 号码清晰可见。',
        mykadStep4: '正反两面都要清晰扫描。',
        takePhoto: '拍照',
        retake: '重拍',
        flipCamera: '切换摄像头',
        next: '下一步',
        done: '完成',
        scanning: '扫描中',
        passportBanner: '请拍摄护照照片页的清晰照片。',
        mykadBannerFront: '请拍摄 MyKad/MyPR 正面的清晰照片。',
        mykadBannerBack: '请拍摄 MyKad/MyPR 背面的清晰照片。'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 