import { useEffect, useState } from 'react';

import { axiosInstance } from '.';
import type { ProductWithPage } from './types';

export const useThemeProducts = (themeKey: string) => {
  const [data, setData] = useState<ProductWithPage>({ products: [] });
  useEffect(() => {
    let ignore = false;
    const getThemeProducts = async (pageToken?: string) => {
      try {
        const response = await axiosInstance.get<ProductWithPage>(`v1/themes/${themeKey}/products`, {
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
