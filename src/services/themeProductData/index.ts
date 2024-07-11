import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ProductData } from '@/types/productType';

import { GetProductsRequest, GetProductsResponse } from './types';

export const fetchThemeProductData = async (
  themeKey: string,
  pageParam: number
) => {
  try {
    const params: GetProductsRequest = {
      pageToken: pageParam.toString(),
      maxResults: 20,
    };

    const response = await BACKEND_API.get<GetProductsResponse>(
      `/api/v1/themes/${themeKey}/products`,
      { params }
    );

    return response.data.products as ProductData[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
