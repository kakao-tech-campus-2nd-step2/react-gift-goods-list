import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import type { QueryFunctionContext } from 'react-query';
import { useInfiniteQuery } from 'react-query';

import axiosInstance from '@/api/axiosInstance';
import { Loading } from '@/api/Loading';
import { NoData } from '@/api/NoData';
import { DefaultItems } from '@/components/common/Item/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

const fetchProducts = async (context: QueryFunctionContext<[string, string], number>) => {
  const [, themeKey] = context.queryKey;
  const pageParam = context.pageParam ?? 1;
  const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
      pageToken: pageParam,
    },
  });
  return response.data;
};

export const ProductSection = ({ themeKey }: Props) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['products', themeKey],
    fetchProducts,
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken || false,
    },
  );

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NoData message="An error occurred while fetching data." />;
  }

  if (!data || data.pages.length === 0) {
    return <NoData />;
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
          {data.pages
            .flatMap((page) => page.products)
            .map(({ id, imageURL, name, price, brandInfo }) => (
              <DefaultItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            ))}
        </Grid>
        {isLoading && <Loading />}
        <div ref={loader} />
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
