import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { createContext, Fragment, useContext } from 'react';

import { getThemes } from '@/apis/themes/themes';
import { ThemeMockData } from '@/types/mock';

const ThemeContext = createContext<Theme.ThemeData[]>([ThemeMockData]);

export const useThemes = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
    retry: 5,
  });

  if (isLoading || isError) {
    return <Fragment>{children}</Fragment>;
  }

  return <ThemeContext.Provider value={data?.themes ?? []}>{children}</ThemeContext.Provider>;
};
