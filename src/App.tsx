import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@/context/themeContext';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
