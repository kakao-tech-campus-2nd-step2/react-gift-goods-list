export type ThemeData = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
  imageURL: string;
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

/* common types */

export type ProductData = {
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

export type ProductDetailData = ProductData & {
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
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbURL: string;
  imageURL: string;
};

export type MyAccountInfoData = {
  id: number;
  name: string;
  profileImageURL: string;
  point: number;
};

export type ProductOrderRequestBody = {
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
};

/* response types */

export type RankingProductsResponse = {
  products: ProductData[];
};

export type ThemesResponse = {
  themes: ThemeData[];
};

export type ThemeProductsResponse = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type ProductDetailResponse = {
  product: ProductDetailData;
};

export type ProductOptionsResponse = {
  options: any;
  // 재귀적인 옵션 객체?
};

export type MessageCardTemplatesResponse = {
  templates: MessageCardTemplateData[];
};

export type MyAccountInfoResponse = {
  accountInfo: MyAccountInfoData;
};

export type MyAccountWishProductsResponse = {
  products: ProductData[];
  nextPageToken?: string;
};
