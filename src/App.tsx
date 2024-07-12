import { AuthProvider } from './provider/Auth/Auth';
import { Routes } from './routes/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
