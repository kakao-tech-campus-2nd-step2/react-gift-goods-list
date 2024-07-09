import axios from 'axios';

import type { GoodsData, RankingFilterOption,ThemeData } from '@/types';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-eunjin.vercel.app/',});

export const getTheme = async (): Promise<ThemeData[]> => {
  const response = await api.get<{ themes: ThemeData[] }>('/api/v1/themes');
  return response.data.themes;
};

export const getRankingGoods = async (filterOption: RankingFilterOption): Promise<GoodsData[]> => {
  const response = await api.get<{ products: GoodsData[] }>('/api/v1/ranking/products', {
    params: filterOption,
  });
  return response.data.products;
};



export default api;

