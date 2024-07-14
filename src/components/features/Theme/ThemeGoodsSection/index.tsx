import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [isLast, setIsLast] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [, setPageInfo] = useState();

  const url = `https://react-gift-mock-api-two.vercel.app/api/v1/themes/${themeKey}/products`;

  const fetchProducts = () => {
    axios({
      method: 'get',
      url: url,
      params: { maxResults: 20, pageToken: nextPageToken },
    })
      .then((res) => {
        setProducts(products.concat(res.data.products));
        setNextPageToken(res.data.nextPageToken);
        if (res.data.nextPageToken == null) {
          setIsLast(true);
        }
        setPageInfo(res.data.pageInfo);
        setLoading(true);
      })
      .catch((err) => {
        console.error('Error fetching themes:', err);
        setError(err); // 에러 메시지 설정
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 해제
      });
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: url,
      params: { maxResults: 20 },
    })
      .then((res) => {
        setProducts(res.data.products);
        setNextPageToken(res.data.nextPageToken);
        if (res.data.nextPageToken == null) {
          setIsLast(true);
        }
        setPageInfo(res.data.pageInfo);
        setLoading(true);
      })
      .catch((err) => {
        console.error('Error fetching themes:', err);
        setError(err); // 에러 메시지 설정
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 해제
      });
  }, [url]);

  const { isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['getMorePage'],
    queryFn: fetchProducts,
    initialPageParam: '', // v5 달라진 점 -> 본인이 불러와야 하는 첫 페이지를 지정!
    getNextPageParam: () => {
      return nextPageToken;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      console.log('여기');
      fetchNextPage?.();
    }
  }, [fetchNextPage, inView, isLast]);

  if (loading)
    return (
      <Container>
        <div>데이터를 로딩중입니다.</div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div>Error: {error}</div>
      </Container>
    );
  if (products.length === 0)
    return (
      <Container>
        <div>데이터가 존재하지 않습니다.</div>
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
          {
            // getDataIsSuccess &&
            //   getData?.pages.map((page) => )
            products.map(({ id, imageURL, name, price, brandInfo }) => (
              <DefaultGoodsItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            ))
          }
        </Grid>
        {!isLoading && hasNextPage && <div ref={ref}></div>}
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
