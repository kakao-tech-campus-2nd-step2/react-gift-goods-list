import type { RankingProductsRequest, RankingProductsResponse } from '../types';
import axiosInstance from './axiosInstance';

export const fetchRankingProducts = async (filterParams: RankingProductsRequest): Promise<RankingProductsResponse> => {
  try {
    const response = await axiosInstance.get<RankingProductsResponse>('/api/v1/ranking/products', {
      params: filterParams,
    });
    console.log('API Response:', response.data); // 응답 데이터 확인을 위한 콘솔 로그
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
