import type { RankingProductsResponse } from '../types/api';
import api from './index';

export const fetchRankingProducts = async (targetType: string = 'ALL', rankType: string = 'MANY_WISH_RECEIVE'): Promise<RankingProductsResponse> => {
    const response = await api.get<RankingProductsResponse>('/api/v1/ranking/products', {
        params: {
            targetType,
            rankType
        }
    });
    return response.data;
};
