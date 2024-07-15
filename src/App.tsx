import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
