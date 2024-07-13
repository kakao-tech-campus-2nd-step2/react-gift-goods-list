import axiosInstance from './axiosInstance';

// api 타입 정의
export interface GetRankingProductsRequest {
  targetType?: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType?: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
}

export interface GetRankingProductsResponse {
  products: ProductData[];
}

export interface GetThemesResponse {
  themes: ThemeData[];
}

export interface GetThemeProductsRequest {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}

export interface GetThemeProductsResponse {
  products: ProductData[];
  nextPageToken?: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface GetProductDetailRequest {
  productId: string;
}

export type GetProductDetailResponse = ProductDetailData;

export interface GetProductOptionsRequest {
  productId: string;
}

export interface GetProductOptionsResponse {
  // Define response structure based on the final implementation
}

export interface GetMessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export type GetMyAccountInfoResponse = MyAccountInfoData;

export interface GetWishProductsRequest {
  pageToken?: string;
  maxResults?: number;
}

export interface GetWishProductsResponse {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface PutMyAccountPointRequest {
  point: number;
}

export type PutMyAccountPointResponse = void;

export type PostOrderRequest = ProductOrderRequestBody;

export type PostOrderResponse = void;

export interface PostOrderErrorResponse {
  message: string;
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
    announcements: Array<{
      displayOrder: number;
      name: string;
      value: string;
    }>;
    terms: Array<{
      displayOrder: number;
      title: string;
      description: string;
    }>;
  };
}

export interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor?: string;
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

// api 호출 함수
export const fetchRankingProducts = async (
  params: GetRankingProductsRequest,
): Promise<GetRankingProductsResponse> => {
  const response = await axiosInstance.get<GetRankingProductsResponse>('/api/v1/ranking/products', {
    params,
  });
  return response.data;
};

export const fetchThemes = async (): Promise<GetThemesResponse> => {
  const response = await axiosInstance.get<GetThemesResponse>('/api/v1/themes');
  return response.data;
};

export const fetchThemeProducts = async (
  params: GetThemeProductsRequest,
): Promise<GetThemeProductsResponse> => {
  const { themeKey, ...queryParams } = params;
  const response = await axiosInstance.get<GetThemeProductsResponse>(
    `/api/v1/themes/${themeKey}/products`,
    { params: queryParams },
  );
  return response.data;
};

export const fetchProductDetail = async (
  params: GetProductDetailRequest,
): Promise<GetProductDetailResponse> => {
  const { productId } = params;
  const response = await axiosInstance.get<GetProductDetailResponse>(
    `/api/v1/products/${productId}/detail`,
  );
  return response.data;
};

export const fetchProductOptions = async (
  params: GetProductOptionsRequest,
): Promise<GetProductOptionsResponse> => {
  const { productId } = params;
  const response = await axiosInstance.get<GetProductOptionsResponse>(
    `/api/v1/products/${productId}/options`,
  );
  return response.data;
};

export const fetchMessageCardTemplates = async (): Promise<GetMessageCardTemplatesResponse> => {
  const response = await axiosInstance.get<GetMessageCardTemplatesResponse>(
    '/api/v1/message-card/templates',
  );
  return response.data;
};

export const fetchMyAccountInfo = async (): Promise<GetMyAccountInfoResponse> => {
  const response = await axiosInstance.get<GetMyAccountInfoResponse>('/api/v1/my-account/info');
  return response.data;
};

export const fetchWishProducts = async (
  params: GetWishProductsRequest,
): Promise<GetWishProductsResponse> => {
  const response = await axiosInstance.get<GetWishProductsResponse>(
    '/api/v1/my-account/wish/products',
    { params },
  );
  return response.data;
};

export const putMyAccountPoint = async (
  data: PutMyAccountPointRequest,
): Promise<PutMyAccountPointResponse> => {
  const response = await axiosInstance.put<PutMyAccountPointResponse>(
    '/api/v1/my-account/point',
    data,
  );
  return response.data;
};

export const postOrder = async (data: PostOrderRequest): Promise<PostOrderResponse> => {
  const response = await axiosInstance.post<PostOrderResponse>('/api/v1/order', data);
  return response.data;
};
