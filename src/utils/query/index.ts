import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { ThemesResponse } from '@/types/response';
import { ThemeDataRepository } from '@/types';

export const fetchThemes = async () => {
  const response = await axiosInstance.get<ThemesResponse>(RequestURLs.THEMES);
  const tmpThemes: ThemeDataRepository = {};
  response.data.themes.forEach((theme) => {
    tmpThemes[theme.key] = theme;
  });

  return tmpThemes;
};
