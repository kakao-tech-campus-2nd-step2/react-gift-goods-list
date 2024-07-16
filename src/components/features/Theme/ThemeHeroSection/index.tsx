import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components/common/Error/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingSpinner } from '@/components/common/Loading/Loading';
import { useThemes } from '@/hooks/useThemes';
import { breakpoints } from '@/styles/variants';

export const ThemeHeroSection = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { theme, isLoading, isError, error } = useThemes(themeKey);

  if (isLoading) {
    return (
      <CenteredContent>
        <LoadingSpinner />
      </CenteredContent>
    );
  }

  if (isError || error) {
    return (
      <CenteredContent>
        <ErrorMessage message={error || 'Unknown Error'} />
      </CenteredContent>
    );
  }

  if (!theme) {
    return (
      <CenteredContent>
        <ErrorMessage message="Theme을 찾을 수 없습니다." />
      </CenteredContent>
    );
  }

  return (
    <Wrapper backgroundColor={theme.backgroundColor}>
      <Container>
        <Label>{theme.label}</Label>
        <Title>{theme.title}</Title>
        {theme.description && <Description>{theme.description}</Description>}
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
