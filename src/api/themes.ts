import type { ThemeData } from '@/types/api';

import apiClient from './apiClient';

/* Theme data 가져오기 */
export const fetchThemes = async (): Promise<ThemeData[]> => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes;
};
