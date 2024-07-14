import { useCallback, useRef } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import LoadingSpinner from '@/components/features/LoadingSpinner';
import { useThemeProductContext } from '@/provider/Theme/ThemeProductProvider';
import { breakpoints } from '@/styles/variants';
import styled from '@emotion/styled';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({}: Props) => {
  const { products, isLoading, isError, errorMsg, fetchMoreProducts, hasMore } =
    useThemeProductContext();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchMoreProducts]
  );

  if (isLoading && products.length === 0) {
    return (
      <StyledDiv>
        <LoadingSpinner />
      </StyledDiv>
    );
  }

  if (isError) {
    return <MessageDiv>{errorMsg}</MessageDiv>;
  }

  if (products.length === 0) {
    return <MessageDiv>상품이 없어요.</MessageDiv>;
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
          {products.map(({ id, imageURL, name, price, brandInfo }, index) => {
            if (index === products.length - 1) {
              return (
                <div ref={lastItemRef} key={id}>
                  <DefaultGoodsItems
                    imageSrc={imageURL}
                    title={name}
                    amount={price.sellingPrice}
                    subtitle={brandInfo.name}
                  />
                </div>
              );
            }
            return (
              <DefaultGoodsItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            );
          })}
        </Grid>
      </Container>
      {isLoading && (
        <StyledDiv>
          <LoadingSpinner />
        </StyledDiv>
      )}
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

const StyledDiv = styled.div`
  width: 100%;
  padding: 40px 16px 60px;
  display: flex;
  justify-content: center;
`;

const MessageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
`;
