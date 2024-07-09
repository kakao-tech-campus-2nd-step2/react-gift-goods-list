import type { ProductData } from '@/apis/products/type';
import type { ThemeData } from '@/types';

/**
 * Request
 */
export interface GetThemeProductsType {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

/**
 * Response
 */
export interface ThemesResponse {
  themes: ThemeData[];
}

export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export interface ThemeProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: PageInfo;
}
