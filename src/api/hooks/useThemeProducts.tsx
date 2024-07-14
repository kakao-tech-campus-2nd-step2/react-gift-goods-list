import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { GoodsData } from '@/types';

type GoodsResponse = {
  products: GoodsData[];
};

const getThemeProducts = async (themeKey: string): Promise<GoodsResponse> => {
  const response = await fetchInstance.get(`/v1/themes/${themeKey}/products`);
  return response.data;
};

export const useThemeProducts = (themeKey: string) => {
  return useQuery({
    queryKey: ['themeProducts', themeKey],
    queryFn: () => getThemeProducts(themeKey),
  });
};
