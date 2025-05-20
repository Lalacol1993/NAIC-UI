import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
};

export default App;