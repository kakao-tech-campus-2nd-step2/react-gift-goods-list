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

export type ThemeListData = Pick<
  ThemeData,
  'id' | 'key' | 'label' | 'imageURL'
>;
