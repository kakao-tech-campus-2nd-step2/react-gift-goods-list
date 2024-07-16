import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components/common/Error/Error';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingSpinner } from '@/components/common/Loading/Loading';
import { useTheme } from '@/hooks/useTheme';
import { breakpoints } from '@/styles/variants';

export const ThemeGoodsSection = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const {
    isThemeLoading,
    isThemeError,
    error: themeError,
    data,
    isFetchingNextPage,
    isGoodsLoading,
    lastGoodsElementRef,
  } = useTheme(themeKey);

  if (isThemeLoading || isGoodsLoading) {
    return <LoadingSpinner />;
  }
  if (isThemeError) {
    return (
      <CenteredContent>
        <ErrorMessage message={themeError} />
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
  if (typeof data?.pages[0] === 'string') {
    return (
      <CenteredContent>
        <ErrorMessage message={data?.pages[0]} />
      </CenteredContent>
    );
  }
  if (goods.length === 0) {
    return (
      <CenteredContent>
        <ErrorMessage message="표시할 상품이 없습니다." />
      </CenteredContent>
    );
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
          {goods.map((good, index) => {
            if (!good) return null;
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
