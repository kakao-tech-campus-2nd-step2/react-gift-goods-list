import type { Theme } from '@/types/product';

import instance from '../instance';
import API from '../path';

export const getThemes = async (): Promise<Theme[]> => {
  const res = await instance.get(API.THEMES);
  return res.data!.themes;
};

export const getThemeDetail = async (themeKey: string): Promise<Theme> => {
  const res = await instance.get(`${API.THEMES}/${themeKey}`);
  return res.data!.theme;
};
