import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

import { getThemeProducts } from '../../../../api/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const navigate = useNavigate();
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeProducts = async () => {
      if (!themeKey) {
        navigate('/');
        return;
      }
      try {
        const response = await getThemeProducts(themeKey);
        setGoodsList(response.products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchThemeProducts();
  }, [themeKey, navigate]);

  if (loading) {
    return <TextView>Loading...</TextView>;
  }

  if (error) {
    return <TextView>{error}</TextView>;
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
          {goodsList.map((product) => (
            <DefaultGoodsItems
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
