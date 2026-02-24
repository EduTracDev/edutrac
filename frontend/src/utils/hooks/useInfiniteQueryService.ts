/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import client from "../client";
import { AuthState } from "@/redux/store/slices/authSlice";

const DEFAULT_PAGE_LIMIT = 10;

export function useInfiniteQueryService<
  Req extends Omit<Partial<PaginationData>, "count"> | undefined | null,
  Resp extends Record<"pagination", PaginationData>
>(props: UseInfinityQueryServiceProps<Req, Resp>) {
  const {
    service: { options: serviceOptions, ...service },
    options: queryOptions,
  } = props;

  const { data = {} as PageParams } = service;
  const payload = data || ({} as PageParams);
  const { keys = [], ...rest } = queryOptions || {};

  const initialPageParam = {
    pos: payload.pos || 0,
    delta: payload.delta ?? DEFAULT_PAGE_LIMIT,
  } as PageParams;

  const { refreshToken, accessToken }: any = useSelector<AuthState>(
    ({ accessToken, refreshToken }) => ({ accessToken, refreshToken })
  );

  //   const searchParams = useSearchParams();
  //   const isRouteExcluded = useExemptSubscriptionRoute();

  const result = useInfiniteQuery<
    Resp,
    Error,
    InfiniteData<Resp, PageParams>,
    QueryKey,
    PageParams
  >({
    initialPageParam,
    ...rest,
    queryKey: [
      ...keys,
      //   ...(serviceOptions?.keys || []),
      service,
      refreshToken?._time_stamp,
      accessToken?._time_stamp,
    ],
    queryFn: async ({ pageParam }) => {
      const response = await client.request<Req & PageParams, Resp>({
        ...service,
        data: {
          ...payload,
          ...pageParam,
          ...(payload.delta && { delta: payload.delta, pos: 0 }),
          ...(payload.pos && { delta: payload.pos }),
        } as Req & PageParams,
      });

      return response;
    },
    getNextPageParam: (lastPage: Resp) => {
      const delta = payload.delta || initialPageParam?.delta || 0;
      const lastPageOffset = lastPage.pagination?.pos || 0;

      const pos = delta + lastPageOffset;
      const hasMore = pos < (lastPage.pagination?.count ?? Infinity);

      return !hasMore ? undefined : { pos, delta };
    },
    getPreviousPageParam: (previousPage: Resp) => {
      const delta = payload.delta || initialPageParam?.delta || 0;
      const lastPageOffset = previousPage.pagination?.pos || 0;

      const pos = lastPageOffset - delta;
      const hasPrevious = pos > 0;

      return { pos: hasPrevious ? pos : 0, delta };
    },
  });

  return result;
}
