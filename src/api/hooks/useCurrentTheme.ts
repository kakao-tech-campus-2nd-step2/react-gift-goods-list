import { useState, useEffect } from 'react';
import axios from 'axios';
import type { ThemeData } from '@/types';

type UseCurrentThemeProps = {
  themeKey: string;
};

type UseCurrentThemeResult = {
  isLoading: boolean;
  currentTheme: ThemeData | null;
  isError: boolean;
};

export const useCurrentTheme = ({ themeKey }: UseCurrentThemeProps): UseCurrentThemeResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes');
        const themes: ThemeData[] = response.data.themes;
        const theme = themes.find(t => t.key === themeKey);

        if (theme) {
          setCurrentTheme(theme);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, [themeKey]);

  return { isLoading, currentTheme, isError };
};