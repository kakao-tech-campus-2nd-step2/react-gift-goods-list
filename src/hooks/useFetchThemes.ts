import { useQuery } from '@tanstack/react-query';

import { ApiService } from '@/api/index';
import type { APIError,GetThemesResponse } from '@/api/types';

export const useFetchThemes = () => {
  return useQuery<GetThemesResponse, APIError>({
    queryKey: ['themes'],
    queryFn: ApiService.fetchThemes,
  });
};
