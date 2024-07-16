import { useState } from 'react';
import { useQuery } from 'react-query';

import { getThemes } from '@/libs/api';
import type { ThemeData } from '@/types';

export const useThemes = (themeKey: string) => {
  const [error, setError] = useState<string>('');
  const [theme, setTheme] = useState<ThemeData | null>(null);

  const { isLoading, isError } = useQuery(['themes'], getThemes, {
    onSuccess: (data) => {
      const currentTheme = data.themes.find(
        (currentData: ThemeData) => currentData.key === themeKey,
      );
      if (!currentTheme) {
        setError('Theme을 찾을 수 없습니다.');
      } else {
        setTheme(currentTheme);
      }
    },
    onError: (err) => {
      setError((err as Error).message);
    },
  });

  return { theme, isLoading, isError, error };
};
