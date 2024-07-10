import axios from 'axios';

import type { ThemeData } from '@/types';

export const fetchThemeData = async (): Promise<ThemeData[]> => {
  try {
    const response = await axios.get('https://kakao-tech-campus-mock-server.vercel.app/api/v1/themes');
    return response.data.themes;
  } catch (error) {
    console.error('Failed to fetch theme data:', error);
    return [];
  }
};