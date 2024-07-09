import type { ThemeData } from '@/types';

import instance from '../instance';
import API from '../path';

export const getThemes = async (): Promise<ThemeData[]> => {
  const res = await instance.get<ThemeData[]>(API.THEMES);
  return res.data;
};
