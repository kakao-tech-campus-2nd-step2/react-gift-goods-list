// Define base URL
const baseURL = 'https://react-gift-mock-api-jaeanhan.vercel.app';

// Define Axios configuration
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance