export type ThemeHeaderType = {
  id: number;
  themeTitle: string;
  subTitle: string;
  description: string;
  color: string;
};

export interface ThemeListType {
  id: number;
  subtitle: string;
  title: string;
  amount: string;
}

export interface ThemeListDataType {
  [key: string]: ThemeListType[];
}
