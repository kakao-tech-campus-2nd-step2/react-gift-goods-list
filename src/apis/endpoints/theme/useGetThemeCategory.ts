import { instance } from '@/apis/endpoints/index';
import type { ThemeData } from '@/types/index';

export interface ThemeAPIResponse {
  themes: ThemeData[];
}

export const GetThemeCategory = async (): Promise<ThemeAPIResponse> => {
  try {
    const response = await instance.get('/api/v1/themes');
    return response.data;
  } catch (err) {
    console.error('Failed to fetch theme categories:', err);
    throw new Error('theme categories could not be fetched. Please try again later.');
  }
};
