import { BACKEND_API } from '@/constants/api';
import { GetThemesResponse, ThemeListData } from '@/types/themeType';

interface FetchThemeDataResponse {
  themes: ThemeListData[];
  error?: string;
}

export const fetchThemeData = async (): Promise<FetchThemeDataResponse> => {
  try {
    const response = await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');
    return { themes: response.data.themes, error: undefined };
  } catch (error) {
    return { themes: [], error: '데이터를 불러올 수 없습니다.' };
  }
};
