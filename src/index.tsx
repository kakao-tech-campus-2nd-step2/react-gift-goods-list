import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
