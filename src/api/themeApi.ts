import axios from 'axios';

import type { GetThemeProductsResponse,GetThemesResponse } from '../types/api';

const API_BASE_URL = 'https://react-gift-mock-api-alpha.vercel.app/api/v1';

export const getThemes = async (): Promise<GetThemesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/themes`);
  return response.data;
};

export const getThemeProducts = async (themeKey: string, _p0: number): Promise<GetThemeProductsResponse> => {
  const response = await axios.get(`${API_BASE_URL}/themes/${themeKey}/products`);
  return response.data;
};
