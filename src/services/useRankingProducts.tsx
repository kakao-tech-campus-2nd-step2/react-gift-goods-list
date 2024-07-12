import { useEffect, useState } from 'react';

import { axiosInstance } from '.';
import type { Product } from './types';

import type { RankingProductType } from '@/components/Home/GiftRanking';

export const useRankingProducts = ({ targetType, rankType }: RankingProductType) => {
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    let ignore = false;
    const getRankingProducts = async () => {
      try {
        const response = await axiosInstance.get(`v1/ranking/products?targetType=${targetType}&rankType=${rankType}`);
        if (!ignore) {
          setData(response.data.products);
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
