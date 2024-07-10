import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchRankingProductData } from '@/services/rankingProductData';
import { ProductData, RankingFilter } from '@/types/productType';

export const useRankListData = (filter: RankingFilter) => {
  const {
    data: rankProducts,
    loading,
    error,
    setData,
    setLoading,
    setError,
  } = useFetchData<ProductData[]>();

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      setLoading(true);
      const response = await fetchRankingProductData(filter);

      if (response.products) setData(response.products);

      if (response.error) setError(response.error);

      setLoading(false);
    };

    fetchData();
  }, [setData, setLoading, setError, filter]);

  return { rankProducts, loading, error };
};
