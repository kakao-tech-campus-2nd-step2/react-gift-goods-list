import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';

import { fetchData } from '@/components/common/API/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import EmptyData from '@/components/common/Status/emptyData';
import ErrorMessage from '@/components/common/Status/errorMessage';
import Loading from '@/components/common/Status/loading';
import { breakpoints } from '@/styles/variants';

interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  price: {
    sellingPrice: number;
  };
  brandInfo: {
    name: string;
  };
}

interface ApiResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface FetchParams {
  maxResults: number;
  pageToken?: string;
}

type Props = {
  themeKey: string;
};

const fetchProducts = async (themeKey: string, pageParam: string | null): Promise<ApiResponse> => {
  const params: FetchParams = { maxResults: 20 };
  if (pageParam)
    params.pageToken = pageParam;

  return fetchData(`/api/v1/themes/${themeKey}/products`, params);
};

const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse, AxiosError>({
    queryKey: ['products', themeKey],
    queryFn: ({ pageParam = null }) => fetchProducts(themeKey, pageParam as string || null),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: null,
  });

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            void fetchNextPage();
          }
        },
        {
          threshold: 1.0,
        }
      );

      if (loadMoreRef.current) {
        observerRef.current.observe(loadMoreRef.current);
      }
    }
    return () => observerRef.current?.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading)
    return <Loading />;
  if (isError)
    return <ErrorMessage message={error?.message || '데이터를 불러오는 중에 문제가 발생했습니다.'} code={error?.code} />;
  if (!data || data.pages[0].products.length === 0)
    return <EmptyData />;

  const products = data.pages.flatMap(
    (page) => page.products
  );

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products.map((product: ProductData) => (
            <DefaultGoodsItems
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
      <div ref={loadMoreRef}></div>
      {isFetchingNextPage && <Loading />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

export default ThemeGoodsSection;