import { useNavigate, useParams } from 'react-router-dom';
import Page from '@components/templates/Page';
import Banner from '@components/organisms/banner/Banner';
import GiftDisplaySection from '@components/organisms/gift/GiftDisplaySection';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { useContext, useEffect } from 'react';
import useFetchThemeProducts from '@hooks/useFetchThemeProducts';
import { ThemeContext } from '@/providers/ThemeContextProvider';
import { isThemesLoaded } from '@/utils';

function ThemePage() {
  const { themeKey } = useParams();
  const products = useFetchThemeProducts({ themeKey: themeKey || '' });
  const themes = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isThemesLoaded(themes)) return;

    if (!themeKey || !(themeKey in themes)) {
      navigate(-1);
    }
  }, [products, navigate, themes, themeKey]);

  return isThemesLoaded(themes) ? (
    <Page>
      <Banner themeKey={themeKey as string} />
      <Container elementSize="full-width" justifyContent="center">
        <Container
          elementSize="full-width"
          maxWidth={MAX_CONTENT_WIDTH}
          justifyContent="center"
          padding="40px 16px 300px"
        >
          <GiftDisplaySection products={products} maxColumns={4} minColumns={2} />
        </Container>
      </Container>
    </Page>
  ) : null;
}

export default ThemePage;
