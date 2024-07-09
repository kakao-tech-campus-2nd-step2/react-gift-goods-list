import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingIcon } from '@/components/common/LoadingIcon';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};
interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}
export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_KEY + `/api/v1/themes/${themeKey}/products?maxResults=20`,
        );
        setFetchState({ isLoading: false, isError: false, data: response.data.products });
      } catch {
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };
    fetchGoods();
  }, [themeKey]);

  if (fetchState.isLoading) {
    return <LoadingIcon />;
  }
  if (fetchState.isError) {
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
          {fetchState.data?.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
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
const Error = styled.div`
  margin: 50px 0;
  text-align: center;
`;
