import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loading } from '@/components/ui/Loading';
import { NoDataMessage } from '@/components/ui/NoDataMessage';
import { breakpoints } from '@/styles/variants';
import type { ProductData } from '@/types/response';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [productFetchError, setProductFetchError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getThemeProducts({ themeKey, pageToken: '', maxResults: 20 });
        setProducts(response.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProductFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [themeKey]);

  if (loading) {
    return <Loading />;
  }

  if (productFetchError) {
    return <p>An error occurred while fetching data.</p>;
  }

  if (products.length === 0) {
    return <NoDataMessage message="No products found for this theme." />;
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
