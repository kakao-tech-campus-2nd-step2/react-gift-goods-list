import { useEffect, useState } from 'react';
import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { ThemeProductsRequestQuery } from '@/types/request';
import {
  ThemeProductsResponse,
} from '@/types/response';
import { ProductData } from '@/dto';

interface FetchParams {
  themeKey: string;
}

function useFetchThemeProducts({ themeKey }: FetchParams) {
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    async function request() {
      const paths = { themeKey };
      const url = replacePathParams(RequestURLs.THEME_PRODUCTS, paths);
      const params: ThemeProductsRequestQuery = {
        maxResults: 20,
      };
      const response = await axiosInstance.get<ThemeProductsResponse>(url, {
        params,
      });
      setProducts(response.data.products);
    }

    request();
  }, [themeKey]);

  return products;
}

export default useFetchThemeProducts;
