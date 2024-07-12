// import styled from '@emotion/styled';

// import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
// import { Container } from '@/components/common/layouts/Container';
// import { Grid } from '@/components/common/layouts/Grid';
// import { breakpoints } from '@/styles/variants';
// import LoadingSpinner from '@/components/common/Loading';
// import Nothing from '@/components/common/Nothing';

// import { useState, useEffect } from 'react';
// import { GoodsData } from '@/types';
// import { getData } from '@/api';

// type Props = {
//   themeKey: string;
// };

// interface GoodsResponse {
//   products: GoodsData[];
// }

// export const ThemeGoodsSection = ({ themeKey }: Props) => {
//   const [themeGoods, setThemeGoods] = useState<GoodsData[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getThemeData = async () => {
//       try {
//         const maxResults = 20;
//         const queryParams = `?maxResults=${maxResults}`;

//         const data = await getData<GoodsResponse>(`/api/v1/themes/${themeKey}/products${queryParams}`);
//         setThemeGoods(data.products);
//       } catch (error) {
//         console.error('Error fetching theme data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getThemeData();
//   }, [themeKey]);

//   return (
//     <Wrapper>
//       <Container>
//         {loading ?
//           <LoadingSpinner /> :
//           themeGoods.length ?
//             <Grid
//               columns={{
//                 initial: 2,
//                 md: 4,
//               }}
//               gap={16}
//             >
//               {themeGoods.map((good) => (
//                 <DefaultGoodsItems
//                   key={good.id}
//                   imageSrc={good.imageURL}
//                   title={good.name}
//                   amount={good.price.sellingPrice}
//                   subtitle={good.brandInfo.name}
//                 />
//               ))}
//             </Grid> :
//             <Nothing />
//         }
//       </Container>
//     </Wrapper>
//   );
// };

import styled from '@emotion/styled';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import LoadingSpinner from '@/components/common/Loading';
import Nothing from '@/components/common/Nothing';

import { useState, useEffect, useCallback } from 'react';
import { GoodsData } from '@/types';
import { getData } from '@/api';

type Props = {
  themeKey: string;
};

interface GoodsResponse {
  products: GoodsData[];
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [themeGoods, setThemeGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const maxResults = 20;

  const getThemeData = useCallback(async (page: number, reset = false) => {
    try {
      setLoading(true);
      const maxParams = maxResults * page;
      const queryParams = `?maxResults=${maxParams}`;

      const data = await getData<GoodsResponse>(`/api/v1/themes/${themeKey}/products${queryParams}`);
      // setThemeGoods((prevGoods) => reset ? data.products : [...prevGoods, ...data.products]);
      setThemeGoods(() => reset ? data.products : [...data.products]);
      setHasMore(data.products.length === maxResults);
    } catch (error) {
      console.error('Error fetching theme data:', error);
    } finally {
      setLoading(false);
    }
  }, [themeKey]);

  useEffect(() => {
    getThemeData(1, true); // Load first page and reset data on initial load or when themeKey changes
    setPage(1); // Reset page to 1
  }, [themeKey, getThemeData]);

  const handleScroll = useCallback(debounce(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.body.offsetHeight - 100 && !loading && hasMore) {
      console.log('window.innerHeight : ', window.innerHeight);
      console.log('document.documentElement.scrollTop : ', document.documentElement.scrollTop);
      console.log('document.documentElement.offsetHeight : ', document.documentElement.offsetHeight)
      console.log('document.body.offsetHeight : ', document.body.offsetHeight);
      setPage((prevPage) => prevPage + 1);
    }
    // console.log('!!')
    // if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || loading || !hasMore) {
    //   console.log('?')
    //   return;
    // }
    // setPage((prevPage) => prevPage + 1);
    // console.log('hi');
  }, 200), [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      getThemeData(page); // Fetch new data when page changes
      console.log('hey');
    }
  }, [page, getThemeData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log('...');
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Wrapper>
      <Container>
        {themeGoods.length ?
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {themeGoods.map((good) => (
              <DefaultGoodsItems
                key={good.id}
                imageSrc={good.imageURL}
                title={good.name}
                amount={good.price.sellingPrice}
                subtitle={good.brandInfo.name}
              />
            ))}
          </Grid> :
          !loading && <Nothing />
        }
        {loading && <LoadingSpinner />}
      </Container>
    </Wrapper>
  );
};




// ------------------------------------- react-query

// import styled from '@emotion/styled';
// import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
// import { Container } from '@/components/common/layouts/Container';
// import { Grid } from '@/components/common/layouts/Grid';
// import LoadingSpinner from '@/components/common/Loading';
// import Nothing from '@/components/common/Nothing';

// import { useEffect } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { GoodsData } from '@/types';
// import { getData } from '@/api';

// type Props = {
//   themeKey: string;
// };

// interface GoodsResponse {
//   products: GoodsData[];
// }

// const fetchThemeData = async ({ pageParam = 1, queryKey }: { pageParam: number, queryKey: any[] }) => {
//   const themeKey = queryKey[1];
//   const maxResults = 20;
//   const queryParams = `?maxResults=${maxResults}&page=${pageParam}`;
//   const data = await getData<GoodsResponse>(`/api/v1/themes/${themeKey}/products${queryParams}`);
//   return data.products;
// };

// export const ThemeGoodsSection = ({ themeKey }: Props) => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery(
//     ['themeGoods', themeKey],
//     fetchThemeData,
//     {
//       getNextPageParam: (lastPage, pages) => lastPage.length === 20 ? pages.length + 1 : undefined,
//     }
//   );

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasNextPage && !isFetchingNextPage) {
//         fetchNextPage();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   return (
//     <Wrapper>
//       <Container>
//         {status === 'loading' ? (
//           <LoadingSpinner />
//         ) : status === 'error' ? (
//           <div>Error loading data</div>
//         ) : (
//           <>
//             {data?.pages.flat().length ? (
//               <Grid
//                 columns={{
//                   initial: 2,
//                   md: 4,
//                 }}
//                 gap={16}
//               >
//                 {data.pages.flat().map((good) => (
//                   <DefaultGoodsItems
//                     key={good.id}
//                     imageSrc={good.imageURL}
//                     title={good.name}
//                     amount={good.price.sellingPrice}
//                     subtitle={good.brandInfo.name}
//                   />
//                 ))}
//               </Grid>
//             ) : (
//               <Nothing />
//             )}
//             {isFetchingNextPage && <LoadingSpinner />}
//           </>
//         )}
//       </Container>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   /* Add your styles here */
// `;



const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
