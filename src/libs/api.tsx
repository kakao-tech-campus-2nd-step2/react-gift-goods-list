import axios from 'axios';

const API_BASE_URL = 'https://kakao-tech-campus-mock-server.vercel.app';

export const getThemes = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/themes`);

  return response.data;
};

export const getRankingProducts = async (params: { targetType: string; rankType: string }) => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/ranking/products`, { params });
  return response.data;
};

export const getTheme = async (themeKey: string, maxResults: number = 20) => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/themes/${themeKey}/products`, {
    params: { maxResults },
  });
  return response.data;
};
