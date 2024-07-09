interface Theme {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface ThemesResponse {
  themes: Theme[];
}

interface Wish {
  isWished: boolean;
  wishCount: number;
}

interface Price {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

interface Product {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ProductsResponse {
  products: Product[];
  nextPageToken: string;
  pageInfo: PageInfo;
}
