import axios from 'axios';

import type { GetThemesResponse } from '../types/api';

const API_BASE_URL = 'https://react-gift-mock-api-alpha.vercel.app/api/v1';

export const getThemes = async (): Promise<GetThemesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/themes`);
  return response.data;
};