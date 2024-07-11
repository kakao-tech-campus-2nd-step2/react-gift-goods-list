// types/api.ts

export interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export interface ProductDetailData extends ProductData {
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

export interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface MessageCardTemplateData {
  id: number;
  defaultTextMessage: string;
  thumbURL: string;
  imageURL: string;
}

export interface MyAccountInfoData {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface GetRankingProductsResponse {
  products: ProductData[];
}

export interface GetThemesResponse {
  themes: ThemeData[];
}

export interface GetThemeProductsResponse {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface GetProductDetailResponse extends ProductDetailData {}

export interface GetProductOptionsResponse {
  // Define this based on the actual data structure
}

export interface GetMessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface GetMyAccountInfoResponse extends MyAccountInfoData {}

export interface GetMyAccountWishProductsResponse {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface PutMyAccountPointResponse {}

export interface PostOrderResponse {}
