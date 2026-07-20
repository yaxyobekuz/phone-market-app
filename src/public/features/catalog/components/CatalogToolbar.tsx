import { Pressable, Text, View } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

import InputSearch from "@/shared/components/ui/InputSearch";
import Select from "@/shared/components/ui/Select";
import { SORTS } from "@/shared/data/phones.data";

interface Props {
  search: string;
  sort: string;
  onSearch: (v: string) => void;
  onSort: (v: string) => void;
  onOpenFilters: () => void;
  activeFilters: number;
}

export default function CatalogToolbar({
  search,
  sort,
  onSearch,
  onSort,
  onOpenFilters,
  activeFilters,
}: Props) {
  return (
    <View className="gap-2.5">
      <InputSearch value={search} onChangeText={onSearch} placeholder="Qidirish..." />
      <View className="flex-row gap-2.5">
        <View className="flex-1">
          <Select value={sort} onChange={onSort} options={SORTS} />
        </View>
        <Pressable
          onPress={onOpenFilters}
          className="h-12 flex-row items-center gap-2 rounded-xl border border-border bg-white px-4"
        >
          <SlidersHorizontal size={18} color="#0f172a" />
          <Text className="font-medium text-foreground">
            Filtr{activeFilters ? ` (${activeFilters})` : ""}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
