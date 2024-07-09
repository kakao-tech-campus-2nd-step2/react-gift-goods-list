import { useNavigate } from 'react-router-dom';

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

  const { themeHeader, loading, error } = useThemeHeaderData(themeKey);

  if (loading) return <OneTextContainer>loading...</OneTextContainer>;
  if (error || !themeHeader) {
    navigate(ROUTES.HOME);
    return null;
  }

  return (
    <Content
      backgroundColor={themeHeader.backgroundColor}
      flexDirection="column"
      gap="0.5rem"
      css={headerStyle}
    >
      <p css={textStyle('label')}>{themeHeader.label}</p>
      <h2 css={textStyle('title')}>{themeHeader.title}</h2>
      <p css={textStyle('description')}>{themeHeader.description}</p>
    </Content>
  );
};
