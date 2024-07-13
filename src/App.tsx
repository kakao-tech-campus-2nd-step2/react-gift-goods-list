import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

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