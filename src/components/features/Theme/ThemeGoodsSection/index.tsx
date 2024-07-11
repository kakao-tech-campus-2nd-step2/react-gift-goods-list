import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchData } from '@/components/common/API/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
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

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T;
  hasMore: boolean;
  nextPageToken: string | null;
}

interface FetchParams {
  maxResults: number;
  pageToken?: string;
}

type Props = {
  themeKey: string;
};

const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: [],
    hasMore: true,
    nextPageToken: null,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async (key: string, pageToken: string | null) => {
    setFetchState(prevState => ({ ...prevState, isLoading: true }));

    try {
      const params: FetchParams = { maxResults: 20 };
      if (pageToken) params.pageToken = pageToken;

      const data: ApiResponse = await fetchData(`/api/v1/themes/${key}/products`, params);
      setFetchState(prevState => ({
        isLoading: false,
        isError: false,
        data: [...prevState.data, ...data.products],
        hasMore: data.products.length > 0,
        nextPageToken: data.nextPageToken,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setFetchState(prevState => ({ ...prevState, isLoading: false, isError: true }));
    }
  }, []);

  // 초기 로딩 비동기 통신
  useEffect(() => {
    if (themeKey) {
      setFetchState({ isLoading: true, isError: false, data: [], hasMore: true, nextPageToken: null });
      fetchProducts(themeKey, null);
    }
  }, [themeKey, fetchProducts]);

  // ref(스크롤)의 변화를 감지하고 다음 페이지를 불러오는 비동기 처리
  useEffect(() => {
    if (fetchState.hasMore && !fetchState.isLoading) {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && fetchState.nextPageToken) {
          fetchProducts(themeKey, fetchState.nextPageToken);
        }
      }, {
        threshold: 1.0,
      });

      if (loadMoreRef.current) {
        observerRef.current.observe(loadMoreRef.current);
      }
    }
    return () => observerRef.current?.disconnect();
  }, [fetchState.hasMore, fetchState.isLoading, fetchState.nextPageToken, themeKey, fetchProducts]);

  if (fetchState.isLoading && fetchState.data.length === 0)
    return <Loading />;
  if (fetchState.isError)
    return <ErrorMessage>데이터를 불러오는 중에 문제가 발생했습니다.</ErrorMessage>;
  if (!fetchState.data || fetchState.data.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

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
          {fetchState.data.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
      <div ref={loadMoreRef}></div>
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

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

export default ThemeGoodsSection;
