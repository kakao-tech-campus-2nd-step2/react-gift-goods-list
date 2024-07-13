import axios from 'axios';
import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';

const baseURL = 'https://kakao-tech-campus-mock-server.vercel.app/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
}

export interface ThemeData {
  imageURL: string;
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface ThemeProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface ProductDetailData extends ProductData {
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

interface MessageCardTemplateData {
  id: number;
  defaultTextMessage: string;
  thumbURL: string;
  imageURL: string;
}

interface MyAccountInfoData {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}

// 선물 랭킹 목록
export const getRankingProducts = async (targetType: string = 'ALL', rankType: string = 'MANY_WISH_RECEIVE'): Promise<ProductData[]> => {
  try {
    const response = await api.get('/ranking/products', {
      params: {
        targetType,
        rankType,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error('Error fetching ranking products:', error);
    throw error;
  }
};

// 선물 테마 카테고리 목록
export const getThemes = async (): Promise<ThemeData[]> => {
  try {
    const response = await api.get('/themes');
    return response.data.themes;
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
};

// 특정 테마의 선물 목록
export const getThemeProducts = async (themeKey: string, pageToken: number = 1, maxResults: number = 20): Promise<ThemeProductsResponse> => {
  try {
    const response = await api.get(`/themes/${themeKey}/products`, {
      params: {
        maxResults,
        pageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for theme ${themeKey}:`, error);
    throw error;
  }
};

// 특정 상품의 상세 정보
export const getProductDetail = async (productId: string): Promise<ProductDetailData> => {
  try {
    const response = await api.get(`/products/${productId}/detail`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching detail for product ${productId}:`, error);
    throw error;
  }
};

// 특정 상품의 옵션 정보
export const getProductOptions = async (productId: string): Promise<unknown> => {
  try {
    const response = await api.get(`/products/${productId}/options`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching options for product ${productId}:`, error);
    throw error;
  }
};

// 메시지 카드 템플릿 목록
export const getMessageCardTemplates = async (): Promise<MessageCardTemplateData[]> => {
  try {
    const response = await api.get('/message-card/templates');
    return response.data.templates;
  } catch (error) {
    console.error('Error fetching message card templates:', error);
    throw error;
  }
};

// 내 정보
export const getMyAccountInfo = async (): Promise<MyAccountInfoData> => {
  try {
    const response = await api.get('/my-account/info');
    return response.data;
  } catch (error) {
    console.error('Error fetching my account info:', error);
    throw error;
  }
};

//
export const useRankingProducts = (targetType: string = 'ALL', rankType: string = 'MANY_WISH_RECEIVE', options?: UseQueryOptions<ProductData[]>) =>
  useQuery<ProductData[]>(['rankingProducts', targetType, rankType], () => getRankingProducts(targetType, rankType), options);

export const useThemes = (options?: UseQueryOptions<ThemeData[]>) =>
  useQuery<ThemeData[]>('themes', getThemes, options);

export const useThemeProducts = (themeKey: string, pageToken: number = 1, maxResults: number = 20, options?: UseQueryOptions<ThemeProductsResponse>) =>
  useQuery<ThemeProductsResponse>(['themeProducts', themeKey], () => getThemeProducts(themeKey, pageToken, maxResults), options);

export const useProductDetail = (productId: string, options?: UseQueryOptions<ProductDetailData>) =>
  useQuery<ProductDetailData>(['productDetail', productId], () => getProductDetail(productId), options);

export const useProductOptions = (productId: string, options?: UseQueryOptions<unknown>) =>
  useQuery<unknown>(['productOptions', productId], () => getProductOptions(productId), options);

export const useMessageCardTemplates = (options?: UseQueryOptions<MessageCardTemplateData[]>) =>
  useQuery<MessageCardTemplateData[]>('messageCardTemplates', getMessageCardTemplates, options);

export const useMyAccountInfo = (options?: UseQueryOptions<MyAccountInfoData>) =>
  useQuery<MyAccountInfoData>('myAccountInfo', getMyAccountInfo, options);