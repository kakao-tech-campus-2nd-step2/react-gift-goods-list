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
  themeKey: string,
  pageToken: string,
  // pageToken: string = '',
  maxResults: number
): Promise<ProductsResponse> {
  try {
    const response = await axiosClient.get(
      `/api/v1/themes/${themeKey}/products`,
      {
        params: {
          pageToken,
          maxResults,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`getThemesProducts error: ${error}`);
    throw new Error(`getThemesProducts error: ${error}`);
  }
}
