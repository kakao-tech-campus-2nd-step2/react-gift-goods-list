import { useEffect, useRef, useState } from 'react';

import { getThemeProducts } from '@/apis/themes/themes';

export function useGoodsSectionControl(themeKey: string) {
  const [goodsList, setGoodsList] = useState<Home.ProductData[]>([]);
  const [pageInfo, setPageinfo] = useState<Theme.PageInfo>(); // windowing 하는 용도?
  const [pageToken, setPageToken] = useState<string | null>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchThemeProducts = async () => {
    let isDone = false;
    let retryCount = 0;

    while (!isDone && retryCount < 5) {
      try {
        const data = await getThemeProducts({ themeKey, maxResults: 20 });
        handleThemeProductsResponse(data);
        isDone = true;
      } catch (err) {
        console.log(err, pageInfo);
        retryCount += 1;

        if (retryCount === 4) {
          setIsError(true);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchThemeProducts();
  }, [themeKey]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    if (loaderRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageToken) {
          getThemeProducts({ themeKey, pageToken, maxResults: 20 } as Theme.GetThemeProductsType)
            .then((data: Theme.ThemeProductsResponse) => handleThemeProductsResponse(data))
            .catch((err) => {
              console.error(err, pageInfo);
              setIsError(true);
            });
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
