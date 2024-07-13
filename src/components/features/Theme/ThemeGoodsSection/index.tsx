import styled from '@emotion/styled';
import { useCallback,useEffect, useRef } from 'react';

import { useThemeProducts } from '@/api/theme';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useThemeProducts(themeKey);

  const observerElem = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);
    const currentElem = observerElem.current;
    if (currentElem) {
      observer.observe(currentElem);
    }
    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [observerCallback]);

  if (isLoading) return <MessageDiv>로딩 중...</MessageDiv>;
  if (error) return <MessageDiv color="red">상품을 불러오는 중 오류가 발생했습니다.</MessageDiv>;

  const products = data?.pages.flatMap(page => page.products) || [];

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
          {products.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
        <div ref={observerElem}></div>
        {isFetchingNextPage && <MessageDiv>더 불러오는 중...</MessageDiv>}
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

const MessageDiv = styled.div<{ color?: string }>`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${({ color }) => color || '#666'};
`;
