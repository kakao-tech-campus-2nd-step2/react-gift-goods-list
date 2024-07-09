import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { FetchState } from './types';
import type { ProductResponseData } from './useThemeProducts';

import type { RankingProductType } from '@/components/Home/GiftRanking';

export const useRankingProducts = ({ targetType, rankType }: RankingProductType) => {
  const [fetchState, setFetchState] = useState<FetchState<ProductResponseData>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const getRankingProducts = async () => {
      try {
        setFetchState({ isLoading: true, isError: false, data: null });
        const response = await instantAxios.get<ProductResponseData>(
          `v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
        );
        setFetchState({ isLoading: false, isError: false, data: response.data });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error(404, '해당하는 랭킹 상품이 없습니다.');
          }
          if (error.response?.status === 400) {
            console.error(400, '데이터를 불러오는 중에 문제가 발생했습니다.');
          }
          setFetchState({ isLoading: false, isError: true, data: null });
        }
      }
    };
    getRankingProducts();
  }, [targetType, rankType]);

  return { ...fetchState };
};
