import { useEffect, useState } from 'react';
import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { RankingProductsResponse } from '@/types/response';
import { RankingProductsRequestQuery } from '@/types/request';
import { ProductData } from '@/dto';
import { TargetFilter, RankFilter } from '@/types';

interface FetchParams {
  targetFilter?: TargetFilter;
  rankFilter?: RankFilter;
}

function useFetchGifts({ targetFilter, rankFilter }: FetchParams) {
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    const params: RankingProductsRequestQuery = {
      targetType: targetFilter,
      rankType: rankFilter,
    };

    async function request() {
      const response = await axiosInstance
        .get<RankingProductsResponse>(RequestURLs.RANKING_PRODUCTS, { params });
      setProducts(response.data.products);
    }

    request();
  }, [targetFilter, rankFilter]);

  return products;
}

export default useFetchGifts;
