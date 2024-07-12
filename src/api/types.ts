export interface GetRankingProductsParameters {
  targetType?: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType?: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
}

export interface GetThemeProductsParameters {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

export interface GetProductDetailsParameters {
  productId: string;
}

export interface ProductOptionsParameters {
  productId: string;
}

export interface GetMyWishProductsParameters {
  pageToken?: string;
  maxResults?: number;
}

export interface PointRequestBody {
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

export interface GetRankingProductsResponse {
  products: ProductData[];
}

export interface GetThemeProductsResponse {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface GetProductDetailsResponse {
  product: ProductDetailData;
}

export interface GetThemesResponse {
  themes: ThemeData[];
}

export interface GetMessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface GetMyAccountInfoResponse {
  myAccountInfo: MyAccountInfoData;
}

export interface GetMyWishProductsResponse {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Wish {
  wishCount: number;
  isWished: boolean;
}

export interface Price {
  baseicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Review {
  averageRating: number;
  totalReviewCount: number;
}

export interface ProductDescription {
  images: string[];
}

export interface Announcement {
  displayOrder: number;
  name: string;
  value: string;
}

export interface Terms {
  displayOrder: number;
  title: string;
  description: string;
}

export interface ProductDetailInfo {
  announcements: Announcement[];
  terms: Terms[];
}

export interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
}

export interface ProductDetailData extends ProductData {
  isAccessableProductPage: boolean;
  review: Review;
  productDescription: ProductDescription;
  productDetailInfo: ProductDetailInfo;
}

export interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor?: string;
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

export class APIError extends Error {
  code: number | undefined;

  constructor(message: string, code?: number | undefined) {
    super(message);
    this.code = code;
  }
}
