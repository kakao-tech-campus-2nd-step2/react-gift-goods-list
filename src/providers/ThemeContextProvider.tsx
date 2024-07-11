import {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { ThemesResponse } from '@/types/response';
import { ThemeData } from '@/dto';

type ThemeContextData = { [key: string]: ThemeData };

const defaultThemeContextData = {};

export const ThemeContext = createContext<ThemeContextData>(defaultThemeContextData);

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<ThemeContextData>({});
  const value = useMemo<ThemeContextData>(() => themes, [themes]);

  useEffect(() => {
    async function request() {
      const response = await axiosInstance.get<ThemesResponse>(RequestURLs.THEMES);
      const tmpThemes: ThemeContextData = {};
      response.data.themes.forEach((theme) => {
        tmpThemes[theme.key] = theme;
      });
      setThemes(tmpThemes);
    }

    request();
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
