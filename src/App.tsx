import { ThemeProvider } from '@/context/themeContext';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
