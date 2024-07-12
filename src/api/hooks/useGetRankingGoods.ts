import axios from 'axios';
import { useEffect, useState } from 'react';
import { RankingFilterOption, GoodsData } from '@/types';

export const useGetRankingGoods = (filterOption: RankingFilterOption) => {
  const [data, setData] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/ranking/products', {
          params: filterOption,
        });
        setData(response.data.products);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [filterOption]);

  return { data, isLoading, isError };
};