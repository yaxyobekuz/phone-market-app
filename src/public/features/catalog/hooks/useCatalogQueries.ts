import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { qk } from "@/shared/lib/query/keys";
import type { Brand, Meta, Phone } from "@/shared/types";
import { catalogAPI } from "../api/catalog.api";

// Infinite (scroll) catalogue - pages of { items, meta }
export const usePhonesInfiniteQuery = (params?: any) =>
  useInfiniteQuery({
    queryKey: qk.phones.infinite(params),
    queryFn: ({ pageParam }) =>
      catalogAPI
        .list({ ...params, page: pageParam })
        .then((r) => ({ items: r.data.data as Phone[], meta: r.data.meta as Meta })),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.meta && last.meta.pages && last.meta.page < last.meta.pages
        ? last.meta.page + 1
        : undefined,
    placeholderData: keepPreviousData,
  });

export const usePhoneQuery = (id: string) =>
  useQuery({
    queryKey: qk.phones.one(id),
    queryFn: () => catalogAPI.getById(id).then((r) => r.data.data as Phone),
    enabled: Boolean(id),
  });

export const useBrandsQuery = (params: any = { active: "true" }) =>
  useQuery({
    queryKey: qk.brands.list(params),
    queryFn: () => catalogAPI.brands(params).then((r) => r.data.data as Brand[]),
    staleTime: 10 * 60 * 1000,
  });
