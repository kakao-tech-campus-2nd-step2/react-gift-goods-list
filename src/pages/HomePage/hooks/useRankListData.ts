import { useEffect, useState } from 'react';

import { ProductData } from '@/types/productType';

import { fetchRankings } from '../services/rankings';
import { RankingFilter } from '../types';

export const useRankListData = (filter: RankingFilter) => {
  const [rankList, setRankList] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      setLoading(true);
      const response = await fetchRankings(filter);
      if (response.products) setRankList(response.products);
      if (response.error) setError(response.error);
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  return { rankList, loading, error };
};
