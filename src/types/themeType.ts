export interface ThemeListType {
  id: number;
  subtitle: string;
  title: string;
  amount: number;
}

export interface ThemeListDataType {
  [key: string]: ThemeListType[];
}

export type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL?: string;
  title: string;
  description?: string;
  backgroundColor?: string;
};

export type GetThemesResponse = {
  themes: ThemeData[];
};
