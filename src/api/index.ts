import type { AxiosInstance } from "axios";
import axios from "axios";

import type { RankingFilterOption } from "@/types";

const API_BASE_URL = "https://react-gift-mock-api-jyn523.vercel.app";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const getRankingProducts = async (params?: RankingFilterOption) => {
  const response = await apiClient.get("/api/v1/ranking/products", { params });
  return response.data.products;
};

export const getThemes = async () => {
  const response = await apiClient.get("/api/v1/themes");
  return response.data.themes;
};

export const getThemeProducts = async (
  themeKey: string,
  pageToken?: string,
  maxResults?: number,
) => {
  const response = await apiClient.get(`/api/v1/themes/${themeKey}/products`, {
    params: {
      pageToken: pageToken,
      maxResults: maxResults,
    },
  });
  return response.data;
};
