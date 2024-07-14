import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

type FetchGoodsResponse = {
  products: GoodsData[];
  nextPageToken?: string;
};

const fetchGoods = async (pageToken: string, themeKey: string): Promise<FetchGoodsResponse> => {
  const { data } = await axios.get(
    `https://react-gift-mock-api-daeun0726.vercel.app/api/v1/themes/${themeKey}/products?pageToken=${pageToken}&maxResults=20`,
  );
  return data;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['themeGoods', themeKey],
    queryFn: ({ pageParam = 0 }) => fetchGoods(pageParam, themeKey),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
        <p>Loading...</p>
      </LoadingWrapper>
    );
  }

  if (isError) {
    return (
      <ErrorWrapper>
        <ErrorMessage>Error loading data.</ErrorMessage>
      </ErrorWrapper>
    );
  }

  if (!data || data.pages[0].products.length === 0) {
    return (
      <NoDataWrapper>
        <NoDataMessage>No goods available.</NoDataMessage>
      </NoDataWrapper>
    );
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
          {data.pages.map((page) =>
            page.products.map(({ id, imageURL, name, price, brandInfo }) => (
              <DefaultGoodsItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            )),
          )}
        </Grid>
        <div ref={ref} />
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const ErrorMessage = styled.p`
  width: 100%;
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const NoDataMessage = styled.p`
  width: 100%;
  font-size: 18px;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

export default ThemeGoodsSection;
