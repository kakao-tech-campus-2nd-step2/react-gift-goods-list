import instance from './instance';

export const fetchHomeTheme = async () => {
  const { data } = await instance.get('api/v1/themes');
  return data;
};

export const fetchRankingSection = async (targetType: string, rankType: string) => {
  const { data } = await instance.get(
    `/api/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
  );
  return data;
};

export const fetchThemeProducts = async (themeKey: string, pageToken: number = 1) => {
  const { data } = await instance.get(
    `api/v1/themes/${themeKey}/products?pageToken=${pageToken}&maxResults=20`,
  );
  return data;
};
