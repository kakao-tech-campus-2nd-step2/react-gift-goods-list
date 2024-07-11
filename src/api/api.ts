import axios from 'axios';

import { ThemesResponse } from '@/types';
import { ThemeMockList } from '@/types/mock';

const API_URL = 'http://localhost:3000'; // 목 API URL

export const fetchThemes = async (): Promise<ThemesResponse> => {
  // 실제 API 호출
  try {
    const response = await axios.get<ThemesResponse>(`${API_URL}/api/v1/themes`);
    return response.data;
  } catch (error) {
    // 실패하면 Mock 데이터를 반환
    console.warn('Failed to fetch themes, using mock data instead.');
    return { themes: ThemeMockList };
  }
};
