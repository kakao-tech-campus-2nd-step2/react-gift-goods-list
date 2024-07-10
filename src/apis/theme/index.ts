import type { Theme } from '@/types/product';

import instance from '../instance';
import API from '../path.constants';

export const getThemes = async (): Promise<Theme[]> => {
  const { data } = await instance.get(API.THEMES);
  return data.themes;
};
