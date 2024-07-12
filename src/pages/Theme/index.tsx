import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { getThemeProducts, getThemes } from '@/api/themeApi';
import { RouterPath } from '@/routes/path';
import type { ProductData, ThemeData } from '@/types/api';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        console.log(`Fetching products for themeKey: ${themeKey}`);
        const [themeData, productData] = await Promise.all([
          getThemes(),
          getThemeProducts(themeKey, 20),
        ]);

        const foundTheme = themeData.themes.find((t) => t.key === themeKey);

        if (!foundTheme) {
          setError(true);
          return;
        }

        setTheme(foundTheme);
        setProducts(productData.products);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        console.error('Error fetching theme or products:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeData();
  }, [themeKey]);

  if (error) {
    return <Navigate to={RouterPath.notFound} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header backgroundColor={theme?.backgroundColor}>
        <Title>{theme?.label}</Title>
        <SubTitle>{theme?.title}</SubTitle>
        <Description>{theme?.description}</Description>
      </Header>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price.sellingPrice}원</ProductPrice>
          </ProductCard>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const Header = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  padding: 20px;
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const SubTitle = styled.h2`
  margin: 10px 0 0;
  font-size: 20px;
`;

const Description = styled.p`
  margin: 10px 0 0;
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductName = styled.p`
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  margin: 0 0 10px;
  color: #ff5722;
  font-size: 18px;
  font-weight: bold;
`;

export default ThemePage;
