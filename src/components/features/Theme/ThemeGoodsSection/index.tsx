import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Spinner } from '@/components/common/Spinner';
import { useInfiniteGoodsSelection } from '@/hooks/useInfiniteGoodsSelection';
import { breakpoints } from '@/styles/variants';
import { handleError } from '@/utils/errorHandler';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { goodsmoreinfo, isLoading, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteGoodsSelection(themeKey);
  const errorMessage = error ? handleError(error) : null;

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <Wrapper>
      <Container alignItems="center">
        {isLoading && <Spinner />}
        {errorMessage && <div>{errorMessage}</div>}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {goodsmoreinfo?.pages[0].products.length === 0 ? (
            <div>상품이 없어요</div>
          ) : (
            goodsmoreinfo?.pages.map((page) =>
              page.products?.map(({ id, imageURL, name, price, brandInfo }) => (
                <DefaultGoodsItems
                  key={id}
                  imageSrc={imageURL}
                  title={name}
                  amount={price.sellingPrice}
                  subtitle={brandInfo.name}
                />
              )),
            )
          )}
        </Grid>
        {isFetchingNextPage && <Spinner style={{ marginTop: '40px' }} />}
      </Container>
      <div ref={ref}></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 200%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
