import axiosInstance from '@/apis/axios';
import type { RankingFilterOption } from '@/types';

export const getRankingProducts = async (filterOption: RankingFilterOption) => {
  const response = await axiosInstance.get<Home.RankingProductsResponse>('/api/v1/ranking/products', {
    params: {
      targetType: filterOption.targetType || 'ALL',
      rankType: filterOption.rankType || 'MANY_WISH_RECEIVE',
    },
  });
  return response.data;
};

export const getProductDetail = async (productId: string) => {
  const response = await axiosInstance.get<Home.ProductDetailResponse>(
    `/api/v1/products/${productId}/detail`,
  );
  return response.data;
};
