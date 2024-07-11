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
  
  export interface GetRankingProductsResponse {
    products: ProductData[];
  }
  
  export interface ThemeData {
    id: number;
    key: string;
    label: string;
    title: string;
    description: string;
    backgroundColor: string;
  }
  
  export interface GetThemesResponse {
    themes: ThemeData[];
  }
  
  export interface GetThemeProductsResponse {
    products: ProductData[];
    nextPageToken?: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  }
  