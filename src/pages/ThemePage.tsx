import { useNavigate, useParams } from 'react-router-dom';
import Page from '@components/templates/Page';
import Banner from '@components/organisms/banner/Banner';
import GiftDisplaySection from '@components/organisms/gift/GiftDisplaySection';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { useContext, useEffect } from 'react';
import useFetchThemeProducts from '@hooks/useFetchThemeProducts';
import FetchStatusBoundary
  from '@components/atoms/container/FetchStatusBoundary';
import FetchStatus from '@constants/FetchStatus';
import { ErrorMessages } from '@constants/ErrorMessage';
import { ThemeContext } from '@/providers/ThemeContextProvider';

function ThemePage() {
  const { themeKey } = useParams();
  const { products, fetchStatus, errorCode } = useFetchThemeProducts({ themeKey: themeKey || '' });
  const { themes, fetchStatus: themeFetchStatus } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchStatus === FetchStatus.FETCHING) return;

    if (!themeKey || !(themeKey in themes)) {
      navigate(-1);
    }
  }, [products, navigate, themes, themeKey, fetchStatus]);

  return (
    <Page>
      <FetchStatusBoundary fetchStatus={themeFetchStatus} errorMessage={ErrorMessages[errorCode]}>
        <Banner themeKey={themeKey as string} />
        <Container elementSize="full-width" justifyContent="center">
          <Container
            elementSize="full-width"
            maxWidth={MAX_CONTENT_WIDTH}
            justifyContent="center"
            padding="40px 16px 300px"
          >
            <FetchStatusBoundary fetchStatus={fetchStatus} errorMessage={ErrorMessages[errorCode]}>
              <GiftDisplaySection products={products} maxColumns={4} minColumns={2} />
            </FetchStatusBoundary>
          </Container>
        </Container>
      </FetchStatusBoundary>
    </Page>
  );
}

export default ThemePage;
