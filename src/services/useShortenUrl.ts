import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import apis from "./apis";
import { httpClient } from "./httpClient";
import { UrlNoId } from "./types";

async function createUrl(url: UrlNoId) {
  const res = await httpClient.post(apis.shortenUrl.create, url);
  return res.data as string;
}

export default function useShortenUrl(
  opts?: UseMutationOptions<string, Error, UrlNoId>,
) {
  return useMutation({
    mutationFn: createUrl,
    ...opts,
  });
}
