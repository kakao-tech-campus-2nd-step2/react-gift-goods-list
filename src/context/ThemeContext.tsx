import React, { createContext, useContext } from 'react';

import type { ThemeData } from '@/api/types';
import { useFetchThemes } from '@/hooks/useFetchThemes';

interface ThemeContextType {
  themes: ThemeData[] | undefined;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useFetchThemes();

  return <ThemeContext.Provider value={{ themes: data?.themes }}>{children}</ThemeContext.Provider>;
};

export const useThemes = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('에러가 발생했습니다.');
  }
  return context;
};

export const useThemeByKey = (themeKey: string): ThemeData | undefined => {
  const { themes } = useThemes();
  return themes?.find((theme) => theme.key === themeKey);
};
