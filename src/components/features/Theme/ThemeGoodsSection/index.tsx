import styled from '@emotion/styled';
import { useCallback,useEffect, useRef, useState } from 'react';

import { fetchData } from '@/components/common/API/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
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

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T;
  hasMore: boolean;
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
  });

  const [offset, setOffset] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async (key: string, currentOffset: number) => {
    setFetchState(prevState => ({ ...prevState, isLoading: true }));

    try {
      const data = await fetchData(`/api/v1/themes/${key}/products`, { maxResults: 20, offset: currentOffset });
      setFetchState(prevState => ({
        isLoading: false,
        isError: false,
        data: [...prevState.data, ...data.products],
        hasMore: data.products.length > 0,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setFetchState(prevState => ({ ...prevState, isLoading: false, isError: true }));
    }
  }, []);

//초기 로딩 비동기 통신
  useEffect(() => {
    if (themeKey) {
      setFetchState({ isLoading: true, isError: false, data: [], hasMore: true });
      setOffset(0); 
      fetchProducts(themeKey, 0);  
    }
  }, [themeKey, fetchProducts]);

//offset변화를 감지한 후의 비동기 통신
  useEffect(() => {
    if (offset > 0) {
      fetchProducts(themeKey, offset);
    }
  }, [offset, fetchProducts, themeKey]);

//ref(스크롤)의 변화를 감지하고 offset을 변경시키는 비동기 처리 
  useEffect(() => {
    if (fetchState.hasMore && !fetchState.isLoading) {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setOffset(prevOffset => prevOffset + 20);
        }
      });
      if (loadMoreRef.current) {
        observerRef.current.observe(loadMoreRef.current);
      }
    }
    return () => observerRef.current?.disconnect();
  }, [fetchState.hasMore, fetchState.isLoading]);

  if (fetchState.isLoading)
    return <LoadingMessage>Loading...</LoadingMessage>;
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

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

export default ThemeGoodsSection;