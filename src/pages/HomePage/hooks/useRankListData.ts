import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchRankingProductData } from '@/services/rankingProductData';
import { ProductData, RankingFilter } from '@/types/productType';

export const useRankListData = (filter: RankingFilter) => {
  const {
    data: rankProducts,
    loading,
    error,
    fetchData,
  } = useFetchData<ProductData[]>();

  useEffect(() => {
    (async () => {
      await fetchData(() => fetchRankingProductData(filter));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return { rankProducts, loading, error };
};
