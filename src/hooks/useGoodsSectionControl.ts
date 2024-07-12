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

/**
 * axios-interceptor를 사용할 수도 있다.
 * react-query를 사용한 방법은?
 * useInfinityQuery 통해 구현할 수 있지만, react-interaction-observer의 useView와 결합해 만든 예시 코드가 이미 주어짐.
 */
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

export const handleStatusCode = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        console.error('[400] 잘못된 요청입니다.');
        break;
      case 401:
        console.error('[401] 권한이 없습니다.');
        break;
      case 403:
        console.error('[402] 금지된 요청입니다.');
        break;
      case 404:
        console.error('[404] 페이지를 찾을 수 없습니다.');
        break;
      case 500:
        console.error('[500] 서버에서 발생한 오류입니다.');
        break;
      default:
        console.error(`[${error.response.status}]`);
    }
  } else {
    console.error('요청에 대한 응답이 오지 않았습니다.');
  }
};

export function useGoodsSectionControl(themeKey: string) {
  const [goodsList, setGoodsList] = useState<Home.ProductData[]>([]);
  const [pageInfo, setPageinfo] = useState<Theme.PageInfo | null>(); // windowing 하는 용도?
  const [nextPageToken, setNextPageToken] = useState<undefined | string | null>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<LoadingState>(defaultLoadState);

  const handleThemeProductsResponse = (data: Theme.ThemeProductsResponse) => {
    const {
      products,
      nextPageToken: ResponseNextPageToken = null,
      pageInfo: ResponsePageInfo,
    } = data;
    setPageinfo(ResponsePageInfo);
    setNextPageToken(ResponseNextPageToken);
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
    handleStatusCode(error);
    if (retryCount === MAX_RETRY_COUNT - 1) {
      setIsError(true);
      console.log('현재 상황: ', pageInfo);
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
    if (!loaderRef.current) return;
    if (nextPageToken === null) {
      observerRef?.current?.disconnect();
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      if (nextPageToken === undefined) {
        fetchThemeProducts().then(() => setIsLoading((prev) => ({ ...prev, isInit: false })));
        return;
      }

      const fetchNextThemeProducts: () => Promise<void> = makeFetchRetryOnError(
        getThemeProducts,
        { themeKey, pageToken: nextPageToken, maxResults: 20 },
        handleThemeProductsResponse,
        handleError,
      );

      setIsLoading((prev) => ({ ...prev, loadingMore: true }));
      fetchNextThemeProducts().then(() =>
        setIsLoading((prev) => ({ ...prev, loadingMore: false })),
      );
    });

    observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [themeKey, nextPageToken]);

  return { goodsList, loaderRef, isError, isLoading: isLoading.isInit || isLoading.loadingMore };
}
