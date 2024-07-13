import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { getThemeProducts } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { ref, inView } = useInView();
  console.log('inView:', inView);

  const fetchGoods = async ({ pageParam = 0 }) => {
    const data = await getThemeProducts(themeKey, pageParam);
    console.log('Fetched data for page:', pageParam, data);
    return { data, nextPage: pageParam + 1 };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['themeProducts', themeKey], fetchGoods, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 20) return undefined;
      return lastPage.nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if (error) {
    return <ErrorMessage>상품을 가져오는데 실패하였습니다.</ErrorMessage>;
  }

  if (!data) {
    return <ErrorMessage>상품이 없습니다.</ErrorMessage>;
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
          {data.pages.flatMap(page => page.data).map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
        <div ref={ref} /> {/* ref 설정 */}
        {(isFetching || isFetchingNextPage) && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
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

const ErrorMessage = styled.div`
  color: black;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Spinner = styled.div`
  border: 4px solid white; 
  border-left-color: rgba(0,0,0,0.5);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
