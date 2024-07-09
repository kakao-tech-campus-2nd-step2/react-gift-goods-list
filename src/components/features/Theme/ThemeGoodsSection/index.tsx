import styled from '@emotion/styled';
import { useEffect,useState } from 'react';

import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import { GoodsData } from '@/types';


interface ThemeGoodsSectionProps {
  themeKey: string;
}

export const ThemeGoodsSection = ({ themeKey }: ThemeGoodsSectionProps) => {
  const [products, setProducts] = useState<GoodsData[]>([]);

  useEffect(() => {
    fetchThemeProducts(themeKey).then(fetchedProducts => {
      setProducts(fetchedProducts);  
    }).catch(console.error);
  }, [themeKey]);
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
