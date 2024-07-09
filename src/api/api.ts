import axios from 'axios';
import { ThemeData } from '@/types/index';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-hojeong26-git-main-hojeongs-projects.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchThemesFromAPI = async (): Promise<ThemeData[]> => {
  const response = await api.get<{ themes: ThemeData[] }>('/api/v1/themes');
  return response.data.themes;
};
