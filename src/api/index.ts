import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import type {
  AjaxResult,
  GetRankingProductsRequestBody,
  GetRankingProductsResponseBody,
  GetThemesProductsRequestBody,
  GetThemesProductsResponseBody,
  GetThemesResponseBody,
} from '@/api/type';

axios.defaults.baseURL = 'https://react-gift-mock-api-jasper200207.vercel.app';

export async function ajax<T>(options: AxiosRequestConfig): Promise<AjaxResult<T>> {
  let result: AjaxResult<T> = { success: false, data: null };
  await axios(options)
    .then((response) => {
      result = { success: true, data: response.data };
    })
    .catch((error) => {
      result = { success: false, data: error };
    });
  return result;
}

export async function getRankingProducts(
  params: GetRankingProductsRequestBody,
): Promise<AjaxResult<GetRankingProductsResponseBody>> {
  return ajax<GetRankingProductsResponseBody>({
    method: 'GET',
    url: '/api/v1/ranking/products',
    params,
  });
}

export async function getThemes(): Promise<AjaxResult<GetThemesResponseBody>> {
  return ajax<GetThemesResponseBody>({
    method: 'GET',
    url: '/api/v1/themes',
  });
}

export async function getThemesProducts({
  themeKey,
  ...params
}: GetThemesProductsRequestBody): Promise<AjaxResult<GetThemesProductsResponseBody>> {
  return ajax<GetThemesProductsResponseBody>({
    method: 'GET',
    url: `/api/v1/themes/${themeKey}/products`,
    params,
  });
}
