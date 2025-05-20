import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import { DarkModeContext } from '../../App';

const AuthPage: React.FC = () => {
  const { dark } = useContext(DarkModeContext);
  return (
    <div className={dark ? 'min-h-screen flex items-center justify-center bg-gray-900' : 'min-h-screen flex items-center justify-center bg-gray-50'}>
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
        <LoginForm onSubmit={() => {}} onForgotPassword={() => {}} />
      </div>
    </div>
  );
};

export default AuthPage; 