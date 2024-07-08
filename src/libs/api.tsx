import axios from 'axios';

const API_BASE_URL = 'https://kakao-tech-campus-mock-server.vercel.app';

export const getThemes = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/themes`);
  console.log(response.data);
  return response.data;
};

// export const getRanking = async (params: {
//     targetType?: string;
//     rankType?: string;
//   }): Promise<RankingProductsResponse> => {
//     const response = await axios.get(`${API_BASE_URL}/ranking-products`, { params });
//     return response.data;
// };

export const getTheme = async (themeKey: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/themes/${themeKey}/products`);
  return response.data;
};
