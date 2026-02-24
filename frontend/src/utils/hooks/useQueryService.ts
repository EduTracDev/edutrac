import { QueryKey, useQuery } from "@tanstack/react-query";
import client from "../client";

export function useQueryService<Req extends object, Resp extends object>(
  props: UseQueryServiceProps<Req, Resp>
) {
  const { service, options } = props;
  const {
    keys = [],
    isDownload,
    isPdf,
    canShare,
    fileName,
    ...rest
  } = options || {};

  return useQuery<Resp, Error, Resp, QueryKey>({
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    ...rest,
    queryKey: [...keys, service],
    queryFn: async () => {
      const result = await client.request({
        ...service,
        path: service?.path,
        method: service?.method,
        options: { isDownload, isPdf, canShare, fileName },
      });
      // Ensure result is of type Resp
      if (typeof result === "string") {
        throw new Error("Unexpected string response");
      }
      return result as Resp;
    },
  });
}
