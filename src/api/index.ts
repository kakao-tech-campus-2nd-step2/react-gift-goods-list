import axios from 'axios';

const api = axios.create({
    baseURL: 'https://react-gift-mock-api-seongikx.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
