import { RankFilter, TargetFilter } from '@/types';

export interface RankingProductsRequestQuery {
  targetType?: TargetFilter;
  rankType?: RankFilter;
}

export interface ThemeProductsRequestQuery {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

export interface ProductDetailRequestQuery {
  productId: string;
}

export interface ProductOptionsRequestQuery extends ProductDetailRequestQuery {}

export interface MyWishProductsRequestQuery {
  pageToken?: string;
  maxResults?: number;
}

export interface MyAccountPointRequestBody {
  point: number;
}

export interface OrderRequestBody {
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
