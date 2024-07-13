export interface ProductData {
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
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
  imageURL: string;
}

export interface ThemeResponse {
  themes: ThemeData[];
}

export interface ProductsResponse {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
      totalResults: number;
      resultsPerPage: number;
  };
}

export interface RankingProductsResponse {
  products: ProductData[];
}
