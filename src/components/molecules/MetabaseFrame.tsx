"use client";

import { createElement } from "react";

import useGetMetabaseToken, {
  MetabasePayload,
} from "@/services/useGetMetabaseToken";

export default function MetabaseFrame({
  payload,
}: {
  payload: MetabasePayload;
}) {
  const { data: metabase_url } = useGetMetabaseToken(payload);

  return /*#__PURE__*/ createElement("iframe", {
    src: metabase_url,
    className: "absolute top-0 bottom-0 right-0 left-0 size-full",
  });
}
