/* ProductOrderRequestBody */
export interface ProductOrderRequestBody {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: string;
  cashReceiptNumber?: string;
}

/* ProductData */
export interface Wish {
  wishCount: number;
  isWished: boolean;
}

export interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
}

/* ProductDetailData */
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

export interface Term {
  displayOrder: number;
  title: string;
  description: string;
}

export interface ProductDetailInfo {
  announcements: Announcement[];
  terms: Term[];
}

export interface ProductDetailData extends ProductData {
  isAccessableProductPage: boolean;
  review: Review;
  productDescription: ProductDescription;
  productDetailInfo: ProductDetailInfo;
}

/* ThemeData */
export interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor?: string;
}

/* MessageCardTemplateData */
export interface MessageCardTemplateData {
  id?: number;
  defaultTextMessage?: string;
  thumbURL?: string;
  imageURL?: string;
}

/* MyAccountInfoData */
export interface MyAccountInfoData {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}
