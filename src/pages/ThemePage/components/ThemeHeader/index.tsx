import { ThemeData } from '@/types/themeType';

import { Content } from '@/components/Content';

import { headerStyle, textStyle } from './styles';

type ThemeHeaderProps = {
  themeHeaderData: ThemeData;
};

export const ThemeHeader = ({ themeHeaderData }: ThemeHeaderProps) => {
  return (
    <Content
      backgroundColor={themeHeaderData.backgroundColor}
      flexDirection="column"
      gap="0.5rem"
      css={headerStyle}
    >
      <p css={textStyle('label')}>{themeHeaderData.label}</p>
      <h2 css={textStyle('title')}>{themeHeaderData.title}</h2>
      <p css={textStyle('description')}>{themeHeaderData.description}</p>
    </Content>
  );
};
