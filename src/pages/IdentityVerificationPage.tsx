import React from 'react';

const IdentityVerificationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
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
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-colors">Scan Passport</button>
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