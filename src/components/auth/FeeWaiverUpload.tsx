import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeeWaiverUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // You can handle file upload logic here
      setSubmitted(true);
    }
  };

  const handleNotEligible = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 animate-fadeIn">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">We waive consultation fees for people in B40 or those who make less than RM63,000 a year.</h2>
        <p className="text-gray-700 text-center mb-8">If you would like to apply for this waive please submit a recent tax form.</p>
        {submitted ? (
          <>
            <div className="text-green-600 text-center font-semibold py-8">Thank you! Your document has been submitted.</div>
            <button
              type="button"
              onClick={handleNotEligible}
              className="w-full mt-2 py-2 px-4 rounded-xl border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium transition"
            >
              Go to Home
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="block w-full text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                disabled={!file}
              >
                Submit
              </button>
            </form>
            <button
              type="button"
              onClick={handleNotEligible}
              className="w-full mt-2 py-2 px-4 rounded-xl border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium transition"
            >
              I'm not eligible
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FeeWaiverUpload; 