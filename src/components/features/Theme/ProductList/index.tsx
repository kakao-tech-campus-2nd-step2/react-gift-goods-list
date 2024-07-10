import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchThemeProducts } from '@/api/themes';
import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, ThemeProductsResponse } from '@/types';

const ProductList = () => {
  const { themeKey } = useParams<{ themeKey: string }>();
  const [products, setProducts] = useState<GoodsData[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!themeKey) return;

    const getProducts = async () => {
      setIsLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { products, nextPageToken }: ThemeProductsResponse = await fetchThemeProducts({ themeKey });
        setProducts(products);
        setNextPageToken(nextPageToken);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [themeKey]);

  const loadMoreProducts = async () => {
    if (!themeKey || !nextPageToken) return;
    setIsLoading(true);
    try {
      const { products: newProducts, nextPageToken: newNextPageToken }: ThemeProductsResponse = await fetchThemeProducts({
        themeKey,
        pageToken: nextPageToken,
      });
      setProducts(prev => [...prev, ...newProducts]);
      setNextPageToken(newNextPageToken);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductListWrapper>
      <Grid
        columns={{
          initial: 3,
          sm: 4,
          md: 6,
        }}
        gap={16}
      >
        {products.map(product => (
          <RankingGoodsItems
            key={product.id}
            rankingIndex={products.indexOf(product) + 1}
            imageSrc={product.imageURL}
            title={product.name}
            amount={product.price.sellingPrice}
            subtitle={product.brandInfo.name}
          />
        ))}
      </Grid>
      {nextPageToken && (
        <ButtonWrapper>
          <Button theme="outline" onClick={loadMoreProducts} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </ButtonWrapper>
      )}
    </ProductListWrapper>
  );
};

const ProductListWrapper = styled.div`
  padding: 20px 0 30px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 0 60px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

export default ProductList;
