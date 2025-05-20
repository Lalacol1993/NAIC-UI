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
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">1. What is your gender?</label>
          <div className="flex gap-4">
            <label><input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male</label>
            <label><input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female</label>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-2">2. Which state do you currently reside in?</label>
          <select className="w-full border rounded p-2" value={state} onChange={e => setState(e.target.value)}>
            <option value="">Select a state</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2">3. What is your profession?</label>
          <input className="w-full border rounded p-2" type="text" value={profession} onChange={e => setProfession(e.target.value)} placeholder="Your profession" />
        </div>
        <div>
          <label className="block font-medium mb-2">4. What is your ethnicity?</label>
          <div className="flex gap-4 flex-wrap">
            {ETHNICITIES.map(e => (
              <label key={e}><input type="radio" name="ethnicity" value={e} checked={ethnicity === e} onChange={() => setEthnicity(e)} /> {e}</label>
            ))}
          </div>
          {ethnicity === 'Others' && (
            <input className="w-full border rounded p-2 mt-2" type="text" value={otherEthnicity} onChange={e => setOtherEthnicity(e.target.value)} placeholder="Please specify" />
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">5. By submitting this form, you agree that all information declared is accurate.</label>
          <div className="flex gap-4">
            <label><input type="radio" name="agree" value="Yes" checked={agree === 'Yes'} onChange={() => setAgree('Yes')} /> Yes</label>
            <label><input type="radio" name="agree" value="No" checked={agree === 'No'} onChange={() => setAgree('No')} /> No</label>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire; 