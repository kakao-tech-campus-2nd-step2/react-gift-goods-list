import '@/styles';

import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import { queryClient } from '@/apis/tanstackQuery';
import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
