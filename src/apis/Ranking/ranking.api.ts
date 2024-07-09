import { axiosClient } from '../axiosClient';

export async function getRankingProducts(targetType: string, rankType: string) {
  try {
    const response = await axiosClient.get(
      `/api/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`getRankingProducts error: ${error}`);
  }
}
