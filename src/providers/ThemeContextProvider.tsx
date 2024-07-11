import {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import FetchStatus from '@constants/FetchStatus';
import { ThemesResponse } from '@/types/response';
import { ThemeData } from '@/dto';

type ThemeDataRepository = { [key: string]: ThemeData };

interface ThemeContextData {
  themes: ThemeDataRepository;
  fetchStatus: FetchStatus;
}

const defaultThemeContextData = {
  themes: {},
  fetchStatus: FetchStatus.FETCHING,
};

export const ThemeContext = createContext<ThemeContextData>(defaultThemeContextData);

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<ThemeDataRepository>({});
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.FETCHING);
  const value = useMemo<ThemeContextData>(() => ({
    themes, fetchStatus,
  }), [themes, fetchStatus]);

  useEffect(() => {
    async function request() {
      try {
        const response = await axiosInstance.get<ThemesResponse>(RequestURLs.THEMES);
        const tmpThemes: ThemeDataRepository = {};
        response.data.themes.forEach((theme) => {
          tmpThemes[theme.key] = theme;
        });
        setThemes(tmpThemes);
        setFetchStatus(FetchStatus.FETCH_SUCCESS);
      } catch (e) {
        setFetchStatus(FetchStatus.FETCH_ERROR);
      }
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
