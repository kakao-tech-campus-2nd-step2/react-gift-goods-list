// types/api.ts

export interface GetRankingProductsRequest {
  targetType?: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType?: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
}

export interface GetThemesRequest {}

export interface GetThemeProductsRequest {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

export interface GetProductDetailRequest {
  productId: string;
}

export interface GetProductOptionsRequest {
  productId: string;
}

export interface GetMessageCardTemplatesRequest {}

export interface GetMyAccountInfoRequest {}

export interface GetMyAccountWishProductsRequest {
  pageToken?: string;
  maxResults?: number;
}

export interface PutMyAccountPointRequest {
  point: number;
}

export interface PostOrderRequest {
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
