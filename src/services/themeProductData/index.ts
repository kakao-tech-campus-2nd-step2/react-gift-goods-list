import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ProductData } from '@/types/productType';

import { GetProductsRequest, GetProductsResponse } from './types';

interface FetchThemeProductDataResponse {
  products: ProductData[];
  error?: string;
}

export const fetchThemeProductData = async (
  themeKey: string
): Promise<FetchThemeProductDataResponse> => {
  try {
    const params: GetProductsRequest = {
      maxResults: 20,
    };

    const response = await BACKEND_API.get<GetProductsResponse>(
      `/api/v1/themes/${themeKey}/products`,
      { params }
    );

    return {
      products: response.data.products,
      error: undefined,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { products: [], error: error.message };
    }

    return { products: [], error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};
