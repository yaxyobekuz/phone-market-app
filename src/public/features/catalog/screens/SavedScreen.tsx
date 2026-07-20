import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heart } from "lucide-react-native";

import EmptyState from "@/shared/components/ui/EmptyState";
import useSaved from "@/shared/hooks/useSaved";
import PhoneCard from "../components/PhoneCard";

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedList, isSaved, toggleSave } = useSaved();

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={savedList}
        keyExtractor={(i) => i._id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ gap: 12, paddingTop: insets.top + 8, paddingBottom: 32 }}
        ListHeaderComponent={
          <Text className="px-4 text-2xl font-bold text-foreground">Saqlangan</Text>
        }
        ListHeaderComponentStyle={{ paddingHorizontal: 0 }}
        renderItem={({ item }) => (
          <PhoneCard
            phone={item}
            saved={isSaved(item._id)}
            onToggleSave={toggleSave}
            className="flex-1"
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Bo'sh"
            subtitle="Hali hech nima saqlanmagan"
            icon={<Heart size={36} color="#cbd5e1" />}
          />
        }
      />
    </View>
  );
}
