import styled from '@emotion/styled';
import { useRef, useCallback } from 'react';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import { useThemeGoods } from '@/api/hooks/useThemeGoods';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useThemeGoods({ themeKey });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastGoodsElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>상품을 불러오는 중 문제가 발생하였습니다.</div>;
  }

  if (!data || data.pages[0].products.length === 0) {
    return <div>보여드릴 상품이 없습니다.</div>;
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
          {data.pages.map((page, pageIndex) =>
            page.products.map((goods, goodsIndex) => {
              const isLastElement = pageIndex === data.pages.length - 1 && goodsIndex === page.products.length - 1;
              return (
                <div ref={isLastElement ? lastGoodsElementRef : null} key={goods.id}>
                  <DefaultGoodsItems
                    imageSrc={goods.imageURL}
                    title={goods.name}
                    amount={goods.price.sellingPrice}
                    subtitle={goods.brandInfo.name}
                  />
                </div>
              );
            })
          )}
        </Grid>
        {isFetchingNextPage && <div>추가 로딩...</div>}
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
