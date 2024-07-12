import { createContext, useContext } from 'react';

import { getThemesProducts } from '@/apis/Theme/theme.api';
import { ProductsResponse } from '@/apis/Theme/theme.response';
import { useQuery } from '@tanstack/react-query';

type ThemeProductData = {
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
};

interface ThemeProductContextProps {
  products: ThemeProductData[];
  isLoading: boolean;
}

const ThemeProductContext = createContext<ThemeProductContextProps | undefined>(
  undefined
);

export const ThemeProductProvider = ({
  children,
  themeKey,
  pageToken = '1',
  maxResults = 20,
}: {
  children: React.ReactNode;
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}) => {
  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: () => getThemesProducts(themeKey, pageToken, maxResults),
  });

  return (
    <ThemeProductContext.Provider
      value={{ products: data?.products || [], isLoading }}
    >
      {children}
    </ThemeProductContext.Provider>
  );
};

export const useThemeProductContext = () => {
  const context = useContext(ThemeProductContext);
  if (!context) {
    throw new Error(
      'useThemeProductContext must be used within ThemeProductProvider'
    );
  }
  return context;
};
