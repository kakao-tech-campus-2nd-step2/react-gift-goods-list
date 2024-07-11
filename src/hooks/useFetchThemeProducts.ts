import { useEffect, useState } from 'react';
import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { ThemeProductsRequestQuery } from '@/types/request';
import { ThemeProductsResponse } from '@/types/response';
import { ProductData } from '@/dto';
import FetchStatus from '@constants/FetchStatus';

interface FetchParams {
  themeKey: string;
}

function useFetchThemeProducts({ themeKey }: FetchParams) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.FETCHING);

  useEffect(() => {
    async function request() {
      try {
        const paths = { themeKey };
        const url = replacePathParams(RequestURLs.THEME_PRODUCTS, paths);
        const params: ThemeProductsRequestQuery = {
          maxResults: 20,
        };
        const response = await axiosInstance.get<ThemeProductsResponse>(url, {
          params,
        });
        setProducts(response.data.products);
        setFetchStatus(FetchStatus.FETCH_SUCCESS);
      } catch (e) {
        console.error(e);
        setFetchStatus(FetchStatus.FETCH_ERROR);
      }
    }

    request();
  }, [themeKey]);

  return { products, fetchStatus };
}

export default useFetchThemeProducts;
