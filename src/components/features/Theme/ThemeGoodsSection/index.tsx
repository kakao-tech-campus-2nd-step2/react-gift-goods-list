import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { useInfiniteThemeProducts } from '@/api/hooks/useInfiniteThemeProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteThemeProducts(themeKey);

  const observerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerElem.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px',
      },
    );

    observer.observe(observerElem.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading && !data) {
    return (
      <LoadingContainer>
        <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (isError) {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    if (error instanceof AxiosError && error.response) {
      switch (error.response.status) {
        case 404:
          errorMessage = '데이터를 찾을 수 없습니다.';
          break;
        case 500:
          errorMessage = '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.';
          break;
        default:
          errorMessage = '알 수 없는 오류가 발생했습니다.';
      }
    } else {
      errorMessage = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
    }
    return <TextView>{errorMessage}</TextView>;
  }

  const goodsList: GoodsData[] = data?.pages.flatMap((page) => page.products) || [];

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
          {goodsList.map((product: GoodsData) => (
            <DefaultGoodsItems
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
            />
          ))}
        </Grid>
        <div ref={observerElem} />
        {isFetchingNextPage && (
          <LoadingContainer>
            <ClipLoader color="#36d7b7" loading={isFetchingNextPage} size={50} />
            <LoadingText>Loading more...</LoadingText>
          </LoadingContainer>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #36d7b7;
`;
