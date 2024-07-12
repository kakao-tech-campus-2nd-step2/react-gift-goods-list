import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { ApiService } from '@/api';
import type {
  GetThemeProductsParameters,
  GetThemeProductsResponse,
  ProductData,
} from '@/api/types';
import type { APIError } from '@/api/types';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessage } from '@/components/features/Error/ErrorMessage';
import { Loading } from '@/components/features/Loading/Loading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { breakpoints } from '@/styles/variants';
import { handleApiError } from '@/utils/errorHandler/errorHandler';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<ProductData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  const fetchGoodsList = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const params: GetThemeProductsParameters = {
      themeKey,
      maxResults: resultsPerPage,
      pageToken,
    };

    try {
      const response: GetThemeProductsResponse = await ApiService.fetchThemeProducts(params);
      setGoodsList((prevGoodsList) => [...prevGoodsList, ...response.products]);
      setResultsPerPage(response.pageInfo.resultsPerPage);
      if (response.nextPageToken) {
        setPageToken(response.nextPageToken);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (error as APIError) {
        setErrorMessage(handleApiError(error as APIError));
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [themeKey, pageToken, isLoading, hasMore, resultsPerPage]);

  useEffect(() => {
    fetchGoodsList();
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      fetchGoodsList();
    }
  }, [isIntersecting, fetchGoodsList, hasMore, isLoading]);

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
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
        {hasMore && <LoadingTrigger ref={ref} />}
      </Container>
      {isLoading && <Loading message="·Îµù Áß..." />}
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

const LoadingTrigger = styled.div`
  width: 100%;
  height: 20px;
`;
