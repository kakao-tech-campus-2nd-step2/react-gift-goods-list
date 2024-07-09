import type { ProductData } from '@/apis/products/type';
import type { ThemeData } from '@/types';

/**
 * Response
 */
export interface ThemesResponse {
  themes: ThemeData[];
}

export interface ThemeProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
