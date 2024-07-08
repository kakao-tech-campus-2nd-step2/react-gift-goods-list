import axios from 'axios';

import type { ThemeData } from '@/types/api';

const apiClient = axios.create({
  baseURL: 'https://react-kakao-gift-mock-api.vercel.app/api/v1',
});

/* Theme data 가져오기 */
export const fetchThemes = async (): Promise<ThemeData[]> => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes;
};
