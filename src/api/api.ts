import axios from 'axios';

import type {
  GetMyAccountWishProductsRequest,
  GetProductDetailRequest,
  GetProductOptionsRequest,
  GetRankingProductsRequest,
  GetThemeProductsRequest,
  PostOrderRequest,
  PutMyAccountPointRequest,
} from '../types/request';
import type {
  GetMessageCardTemplatesResponse,
  GetMyAccountInfoResponse,
  GetMyAccountWishProductsResponse,
  GetProductDetailResponse,
  GetProductOptionsResponse,
  GetRankingProductsResponse,
  GetThemeProductsResponse,
  GetThemesResponse,
} from '../types/response';

const API_BASE_URL = 'https://react-gift-mock-api-kakao.vercel.app';

// 랭킹 제품 목록 가져오기
export const getRankingProducts = async (
  params: GetRankingProductsRequest,
): Promise<GetRankingProductsResponse> => {
  const response = await axios.get<GetRankingProductsResponse>(
    `${API_BASE_URL}/api/v1/ranking/products`,
    { params },
  );
  return response.data;
};

// 테마 목록 가져오기
export const getThemes = async (): Promise<GetThemesResponse> => {
  const response = await axios.get<GetThemesResponse>(`${API_BASE_URL}/api/v1/themes`);
  return response.data;
};

// 특정 테마의 제품 목록 가져오기
export const getThemeProducts = async (
  params: GetThemeProductsRequest,
): Promise<GetThemeProductsResponse> => {
  const response = await axios.get<GetThemeProductsResponse>(
    `${API_BASE_URL}/api/v1/themes/${params.themeKey}/products`,
    {
      params: { pageToken: params.pageToken, maxResults: params.maxResults },
    },
  );
  return response.data;
};

// 제품 상세 정보 가져오기
export const getProductDetail = async (
  params: GetProductDetailRequest,
): Promise<GetProductDetailResponse> => {
  const response = await axios.get<GetProductDetailResponse>(
    `${API_BASE_URL}/api/v1/products/${params.productId}/detail`,
  );
  return response.data;
};

// 제품 옵션 정보 가져오기
export const getProductOptions = async (
  params: GetProductOptionsRequest,
): Promise<GetProductOptionsResponse> => {
  const response = await axios.get<GetProductOptionsResponse>(
    `${API_BASE_URL}/api/v1/products/${params.productId}/options`,
  );
  return response.data;
};

// 메시지 카드 템플릿 목록 가져오기
export const getMessageCardTemplates = async (): Promise<GetMessageCardTemplatesResponse> => {
  const response = await axios.get<GetMessageCardTemplatesResponse>(
    `${API_BASE_URL}/api/v1/message-card/templates`,
  );
  return response.data;
};

// 내 정보 가져오기
export const getMyAccountInfo = async (): Promise<GetMyAccountInfoResponse> => {
  const response = await axios.get<GetMyAccountInfoResponse>(
    `${API_BASE_URL}/api/v1/my-account/info`,
  );
  return response.data;
};

// 내가 받고 싶어하는 선물 목록 가져오기
export const getMyAccountWishProducts = async (
  params: GetMyAccountWishProductsRequest,
): Promise<GetMyAccountWishProductsResponse> => {
  const response = await axios.get<GetMyAccountWishProductsResponse>(
    `${API_BASE_URL}/api/v1/my-account/wish/products`,
    { params },
  );
  return response.data;
};

// 내 포인트 충전하기
export const putMyAccountPoint = async (params: PutMyAccountPointRequest): Promise<void> => {
  await axios.put(`${API_BASE_URL}/api/v1/my-account/point`, params);
};

// 주문 요청 보내기
export const postOrder = async (params: PostOrderRequest): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/v1/order`, params);
};
