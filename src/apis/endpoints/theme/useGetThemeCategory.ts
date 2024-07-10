import { AxiosResponse } from 'axios';

import { instance } from '@/apis/endpoints/index';
import type { ThemeData } from '@/types/index';

export interface ThemeAPIResponse {
  themes: ThemeData[];
}

export const getThemeCategory = async () => {
  try {
    const response: AxiosResponse<ThemeAPIResponse> = await instance.get('/api/v1/themes');
    return response.data;
  } catch (err) {
    console.error('Failed to fetch theme categories:', err);
    throw new Error('theme categories could not be fetched. Please try again later.');
  }
};
