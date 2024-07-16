import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Footer from './components/features/Footer';
import AuthContext from './context/AuthContext';
import Error from './pages/Error';
import Login from './pages/Login';
import Main from './pages/Main';
import MyAccount from './pages/MyAccount';
import Theme from './pages/Theme';

axios.defaults.baseURL = 'https://react-gift-mock-api-self.vercel.app/api/v1';
const queryClient = new QueryClient();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        setIsAuthenticated(!!authToken);
    }, [isAuthenticated]);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                <RouterProvider router={router} />
                <Footer />
            </AuthContext.Provider>
        </QueryClientProvider>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/my-account',
        element: <MyAccount />,
    },
    {
        path: '/error/:http_status',
        element: <Error />,
    },
    {
        path: '/error/:http_status/:error_origin',
        element: <Error />,
    },
    {
        path: '/theme/:themeKey',
        element: <Theme />,
    },
]);

export default App;
