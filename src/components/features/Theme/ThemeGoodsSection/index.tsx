import styled from '@emotion/styled';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useGoodsSectionControl } from '@/hooks/useGoodsSectionControl';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { goodsList, loaderRef, isError, isLoading } = useGoodsSectionControl(themeKey);
  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <Container alignItems="center">로딩중</Container>
        ) : isError ? (
          <Container alignItems="center">에러가 발생했습니다.</Container>
        ) : goodsList.length === 0 ? (
          <Container alignItems="center">상품이 없어요.</Container>
        ) : (
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {goodsList.map(({ id, imageURL, name, price, brandInfo }) => (
              <DefaultGoodsItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            ))}
            <div ref={loaderRef} style={{ height: '1px' }} />
          </Grid>
        )}
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
