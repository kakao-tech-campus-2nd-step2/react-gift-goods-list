import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { ProductResponseData } from './useThemeProducts';

import type { RankingProductType } from '@/components/Home/GiftRanking';

export const useRankingProducts = ({ targetType, rankType }: RankingProductType) => {
  const [data, setData] = useState<ProductResponseData>({ products: [] });

  useEffect(() => {
    const getRankingProducts = async () => {
      try {
        const response = await instantAxios.get<ProductResponseData>(
          `v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching ranking product data:', error);
      }
    };
    getRankingProducts();
  }, [targetType, rankType]);

  return data;
};
