import axios from 'axios';

import { GetThemesResponse } from '../types/api';

const API_BASE_URL = 'https://react-gift-mock-api-alpha.vercel.app';

export const getThemes = async (): Promise<GetThemesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/themes`);
  return response.data;
};