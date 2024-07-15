import { QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/provider/Auth';
import { Routes } from '@/routes';
import { queryClient } from '@/utils/queryClient';

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
