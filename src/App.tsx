import { ThemeProvider } from '@/context/ThemeContext';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
