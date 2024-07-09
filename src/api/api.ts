import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-gift-mock-api-dlwltn0430.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
