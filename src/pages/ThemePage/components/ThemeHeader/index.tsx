import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '@/constants/errorMessage';
import ROUTES from '@/constants/routes';
import { useThemeHeaderData } from '@/pages/ThemePage/hooks/useThemeHeaderData';
import { ThemeHeaderData } from '@/types/themeType';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Skeleton } from '@/components/ui/Skeleton';

import { headerStyle, textStyle } from './styles';

type ThemeHeaderProps = {
  themeKey: string;
};

export const ThemeHeader = ({ themeKey }: ThemeHeaderProps) => {
  const navigate = useNavigate();

  const { themeHeader, loading, error } = useThemeHeaderData(themeKey);

  useEffect(() => {
    if (error === ERROR_MESSAGES.DATA_NOT_FOUND) {
      navigate(ROUTES.HOME);
    }
  }, [error, navigate]);

  if (error === ERROR_MESSAGES.FETCH_ERROR)
    return <OneTextContainer>{error}</OneTextContainer>;

  if (loading) return <Skeleton width="100vw" height="13rem" />;

  if (!themeHeader) return <OneTextContainer>{error}</OneTextContainer>;

  const { backgroundColor, label, title, description } =
    themeHeader as ThemeHeaderData;

  return (
    <Content
      backgroundColor={backgroundColor}
      flexDirection="column"
      gap="0.5rem"
      css={headerStyle}
    >
      <p css={textStyle('label')}>{label}</p>
      <h2 css={textStyle('title')}>{title}</h2>
      <p css={textStyle('description')}>{description}</p>
    </Content>
  );
};
