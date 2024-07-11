import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import { ThemeMockData } from '@/types/mock';

export const ThemeContext = createContext<Theme.ThemeData[]>([ThemeMockData]);
export const SetThemeContext = createContext<Dispatch<SetStateAction<Theme.ThemeData[]>> | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme.ThemeData[]>([ThemeMockData]);
  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};
