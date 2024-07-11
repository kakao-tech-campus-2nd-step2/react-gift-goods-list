import styled from '@emotion/styled';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components/common/Error/Error';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingSpinner } from '@/components/common/Loading/Loading';
import { getTheme } from '@/libs/api';
import { breakpoints } from '@/styles/variants';

export const ThemeGoodsSection = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['themeGoods', themeKey],
      ({ pageParam = 1 }) => getTheme(themeKey, pageParam * 20),
      {
        getNextPageParam: (lastPage, pages) => {
          if (!lastPage || !lastPage.products || lastPage.products.length < 20) {
            return undefined;
          }
          return pages.length + 1;
        },
      },
    );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGoodsElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <CenteredContent>
        <ErrorMessage message="데이터를 가져오는 중 오류가 발생했습니다." />
      </CenteredContent>
    );
  }

  if (!data || !data.pages) {
    return (
      <CenteredContent>
        <ErrorMessage message="상품 데이터를 불러올 수 없습니다." />
      </CenteredContent>
    );
  }

  const goods = data.pages.flatMap((page) => page.products) ?? [];

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
          {goods.map((good, index) => {
            if (!good)
              return (
                <CenteredContent>
                  <ErrorMessage message="에러가 발생했습니다." />
                </CenteredContent>
              ); // good이 undefined인지 확인
            const { id, imageURL, name, price, brandInfo } = good;
            if (goods.length === index + 1) {
              return (
                <DefaultGoodsItems
                  ref={lastGoodsElementRef}
                  key={id}
                  imageSrc={imageURL}
                  title={name}
                  amount={price.sellingPrice}
                  subtitle={brandInfo.name}
                />
              );
            } else {
              return (
                <DefaultGoodsItems
                  key={id}
                  imageSrc={imageURL}
                  title={name}
                  amount={price.sellingPrice}
                  subtitle={brandInfo.name}
                />
              );
            }
          })}
        </Grid>
        {isFetchingNextPage && <LoadingSpinner />}
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

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

export default ThemeGoodsSection;
