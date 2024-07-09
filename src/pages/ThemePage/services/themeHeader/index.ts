import { BACKEND_API } from '@/constants/api';
import { GetThemesResponse, ThemeHeaderData } from '@/types/themeType';

interface FetchThemeHeaderDataResponse {
  themeHeaderContents?: ThemeHeaderData;
  error?: string;
}

export const fetchThemeHeaderData = async (
  themeKey: string
): Promise<FetchThemeHeaderDataResponse> => {
  const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');
  const theme = response.data.themes.find((t) => t.key === themeKey);

  if (!theme)
    return {
      themeHeaderContents: undefined,
      error: '해당 테마에 대한 상품이 존재하지 않습니다.',
    };

  return {
    themeHeaderContents: theme,
    error: undefined,
  };
};
