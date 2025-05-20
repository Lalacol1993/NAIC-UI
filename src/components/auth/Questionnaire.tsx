import React, { useState } from 'react';

interface QuestionnaireProps {
  onComplete: (answers: any) => void;
}

const STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Malacca', 'Negeri Sembilan', 'Pahang',
  'Perak', 'Perlis', 'Selangor', 'Terengganu', 'Sabah', 'Sarawak',
];

const ETHNICITIES = ['Chinese', 'Malay', 'Indian', 'Others'];

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [profession, setProfession] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [otherEthnicity, setOtherEthnicity] = useState('');
  const [agree, setAgree] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender || !state || !profession || !ethnicity || !agree) {
      setError('Please answer all questions.');
      return;
    }
    if (ethnicity === 'Others' && !otherEthnicity) {
      setError('Please specify your ethnicity.');
      return;
    }
    if (agree !== 'Yes') {
      setError('You must agree that all information is accurate.');
      return;
    }
    setError('');
    onComplete({ gender, state, profession, ethnicity: ethnicity === 'Others' ? otherEthnicity : ethnicity, agree });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 relative animate-fadeIn">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 rounded-t-2xl overflow-hidden">
          <div className="h-full bg-blue-500 transition-all" style={{ width: '100%' }} />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center tracking-tight">A Few Quick Questions</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900">1. What is your gender?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-base font-medium text-gray-700 hover:text-blue-600">
                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="accent-blue-600 w-5 h-5" />
                Male
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-base font-medium text-gray-700 hover:text-blue-600">
                <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="accent-blue-600 w-5 h-5" />
                Female
              </label>
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900">2. Which state do you currently reside in?</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" value={state} onChange={e => setState(e.target.value)}>
              <option value="">Select a state</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900">3. What is your profession?</label>
            <input className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" value={profession} onChange={e => setProfession(e.target.value)} placeholder="Your profession" />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900">4. What is your ethnicity?</label>
            <div className="flex gap-6 flex-wrap">
              {ETHNICITIES.map(e => (
                <label key={e} className="flex items-center gap-2 cursor-pointer text-base font-medium text-gray-700 hover:text-blue-600">
                  <input type="radio" name="ethnicity" value={e} checked={ethnicity === e} onChange={() => setEthnicity(e)} className="accent-blue-600 w-5 h-5" />
                  {e}
                </label>
              ))}
            </div>
            {ethnicity === 'Others' && (
              <input className="w-full border border-gray-300 rounded-lg p-3 text-base mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" value={otherEthnicity} onChange={e => setOtherEthnicity(e.target.value)} placeholder="Please specify" />
            )}
          </div>
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900">5. By submitting this form, you agree that all information declared is accurate.</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-base font-medium text-gray-700 hover:text-blue-600">
                <input type="radio" name="agree" value="Yes" checked={agree === 'Yes'} onChange={() => setAgree('Yes')} className="accent-blue-600 w-5 h-5" />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-base font-medium text-gray-700 hover:text-blue-600">
                <input type="radio" name="agree" value="No" checked={agree === 'No'} onChange={() => setAgree('No')} className="accent-blue-600 w-5 h-5" />
                No
              </label>
            </div>
          </div>
          {error && <div className="text-red-600 text-base font-medium text-center mt-2">{error}</div>}
          <button type="submit" className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire; 