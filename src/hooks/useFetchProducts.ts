import { useEffect, useState } from 'react';
import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import FetchStatus from '@constants/FetchStatus';
import axios from 'axios';
import { ERROR_NOT_DEFINED } from '@constants/ErrorMessage';
import { RankingProductsResponse } from '@/types/response';
import { RankingProductsRequestQuery } from '@/types/request';
import { ProductData } from '@/dto';
import { RankFilter, TargetFilter } from '@/types';

interface FetchParams {
  targetFilter?: TargetFilter;
  rankFilter?: RankFilter;
}

function useFetchProducts({ targetFilter, rankFilter }: FetchParams) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.FETCHING);
  const [errorCode, setErrorCode] = useState<number>(ERROR_NOT_DEFINED);

  useEffect(() => {
    const params: RankingProductsRequestQuery = {
      targetType: targetFilter,
      rankType: rankFilter,
    };

    async function request() {
      try {
        const response = await axiosInstance
          .get<RankingProductsResponse>(RequestURLs.RANKING_PRODUCTS, { params });
        setProducts(response.data.products);
        setFetchStatus(FetchStatus.FETCH_SUCCESS);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setErrorCode(e.response?.status || ERROR_NOT_DEFINED);
        }

        console.error(e);
        setFetchStatus(FetchStatus.FETCH_ERROR);
      }
    }

    request();
  }, [targetFilter, rankFilter]);

  return { products, fetchStatus, errorCode };
}

export default useFetchProducts;
