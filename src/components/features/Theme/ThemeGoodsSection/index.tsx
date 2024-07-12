import styled from '@emotion/styled';
import { useCallback } from 'react';

import type { FetchThemeProductsResponse } from '@/api/fetchThemeProducts';
import { fetchThemeProducts } from '@/api/fetchThemeProducts';
import { FetchDataUI } from '@/components/common/FetchDataUI';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useFetchData } from '@/hooks/useFetchData';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

const fetchData = async (themeKey: string): Promise<FetchThemeProductsResponse> => {
  const res = await fetchThemeProducts(themeKey);
  return res;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const fetchDataCallback = useCallback(() => fetchData(themeKey), [themeKey]);

  const { data, loading, error } = useFetchData<FetchThemeProductsResponse>({
    fetchData: fetchDataCallback,
  });

  return (
    <Wrapper>
      <Container>
        <FetchDataUI loading={loading} error={error} data={data?.products}>
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {data?.products?.map(({ id, imageURL, name, price, brandInfo }) => (
              <DefaultGoodsItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            ))}
          </Grid>
        </FetchDataUI>
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
