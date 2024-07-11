import styled from '@emotion/styled';

import { Container } from '@/components/common/Layout/Container';
import { useThemes } from '@/services/useThemes';

export const HeaderSection = ({ themeKey }: { themeKey: string }) => {
  const { error, data } = useThemes();
  const themes = data?.themes ?? [];
  const theme = themes.find((themeData) => themeData.key === themeKey);

  if (error || !theme) {
    return null;
  }

  return (
    <HeaderWrapper backgroundColor={theme.backgroundColor}>
      <CustomContainer flexDirection="column" maxWidth="1024px">
        {theme.label && <SubText>{theme.label}</SubText>}
        <MainText>{theme.title}</MainText>
        {theme.description && <DescriptText>{theme.description}</DescriptText>}
      </CustomContainer>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.section<{ backgroundColor: string | undefined }>`
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: 54px 20px;

  @media screen and (max-width: 768px) {
    padding: 27px 20px;
  }
`;
const CustomContainer = styled(Container)`
  gap: 20px;
  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;
const SubText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #ffffffb3;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const MainText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;
const DescriptText = styled.p`
  font-size: 24px;
  color: #ffffff8c;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
