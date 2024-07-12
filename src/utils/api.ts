// src\utils\api.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://react-gift-mock-api-geonbur.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
