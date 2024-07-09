import axios from 'axios';

import type { RankingFilterOption,RankingResponse } from '@/types';

export const api = axios.create({
  baseURL: 'https://react-gift-mock-api-ychy61.vercel.app'
});

export const fetchRankingProducts = async (filterOption: RankingFilterOption): Promise<RankingResponse> => {
      try {
        const response = await api.get<RankingResponse>('/api/v1/ranking/products', {
          params: {
            targetType: filterOption.targetType,
            rankType: filterOption.rankType,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch ranking products: ${error}`);
      }
    };
