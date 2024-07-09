import { axiosClient } from '../axiosClient';
import { ProductsResponse, ThemesResponse } from './theme.response';

export async function getThemes(): Promise<ThemesResponse> {
  try {
    const response = await axiosClient.get('/api/v1/themes');
    return response.data;
  } catch (error) {
    throw new Error(`getThemes error: ${error}`);
  }
}

export async function getThemesProducts(
  themesKey: string,
  pageToken: string = '',
  maxResults: number = 10
): Promise<ProductsResponse> {
  try {
    const response = await axiosClient.get(
      `/api/v1/themes/${themesKey}/products`,
      {
        params: {
          pageToken,
          maxResults,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`getThemesProducts error: ${error}`);
  }
}
