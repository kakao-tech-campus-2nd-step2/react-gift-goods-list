import type { ThemesResponse } from '@/types';

import axiosInstance from './axiosInstance';

export const fetchThemes = async (): Promise<ThemesResponse> => {
  const response = await axiosInstance.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};
