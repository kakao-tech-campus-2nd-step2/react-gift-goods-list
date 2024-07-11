import axiosInstance from '@/apis/axios';

export const getThemes = async () => {
  const response = await axiosInstance.get<Theme.ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const getThemeProducts = async ({
  themeKey,
  pageToken,
  maxResults = 10,
}: Theme.GetThemeProductsType) => {
  const response = await axiosInstance.get<Theme.ThemeProductsResponse>(
    `/api/v1/themes/${themeKey}/products`,
    {
      params: {
        pageToken,
        maxResults,
      },
      timeout: 5000,
    },
  );
  return response.data;
};
