import { useQuery } from '@tanstack/react-query';

import { instantAxios } from '.';
import type { Theme } from './types';

export type ThemeResponseData = {
  themes: Theme[];
};

export const useThemes = () =>
  useQuery<ThemeResponseData>({
    queryKey: ['themes'],
    queryFn: async () => {
      const response = await instantAxios.get<ThemeResponseData>('v1/themes');
      return response.data;
    },
  });
