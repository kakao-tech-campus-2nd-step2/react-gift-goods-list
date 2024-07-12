import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getThemeProducts } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/DefaultGoodsItems';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  // console.log('themeKey: ', themeKey);

  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchThemeProducts = async () => {
      try {
        const response = await getThemeProducts(themeKey);
        const products: GoodsData[] = response.products;

        if (products) {
          setGoodsList(products);
          // console.log('products: ', products);
        } else {
          console.error(`No products found for key: ${themeKey}`);
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.error('Error fetching theme products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeProducts();
  }, [themeKey]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !goodsList) return <p>Error loading theme products.</p>;

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
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
