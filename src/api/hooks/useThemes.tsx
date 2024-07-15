import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { ThemeData } from '@/types';

type ThemesResponse = {
  themes: ThemeData[];
};

const getThemes = async (): Promise<ThemesResponse> => {
  const response = await fetchInstance.get('/v1/themes');
  return response.data;
};

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
  });
};
