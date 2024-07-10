import { BACKEND_API } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { GetThemesResponse, ThemeHeaderData } from '@/types/themeType';

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
        error: ERROR_MESSAGES.PATH_NOT_FOUND,
      };

    return {
      themeHeaderContents: theme,
      error: undefined,
    };
  } catch (error) {
    return {
      themeHeaderContents: undefined,
      error: ERROR_MESSAGES.FETCH_ERROR,
    };
  }
};
