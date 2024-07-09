import axios from 'axios';

import type { ThemeData } from '@/types';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-eunjin.vercel.app/',});

export const getTheme = async (): Promise<ThemeData[]> => {
  const response = await api.get<{ themes: ThemeData[] }>('/api/v1/themes');
  return response.data.themes;
};



export default api;

