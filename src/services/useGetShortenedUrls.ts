import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import apis from "./apis";
import { httpClient } from "./httpClient";
import { LocalStorageAliases, Url } from "./types";

async function getShortenedUrls(aliases: LocalStorageAliases) {
  const res = await httpClient.post(apis.shortenUrl.get, aliases);
  return res.data as Url[];
}

export default function useGetShortenedUrls(
  aliases: LocalStorageAliases,
  opts?: Omit<UseQueryOptions<Url[]>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["get", "shortenedUrls"],
    queryFn: () => getShortenedUrls(aliases),
  });
}
