import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import { DarkModeContext } from '../../App';

const AuthPage: React.FC = () => {
  const { dark } = useContext(DarkModeContext);
  return (
    <div className={dark ? 'min-h-screen flex items-center justify-center bg-gray-900' : 'min-h-screen flex items-center justify-center bg-gray-50'}>
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <LoginForm onSubmit={() => {}} onForgotPassword={() => {}} />
      </div>
    </div>
  );
};

export default AuthPage; 