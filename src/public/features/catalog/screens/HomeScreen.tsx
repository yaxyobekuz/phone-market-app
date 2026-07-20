import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";

import useObjectState from "@/shared/hooks/useObjectState";
import useDebounce from "@/shared/hooks/useDebounce";
import useSaved from "@/shared/hooks/useSaved";
import EmptyState from "@/shared/components/ui/EmptyState";
import { useBrandsQuery, usePhonesInfiniteQuery } from "../hooks/useCatalogQueries";
import PhoneCard from "../components/PhoneCard";
import { PhoneGridSkeleton } from "../components/PhoneCardSkeleton";
import CatalogToolbar from "../components/CatalogToolbar";
import BrandPills from "../components/BrandPills";
import CatalogFiltersModal from "../components/CatalogFiltersModal";
import {
  EMPTY_FILTERS,
  countActiveFilters,
  type CatalogFilterState,
} from "../components/CatalogFilters";

const LIMIT = 12;

const buildParams = (s: CatalogFilterState) => {
  const p: Record<string, any> = { limit: LIMIT };
  if (s.search.trim()) p.search = s.search.trim();
  if (s.brand) p.brand = s.brand;
  if (s.condition) p.condition = s.condition;
  if (s.region) p.region = s.region;
  if (s.currency) p.currency = s.currency;
  if (s.priceMin) p.priceMin = s.priceMin;
  if (s.priceMax) p.priceMax = s.priceMax;
  if (s.sort) p.sort = s.sort;
  return p;
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { state, setField, resetState } = useObjectState<CatalogFilterState>(EMPTY_FILTERS);
  const { isSaved, toggleSave } = useSaved();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = useDebounce(state.search, 400);
  const priceMin = useDebounce(state.priceMin, 400);
  const priceMax = useDebounce(state.priceMax, 400);
  const params = useMemo(
    () => buildParams({ ...state, search, priceMin, priceMax }),
    [state, search, priceMin, priceMax],
  );

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = usePhonesInfiniteQuery(params);
  const { data: brands = [] } = useBrandsQuery();

  const items = data?.pages.flatMap((p) => p.items) ?? [];
  const total = data?.pages?.[0]?.meta?.total;
  const activeFilters = countActiveFilters(state);

  const header = (
    <View className="gap-3 pb-3" style={{ paddingTop: insets.top + 8 }}>
      <Text className="text-2xl font-bold text-foreground">Telefon e'lonlari</Text>
      <CatalogToolbar
        search={state.search}
        sort={state.sort}
        onSearch={(v) => setField("search", v)}
        onSort={(v) => setField("sort", v)}
        onOpenFilters={() => setFiltersOpen(true)}
        activeFilters={activeFilters}
      />
      <BrandPills brands={brands} value={state.brand} onChange={(v) => setField("brand", v)} />
      <Text className="text-sm text-muted-foreground">
        {total != null ? `${total} ta e'lon topildi` : "Yuklanmoqda..."}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 32 }}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <PhoneCard
            phone={item}
            saved={isSaved(item._id)}
            onToggleSave={toggleSave}
            className="flex-1"
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.4}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          isLoading ? (
            <PhoneGridSkeleton />
          ) : isError ? (
            <EmptyState
              title="Ulanishda xatolik"
              subtitle="Server bilan aloqa yo'q. Internet va serverni tekshiring."
              icon={<Search size={36} color="#cbd5e1" />}
            />
          ) : (
            <EmptyState
              title="E'lon topilmadi"
              subtitle="Filtrlarni o'zgartirib ko'ring"
              icon={<Search size={36} color="#cbd5e1" />}
            />
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator className="py-4" color="#2563eb" /> : null
        }
      />

      <CatalogFiltersModal
        visible={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        value={state}
        onChange={(f, v) => setField(f, v)}
        onReset={resetState}
      />
    </View>
  );
}
