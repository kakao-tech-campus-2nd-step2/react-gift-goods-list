import { ProductData } from '@/types/productType';

export type GetProductsRequest = {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
};

export type GetProductsResponse = {
  products: ProductData[];
  nextPageToken?: string | null;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
};
