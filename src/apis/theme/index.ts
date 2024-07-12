import type { Theme } from '@/types/product';

import instance from '../instance';
import API from '../path.constants';

interface ThemesResponse {
  themes: Theme[];
}

export const getThemes = async () => {
  const { data } = await instance.get<ThemesResponse>(API.THEMES);
  return data.themes;
};
