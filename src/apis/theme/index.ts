import type { Theme } from '@/types/product';

import instance from '../instance';
import API from '../path';

export const getThemes = async (): Promise<Theme[]> => {
  const res = await instance.get(API.THEMES);
  console.log(res.data.themes);
  return res.data!.themes;
};
