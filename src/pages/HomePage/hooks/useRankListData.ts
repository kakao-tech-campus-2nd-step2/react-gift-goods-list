import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchRankingProductList } from '@/services/rankingProductList';
import { ProductData, RankingFilter } from '@/types/productType';

export const useRankListData = (filter: RankingFilter) => {
  const { data, loading, error, setData, setLoading, setError } =
    useFetchData<ProductData[]>();

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      setLoading(true);
      const response = await fetchRankingProductList(filter);

      if (response.products) setData(response.products);

      if (response.error) setError(response.error);

      setLoading(false);
    };

    fetchData();
  }, [setData, setLoading, setError, filter]);

  return { data, loading, error };
};
