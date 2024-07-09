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
export interface GetMessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface PageInfo {
  totalResults: number;
  hasNextPage: boolean;
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

export interface productDescription {
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
  productDescription: productDescription;
  productDetailInfo: ProductDetailInfo;
}
export interface MessageCardTemplateData {
  id: number;
  defaultTextMessage: string;
  thumbURL: string;
  imageURL: string;
}
