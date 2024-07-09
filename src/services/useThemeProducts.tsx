import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { Product } from './types';

export type ProductResponseData = {
  products: Product[];
  nextPageToken?: string;
  pageInfo?: {
    resultsPerPage: number;
    totalResults: number;
  };
};

export const useThemeProducts = (themeKey: string) => {
  const [data, setData] = useState<ProductResponseData>({ products: [] });
  useEffect(() => {
    const getThemeProducts = async (pageToken?: string) => {
      try {
        const response = await instantAxios.get<ProductResponseData>(`v1/themes/${themeKey}/products`, {
          params: {
            pageToken,
            maxResults: 20,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching theme product data:', error);
      }
    };
    getThemeProducts();
  }, [themeKey]);

  return data;
};
