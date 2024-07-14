import axios from 'axios';

import { BASE_URI } from '@/constants/URI';

export const axiosClient = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'application/json',
    // 'Cross-Control-Allow-Origin': '*',
  },
});
