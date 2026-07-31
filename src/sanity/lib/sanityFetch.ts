import "server-only";
import { draftMode } from "next/headers";
import { client } from "./client";
import { QueryParams } from "next-sanity";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode && {
      token: process.env.SANITY_API_TOKEN,
      perspective: "previewDrafts",
    }),
    cache: "no-store", // Deshabilita la caché por completo
    stega: isDraftMode,
  });
}
