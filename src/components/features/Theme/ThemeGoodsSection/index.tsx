import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef } from 'react';

import { Error } from '@/components/common/Error';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingIcon } from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};


export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const ref = useRef(null);

  const fetchGoods = async (pageToekn: number) => {
    const response = await axios.get(
      process.env.REACT_APP_API_KEY + `/api/v1/themes/${themeKey}/products`,
      { params: { pageToken: pageToekn } },
    );
    return response.data.products;
  };

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', themeKey],
    queryFn: ({ pageParam = 0 }) => fetchGoods(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageToken;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {

    return <LoadingIcon />;
  }
  if (error) {
    return <Error>에러가 발생했습니다.</Error>;
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
        {data?.pages.map(({ products }: { products: GoodsData[] }) => {
            return (
              <>
                {products?.map(({ id, imageURL, name, price, brandInfo }) => (
                  <DefaultGoodsItems
                    key={id}
                    imageSrc={imageURL}
                    title={name}
                    amount={price.sellingPrice}
                    subtitle={brandInfo.name}
                  />
                ))}
              </>
            );
          })}
        </Grid>
          <div ref={ref}></div>
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
