import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useThemeProducts } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/DefaultGoodsItems';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessageContainer } from '@/styles';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  // console.log('themeKey: ', themeKey);

  const { data, isLoading, isError, refetch } = useThemeProducts(themeKey);

  const goodsList = data?.products;

  useEffect(() => {
    refetch();
  }, [themeKey, refetch]);

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;

  return (
    <>
      {goodsList === undefined || goodsList.length === 0 ? (
        <ErrorMessageContainer>상품이 없습니다.</ErrorMessageContainer>
      ) : (
        <Wrapper>
          <Container>
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
            </Grid>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
