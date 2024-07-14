import { AuthProvider } from '@/provider/Auth';
import { ThemeProvider } from '@/provider/Theme/ThemeProvider';
import { Routes } from '@/routes';

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
