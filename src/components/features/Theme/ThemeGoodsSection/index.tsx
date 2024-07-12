import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
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
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);

  const fetchProducts = useCallback(
    async (reset: boolean = false) => {
      console.log('Starting fetchProducts');
      setLoading(true);
      setError(null); // 에러 상태 초기화
      try {
        const response = await getThemeProducts({ themeKey, pageToken, maxResults: 20 });
        console.log('Fetched products:', response);
        setProducts((prevProducts) =>
          reset ? response.products : [...prevProducts, ...response.products],
        );
        setPageToken(response.nextPageToken || undefined);
        setHasMore(response.products.length > 0 && response.nextPageToken != null);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 404:
              setError('Products not found.');
              break;
            case 500:
              setError('Server error. Please try again later.');
              break;
            default:
              setError('An error occurred while fetching data.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    },
    [themeKey, pageToken],
  );

  useEffect(() => {
    fetchProducts(true);
  }, [themeKey, fetchProducts]);

  if (loading && products.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (products.length === 0) {
    return <NoDataMessage message="No products found for this theme." />;
  }

  return (
    <Wrapper>
      <Container>
        <InfiniteScroll
          dataLength={products.length}
          next={() => fetchProducts()}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<NoDataMessage message="No more products." />}
        >
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
        </InfiniteScroll>
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
