import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/context/ThemeContext';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
