import type { ThemesResponse } from '@/types/index';

import api from './api';

export const fetchThemes = async (): Promise<ThemesResponse> => {
  const response = await api.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};
