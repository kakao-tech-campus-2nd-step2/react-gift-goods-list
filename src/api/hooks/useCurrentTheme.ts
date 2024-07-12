import { useQuery } from 'react-query';
import axios from 'axios';
import type { ThemeData } from '@/types';

type UseCurrentThemeProps = {
  themeKey: string;
};

export const useCurrentTheme = ({ themeKey }: UseCurrentThemeProps) => {
  return useQuery<ThemeData, Error>(['currentTheme', themeKey], async () => {
    const response = await axios.get('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes');
    const themes: ThemeData[] = response.data.themes;
    const theme = themes.find(t => t.key === themeKey);

    if (!theme) {
      throw new Error('Theme not found');
    }

    return theme;
  });
};
