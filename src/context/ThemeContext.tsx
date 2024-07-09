import React, { createContext, useContext, useEffect, useState } from 'react';

import { ApiService } from '@/api';
import type { ThemeData } from '@/api/types';

interface ThemeContextType {
  themes: ThemeData[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await ApiService.fetchThemes();
        setThemes(response.themes);
      } catch (error) {
        console.error('에러가 발생했어요.', error);
      }
    };

    fetchThemes();
  }, []);

  return <ThemeContext.Provider value={{ themes }}>{children}</ThemeContext.Provider>;
};

export const useThemes = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('에러가 발생했습니다.');
  }
  return context;
};
