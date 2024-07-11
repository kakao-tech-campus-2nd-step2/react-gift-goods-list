import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components/common/Error/Error';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingSpinner } from '@/components/common/Loading/Loading';
import { getTheme } from '@/libs/api';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

export const ThemeGoodsSection = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [goods, setGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGoodsData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getTheme(themeKey);

        if (typeof data === 'string') {
          setError(data);
        } else {
          setGoods(data.products);
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsData();
  }, [themeKey]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <CenteredContent>
        <ErrorMessage message={error} />
      </CenteredContent>
    );
  }

  if (!goods) {
    return <Navigate to={RouterPath.notFound} />;
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
          {goods.map(({ id, imageURL, name, price, brandInfo }) => (
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

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;
