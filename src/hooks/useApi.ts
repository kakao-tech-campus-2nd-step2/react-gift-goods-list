// src/hooks/useApi.ts

import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

import {
  getMessageCardTemplates,
  getMyAccountInfo,
  getMyAccountWishProducts,
  getProductDetail,
  getProductOptions,
  getRankingProducts,
  getThemeProducts,
  getThemes,
  postOrder,
  putMyAccountPoint,
} from '@/api/api';
import type {
  GetMyAccountWishProductsRequest,
  GetProductDetailRequest,
  GetProductOptionsRequest,
  GetRankingProductsRequest,
  GetThemeProductsRequest,
} from '@/types/request';

export const useGetRankingProducts = (params: GetRankingProductsRequest) => {
  return useQuery(['rankingProducts', params], () => getRankingProducts(params));
};

export const useGetThemes = () => {
  return useQuery('themes', getThemes);
};

export const useGetThemeProducts = (params: GetThemeProductsRequest) => {
  return useInfiniteQuery(
    ['themeProducts', params.themeKey],
    ({ pageParam = undefined }) => getThemeProducts({ ...params, pageToken: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    },
  );
};

export const useGetProductDetail = (params: GetProductDetailRequest) => {
  return useQuery(['productDetail', params], () => getProductDetail(params));
};

export const useGetProductOptions = (params: GetProductOptionsRequest) => {
  return useQuery(['productOptions', params], () => getProductOptions(params));
};

export const useGetMessageCardTemplates = () => {
  return useQuery('messageCardTemplates', getMessageCardTemplates);
};

export const useGetMyAccountInfo = () => {
  return useQuery('myAccountInfo', getMyAccountInfo);
};

export const useGetMyAccountWishProducts = (params: GetMyAccountWishProductsRequest) => {
  return useQuery(['myAccountWishProducts', params], () => getMyAccountWishProducts(params));
};

export const usePutMyAccountPoint = () => {
  return useMutation(putMyAccountPoint);
};

export const usePostOrder = () => {
  return useMutation(postOrder);
};
