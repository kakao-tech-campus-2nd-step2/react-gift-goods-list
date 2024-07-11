import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ThemeHeroData, ThemeListData } from '@/types/themeType';

import { GetThemesResponse } from './types';

export const fetchThemeHeroData = async (themeKey: string) => {
  try {
    const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');
    const theme = response.data.themes.find((t) => t.key === themeKey);

    if (!theme) {
      throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
    }

    return theme as ThemeHeroData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

export const fetchThemeData = async () => {
  try {
    const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');

    return response.data.themes as ThemeListData[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
