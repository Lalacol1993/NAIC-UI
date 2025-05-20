import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import AppRoutes from './routes';

export const DarkModeContext = createContext<{dark: boolean, toggle: () => void}>({dark: false, toggle: () => {}});

const App: React.FC = () => {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark((d) => !d);

  return (
    <Router>
      <DarkModeContext.Provider value={{ dark, toggle }}>
        <div className={dark ? 'dark bg-gray-900 min-h-screen' : ''}>
          <UserProvider>
            <AppRoutes />
            <button
              onClick={toggle}
              className="fixed top-4 right-4 z-50 px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow"
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </UserProvider>
        </div>
      </DarkModeContext.Provider>
    </Router>
  );
};

export default App;