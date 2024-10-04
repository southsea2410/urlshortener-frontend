import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import apis from "./apis";
import { httpClient } from "./httpClient";
import { Url } from "./types";

async function getShortenedUrls() {
  const res = await httpClient.post(apis.shortenUrl.getAll);
  return res.data as Url[];
}

export default function useGetAllShortenedUrls(
  opts?: Omit<UseQueryOptions<Url[]>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["get", "all", "shortenedUrls"],
    queryFn: getShortenedUrls,
  });
}
