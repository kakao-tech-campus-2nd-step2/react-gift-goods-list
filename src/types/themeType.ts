export type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL?: string;
  title: string;
  description?: string;
  backgroundColor?: string;
};

export type ThemeListData = Pick<
  ThemeData,
  'id' | 'key' | 'label' | 'imageURL'
>;

export type ThemeHeaderData = Pick<
  ThemeData,
  'label' | 'title' | 'description' | 'backgroundColor'
>;

export type GetThemesResponse = {
  themes: ThemeData[];
};
