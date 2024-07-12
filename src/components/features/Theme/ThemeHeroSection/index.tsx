import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components/common/Error/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingSpinner } from '@/components/common/Loading/Loading';
import { getThemes } from '@/libs/api';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

export const ThemeHeroSection = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);
      setError('');
      try {
        const themes = await getThemes();
        const currentTheme = themes.themes.find((label: ThemeData) => label.key === themeKey);

        if (!currentTheme) {
          setError('theme을 찾을 수 없음');
          setLoading(false);
          return;
        }

        if (typeof currentTheme === 'string') {
          setError(currentTheme);
        } else {
          setTheme(currentTheme);
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
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

  if (!theme) {
    return <Navigate to={RouterPath.notFound} />;
  }
  return (
    <Wrapper backgroundColor={theme.backgroundColor}>
      <Container>
        {loading ? (
          <CenteredContent>
            <LoadingSpinner />
          </CenteredContent>
        ) : error != '' ? (
          <CenteredContent>
            <ErrorMessage message={error} />
          </CenteredContent>
        ) : (
          <Container>
            <Label>{theme.label}</Label>
            <Title>{theme.title}</Title>
            {theme.description && <Description>{theme.description}</Description>}
          </Container>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    line-height: 40px;
    padding-top: 12px;
    word-break: break-word;
  }
`;

const Description = styled.p`
  padding-top: 5px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.55);
  word-break: break-all;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 12px;
    font-size: 24px;
    line-height: 32px;
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

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]) => {
  return themeList.find((theme) => theme.key === themeKey);
};
