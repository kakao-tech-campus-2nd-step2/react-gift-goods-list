import { useEffect, useState } from 'react';
import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import FetchStatus from '@constants/FetchStatus';
import { ERROR_NOT_DEFINED } from '@constants/ErrorMessage';
import axios from 'axios';
import { ThemeProductsRequestQuery } from '@/types/request';
import { ThemeProductsResponse } from '@/types/response';
import { ProductData } from '@/dto';

interface FetchParams {
  themeKey: string;
}

function useFetchThemeProducts({ themeKey }: FetchParams) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.FETCHING);
  const [errorCode, setErrorCode] = useState<number>(ERROR_NOT_DEFINED);

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
        if (axios.isAxiosError(e)) {
          setErrorCode(e.response?.status || ERROR_NOT_DEFINED);
        }

        console.error(e);
        setFetchStatus(FetchStatus.FETCH_ERROR);
      }
    }

    request();
  }, [themeKey]);

  return { products, fetchStatus, errorCode };
}

export default useFetchThemeProducts;
