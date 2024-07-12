import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Footer } from './components/features/Layout/Footer';
import { Header } from './components/features/Layout/Header';
import { HomePage } from './pages/Home';
//import { LoginPage } from './pages/Login';
//import { MyAccountPage } from './pages/MyAccount';
import { ThemePage } from './pages/Theme';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theme/:themeKey" element={<ThemePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
