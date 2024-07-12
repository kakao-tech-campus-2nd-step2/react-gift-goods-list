import { useEffect, useState } from 'react';

import { axiosInstance } from '.';
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
    let ignore = false;
    const getThemeProducts = async (pageToken?: string) => {
      try {
        const response = await axiosInstance.get<ProductResponseData>(`v1/themes/${themeKey}/products`, {
          params: {
            pageToken,
            maxResults: 20,
          },
        });
        if (!ignore) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching theme product data:', error);
      }
    };
    getThemeProducts();
    return () => {
      ignore = true;
    };
  }, [themeKey]);

  return data;
};
