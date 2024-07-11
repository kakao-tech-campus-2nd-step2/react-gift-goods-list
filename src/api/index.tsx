import { fetchInstance } from './instance';

export const getThemes = async () => {
  try {
    const response = await fetchInstance.get('/v1/themes');
    return response.data;
  } catch (error) {
    console.error('Error fetching themes: ', error);
    throw error;
  }
};

export const getRankingProducts = async (targetType: string, rankType: string) => {
  const queryParams = `?targetType=${targetType}&rankType=${rankType}`;

  try {
    const response = await fetchInstance.get(`/v1/ranking/products${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ranking products: ', error);
    throw error;
  }
};
