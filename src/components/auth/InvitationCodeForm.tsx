import React, { useState } from 'react';
import FormInput from './FormInput';

interface InvitationCodeFormProps {
  onSubmit: (code: string) => void;
}

const InvitationCodeForm: React.FC<InvitationCodeFormProps> = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Invitation code is required');
      return;
    }

    setError('');
    onSubmit(code.trim());
  };

  return (
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="invitationCode"
          label="Invitation Code"
          type="text"
          placeholder="Enter your invitation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={error}
          required
        />
        
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default InvitationCodeForm;