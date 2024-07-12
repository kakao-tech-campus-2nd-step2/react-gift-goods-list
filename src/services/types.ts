export interface Theme {
  id: number;
  key: string;
  label: string;
  title?: string;
  imageURL?: string;
  description?: string;
  backgroundColor?: string;
}

export interface Product {
  id: number;
  imageURL: string;
  brandInfo: {
    name: string;
  };
  name: string;
  price: {
    basicPrice: number;
  };
}

export interface ProductWithPageData {
  products: Product[];
  nextPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}
