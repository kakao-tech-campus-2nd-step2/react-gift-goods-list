import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '@/constants/errorMessage';
import ROUTES from '@/constants/routes';
import { useThemeHeroData } from '@/pages/ThemePage/hooks/useThemeHeroData';
import { ThemeHeroData } from '@/types/themeType';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Skeleton } from '@/components/ui/Skeleton';

import { heroStyle, textStyle } from './styles';

type ThemeHeroSectionProps = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: ThemeHeroSectionProps) => {
  const navigate = useNavigate();

  const { themeHero, status, error } = useThemeHeroData(themeKey);

  useEffect(() => {
    if (error?.message === ERROR_MESSAGES.DATA_NOT_FOUND) {
      navigate(ROUTES.HOME);
    }
  }, [error, navigate]);

  if (error?.message) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <Skeleton width="100vw" height="13rem" />;
  }

  const { backgroundColor, label, title, description } =
    themeHero as ThemeHeroData;

  return (
    <Content
      backgroundColor={backgroundColor}
      flexDirection="column"
      gap="0.5rem"
      css={heroStyle}
    >
      <p css={textStyle('label')}>{label}</p>
      <h2 css={textStyle('title')}>{title}</h2>
      <p css={textStyle('description')}>{description}</p>
    </Content>
  );
};
