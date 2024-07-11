import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { fetchThemeProducts } from '@/api/themeProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Message } from '@/components/common/Message';
import { breakpoints } from '@/styles/variants';
import type { ProductData } from '@/types/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error, isLoading } =
    useInfiniteQuery(['themeProducts', themeKey], fetchThemeProducts, {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length * 20 : undefined,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  if (isError) {
    const response = (error as AxiosError).response;
    let errorMessage = '';

    switch (response?.status) {
      case 400:
        errorMessage = '잘못된 요청입니다.';
        break;
      case 404:
        errorMessage = '해당 테마의 상품을 찾을 수 없습니다.';
        break;
      default:
        errorMessage = '에러가 발생했습니다.';
    }
    return <Message>{errorMessage}</Message>;
  }

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
          {data?.pages
            .flat()
            .map((product: ProductData) => (
              <DefaultGoodsItems
                key={product.id}
                imageSrc={product.imageURL}
                title={product.name}
                amount={product.price.sellingPrice}
                subtitle={product.brandInfo.name}
              />
            ))}
        </Grid>
        {isFetchingNextPage && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
        <div ref={ref} />
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

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding-bottom: 60px;
`;

const Loading = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgba(255, 255, 255);
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
