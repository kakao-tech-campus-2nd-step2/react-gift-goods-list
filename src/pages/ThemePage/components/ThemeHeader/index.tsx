import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '@/constants/errorMessage';
import ROUTES from '@/constants/routes';
import { useThemeHeaderData } from '@/pages/ThemePage/hooks/useThemeHeaderData';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';

import { headerStyle, textStyle } from './styles';

type ThemeHeaderProps = {
  themeKey: string;
};

export const ThemeHeader = ({ themeKey }: ThemeHeaderProps) => {
  const navigate = useNavigate();

  const { data, loading, error } = useThemeHeaderData(themeKey);

  if (error === ERROR_MESSAGES.FETCH_ERROR)
    return <OneTextContainer>{error}</OneTextContainer>;
  if (loading) return <OneTextContainer>loading...</OneTextContainer>;
  if (error === ERROR_MESSAGES.PATH_NOT_FOUND || !data) {
    navigate(ROUTES.HOME);
    return null;
  }

  const { backgroundColor, label, title, description } = data;

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
