import axios from 'axios';

const BASE_URL = 'https://kakao-tech-campus-mock-server.vercel.app';

export const fetchThemes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/themes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
};

export const fetchRankingProducts = async (params: { targetType: string; rankType: string }) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/ranking/products`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching ranking products:', error);
    throw error;
  }
};

export const fetchThemeProducts = async (themeKey: string, maxResults: number = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/themes/${themeKey}/products`, {
      params: { maxResults },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching theme '${themeKey}':`, error);
    throw error;
  }
};
