import { useNavigate, useParams } from 'react-router-dom';
import Page from '@components/templates/Page';
import Banner from '@components/organisms/banner/Banner';
import GiftDisplaySection from '@components/organisms/gift/GiftDisplaySection';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import {
  useContext, useEffect, useRef,
} from 'react';
import useFetchThemeProducts from '@hooks/useFetchThemeProducts';
import FetchStatusBoundary
  from '@components/atoms/container/FetchStatusBoundary';
import FetchStatus from '@constants/FetchStatus';
import { ERROR_NOT_DEFINED, ErrorMessages } from '@constants/ErrorMessage';
import { css } from '@emotion/react';
import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import { useInView } from 'react-intersection-observer';
import { ThemeContext } from '@/providers/ThemeContextProvider';
import { generateRandomId } from '@/utils';

function ThemePage() {
  const themePageId = useRef(generateRandomId());
  const { themeKey } = useParams();
  const {
    productResponse, hasNextPage, fetchNextPage, isFetchingNextPage,
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
            {
              productResponse?.pages?.map((page, index) => {
                const key = `${themePageId}-${index}`;

                return (
                  <GiftDisplaySection
                    products={page.products}
                    maxColumns={4}
                    minColumns={2}
                    key={key}
                  />
                );
              })
            }
            {
              isFetchingNextPage ? (
                <ProductSkeletonGrid columnsDefault={4} itemCount={4} columnsSm={2} />
              ) : null
            }
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
