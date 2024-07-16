import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import { type GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const url = `https://react-gift-mock-api-two.vercel.app/api/v1/themes/${themeKey}/products`;

  const fetchProducts = (pageParam: string) => {
    return axios({
      method: 'get',
      url: url,
      params: { maxResults: 20, pageToken: pageParam },
    }).then((res) => {
      return res.data;
    });
  };

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetchThemeGoods'],
    queryFn: ({ pageParam = undefined }) => fetchProducts(pageParam), //api 함수
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [data, fetchNextPage, inView]);

  if (isLoading)
    return (
      <Container>
        <div>데이터를 로딩중입니다.</div>
      </Container>
    );
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
          {data?.pages.map((page) =>
            page.products.map(({ id, imageURL, name, price, brandInfo }: GoodsData) => (
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
        {<div ref={ref}></div>}
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
