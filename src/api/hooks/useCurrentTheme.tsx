import { useEffect, useState } from 'react';

import { getThemes } from '@/api/api';
import type { ThemeData } from '@/types';

type UseCurrentThemeProps = {
  themeKey: string;
};

export const useCurrentTheme = ({ themeKey }: UseCurrentThemeProps) => {
  const [isRender, setIsRender] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      const themes = await getThemes();
      const foundTheme = themes.themes.find((theme) => theme.key === themeKey);
      setCurrentTheme(foundTheme || null);
      setIsRender(true);
    };

    fetchThemes();
  }, [themeKey]);

  return { isRender, currentTheme };
};
