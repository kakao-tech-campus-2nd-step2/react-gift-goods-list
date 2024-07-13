import { useQuery } from 'react-query';

import { axiosInstance } from '@/api';
import type { ThemeData } from '@/types';

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]) => {
  return themeList.find((theme) => theme.key === themeKey);
};

export const useGetThemeData = (themeKey: string) => {
  return useQuery<ThemeData, Error>(['theme', themeKey], async () => {
    const response = await axiosInstance.get('/api/v1/themes');
    const themeList: ThemeData[] = response.data.themes;
    const theme = getCurrentTheme(themeKey, themeList);
    if (!theme) {
      throw new Error('Theme not found');
    }
    return theme;
  });
};

export default useGetThemeData;
