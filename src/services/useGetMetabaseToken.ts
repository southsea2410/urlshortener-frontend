import axios from "axios";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { httpClient } from "./httpClient";

type MetabaseToken = {
  value: string;
};

export type MetabasePayload = {
  resource: { dashboard: number };
  params?: {
    [key: string]: any;
  };
};

async function getMetabaseToken(payload: MetabasePayload) {
  const res = await httpClient.post("/metabase_link", payload);
  return res.data;
}

export default function useGetMetabaseToken(
  payload: MetabasePayload,
  opts?: UseQueryOptions<MetabaseToken>,
) {
  return useQuery<MetabaseToken>({
    ...opts,
    queryKey: ["metabase token", JSON.stringify(payload)],
    queryFn: () => getMetabaseToken(payload),
  });
}
