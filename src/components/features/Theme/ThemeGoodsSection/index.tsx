import styled from '@emotion/styled';
import { useQuery } from 'react-query';

import { fetchThemeProducts } from '@/api/theme';
import { DataWrapper } from '@/components/common/DataWrapper';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { ThemeProductResponse } from '@/types';
import { getErrorMessage } from '@/utils/errorHandler';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data, error, isLoading } = useQuery<ThemeProductResponse, Error>(
    ['themeProducts', themeKey],
    () => fetchThemeProducts(themeKey, 20),
  );

  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <Wrapper>
      <Container>
        <DataWrapper isLoading={isLoading} errorMessage={errorMessage}>
          {data?.products.length === 0 ? (
            <Message>상품이 없어요.</Message>
          ) : (
            <Grid
              columns={{
                initial: 2,
                md: 4,
              }}
              gap={16}
            >
              {data?.products.map(({ id, imageURL, name, price, brandInfo }) => (
                <DefaultGoodsItems
                  key={id}
                  imageSrc={imageURL}
                  title={name}
                  amount={price.sellingPrice}
                  subtitle={brandInfo.name}
                />
              ))}
            </Grid>
          )}
        </DataWrapper>
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

const Message = styled.p`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
