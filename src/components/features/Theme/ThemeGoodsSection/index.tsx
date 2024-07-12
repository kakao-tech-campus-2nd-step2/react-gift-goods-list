import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Error } from '@/components/common/Error';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingIcon } from '@/components/common/LoadingIcon';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const fetchGoods = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_KEY + `/api/v1/themes/${themeKey}/products`,
      { params: { maxResults: 20 } },
    );
    return response.data.products;
  };

  const { data, error, isLoading } = useQuery<GoodsData[]>({
    queryKey: ['products', themeKey],
    queryFn: fetchGoods,
  });
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
          {data?.map(({ id, imageURL, name, price, brandInfo }) => (
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
