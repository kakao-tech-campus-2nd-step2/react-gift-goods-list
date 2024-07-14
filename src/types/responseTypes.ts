import { ProductData, ThemeData, MessageCardTemplateData } from './dataTypes';

export interface RankingProductsResponse {
  products: ProductData[];
}

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

export interface ProductDetailResponse extends ProductData {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    images: string[];
  };
  productDetailInfo: {
    announcements: {
      displayOrder: number;
      name: string;
      value: string;
    }[];
    terms: {
      displayOrder: number;
      title: string;
      description: string;
    }[];
  };
}

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoResponse {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}

export interface MyAccountWishProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
