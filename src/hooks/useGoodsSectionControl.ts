import type { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { getThemeProducts } from '@/apis/themes/themes';

type LoadingState = {
  isInit: boolean;
  loadingMore: boolean;
};

const defaultLoadState = {
  isInit: true,
  loadingMore: false,
};

const MAX_RETRY_COUNT = 5;
const RETRY_DELAY_MS = 1000;

const makeFetchRetryOnError =
  (
    fetchFunction: ({}: Theme.GetThemeProductsType) => Promise<Theme.ThemeProductsResponse>,
    fetchFunctionParams: Theme.GetThemeProductsType,
    handleResponse: (data: Theme.ThemeProductsResponse) => void,
    handleError: (e: AxiosError, retryCount: number) => void,
  ): (() => Promise<void>) =>
  async () => {
    let retryCount = 0;
    let isSuccess = false;

    while (!isSuccess && retryCount < MAX_RETRY_COUNT) {
      try {
        const data = await fetchFunction(fetchFunctionParams);
        handleResponse(data);

        isSuccess = true;
      } catch (error) {
        handleError(error as AxiosError, retryCount);

        retryCount += 1;
        if (!isSuccess && retryCount < MAX_RETRY_COUNT) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }
  };

export function useGoodsSectionControl(themeKey: string) {
  const [goodsList, setGoodsList] = useState<Home.ProductData[]>([]);
  const [pageInfo, setPageinfo] = useState<Theme.PageInfo>(); // windowing 하는 용도?
  const [pageToken, setPageToken] = useState<string | null>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<LoadingState>(defaultLoadState);

  const handleThemeProductsResponse = (data: Theme.ThemeProductsResponse) => {
    const { products, nextPageToken, pageInfo: ResponsePageInfo } = data;
    setPageinfo(ResponsePageInfo);
    setPageToken(nextPageToken);
    setGoodsList((prevGoods) => {
      /**
       * 다른 탭 보고 오면 useEffect 실행 되는데 와이??
       */
      const existingIds = prevGoods.map((item) => item.id);
      const newProducts = products.filter((product) => !existingIds.includes(product.id));
      return [...prevGoods, ...newProducts];
    });
  };

  const handleError = (error: AxiosError, retryCount: number) => {
    console.log(error, pageInfo);
    if (retryCount === MAX_RETRY_COUNT - 1) {
      setIsError(true);
    }
  };

  const fetchThemeProducts: () => Promise<void> = makeFetchRetryOnError(
    getThemeProducts,
    { themeKey, maxResults: 20 },
    handleThemeProductsResponse,
    handleError,
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    if (loaderRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !pageToken) {
          fetchThemeProducts().then(() => setIsLoading((prev) => ({ ...prev, isInit: false })));
        } else if (entries[0].isIntersecting && pageToken) {
          const fetchNextThemeProducts: () => Promise<void> = makeFetchRetryOnError(
            getThemeProducts,
            { themeKey, pageToken, maxResults: 20 },
            handleThemeProductsResponse,
            handleError,
          );

          setIsLoading((prev) => ({ ...prev, loadingMore: true }));
          fetchNextThemeProducts().then(() =>
            setIsLoading((prev) => ({ ...prev, loadingMore: false })),
          );
        }
      });
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [themeKey, pageToken]);

  return { goodsList, loaderRef, isError, isLoading: isLoading.isInit || isLoading.loadingMore };
}
