import { createContext, useContext } from 'react';

import { getThemesProducts } from '@/apis/Theme/theme.api';
import { ProductsResponse } from '@/apis/Theme/theme.response';
import { useInfiniteQuery } from '@tanstack/react-query';

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
  isError: boolean;
  errorMsg: string;
  hasMore: boolean;
  fetchMore: () => void;
}

const ThemeProductContext = createContext<ThemeProductContextProps | undefined>(
  undefined
);

export const ThemeProductProvider = ({
  children,
  themeKey,
  pageToken = '0',
  maxResults = 20,
}: {
  children: React.ReactNode;
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProductsResponse>(
      ['products', themeKey],
      ({ pageParam = pageToken }) =>
        getThemesProducts(themeKey, pageParam, maxResults),
      {
        getNextPageParam: (lastPage) =>
          lastPage.pageInfo.nextPageToken ?? undefined,
      }
    );

  // Flatten the products array
  const products = data?.pages.flatMap((page) => page.products) || [];

  // Error handling
  const errorMsg =
    error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

  return (
    <ThemeProductContext.Provider
      value={{
        products,
        isLoading,
        isError: !!error,
        errorMsg,
        hasMore: hasNextPage || false,
        fetchMore: fetchNextPage,
      }}
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
