export type ThemeData = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
};

export type RankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GoodsData = {
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
};

export interface RankingProductsRequest {
  targetType?: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType?: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
}

export interface RankingProductsResponse {
  products: GoodsData[];
}

export interface ThemesResponse {
  themes: ThemeData[];
}

export interface ThemeProductsRequest {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ThemeProductsResponse {
  products: GoodsData[];
  nextPageToken: string | null;
  pageInfo: PageInfo;
}

export interface ProductDetailRequest {
  productId: string;
}

export interface ProductDetailData extends GoodsData {
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

export interface MessageCardTemplateData {
  id: number;
  defaultTextMessage: string;
  thumbURL: string;
  imageURL: string;
}

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoData {
  id: number;
  name: string;
  birthday: string;
  profileImageURL: string;
  point: number;
}

export interface MyAccountWishProductsRequest {
  pageToken?: string;
  maxResults?: number;
}

export interface MyAccountWishProductsResponse {
  products: GoodsData[];
  nextPageToken: string | null;
  pageInfo: PageInfo;
}

export interface MyAccountPointRequest {
  point: number;
}

export interface ProductOrderRequestBody {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
}
