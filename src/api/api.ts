// src/api/api.ts

import axios from 'axios';

import type {
  GetMyAccountWishProductsRequest,
  GetProductDetailRequest,
  GetProductOptionsRequest,
  GetRankingProductsRequest,
  GetThemeProductsRequest,
  PostOrderRequest,
  PutMyAccountPointRequest,
} from '@/types/request';
import type {
  GetMessageCardTemplatesResponse,
  GetMyAccountInfoResponse,
  GetMyAccountWishProductsResponse,
  GetProductDetailResponse,
  GetProductOptionsResponse,
  GetRankingProductsResponse,
  GetThemeProductsResponse,
  GetThemesResponse,
} from '@/types/response';

const API_BASE_URL = 'https://react-gift-mock-api-kakao.vercel.app';

export const getRankingProducts = async (
  params: GetRankingProductsRequest,
): Promise<GetRankingProductsResponse> => {
  const response = await axios.get<GetRankingProductsResponse>(
    `${API_BASE_URL}/api/v1/ranking/products`,
    { params },
  );
  return response.data;
};

export const getThemes = async (): Promise<GetThemesResponse> => {
  const response = await axios.get<GetThemesResponse>(`${API_BASE_URL}/api/v1/themes`);
  return response.data;
};

export const getThemeProducts = async (
  params: GetThemeProductsRequest,
): Promise<GetThemeProductsResponse> => {
  const response = await axios.get<GetThemeProductsResponse>(
    `${API_BASE_URL}/api/v1/themes/${params.themeKey}/products`,
    { params: { maxResults: params.maxResults, pageToken: params.pageToken } },
  );
  return response.data;
};

export const getProductDetail = async (
  params: GetProductDetailRequest,
): Promise<GetProductDetailResponse> => {
  const response = await axios.get<GetProductDetailResponse>(
    `${API_BASE_URL}/api/v1/products/${params.productId}/detail`,
  );
  return response.data;
};

export const getProductOptions = async (
  params: GetProductOptionsRequest,
): Promise<GetProductOptionsResponse> => {
  const response = await axios.get<GetProductOptionsResponse>(
    `${API_BASE_URL}/api/v1/products/${params.productId}/options`,
  );
  return response.data;
};

export const getMessageCardTemplates = async (): Promise<GetMessageCardTemplatesResponse> => {
  const response = await axios.get<GetMessageCardTemplatesResponse>(
    `${API_BASE_URL}/api/v1/message-card/templates`,
  );
  return response.data;
};

export const getMyAccountInfo = async (): Promise<GetMyAccountInfoResponse> => {
  const response = await axios.get<GetMyAccountInfoResponse>(
    `${API_BASE_URL}/api/v1/my-account/info`,
  );
  return response.data;
};

export const getMyAccountWishProducts = async (
  params: GetMyAccountWishProductsRequest,
): Promise<GetMyAccountWishProductsResponse> => {
  const response = await axios.get<GetMyAccountWishProductsResponse>(
    `${API_BASE_URL}/api/v1/my-account/wish/products`,
    { params },
  );
  return response.data;
};

export const putMyAccountPoint = async (params: PutMyAccountPointRequest): Promise<void> => {
  await axios.put(`${API_BASE_URL}/api/v1/my-account/point`, params);
};

export const postOrder = async (params: PostOrderRequest): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/v1/order`, params);
};
