import { useState, useEffect } from 'react';
import axios from 'axios';
import type { GoodsData } from '@/types';

type UseThemeGoodsProps = {
  themeKey: string;
};

type UseThemeGoodsResult = {
  isLoading: boolean;
  goodsList: GoodsData[] | null;
  isError: boolean;
};

export const useThemeGoods = ({ themeKey }: UseThemeGoodsProps): UseThemeGoodsResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [goodsList, setGoodsList] = useState<GoodsData[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get(`https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes/${themeKey}/products`);
        setGoodsList(response.data.products);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoods();
  }, [themeKey]);

  return { isLoading, goodsList, isError };
};