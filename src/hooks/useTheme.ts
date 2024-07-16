import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

import type { ThemeData } from '@/types/index';
import type { ThemesResponse } from '@/types/index';

const fetcthTheme = async () => {
  const url = 'https://react-gift-mock-api-seungbeom.vercel.app/api/v1/themes';
  const response = await axios.get<ThemesResponse>(url);
  return response.data.themes;
};

export const useTheme = () => {
  const { data: themes, isLoading } = useQuery<ThemeData[], AxiosError>({
    queryKey: ['themes'],
    queryFn: fetcthTheme,
  });
  return { themes, isLoading };
};
