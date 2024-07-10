import { useEffect, useRef, useState } from 'react';

import type { ProductData } from '@/apis/products/type';
import { getThemeProducts } from '@/apis/themes/themes';
import type { PageInfo, ThemeProductsResponse } from '@/apis/themes/type';
import type { GetThemeProductsType } from '@/apis/themes/type';

export function useGoodsSectionControl(themeKey: string) {
  const [goodsList, setGoodsList] = useState<ProductData[]>([]);
  const [pageInfo, setPageinfo] = useState<PageInfo>(); // windowing 하는 용도?
  const [pageToken, setPageToken] = useState<string | null>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeProductsResponse = (data: ThemeProductsResponse) => {
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

  useEffect(() => {
    setIsLoading(true);
    getThemeProducts({ themeKey, maxResults: 20 })
      .then((data: ThemeProductsResponse) => handleThemeProductsResponse(data))
      .catch((err) => {
        console.log(err, pageInfo);
        setIsError(true);
      });
    setIsLoading(false);
  }, [themeKey]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    if (loaderRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageToken) {
          setIsLoading(true);
          getThemeProducts({ themeKey, pageToken, maxResults: 20 } as GetThemeProductsType)
            .then((data: ThemeProductsResponse) => handleThemeProductsResponse(data))
            .catch((err) => {
              console.error(err);
              setIsError(true);
            });
          setIsLoading(false);
        }
      });
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [themeKey, pageToken]);

  return { goodsList, loaderRef, isError, isLoading };
}
