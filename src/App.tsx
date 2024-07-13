import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
