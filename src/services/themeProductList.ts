import { BACKEND_API } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/errorMessage';
import {
  GetProductsRequest,
  GetProductsResponse,
  ProductData,
} from '@/types/productType';

interface FetchThemeProductDataResponse {
  products?: ProductData[];
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
    return { products: [], error: ERROR_MESSAGES.FETCH_ERROR };
  }
};
