import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ThemeHeaderData, ThemeListData } from '@/types/themeType';

import { GetThemesResponse } from './types';

interface FetchThemeHeaderDataResponse {
  themeHeaderContents?: ThemeHeaderData;
  error?: string;
}

export const fetchThemeHeaderData = async (
  themeKey: string
): Promise<FetchThemeHeaderDataResponse> => {
  try {
    const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');
    const theme = response.data.themes.find((t) => t.key === themeKey);

    if (!theme)
      return {
        themeHeaderContents: undefined,
        error: ERROR_MESSAGES.NOT_FOUND,
      };

    return {
      themeHeaderContents: theme,
      error: undefined,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { themeHeaderContents: undefined, error: error.message };
    }

    return {
      themeHeaderContents: undefined,
      error: ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

interface FetchThemeDataResponse {
  themes: ThemeListData[];
  error?: string;
}

export const fetchThemeData = async (): Promise<FetchThemeDataResponse> => {
  try {
    const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');

    return { themes: response.data.themes, error: undefined };
  } catch (error) {
    if (error instanceof Error) {
      return { themes: [], error: error.message };
    }

    return { themes: [], error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};
