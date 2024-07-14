import type { RankingProductsRequest, RankingProductsResponse } from '../types';
import axiosInstance from './axiosInstance';

export const fetchRankingProducts = async (filterParams: RankingProductsRequest): Promise<RankingProductsResponse> => {
  const response = await axiosInstance.get<RankingProductsResponse>('/api/v1/ranking/products', {
    params: filterParams,
  });
  return response.data;
};
