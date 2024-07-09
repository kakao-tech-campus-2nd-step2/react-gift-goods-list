import type { ThemeData } from '@/types';

import instance from './api';

export const fetchThemes = async (): Promise<ThemeData[]> => {
  const res = await instance.get<{ themes: ThemeData[] }>('/api/v1/themes');
  return res.data.themes;
};
