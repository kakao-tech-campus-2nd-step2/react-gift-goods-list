import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import apiClient from '@/utils/api';

const fetchThemeProducts = async (themeKey: string) => {
  const response = await apiClient.get<{ products: GoodsData[] }>(`/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
    },
  });
  return response.data.products;
};

export const GoodsSection = () => {
  const { themeKey } = useParams<{ themeKey: string }>();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(['themeProducts', themeKey], () => fetchThemeProducts(themeKey!), {
    enabled: !!themeKey,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <SectionWrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products?.map(({ id, imageURL, name, price, brandInfo }) => (
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
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
