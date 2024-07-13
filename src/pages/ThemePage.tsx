import { useNavigate, useParams } from 'react-router-dom';
import Page from '@components/templates/Page';
import Banner from '@components/organisms/banner/Banner';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import {
  useContext, useEffect,
} from 'react';
import useFetchThemeProducts from '@hooks/useFetchThemeProducts';
import FetchStatusBoundary
  from '@components/atoms/container/FetchStatusBoundary';
import FetchStatus from '@constants/FetchStatus';
import { ERROR_NOT_DEFINED, ErrorMessages } from '@constants/ErrorMessage';
import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import ThemeProductDisplaySection
  from '@components/organisms/theme/ThemeProductDisplaySection';
import Container from '@components/atoms/container/Container';
import { ThemeContext } from '@/providers/ThemeContextProvider';

function ThemePage() {
  const { themeKey } = useParams();
  const {
    productResponse, hasNextPage, fetchNextPage, isFetchingNextPage, status: productFetchStatus,
  } = useFetchThemeProducts({ themeKey: themeKey || '' });
  const { themes, fetchStatus: themeFetchStatus } = useContext(ThemeContext);

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;

    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (themeFetchStatus === FetchStatus.FETCHING) return;

    if (!themeKey || !(themeKey in themes)) {
      navigate(-1);
    }
  }, [navigate, themes, themeKey, themeFetchStatus]);

  return (
    <Page>
      <FetchStatusBoundary
        fetchStatus={themeFetchStatus}
        errorMessage={ErrorMessages[ERROR_NOT_DEFINED]}
      >
        <Banner themeKey={themeKey as string} />
        <Container elementSize="full-width" justifyContent="center">
          <Container
            elementSize="full-width"
            maxWidth={MAX_CONTENT_WIDTH}
            alignItems="center"
            flexDirection="column"
            padding="40px 16px 0"
            cssProps={{
              gap: '16px',
            }}
          >
            <ThemeProductDisplaySection
              fetchStatus={productFetchStatus}
              isFetchingNextPage={isFetchingNextPage}
              productResponse={productResponse}
            />
          </Container>
        </Container>
      </FetchStatusBoundary>
      <div
        css={css`
        width: 100%;
        height: 300px;
      `}
        ref={ref}
      />
    </Page>
  );
}

export default ThemePage;
