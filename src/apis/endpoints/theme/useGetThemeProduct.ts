import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/apis/endpoints/index';
import type { GoodsData } from '@/types/index';

export interface ThemeProductAPIResponse extends GoodsData {
  nextPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  products: GoodsData[];
}

export const getThemeProducts = async (
  themeKey: string,
  pageToken?: string,
  maxResults: number = 20,
): Promise<ThemeProductAPIResponse> => {
  const params = {
    pageToken,
    maxResults,
  };

  try {
    const response: AxiosResponse<ThemeProductAPIResponse> = await instance.get(
      `/api/v1/themes/${themeKey}/products`,
      { params },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        console.error('Failed to fetch theme products:', error);
        throw new Error('선물 테마 Key에 해당하는 선물 테마가 없어요.');
      } else {
        console.error('Failed to fetch theme products:', error);
        throw new Error('Failed to fetch theme products. Please try again later.');
      }
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};
