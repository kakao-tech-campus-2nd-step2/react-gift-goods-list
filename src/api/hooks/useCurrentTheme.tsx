import { useEffect, useState } from 'react';

import { getThemes } from '@/api/api';
import type { ThemeData } from '@/types';

type UseCurrentThemeProps = {
  themeKey: string;
};

export const useCurrentTheme = ({ themeKey }: UseCurrentThemeProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themes = await getThemes();
        const foundTheme = themes.themes.find((theme) => theme.key === themeKey);
        setCurrentTheme(foundTheme || null);
      } catch (error) {
        setCurrentTheme(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, [themeKey]);

  return { isLoading, currentTheme };
};
