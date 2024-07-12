import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeHero } from '@/api/hooks/useThemeHero';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import ROUTES from '@/constants/routes';
import { ThemeHeroData } from '@/types/themeType';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';

import { heroStyle, textStyle } from './styles';

type ThemeHeroSectionProps = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: ThemeHeroSectionProps) => {
  const navigate = useNavigate();

  const { themeHero, error } = useThemeHero(themeKey);

  useEffect(() => {
    if (error?.message === API_ERROR_MESSAGES.DATA_NOT_FOUND) {
      navigate(ROUTES.HOME);
    }
  }, [error, navigate]);

  if (error?.message) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
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
