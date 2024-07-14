import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './provider/Auth/Auth';
import { Routes } from './routes/Routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
