import { useQuery } from 'react-query';

import { axiosInstance } from '@/api/index';
import type { ThemeData } from '@/types/index';

export const useGetThemes = () => {
  return useQuery<ThemeData[]>('themes', async () => {
    const response = await axiosInstance.get('/api/v1/themes');
    return response.data.themes;
  });
};
