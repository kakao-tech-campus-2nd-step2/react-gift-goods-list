import { createContext, useContext } from 'react';

// import axios from 'axios';
import { getThemes } from '@/apis/Theme/theme.api';
import { ThemesResponse } from '@/apis/Theme/theme.response';
import { useQuery } from '@tanstack/react-query';

type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description?: string;
  backgroundColor: string;
};

interface ThemeContextProps {
  themes: ThemeData[];
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery<ThemesResponse>({
    queryKey: ['themes'],
    queryFn: getThemes,
  });

  return (
    <ThemeContext.Provider value={{ themes: data?.themes || [], isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
