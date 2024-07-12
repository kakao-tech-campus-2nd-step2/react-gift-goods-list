import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ThemeCategoryData, ThemeHeroData } from '@/types/themeType';

import { GetThemesResponse } from './types';

export const fetchThemeData = async () => {
  try {
    const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');

    return {
      themes: response.data.themes as ThemeHeroData[],
      categories: response.data.themes as ThemeCategoryData[],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
