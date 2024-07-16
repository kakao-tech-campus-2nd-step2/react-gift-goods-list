import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

import type { GoodsData } from '@/types';
import type { GoodsResponse } from '@/types';

const fetchGoodsSelection = async (theme: string) => {
  const url = `https://react-gift-mock-api-seungbeom.vercel.app/api/v1/themes/${theme}/products?maxResults=20`;
  const response = await axios.get<GoodsResponse>(url);
  return response.data.products;
};

export const useGoodsSelection = (themeKey: string) => {
  const {
    data: goods,
    isLoading,
    error,
  } = useQuery<GoodsData[], AxiosError>({
    queryKey: ['products', themeKey],
    queryFn: () => fetchGoodsSelection(themeKey),
  });
  return { goods, isLoading, error };
};
