import { useQuery } from 'react-query';
import axios from 'axios';
import type { ThemeData } from '@/types';

type UseCurrentThemeProps = {
  themeKey: string;
};

export const useCurrentTheme = ({ themeKey }: UseCurrentThemeProps) => {
  return useQuery<ThemeData, Error>(['currentTheme', themeKey], async () => {
    const response = await axios.get('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes')
      .then((response) => response)
      .catch((error) => {
        console.error("fetch에 실패하였습니다:", error);
        throw new Error('theme data fetch 실패');
      });

    // 추가적인 검증 로직
    if (!response || !response.data || !Array.isArray(response.data.themes)) {
      throw new Error('유효하지않은 response');
    }

    const themes: ThemeData[] = response.data.themes;
    const theme = themes.find(t => t.key === themeKey);

    if (!theme) {
      throw new Error('Theme not found');
    }

    return theme;
  });
};
