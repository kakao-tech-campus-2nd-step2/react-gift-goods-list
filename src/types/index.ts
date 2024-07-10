// export type ThemeData = {
//   id: number;
//   key: string;
//   label: string;
//   title: string;
//   description?: string;
//   backgroundColor: string;
//   imageURL: string;
// };

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

export interface RankingProductsRequestParams {
  targetType?: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType?: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
}

export interface ThemesProductsRequestParams {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

export interface ProductDetailRequestParams {
  productId: string;
}

export interface RankingProductsResponse {
  products: ProductData[];
}

export interface ThemesProductsResponse {
  products: ProductData[];
  nextPageToken?: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface ProductDetailResponse extends ProductDetailData {}

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoResponse extends MyAccountInfoData {}

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
  imageURL: string;
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
