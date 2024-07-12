import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { ProductResponseData } from './useThemeProducts';

import type { RankingProductType } from '@/components/Home/GiftRanking';

export const useRankingProducts = ({ targetType, rankType }: RankingProductType) => {
  const [data, setData] = useState<ProductResponseData>({ products: [] });

  useEffect(() => {
    let ignore = false;
    const getRankingProducts = async () => {
      try {
        const response = await instantAxios.get<ProductResponseData>(
          `v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
        );
        if (!ignore) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching ranking product data:', error);
      }
    };
    getRankingProducts();
    return () => {
      ignore = true;
    };
  }, [targetType, rankType]);

  return data;
};
