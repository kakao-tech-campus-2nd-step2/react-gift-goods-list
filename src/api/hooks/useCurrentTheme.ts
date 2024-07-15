import { useQuery } from 'react-query';
import { fetchData } from '@/api/utils/fetchData';
import type { ThemeData } from '@/types';

type UseCurrentThemeProps = {
  themeKey: string;
};

export const useCurrentTheme = ({ themeKey }: UseCurrentThemeProps) => {
  return useQuery<ThemeData, Error>(['currentTheme', themeKey], async () => {
    const response = await fetchData<{ themes: ThemeData[] }>('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes');

    // 추가적인 검증 로직
    const themes = response.themes;
    if (!themes || !Array.isArray(themes)) {
      throw new Error('유효하지 않은 response');
    }

    const theme = themes.find(t => t.key === themeKey);
    if (!theme) {
      throw new Error('Theme not found');
    }

    return theme;
  });
};
